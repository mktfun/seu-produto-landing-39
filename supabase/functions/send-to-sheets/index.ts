import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Google Sheets configuration
const SHEET_ID = '1SYAMD8C-D7zxiucTh49GmkEK33UHnEBp4aPp-dh_qZU';
const SHEET_RANGE = 'Folha1!A:J';

// Create JWT token for Google API authentication
async function createJWT(serviceAccount: any) {
  const header = {
    alg: 'RS256',
    typ: 'JWT'
  };

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600, // 1 hour
    iat: now
  };

  const encodedHeader = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const encodedPayload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  
  // Process private key - remove PEM headers and convert to binary
  let privateKeyPem = serviceAccount.private_key;
  
  // Remove PEM headers and whitespace
  privateKeyPem = privateKeyPem
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\s/g, '');
  
  // Convert base64 to binary
  const privateKeyBinary = Uint8Array.from(atob(privateKeyPem), c => c.charCodeAt(0));
  
  console.log("🔑 Processando chave privada...");
  
  // Import private key
  const privateKey = await crypto.subtle.importKey(
    'pkcs8',
    privateKeyBinary,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
  
  // Sign the JWT
  const signature = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    privateKey,
    new TextEncoder().encode(signatureInput)
  );
  
  const encodedSignature = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  
  return `${signatureInput}.${encodedSignature}`;
}

// Get access token from Google
async function getAccessToken(jwt: string) {
  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to get access token: ${response.statusText}`);
  }

  const data = await response.json();
  return data.access_token;
}

// Append data to Google Sheets
async function appendToSheet(accessToken: string, values: any[][]) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_RANGE}:append?valueInputOption=RAW`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: values,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to append to sheet: ${response.statusText} - ${errorText}`);
  }

  return await response.json();
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  console.log("🚀 Iniciando integração com Google Sheets");

  try {
    // Get the service account secret
    const secret = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_BASE64');
    
    if (!secret) {
      console.error("❌ SECRET NÃO ENCONTRADO!");
      return new Response(JSON.stringify({
        success: false,
        message: "GOOGLE_SERVICE_ACCOUNT_BASE64 não foi encontrado"
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      });
    }

    // Parse service account credentials
    let serviceAccount;
    try {
      // First try as direct JSON
      serviceAccount = JSON.parse(secret);
      console.log("✅ Secret lido como JSON direto!");
    } catch (jsonError) {
      try {
        // If that fails, try decoding base64 first
        const decoded = atob(secret);
        serviceAccount = JSON.parse(decoded);
        console.log("✅ Secret lido como base64 + JSON!");
      } catch (base64Error) {
        throw new Error(`Falha ao fazer parse do secret: JSON direto: ${jsonError.message}, Base64: ${base64Error.message}`);
      }
    }

    console.log("🔑 Service Account Email:", serviceAccount.client_email);

    // Get lead data from request body
    const leadData = await req.json();
    console.log("📋 Dados do lead recebidos:", leadData);

    // Create JWT token
    console.log("🔐 Criando JWT token...");
    const jwt = await createJWT(serviceAccount);
    
    // Get access token
    console.log("🎫 Obtendo access token...");
    const accessToken = await getAccessToken(jwt);
    
    // Prepare data for Google Sheets
    const currentDate = new Date().toLocaleString('pt-BR', { 
      timeZone: 'America/Sao_Paulo' 
    });
    
    const sheetRow = [
      leadData.id || '',
      leadData.name || '',
      leadData.phone || '',
      leadData.how_did_you_hear || '',
      leadData.property_type || '',
      leadData.property_value || '',
      leadData.main_priority || '',
      leadData.budget_range || '',
      leadData.recommended_plan || '',
      currentDate
    ];

    console.log("📊 Dados formatados para o Sheets:", sheetRow);

    // Append to Google Sheets
    console.log("📤 Enviando dados para Google Sheets...");
    const result = await appendToSheet(accessToken, [sheetRow]);
    
    console.log("✅ Dados inseridos com sucesso no Google Sheets!");
    console.log("📋 Resultado:", result);

    return new Response(JSON.stringify({
      success: true,
      message: "Dados enviados para Google Sheets com sucesso!",
      sheetResult: result,
      insertedRow: sheetRow
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
    
  } catch (error) {
    console.error("💥 Erro ao enviar para Google Sheets:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Erro ao enviar dados para Google Sheets",
      error: error.message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});