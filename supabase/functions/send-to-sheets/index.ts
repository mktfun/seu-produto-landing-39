import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface LeadData {
  id?: number;
  name: string;
  phone: string;
  property_type: string;
  property_value: string;
  main_priority: string;
  budget_range: string;
  how_did_you_hear: string;
  recommended_plan: string;
  utm_source?: string;
  utm_medium?: string;
  timestamp?: string;
}

// FUNÇÃO MANUAL DE JWT - AGORA FUNCIONAL
async function createJWT(serviceAccount: any) {
  const header = { alg: "RS256", typ: "JWT" };
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

  // Importar a chave privada
  const privateKeyPEM = serviceAccount.private_key
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, ''); // Remove todos os espaços e quebras de linha

  const privateKeyDer = atob(privateKeyPEM);
  const keyBuffer = new Uint8Array(privateKeyDer.length).map((_, i) => privateKeyDer.charCodeAt(i));

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyBuffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', cryptoKey, encoder.encode(message));
  const signatureB64 = btoa(String.fromCharCode(...new Uint8Array(signature))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${message}.${signatureB64}`;
}

async function getAccessToken(serviceAccount: any) {
  const jwt = await createJWT(serviceAccount);
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
  });
  
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Erro ao obter access token: ${response.status} - ${errorBody}`);
  }
  
  const data = await response.json();
  return data.access_token;
}

// Função para mapear os dados para o formato da planilha
function formatLeadData(leadData: LeadData): string[] {
  const propertyTypes: Record<string, string> = {
    'apartamento': 'Apartamento',
    'casa': 'Casa',
    'sobrado': 'Sobrado',
    'chacara': 'Chácara/Sítio'
  };

  const propertyValues: Record<string, string> = {
    'ate-300k': 'Até R$ 300mil',
    '300-600k': 'R$ 300k - 600k',
    '600k-1m': 'R$ 600k - 1M',
    'acima-1m': 'Acima R$ 1M'
  };

  const priorities: Record<string, string> = {
    'preco': 'Menor preço',
    'emergencias': 'Cobertura emergencial',
    'eletronicos': 'Proteção eletrônicos',
    'bikes': 'Assistência para bikes',
    'manutencao': 'Manutenção preventiva',
    'completo': 'Proteção completa'
  };

  const budgetRanges: Record<string, string> = {
    'economico': 'Até R$ 100/mês (Econômico)',
    'medio': 'R$ 100 - R$ 200/mês (Médio)',
    'premium': 'Acima R$ 200/mês (Premium)'
  };

  const sources: Record<string, string> = {
    'uber': 'QR Code no Uber',
    'google': 'Google/Busca',
    'indicacao': 'Indicação',
    'social': 'Redes Sociais',
    'outros': 'Outros'
  };

  return [
    new Date().toISOString().split('T')[0], // Data (YYYY-MM-DD)
    leadData.id?.toString() || 'N/A', // ID do Lead
    leadData.name || '', // Nome
    leadData.phone || '', // Telefone
    sources[leadData.how_did_you_hear] || leadData.how_did_you_hear, // Como Conheceu
    propertyTypes[leadData.property_type] || leadData.property_type, // Tipo de Imóvel
    propertyValues[leadData.property_value] || leadData.property_value, // Valor do Imóvel
    priorities[leadData.main_priority] || leadData.main_priority, // Prioridade Principal
    budgetRanges[leadData.budget_range] || leadData.budget_range, // Faixa de Orçamento
    leadData.recommended_plan || '', // Plano Recomendado
    leadData.utm_source || '', // UTM Source
    leadData.utm_medium || '', // UTM Medium
    leadData.timestamp || new Date().toLocaleString('pt-BR') // Timestamp
  ];
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    console.log('📊 Iniciando envio para Google Sheets (versão manual com regex)...');
    
    const serviceAccountB64 = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_BASE64');
    if (!serviceAccountB64) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_BASE64 não encontrado.');
    }
    
    const serviceAccountJson = atob(serviceAccountB64.trim());

    // A MÁGICA ESTÁ AQUI. REGEX PARA EXTRAIR SÓ O QUE PRECISAMOS
    const client_email_match = serviceAccountJson.match(/"client_email":\s*"([^"]+)"/);
    const private_key_match = serviceAccountJson.match(/"private_key":\s*"([^"]+)"/);

    if (!client_email_match || !private_key_match) {
        throw new Error("Não foi possível extrair client_email ou private_key do JSON.");
    }

    const serviceAccount = {
        client_email: client_email_match[1],
        private_key: private_key_match[1].replace(/\\n/g, '\n') // Troca o texto '\\n' pela quebra de linha real
    };

    console.log("✅ Credenciais extraídas com sucesso!");
    
    const accessToken = await getAccessToken(serviceAccount);
    console.log("✅ Token de acesso obtido com sucesso!");

    const leadData: LeadData = await req.json();
    console.log('📋 Dados do lead recebidos:', leadData.name);
    
    const formattedData = formatLeadData(leadData);
    console.log('📝 Dados formatados para planilha');

    const spreadsheetId = '1SYAMD8C-D7zxiucTh49GmkEK33UHnEBp4aPp-dh_qZU';
    const range = 'Folha1!A1';

    console.log('📤 Enviando dados para Google Sheets...');
    const sheetsResponse = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: [formattedData] }),
    });

    if (!sheetsResponse.ok) {
      const errorText = await sheetsResponse.text();
      console.error('❌ Erro da API do Google Sheets:', errorText);
      throw new Error(`Erro da API do Google Sheets: ${sheetsResponse.status} - ${errorText}`);
    }

    const responseData = await sheetsResponse.json();
    console.log('✅ Sucesso! Dados adicionados à planilha:', responseData.updates?.updatedCells || 'N/A', 'células');

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Lead adicionado com sucesso ao Google Sheets!',
      response: responseData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error) {
    console.error('❌ Erro final na função:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});