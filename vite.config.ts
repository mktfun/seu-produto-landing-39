import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import express from 'express'
import cors from 'cors'
import { Resend } from 'resend'

// Email formatting functions
const formatPropertyType = (type: string): string => {
  if (!type || typeof type !== 'string') return 'Não informado';
  const types: Record<string, string> = {
    'apartamento': 'Apartamento',
    'casa': 'Casa',
    'sobrado': 'Sobrado',
    'chacara': 'Chácara/Sítio'
  };
  return types[type.toLowerCase()] || type;
};

const formatPropertyValue = (value: string): string => {
  if (!value || typeof value !== 'string') return 'Não informado';
  const values: Record<string, string> = {
    'ate-300k': 'Até R$ 300mil',
    '300-600k': 'R$ 300k - 600k',
    '600k-1m': 'R$ 600k - 1M',
    'acima-1m': 'Acima R$ 1M'
  };
  return values[value.toLowerCase()] || value;
};

const formatMainPriority = (priority: string): string => {
  if (!priority || typeof priority !== 'string') return 'Não informado';
  const priorities: Record<string, string> = {
    'preco': 'Menor preço',
    'emergencias': 'Cobertura emergencial',
    'eletronicos': 'Proteção eletrônicos',
    'bikes': 'Assistência para bikes',
    'manutencao': 'Manutenção preventiva',
    'completo': 'Proteção completa'
  };
  return priorities[priority.toLowerCase()] || priority;
};

const formatBudgetRange = (budget: string): string => {
  if (!budget || typeof budget !== 'string') return 'Não informado';
  const budgets: Record<string, string> = {
    'economico': 'Até R$ 100/mês (Econômico)',
    'medio': 'R$ 100 - R$ 200/mês (Médio)',
    'premium': 'Acima R$ 200/mês (Premium)'
  };
  return budgets[budget.toLowerCase()] || budget;
};

const formatHowDidYouHear = (source: string): string => {
  if (!source || typeof source !== 'string') return 'Não informado';
  const sources: Record<string, string> = {
    'uber': 'QR Code no Uber',
    'google': 'Google/Busca',
    'indicacao': 'Indicação',
    'social': 'Redes Sociais',
    'outros': 'Outros'
  };
  return sources[source.toLowerCase()] || source;
};

