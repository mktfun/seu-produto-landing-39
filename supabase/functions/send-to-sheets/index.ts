// supabase/functions/send-to-sheets/index.ts
// CÓDIGO DE TESTE DE SANIDADE. APAGUE TUDO E COLE ISSO.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  console.log("--- INICIANDO TESTE DE SANIDADE DO SEGREDO ---");

  // A única coisa que este código faz é tentar ler o segredo.
  const secret = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_BASE64');

  if (secret && secret.length > 200) {
    // Se o segredo existir e tiver um tamanho razoável...
    console.log("✅ SUCESSO! O segredo foi encontrado.");
    console.log(`Tamanho do segredo: ${secret.length} caracteres.`);
    
    return new Response(JSON.stringify({
      status: "SUCESSO",
      message: "O segredo GOOGLE_SERVICE_ACCOUNT_BASE64 foi lido com sucesso pela função.",
      length: secret.length,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } else {
    // Se o segredo não for encontrado ou estiver vazio...
    console.error("❌ FALHA CRÍTICA! O segredo GOOGLE_SERVICE_ACCOUNT_BASE64 não foi encontrado ou está vazio.");
    
    return new Response(JSON.stringify({
      status: "FALHA",
      message: "O segredo GOOGLE_SERVICE_ACCOUNT_BASE64 não foi encontrado ou está vazio. Verifique o nome e o valor no painel do Supabase. O nome tem que ser EXATAMENTE esse.",
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});