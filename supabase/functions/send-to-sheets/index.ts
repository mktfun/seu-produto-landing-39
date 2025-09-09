import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  id: number;
  name: string;
  phone: string;
  how_did_you_hear: string;
  property_type: string;
  property_value: string;
  main_priority: string;
  budget_range: string;
  recommended_plan: string;
}

// Function to create JWT token for Google API authentication
async function createJWT(serviceAccount: any) {
  const header = {
    alg: "RS256",
    typ: "JWT"
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now
  };

  const encoder = new TextEncoder();
  const headerB64 = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const payloadB64 = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const message = `${headerB64}.${payloadB64}`;
  
  // Import private key
  const keyData = serviceAccount.private_key.replace(/\\n/g, '\n');
  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    new TextEncoder().encode(keyData),
    {
      name: 'RSASSA-PKCS1-v1_5',
      hash: 'SHA-256',
    },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    encoder.encode(message)
  );

  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${message}.${signatureB64}`;
}

// Function to get access token from Google
async function getAccessToken(serviceAccount: any) {
  const jwt = await createJWT(serviceAccount);
  
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
  });

  const data = await response.json();
  return data.access_token;
}

// Function to format lead data for Google Sheets
function formatLeadData(leadData: LeadData): string[] {
  // Map property types
  const propertyTypes: { [key: string]: string } = {
    'apartamento': 'Apartamento',
    'casa': 'Casa',
    'sobrado': 'Sobrado',
    'chacara': 'Chácara/Sítio'
  };

  // Map property values
  const propertyValues: { [key: string]: string } = {
    'ate-300k': 'Até R$ 300mil',
    '300-600k': 'R$ 300k - 600k',
    '600k-1m': 'R$ 600k - 1M',
    'acima-1m': 'Acima R$ 1M'
  };

  // Map budget ranges
  const budgetRanges: { [key: string]: string } = {
    'economico': 'Até R$ 100/mês (Econômico)',
    'medio': 'R$ 100 - R$ 200/mês (Médio)',
    'premium': 'Acima R$ 200/mês (Premium)'
  };

  // Map how did you hear
  const sources: { [key: string]: string } = {
    'uber': 'QR Code no Uber',
    'google': 'Google/Busca',
    'indicacao': 'Indicação',
    'social': 'Redes Sociais',
    'outros': 'Outros'
  };

  return [
    new Date().toISOString().split('T')[0], // DATA (only date part)
    leadData.id.toString(), // ID LEAD
    leadData.name, // NOME
    leadData.phone, // NUMERO
    sources[leadData.how_did_you_hear] || leadData.how_did_you_hear, // ONDE VEIO
    propertyTypes[leadData.property_type] || leadData.property_type, // TIPO RESIDENCIA
    propertyValues[leadData.property_value] || leadData.property_value, // VALOR ESTIMADO PROPRIEDADE
    budgetRanges[leadData.budget_range] || leadData.budget_range, // ORÇAMENTO
    leadData.recommended_plan // PLANO RECOMENDADO
  ];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('📊 Iniciando envio para Google Sheets...');

    // Get the service account credentials from environment
    const serviceAccountB64 = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_BASE64');
    if (!serviceAccountB64) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_BASE64 não encontrado nas variáveis de ambiente');
    }

    console.log('🔑 Decodificando credenciais da service account...');
    
    // Clean and validate Base64 string
    const cleanedBase64 = serviceAccountB64
      .trim()                    // Remove leading/trailing whitespace
      .replace(/\s+/g, '')       // Remove all whitespace characters
      .replace(/\n|\r/g, '');    // Remove newlines
    
    console.log(`📏 Comprimento da string Base64: ${cleanedBase64.length}`);
    console.log(`🔤 Primeiros 20 caracteres: ${cleanedBase64.substring(0, 20)}...`);
    
    // Validate Base64 format
    const base64Regex = /^[A-Za-z0-9+/]*={0,2}$/;
    if (!base64Regex.test(cleanedBase64)) {
      throw new Error('Formato Base64 inválido: contém caracteres não permitidos');
    }
    
    if (cleanedBase64.length === 0) {
      throw new Error('String Base64 está vazia após limpeza');
    }

    // Decode the base64 service account
    let serviceAccountJson: string;
    let serviceAccount: any;
    
    try {
      serviceAccountJson = atob(cleanedBase64);
      console.log('✅ Base64 decodificado com sucesso');
      console.log(`📄 Tamanho do JSON decodificado: ${serviceAccountJson.length} caracteres`);
    } catch (error) {
      console.error('❌ Erro ao decodificar Base64:', error);
      console.error(`🔍 String Base64 problemática (primeiros 50 chars): ${cleanedBase64.substring(0, 50)}`);
      throw new Error(`Erro na decodificação Base64: ${error.message}. Verifique se o secret está correto.`);
    }

    try {
      serviceAccount = JSON.parse(serviceAccountJson);
      console.log('✅ JSON da service account parseado com sucesso');
      
      // Validate required fields
      if (!serviceAccount.client_email || !serviceAccount.private_key) {
        throw new Error('Service account inválida: falta client_email ou private_key');
      }
    } catch (error) {
      console.error('❌ Erro ao parsear JSON da service account:', error);
      throw new Error(`Erro no JSON da service account: ${error.message}`);
    }

    // Get lead data from request
    const leadData: LeadData = await req.json();
    console.log('📋 Dados do lead recebidos:', { id: leadData.id, name: leadData.name });

    // Get access token
    console.log('🔐 Obtendo token de acesso do Google...');
    const accessToken = await getAccessToken(serviceAccount);

    // Format data for Google Sheets
    const formattedData = formatLeadData(leadData);
    console.log('📝 Dados formatados para planilha:', formattedData);

    // Google Sheets API configuration
    const spreadsheetId = '1SYAMD8C-D7zxiucTh49GmkEK33UHnEBp4aPp-dh_qZU';
    const range = 'Folha1!A:I'; // Columns A to I

    // Send data to Google Sheets
    console.log('📤 Enviando dados para Google Sheets...');
    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [formattedData],
        }),
      }
    );

    if (!sheetsResponse.ok) {
      const errorData = await sheetsResponse.text();
      console.error('❌ Erro na API do Google Sheets:', errorData);
      throw new Error(`Google Sheets API error: ${sheetsResponse.status} - ${errorData}`);
    }

    const sheetsData = await sheetsResponse.json();
    console.log('✅ Lead enviado para Google Sheets com sucesso!', sheetsData);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Lead enviado para Google Sheets com sucesso',
      updatedRange: sheetsData.updates?.updatedRange 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('❌ Erro ao enviar para Google Sheets:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});