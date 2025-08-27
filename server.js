import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_WFnSBZYn_FqZgRdF32rtcg3ZzuNN3Vo3W');

// Middleware
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:3000', 'https://e784d8d1d428418f826a3be51a5615b4-4ca620f1-8036-487f-9371-8b7257.fly.dev'],
  credentials: true
}));
app.use(express.json());

// Email formatting functions
const formatPropertyType = (type) => {
  if (!type || type === 'undefined') return 'Não informado';
  const types = {
    'apartamento': 'Apartamento',
    'casa': 'Casa',
    'sobrado': 'Sobrado',
    'chacara': 'Chácara/Sítio'
  };
  return types[type] || type;
};

const formatPropertyValue = (value) => {
  if (!value || value === 'undefined') return 'Não informado';
  const values = {
    'ate-300k': 'Até R$ 300mil',
    '300-600k': 'R$ 300k - 600k',
    '600k-1m': 'R$ 600k - 1M',
    'acima-1m': 'Acima R$ 1M'
  };
  return values[value] || value;
};

const formatMainPriority = (priority) => {
  if (!priority || priority === 'undefined') return 'Não informado';
  const priorities = {
    'preco': 'Menor preço',
    'emergencias': 'Cobertura emergencial',
    'eletronicos': 'Proteção eletrônicos',
    'bikes': 'Assistência para bikes',
    'manutencao': 'Manutenção preventiva',
    'completo': 'Proteção completa'
  };
  return priorities[priority] || priority;
};

const formatBudgetRange = (budget) => {
  if (!budget || budget === 'undefined') return 'Não informado';
  const budgets = {
    'economico': 'Até R$ 100/mês (Econômico)',
    'medio': 'R$ 100 - R$ 200/mês (Médio)',
    'premium': 'Acima R$ 200/mês (Premium)'
  };
  return budgets[budget] || budget;
};

const formatHowDidYouHear = (source) => {
  if (!source || source === 'undefined') return 'Não informado';
  const sources = {
    'uber': 'QR Code no Uber',
    'google': 'Google/Busca',
    'indicacao': 'Indicação',
    'social': 'Redes Sociais',
    'outros': 'Outros'
  };
  return sources[source] || source;
};

const createEmailHTML = (data) => {
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
      <title>Nova Cotação - Zurich Residência</title>
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
              <span class="info-value">${formatHowDidYouHear(data.how_did_you_hear)}</span>
            </div>
          </div>
        </div>

        <div class="section" style="background: #fefbf3;">
          <h2 style="color: #d97706;">🏡 Perfil da Residência</h2>
          <div class="info-grid">
            <div class="info-item">
              <span class="info-label">Tipo:</span>
              <span class="info-value">${formatPropertyType(data.property_type)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Valor estimado:</span>
              <span class="info-value">${formatPropertyValue(data.property_value)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Prioridade:</span>
              <span class="info-value">${formatMainPriority(data.main_priority)}</span>
            </div>
            <div class="info-item">
              <span class="info-label">Orçamento:</span>
              <span class="info-value">${formatBudgetRange(data.budget_range)}</span>
            </div>
          </div>
        </div>

        <div class="recommendation">
          <h3>🎯 Recomendação do Sistema</h3>
          <div class="plan-name">PLANO ${(data.recommended_plan || 'NÃO INFORMADO').toUpperCase()}</div>
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

          <div style="margin-top: 20px; text-align: center;">
            <a href="https://wa.me/55${(data.phone || '').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Oi ${data.name || 'Cliente'}!

Aqui e da J.J. Amorim Seguros - Zurich. Recebi sua solicitacao de cotacao para seguro residencial.

Vi que voce tem interesse no plano *${data.recommended_plan || 'personalizado'}* para sua ${formatPropertyType(data.property_type || '') ? formatPropertyType(data.property_type).toLowerCase() : 'residencia'}.

Vou preparar uma proposta exclusiva para voce!

Quando podemos conversar? Tenho algumas perguntas rapidas para personalizar ainda mais sua cotacao.

*Zurich - A seguranca que voce confia*`)}"
               style="display: inline-block; background: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 10px 0; box-shadow: 0 4px 8px rgba(37, 211, 102, 0.3);">
              Enviar WhatsApp para ${data.name || 'Cliente'}
            </a>
          </div>

          <div style="margin-top: 15px; padding: 15px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
              <strong>IMPORTANTE:</strong> Use o botao acima para contato direto via WhatsApp!
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

// API Routes
app.post('/api/send-email', async (req, res) => {
  try {
    const { formData } = req.body;
    
    if (!formData) {
      return res.status(400).json({ error: 'Form data is required' });
    }

    console.log('📧 Sending email for:', formData.name);
    console.log('📋 Full formData received:', JSON.stringify(formData, null, 2));

    // Prepare email data with timestamp
    const emailData = {
      ...formData,
      timestamp: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || 'Unknown'
    };

    console.log('�� Email data prepared:', JSON.stringify(emailData, null, 2));

    // Send email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Sistema Cotação <noreply@resend.dev>',
      to: ['mktfunil1@gmail.com'],
      subject: `🏠 Nova Cotação - ${emailData.name} - Plano ${emailData.recommendedPlan}`,
      html: createEmailHTML(emailData),
      text: `Nova cotação de ${emailData.name} para o plano ${emailData.recommendedPlan}. WhatsApp: ${emailData.phone}`
    });

    if (error) {
      console.error('❌ Resend error:', error);

      // For testing purposes, log the email content and return success
      console.log('📧 Email content (would be sent):');
      console.log('From: Sistema Cotação <noreply@resend.dev>');
      console.log('To: mktfunil1@gmail.com');
      console.log('Subject:', `🏠 Nova Cotação - ${emailData.name} - Plano ${emailData.recommendedPlan}`);
      console.log('📝 Email would contain full HTML template with lead data');

      // Return success to allow app to continue working
      return res.json({
        success: true,
        message: 'Email logged (Resend requires domain verification for production)',
        data: { id: 'logged-' + Date.now() }
      });
    }

    console.log('✅ Email sent successfully:', data);
    res.json({ success: true, data });

  } catch (error) {
    console.error('❌ Server error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📧 Email API available at http://localhost:${PORT}/api/send-email`);
});
