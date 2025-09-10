import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteEmailRequest {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  propertyValue: string;
  mainPriority: string;
  budgetRange: string;
  howDidYouHear: string;
  recommendedPlan: string;
  utmSource?: string;
  utmMedium?: string;
  leadId?: number;
  timestamp?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("📨 Recebendo solicitação de envio de email...");
    
    const data: QuoteEmailRequest = await req.json();
    console.log("📋 Dados recebidos:", JSON.stringify(data, null, 2));

    // Função para formatar valores legíveis
    const formatPropertyType = (type: string) => {
      const types: { [key: string]: string } = {
        'apartamento': 'Apartamento',
        'casa': 'Casa',
        'sobrado': 'Sobrado',
        'chacara': 'Chácara/Sítio'
      };
      return types[type] || type;
    };

    const formatPropertyValue = (value: string) => {
      const values: { [key: string]: string } = {
        'ate-300k': 'Até R$ 300mil',
        '300-600k': 'R$ 300k - 600k',
        '600k-1m': 'R$ 600k - 1M',
        'acima-1m': 'Acima R$ 1M'
      };
      return values[value] || value;
    };

    const formatPriority = (priority: string) => {
      const priorities: { [key: string]: string } = {
        'preco': 'Menor preço',
        'emergencias': 'Cobertura emergencial',
        'eletronicos': 'Proteção eletrônicos',
        'bikes': 'Assistência para bikes',
        'manutencao': 'Manutenção preventiva',
        'completo': 'Proteção completa'
      };
      return priorities[priority] || priority;
    };

    const formatBudget = (budget: string) => {
      const budgets: { [key: string]: string } = {
        'economico': 'Até R$ 100/mês (Econômico)',
        'medio': 'R$ 100 - R$ 200/mês (Médio)',
        'premium': 'Acima R$ 200/mês (Premium)'
      };
      return budgets[budget] || budget;
    };

    const formatHowDidYouHear = (source: string) => {
      const sources: { [key: string]: string } = {
        'uber': 'QR Code no Uber',
        'google': 'Google/Busca',
        'indicacao': 'Indicação',
        'social': 'Redes Sociais',
        'outros': 'Outros'
      };
      return sources[source] || source;
    };

    // Criar conteúdo HTML do email
    const emailHTML = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nova Cotação - Zurich Residência</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: bold; }
          .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
          .section { margin-bottom: 25px; }
          .section h2 { color: #1e40af; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #e5e7eb; padding-bottom: 8px; }
          .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 8px; background: #f9fafb; border-radius: 6px; }
          .label { font-weight: bold; color: #374151; }
          .value { color: #1f2937; }
          .recommendation { background: linear-gradient(135deg, #dcfce7, #bbf7d0); padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; }
          .recommendation h3 { color: #065f46; margin: 0 0 10px 0; }
          .footer { background: #f3f4f6; padding: 20px; border-radius: 0 0 12px 12px; text-align: center; font-size: 14px; color: #6b7280; }
          .cta-button { background: #1e40af; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold; margin: 15px 0; }
          .whatsapp-button { background: #25d366; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: bold; margin: 10px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🏠 NOVA COTAÇÃO</h1>
          <p style="margin: 10px 0 0 0; font-size: 18px;">Zurich Residência</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2>👤 DADOS DO CLIENTE</h2>
            <div class="info-row">
              <span class="label">Nome:</span>
              <span class="value">${data.name}</span>
            </div>
            <div class="info-row">
              <span class="label">Email:</span>
              <span class="value">${data.email}</span>
            </div>
            <div class="info-row">
              <span class="label">WhatsApp:</span>
              <span class="value">${data.phone}</span>
            </div>
            <div class="info-row">
              <span class="label">Como conheceu:</span>
              <span class="value">${formatHowDidYouHear(data.howDidYouHear)}</span>
            </div>
          </div>

          <div class="section">
            <h2>🏡 PERFIL DA RESIDÊNCIA</h2>
            <div class="info-row">
              <span class="label">Tipo:</span>
              <span class="value">${formatPropertyType(data.propertyType)}</span>
            </div>
            <div class="info-row">
              <span class="label">Valor estimado:</span>
              <span class="value">${formatPropertyValue(data.propertyValue)}</span>
            </div>
            <div class="info-row">
              <span class="label">Prioridade principal:</span>
              <span class="value">${formatPriority(data.mainPriority)}</span>
            </div>
            <div class="info-row">
              <span class="label">Orçamento mensal:</span>
              <span class="value">${formatBudget(data.budgetRange)}</span>
            </div>
          </div>

          <div class="section">
            <div class="recommendation">
              <h3>🎯 RECOMENDAÇÃO DO SISTEMA</h3>
              <p><strong>Plano sugerido: ${data.recommendedPlan}</strong></p>
              <p>✅ Cliente quer receber cotação personalizada!</p>
            </div>
          </div>

          ${data.utmSource ? `
          <div class="section">
            <h2>📊 ORIGEM DA CAMPANHA</h2>
            <div class="info-row">
              <span class="label">Fonte:</span>
              <span class="value">${data.utmSource}${data.utmMedium ? ` (${data.utmMedium})` : ''}</span>
            </div>
          </div>
          ` : ''}

          <div class="section">
            <h2>📞 PRÓXIMOS PASSOS</h2>
            <p>Entre em contato com o cliente para enviar uma cotação personalizada:</p>
            <div style="text-align: center;">
              <a href="https://wa.me/55${data.phone.replace(/\D/g, '')}" class="whatsapp-button">
                💬 Abrir WhatsApp
              </a>
            </div>
          </div>

          <div class="section">
            <h2>📊 DADOS TÉCNICOS</h2>
            ${data.leadId ? `
            <div class="info-row">
              <span class="label">ID do Lead:</span>
              <span class="value">#${data.leadId}</span>
            </div>
            ` : ''}
            <div class="info-row">
              <span class="label">Data/Hora:</span>
              <span class="value">${data.timestamp || new Date().toLocaleString('pt-BR')}</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p><strong>Enviado automaticamente pelo sistema de cotação</strong></p>
          <p>J.J. Amorim Seguros</p>
        </div>
      </body>
      </html>
    `;

    console.log("📧 Enviando email...");

    const emailResponse = await resend.emails.send({
      from: "Sistema Cotação <noreply@resend.dev>",
      to: ["mktfunil1@gmail.com"],
      subject: `🏠 Nova Cotação - ${data.name} - Plano ${data.recommendedPlan}`,
      html: emailHTML,
    });

    console.log("✅ Email enviado com sucesso:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      message: "Email enviado com sucesso!"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("❌ Erro ao enviar email:", error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message || "Erro interno no servidor",
        details: error
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);