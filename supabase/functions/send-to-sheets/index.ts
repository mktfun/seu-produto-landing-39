// RESET TOTAL - NOVA FUNÇÃO COMPLETAMENTE DIFERENTE
// Esta é uma versão totalmente nova para forçar o Supabase a recriar o ambiente

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  console.log("🚀 RESET TOTAL - AMBIENTE COMPLETAMENTE NOVO 🚀");
  console.log("🔄 Verificando status dos secrets após reset...");

  try {
    // Listar todos os env vars disponíveis (sem mostrar valores)
    const envVars = Object.keys(Deno.env.toObject());
    console.log("📋 Environment vars disponíveis:", envVars);

    // Verificar se o secret específico existe
    const secret = Deno.env.get('GOOGLE_SERVICE_ACCOUNT_BASE64');
    
    if (secret) {
      console.log("✅ SECRET ENCONTRADO!");
      console.log(`📏 Tamanho: ${secret.length} caracteres`);
      console.log(`🔤 Primeiros 50 chars: ${secret.substring(0, 50)}...`);
      
      // Tentar fazer parse do JSON - primeiro JSON direto, depois base64
      let parsed;
      try {
        // Primeiro tenta como JSON direto
        parsed = JSON.parse(secret);
        console.log("✅ Secret lido como JSON direto!");
      } catch (jsonError) {
        try {
          // Se falhar, tenta decodificar base64 primeiro
          const decoded = atob(secret);
          parsed = JSON.parse(decoded);
          console.log("✅ Secret lido como base64 + JSON!");
        } catch (base64Error) {
          throw new Error(`Falha ao fazer parse do secret: JSON direto: ${jsonError.message}, Base64: ${base64Error.message}`);
        }
      }
      
      console.log("🔑 Tipo de chave:", parsed.type);
      console.log("📧 Client email:", parsed.client_email);
        
        return new Response(JSON.stringify({
          success: true,
          message: "Secret funcionando perfeitamente!",
          secretLength: secret.length,
          keyType: parsed.type,
          clientEmail: parsed.client_email
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        });
        
      } catch (parseError) {
        console.error("❌ Erro ao fazer parse do secret:", parseError);
        return new Response(JSON.stringify({
          success: false,
          message: "Secret existe mas não é um JSON válido",
          error: parseError.message
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }
      
    } else {
      console.error("❌ SECRET NÃO ENCONTRADO!");
      return new Response(JSON.stringify({
        success: false,
        message: "GOOGLE_SERVICE_ACCOUNT_BASE64 não foi encontrado",
        availableVars: envVars
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404,
      });
    }
    
  } catch (error) {
    console.error("💥 Erro geral:", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Erro interno da função",
      error: error.message
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});