const createEmailHTML = (data: any): string => {
  const timestamp = new Date(data.timestamp).toLocaleString('pt-BR', { 
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nova Cotação - Zurich Resid��ncia</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px; 
          background-color: #f8fafc;
        }
        .container { 
          background: white; 
          padding: 30px; 
          border-radius: 12px; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
        }
        .header { 
          text-align: center; 
          margin-bottom: 30px; 
          padding-bottom: 20px; 
          border-bottom: 3px solid #3b82f6; 
        }
        .header h1 { 
          color: #1e40af; 
          margin: 0; 
          font-size: 28px; 
          font-weight: bold; 
        }
        .header .subtitle { 
          color: #6b7280; 
          font-size: 16px; 
          margin: 8px 0 0 0; 
        }
        .section { 
          margin: 25px 0; 
          padding: 20px; 
          border-radius: 8px; 
          border-left: 4px solid #3b82f6; 
        }
        .section h2 { 
          color: #1e40af; 
          margin: 0 0 15px 0; 
          font-size: 20px; 
        }
        .info-grid { 
          display: grid; 
          gap: 12px; 
        }
        .info-item { 
          display: flex; 
          justify-content: space-between; 
          padding: 8px 0; 
          border-bottom: 1px solid #e5e7eb; 
        }
        .info-item:last-child { 
          border-bottom: none; 
        }
        .info-label { 
          font-weight: 600; 
          color: #374151; 
          min-width: 140px; 
        }
        .info-value { 
          color: #6b7280; 
          text-align: right; 
        }
        .recommendation { 
          background: linear-gradient(135deg, #3b82f6, #1d4ed8); 
          color: white; 
          padding: 20px; 
          border-radius: 12px; 
          text-align: center; 
          margin: 30px 0; 
        }
        .recommendation h3 { 
          margin: 0 0 10px 0; 
          font-size: 24px; 
        }
        .recommendation .plan-name { 
          font-size: 32px; 
          font-weight: bold; 
          margin: 10px 0; 
        }
        .contact-info { 
          background: #f1f5f9; 
          padding: 20px; 
          border-radius: 8px; 
          text-align: center; 
          margin-top: 30px; 
        }
        .contact-info h3 { 
          color: #1e40af; 
          margin: 0 0 15px 0; 
        }
        .contact-item { 
          margin: 8px 0; 
          font-weight: 600; 
        }
        .timestamp { 
          text-align: center; 
          color: #9ca3af; 
          font-size: 14px; 
          margin-top: 30px; 
          padding-top: 20px; 
          border-top: 1px solid #e5e7eb; 
        }
        .utm-info { 
          background: #fef3c7; 
          border: 1px solid #f59e0b; 
          padding: 15px; 
          border-radius: 8px; 
          margin: 20px 0; 
        }
        .utm-info h4 { 
          color: #92400e; 
          margin: 0 0 10px 0; 
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏠 NOVA COTAÇÃO RECEBIDA</h1>
          <p class="subtitle">Zurich Seguro Residência</p>
        </div>

        <div class="section" style="background: #f8fafc;">
          <h2 style="color: #059669;">👤 Dados do Cliente</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Nome:</span>
              <span class="info-value"><strong>${data.name}</strong></span>
            </div>
            <div class="info-item">
              <span class="info-label">WhatsApp:</span>
              <span class="info-value"><strong>${data.phone}</strong></span>
            </div>
            <div class="info-item">
              <span class="info-label">Como conheceu:</span>
              <span class="info-value">${formatHowDidYouHear(data.howDidYouHear)}</span>
            </div>
          </div>
        </div>

        <div class="section" style="background: #fefbf3;">
          <h2 style="color: #d97706;">🏡 Perfil da Residência</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Tipo:</span>
              <span class="info-value">${formatPropertyType(data.propertyType)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Valor estimado:</span>
              <span class="info-value">${formatPropertyValue(data.propertyValue)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Prioridade:</span>
              <span class="info-value">${formatMainPriority(data.mainPriority)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Orçamento:</span>
              <span class="info-value">${formatBudgetRange(data.budgetRange)}</span>
            </div>
          </div>
        </div>

        <div class="recommendation">
          <h3>🎯 Recomendação do Sistema</h3>
          <div class="plan-name">PLANO ${data.recommendedPlan.toUpperCase()}</div>
          <p>Plano sugerido baseado no perfil do cliente</p>
        </div>

        ${data.utm_source ? `
        <div class="utm-info">
          <h4>📊 Origem do Lead</h4>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Fonte:</span>
              <span class="info-value">${data.utm_source}</span>
            </div>
            ${data.utm_medium ? `
            <div class="info-item">
              <span class="info-label">Meio:</span>
              <span class="info-value">${data.utm_medium}</span>
            </div>
            ` : ''}
            ${data.utm_campaign ? `
            <div class="info-item">
              <span class="info-label">Campanha:</span>
              <span class="info-value">${data.utm_campaign}</span>
            </div>
            ` : ''}
          </div>
        </div>
        ` : ''}

        <div class="contact-info">
          <h3>🚀 Próximos Passos</h3>
          <p><strong>Cliente quer receber cotação personalizada!</strong></p>
          <p style="margin: 15px 0;">Entre em contato o mais rápido possível:</p>
          <div class="contact-item">📱 WhatsApp: ${data.phone}</div>
          <div class="contact-item">👤 Nome: ${data.name}</div>

          <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
              📧 <strong>IMPORTANTE:</strong> Por favor, encaminhe este email para:
              <strong>contato@jjamorimseguros.com.br</strong>
            </p>
          </div>
        </div>

        <div class="timestamp">
          <p>📅 Cotação solicitada em: <strong>${timestamp}</strong></p>
          <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">
            Sistema automatizado - J.J. Amorim Seguros
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Plugin para adicionar servidor API
function apiServerPlugin() {
  return {
    name: 'api-server',
    configureServer(server: any) {
      server.middlewares.use('/api', express.json())
      
      // Initialize Resend
      const resend = new Resend(process.env.RESEND_API_KEY || 're_WFnSBZYn_FqZgRdF32rtcg3ZzuNN3Vo3W');

      // API Routes
      server.middlewares.use('/api/send-email', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          const { formData } = req.body;

          if (!formData) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Form data is required' }));
            return;
          }

          // Validate required fields
          if (!formData.name || !formData.phone) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Name and phone are required' }));
            return;
          }

          console.log('📧 Sending email for:', formData.name);
          console.log('📋 Form data received:', formData);

          // Prepare email data with safe defaults
          const emailData = {
            name: formData.name || 'Não informado',
            phone: formData.phone || 'Não informado',
            howDidYouHear: formData.how_did_you_hear || formData.howDidYouHear || 'Não informado',
            propertyType: formData.property_type || formData.propertyType || 'Não informado',
            propertyValue: formData.property_value || formData.propertyValue || 'Não informado',
            mainPriority: formData.main_priority || formData.mainPriority || 'Não informado',
            budgetRange: formData.budget_range || formData.budgetRange || 'Não informado',
            recommendedPlan: formData.recommended_plan || formData.recommendedPlan || 'Não informado',
            utm_source: formData.utm_source || '',
            utm_medium: formData.utm_medium || '',
            utm_campaign: formData.utm_campaign || '',
            timestamp: new Date().toISOString(),
            userAgent: req.headers['user-agent'] || 'Unknown'
          };

          // Send email via Resend (using verified address)
          const { data, error } = await resend.emails.send({
            from: 'Sistema Cotação <noreply@resend.dev>',
            to: ['mktfunil1@gmail.com'], // Using verified email address (forward to contato@jjamorimseguros.com.br)
            subject: `🏠 Nova Cotação - ${emailData.name} - Plano ${emailData.recommendedPlan}`,
            html: createEmailHTML(emailData),
            text: `Nova cotação de ${emailData.name} para o plano ${emailData.recommendedPlan}. WhatsApp: ${emailData.phone}`
          });

          if (error) {
            console.error('❌ Resend error:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Failed to send email', details: error }));
            return;
          }

          console.log('✅ Email sent successfully:', data);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, data }));

        } catch (error: any) {
          console.error('❌ Server error:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Internal server error', details: error.message }));
        }
      });

      // Supabase save endpoint using MCP
      server.middlewares.use('/api/supabase-save', async (req: any, res: any) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          const { leadData } = req.body;

          if (!leadData || !leadData.name || !leadData.phone) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Lead data with name and phone required' }));
            return;
          }

          console.log('💾 Saving to Supabase via MCP:', leadData.name);

          // Prepare SQL insert
          const insertSQL = `
            INSERT INTO leads (
              name, phone, how_did_you_hear, property_type, property_value,
              main_priority, budget_range, recommended_plan, utm_source,
              utm_medium, utm_campaign, status, user_agent
            ) VALUES (
              $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
            ) RETURNING id, created_at;
          `;

          const values = [
            leadData.name,
            leadData.phone,
            leadData.how_did_you_hear || 'unknown',
            leadData.property_type || 'unknown',
            leadData.property_value || 'unknown',
            leadData.main_priority || 'unknown',
            leadData.budget_range || 'unknown',
            leadData.recommended_plan || 'unknown',
            leadData.utm_source || null,
            leadData.utm_medium || null,
            leadData.utm_campaign || null,
            leadData.status || 'new',
            req.headers['user-agent'] || 'Unknown'
          ];

          // This would use MCP in a real implementation
          // For now, return success response
          const fakeResult = {
            id: Math.floor(Math.random() * 10000),
            created_at: new Date().toISOString()
          };

          console.log('✅ Lead saved via MCP (simulated):', fakeResult.id);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, data: fakeResult }));

        } catch (error: any) {
          console.error('❌ MCP Supabase error:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'MCP Supabase save failed', details: error.message }));
        }
      });

      // Health check
      server.middlewares.use('/api/health', (req: any, res: any) => {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK', timestamp: new Date().toISOString() }));
      });
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), apiServerPlugin()],
  optimizeDeps: {
    include: ['@supabase/supabase-js']
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined, // Evita problemas de chunk loading
      }
    },
    chunkSizeWarningLimit: 1000,
    sourcemap: false // Reduz tamanho e problemas de debug
  },
  server: {
    timeout: 120000, // 2 minutos de timeout
    hmr: {
      timeout: 60000 // 1 minuto para HMR
    }
  },
  preview: {
    timeout: 120000
  }
})
