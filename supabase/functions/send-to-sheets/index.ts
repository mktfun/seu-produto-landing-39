import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { GoogleAuth } from "https://esm.sh/google-auth-library@9.11.0";

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
    console.log('📊 Iniciando envio para Google Sheets (versão com biblioteca oficial)...');
    
    // 1. Pegar e decodificar a credencial
    const serviceAccountB64 = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_BASE64');
    if (!serviceAccountB64) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_BASE64 não encontrado nos secrets');
    }

    console.log('🔑 Decodificando credenciais da service account...');
    const serviceAccountJson = atob(serviceAccountB64.trim());
    const serviceAccount = JSON.parse(serviceAccountJson);

    if (!serviceAccount.client_email || !serviceAccount.private_key) {
      throw new Error('Credenciais inválidas: client_email ou private_key ausentes');
    }

    // 2. Autenticação com a biblioteca oficial do Google
    console.log('🔐 Autenticando com GoogleAuth...');
    const auth = new GoogleAuth({
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const authToken = await auth.getAccessToken();
    console.log('✅ Token de acesso obtido com sucesso!');

    // 3. Preparar e enviar os dados
    const leadData: LeadData = await req.json();
    console.log('📋 Dados do lead recebidos:', leadData.name);

    const formattedData = formatLeadData(leadData);
    console.log('📝 Dados formatados para planilha');

    const spreadsheetId = '1SYAMD8C-D7zxiucTh49GmkEK33UHnEBp4aPp-dh_qZU';
    const range = 'Folha1!A1';

    console.log('📤 Enviando dados para Google Sheets...');
    const sheetsResponse = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          values: [formattedData],
        }),
      }
    );

    if (!sheetsResponse.ok) {
      const errorText = await sheetsResponse.text();
      console.error('❌ Erro da API do Google Sheets:', errorText);
      throw new Error(`Erro da API do Google Sheets: ${sheetsResponse.status} - ${errorText}`);
    }

    const responseData = await sheetsResponse.json();
    console.log('✅ Sucesso! Dados adicionados à planilha:', responseData.updates?.updatedCells || 'N/A', 'células');

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Lead adicionado com sucesso ao Google Sheets!',
        updatedCells: responseData.updates?.updatedCells 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('❌ Erro na função send-to-sheets:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        details: 'Verifique os logs da função para mais detalhes' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});