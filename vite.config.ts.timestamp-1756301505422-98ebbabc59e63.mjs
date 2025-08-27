// vite.config.ts
import { defineConfig } from "file:///app/code/node_modules/vite/dist/node/index.js";
import react from "file:///app/code/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import express from "file:///app/code/node_modules/express/index.js";
import { Resend } from "file:///app/code/node_modules/resend/dist/index.mjs";
var __vite_injected_original_dirname = "/app/code";
var formatPropertyType = (type) => {
  const types = {
    "apartamento": "Apartamento",
    "casa": "Casa",
    "sobrado": "Sobrado",
    "chacara": "Ch\xE1cara/S\xEDtio"
  };
  return types[type] || type;
};
var formatPropertyValue = (value) => {
  const values = {
    "ate-300k": "At\xE9 R$ 300mil",
    "300-600k": "R$ 300k - 600k",
    "600k-1m": "R$ 600k - 1M",
    "acima-1m": "Acima R$ 1M"
  };
  return values[value] || value;
};
var formatMainPriority = (priority) => {
  const priorities = {
    "preco": "Menor pre\xE7o",
    "emergencias": "Cobertura emergencial",
    "eletronicos": "Prote\xE7\xE3o eletr\xF4nicos",
    "bikes": "Assist\xEAncia para bikes",
    "manutencao": "Manuten\xE7\xE3o preventiva",
    "completo": "Prote\xE7\xE3o completa"
  };
  return priorities[priority] || priority;
};
var formatBudgetRange = (budget) => {
  const budgets = {
    "economico": "At\xE9 R$ 100/m\xEAs (Econ\xF4mico)",
    "medio": "R$ 100 - R$ 200/m\xEAs (M\xE9dio)",
    "premium": "Acima R$ 200/m\xEAs (Premium)"
  };
  return budgets[budget] || budget;
};
var formatHowDidYouHear = (source) => {
  const sources = {
    "uber": "QR Code no Uber",
    "google": "Google/Busca",
    "indicacao": "Indica\xE7\xE3o",
    "social": "Redes Sociais",
    "outros": "Outros"
  };
  return sources[source] || source;
};
var createEmailHTML = (data) => {
  const timestamp = new Date(data.timestamp).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nova Cota\xE7\xE3o - Zurich Resid\xEAncia</title>
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
          <h1>\u{1F3E0} NOVA COTA\xC7\xC3O RECEBIDA</h1>
          <p class="subtitle">Zurich Seguro Resid\xEAncia</p>
        </div>

        <div class="section" style="background: #f8fafc;">
          <h2 style="color: #059669;">\u{1F464} Dados do Cliente</h2>
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
          <h2 style="color: #d97706;">\u{1F3E1} Perfil da Resid\xEAncia</h2>
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
              <span class="info-label">Or\xE7amento:</span>
              <span class="info-value">${formatBudgetRange(data.budgetRange)}</span>
            </div>
          </div>
        </div>

        <div class="recommendation">
          <h3>\u{1F3AF} Recomenda\xE7\xE3o do Sistema</h3>
          <div class="plan-name">PLANO ${data.recommendedPlan.toUpperCase()}</div>
          <p>Plano sugerido baseado no perfil do cliente</p>
        </div>

        ${data.utm_source ? `
        <div class="utm-info">
          <h4>\u{1F4CA} Origem do Lead</h4>
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
            ` : ""}
            ${data.utm_campaign ? `
            <div class="info-item">
              <span class="info-label">Campanha:</span>
              <span class="info-value">${data.utm_campaign}</span>
            </div>
            ` : ""}
          </div>
        </div>
        ` : ""}

        <div class="contact-info">
          <h3>\u{1F680} Pr\xF3ximos Passos</h3>
          <p><strong>Cliente quer receber cota\xE7\xE3o personalizada!</strong></p>
          <p style="margin: 15px 0;">Entre em contato o mais r\xE1pido poss\xEDvel:</p>
          <div class="contact-item">\u{1F4F1} WhatsApp: ${data.phone}</div>
          <div class="contact-item">\u{1F464} Nome: ${data.name}</div>
        </div>

        <div class="timestamp">
          <p>\u{1F4C5} Cota\xE7\xE3o solicitada em: <strong>${timestamp}</strong></p>
          <p style="font-size: 12px; color: #6b7280; margin-top: 10px;">
            Sistema automatizado - J.J. Amorim Seguros
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
};
function apiServerPlugin() {
  return {
    name: "api-server",
    configureServer(server) {
      server.middlewares.use("/api", express.json());
      const resend = new Resend(process.env.RESEND_API_KEY || "re_WFnSBZYn_FqZgRdF32rtcg3ZzuNN3Vo3W");
      server.middlewares.use("/api/send-email", async (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        try {
          const { formData } = req.body;
          if (!formData) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Form data is required" }));
            return;
          }
          console.log("\u{1F4E7} Sending email for:", formData.name);
          const emailData = {
            ...formData,
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            userAgent: req.headers["user-agent"] || "Unknown"
          };
          const { data, error } = await resend.emails.send({
            from: "Sistema Cota\xE7\xE3o <noreply@resend.dev>",
            to: ["contato@jjamorimseguros.com.br"],
            subject: `\u{1F3E0} Nova Cota\xE7\xE3o - ${emailData.name} - Plano ${emailData.recommendedPlan}`,
            html: createEmailHTML(emailData),
            text: `Nova cota\xE7\xE3o de ${emailData.name} para o plano ${emailData.recommendedPlan}. WhatsApp: ${emailData.phone}`
          });
          if (error) {
            console.error("\u274C Resend error:", error);
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Failed to send email", details: error }));
            return;
          }
          console.log("\u2705 Email sent successfully:", data);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, data }));
        } catch (error) {
          console.error("\u274C Server error:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Internal server error", details: error.message }));
        }
      });
      server.middlewares.use("/api/health", (req, res) => {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "OK", timestamp: (/* @__PURE__ */ new Date()).toISOString() }));
      });
    }
  };
}
var vite_config_default = defineConfig({
  plugins: [react(), apiServerPlugin()],
  optimizeDeps: {
    exclude: ["@supabase/supabase-js"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL2NvZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvY29kZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYXBwL2NvZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycydcbmltcG9ydCB7IFJlc2VuZCB9IGZyb20gJ3Jlc2VuZCdcblxuLy8gRW1haWwgZm9ybWF0dGluZyBmdW5jdGlvbnNcbmNvbnN0IGZvcm1hdFByb3BlcnR5VHlwZSA9ICh0eXBlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB0eXBlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAnYXBhcnRhbWVudG8nOiAnQXBhcnRhbWVudG8nLFxuICAgICdjYXNhJzogJ0Nhc2EnLFxuICAgICdzb2JyYWRvJzogJ1NvYnJhZG8nLFxuICAgICdjaGFjYXJhJzogJ0NoXHUwMEUxY2FyYS9TXHUwMEVEdGlvJ1xuICB9O1xuICByZXR1cm4gdHlwZXNbdHlwZV0gfHwgdHlwZTtcbn07XG5cbmNvbnN0IGZvcm1hdFByb3BlcnR5VmFsdWUgPSAodmFsdWU6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHZhbHVlczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAnYXRlLTMwMGsnOiAnQXRcdTAwRTkgUiQgMzAwbWlsJyxcbiAgICAnMzAwLTYwMGsnOiAnUiQgMzAwayAtIDYwMGsnLFxuICAgICc2MDBrLTFtJzogJ1IkIDYwMGsgLSAxTScsXG4gICAgJ2FjaW1hLTFtJzogJ0FjaW1hIFIkIDFNJ1xuICB9O1xuICByZXR1cm4gdmFsdWVzW3ZhbHVlXSB8fCB2YWx1ZTtcbn07XG5cbmNvbnN0IGZvcm1hdE1haW5Qcmlvcml0eSA9IChwcmlvcml0eTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgY29uc3QgcHJpb3JpdGllczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgICAncHJlY28nOiAnTWVub3IgcHJlXHUwMEU3bycsXG4gICAgJ2VtZXJnZW5jaWFzJzogJ0NvYmVydHVyYSBlbWVyZ2VuY2lhbCcsXG4gICAgJ2VsZXRyb25pY29zJzogJ1Byb3RlXHUwMEU3XHUwMEUzbyBlbGV0clx1MDBGNG5pY29zJyxcbiAgICAnYmlrZXMnOiAnQXNzaXN0XHUwMEVBbmNpYSBwYXJhIGJpa2VzJyxcbiAgICAnbWFudXRlbmNhbyc6ICdNYW51dGVuXHUwMEU3XHUwMEUzbyBwcmV2ZW50aXZhJyxcbiAgICAnY29tcGxldG8nOiAnUHJvdGVcdTAwRTdcdTAwRTNvIGNvbXBsZXRhJ1xuICB9O1xuICByZXR1cm4gcHJpb3JpdGllc1twcmlvcml0eV0gfHwgcHJpb3JpdHk7XG59O1xuXG5jb25zdCBmb3JtYXRCdWRnZXRSYW5nZSA9IChidWRnZXQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGJ1ZGdldHM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgJ2Vjb25vbWljbyc6ICdBdFx1MDBFOSBSJCAxMDAvbVx1MDBFQXMgKEVjb25cdTAwRjRtaWNvKScsXG4gICAgJ21lZGlvJzogJ1IkIDEwMCAtIFIkIDIwMC9tXHUwMEVBcyAoTVx1MDBFOWRpbyknLFxuICAgICdwcmVtaXVtJzogJ0FjaW1hIFIkIDIwMC9tXHUwMEVBcyAoUHJlbWl1bSknXG4gIH07XG4gIHJldHVybiBidWRnZXRzW2J1ZGdldF0gfHwgYnVkZ2V0O1xufTtcblxuY29uc3QgZm9ybWF0SG93RGlkWW91SGVhciA9IChzb3VyY2U6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHNvdXJjZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgJ3ViZXInOiAnUVIgQ29kZSBubyBVYmVyJyxcbiAgICAnZ29vZ2xlJzogJ0dvb2dsZS9CdXNjYScsXG4gICAgJ2luZGljYWNhbyc6ICdJbmRpY2FcdTAwRTdcdTAwRTNvJyxcbiAgICAnc29jaWFsJzogJ1JlZGVzIFNvY2lhaXMnLFxuICAgICdvdXRyb3MnOiAnT3V0cm9zJ1xuICB9O1xuICByZXR1cm4gc291cmNlc1tzb3VyY2VdIHx8IHNvdXJjZTtcbn07XG5cbmNvbnN0IGNyZWF0ZUVtYWlsSFRNTCA9IChkYXRhOiBhbnkpOiBzdHJpbmcgPT4ge1xuICBjb25zdCB0aW1lc3RhbXAgPSBuZXcgRGF0ZShkYXRhLnRpbWVzdGFtcCkudG9Mb2NhbGVTdHJpbmcoJ3B0LUJSJywgeyBcbiAgICB0aW1lWm9uZTogJ0FtZXJpY2EvU2FvX1BhdWxvJyxcbiAgICBkYXk6ICcyLWRpZ2l0JyxcbiAgICBtb250aDogJzItZGlnaXQnLCBcbiAgICB5ZWFyOiAnbnVtZXJpYycsXG4gICAgaG91cjogJzItZGlnaXQnLFxuICAgIG1pbnV0ZTogJzItZGlnaXQnXG4gIH0pO1xuXG4gIHJldHVybiBgXG4gICAgPCFET0NUWVBFIGh0bWw+XG4gICAgPGh0bWw+XG4gICAgPGhlYWQ+XG4gICAgICA8bWV0YSBjaGFyc2V0PVwidXRmLThcIj5cbiAgICAgIDx0aXRsZT5Ob3ZhIENvdGFcdTAwRTdcdTAwRTNvIC0gWnVyaWNoIFJlc2lkXHUwMEVBbmNpYTwvdGl0bGU+XG4gICAgICA8c3R5bGU+XG4gICAgICAgIGJvZHkgeyBcbiAgICAgICAgICBmb250LWZhbWlseTogJ1NlZ29lIFVJJywgVGFob21hLCBHZW5ldmEsIFZlcmRhbmEsIHNhbnMtc2VyaWY7IFxuICAgICAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7IFxuICAgICAgICAgIGNvbG9yOiAjMzMzOyBcbiAgICAgICAgICBtYXgtd2lkdGg6IDYwMHB4OyBcbiAgICAgICAgICBtYXJnaW46IDAgYXV0bzsgXG4gICAgICAgICAgcGFkZGluZzogMjBweDsgXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y4ZmFmYztcbiAgICAgICAgfVxuICAgICAgICAuY29udGFpbmVyIHsgXG4gICAgICAgICAgYmFja2dyb3VuZDogd2hpdGU7IFxuICAgICAgICAgIHBhZGRpbmc6IDMwcHg7IFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7IFxuICAgICAgICAgIGJveC1zaGFkb3c6IDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSk7IFxuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXIgeyBcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IFxuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDMwcHg7IFxuICAgICAgICAgIHBhZGRpbmctYm90dG9tOiAyMHB4OyBcbiAgICAgICAgICBib3JkZXItYm90dG9tOiAzcHggc29saWQgIzNiODJmNjsgXG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlciBoMSB7IFxuICAgICAgICAgIGNvbG9yOiAjMWU0MGFmOyBcbiAgICAgICAgICBtYXJnaW46IDA7IFxuICAgICAgICAgIGZvbnQtc2l6ZTogMjhweDsgXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7IFxuICAgICAgICB9XG4gICAgICAgIC5oZWFkZXIgLnN1YnRpdGxlIHsgXG4gICAgICAgICAgY29sb3I6ICM2YjcyODA7IFxuICAgICAgICAgIGZvbnQtc2l6ZTogMTZweDsgXG4gICAgICAgICAgbWFyZ2luOiA4cHggMCAwIDA7IFxuICAgICAgICB9XG4gICAgICAgIC5zZWN0aW9uIHsgXG4gICAgICAgICAgbWFyZ2luOiAyNXB4IDA7IFxuICAgICAgICAgIHBhZGRpbmc6IDIwcHg7IFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDsgXG4gICAgICAgICAgYm9yZGVyLWxlZnQ6IDRweCBzb2xpZCAjM2I4MmY2OyBcbiAgICAgICAgfVxuICAgICAgICAuc2VjdGlvbiBoMiB7IFxuICAgICAgICAgIGNvbG9yOiAjMWU0MGFmOyBcbiAgICAgICAgICBtYXJnaW46IDAgMCAxNXB4IDA7IFxuICAgICAgICAgIGZvbnQtc2l6ZTogMjBweDsgXG4gICAgICAgIH1cbiAgICAgICAgLmluZm8tZ3JpZCB7IFxuICAgICAgICAgIGRpc3BsYXk6IGdyaWQ7IFxuICAgICAgICAgIGdhcDogMTJweDsgXG4gICAgICAgIH1cbiAgICAgICAgLmluZm8taXRlbSB7IFxuICAgICAgICAgIGRpc3BsYXk6IGZsZXg7IFxuICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgXG4gICAgICAgICAgcGFkZGluZzogOHB4IDA7IFxuICAgICAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZTVlN2ViOyBcbiAgICAgICAgfVxuICAgICAgICAuaW5mby1pdGVtOmxhc3QtY2hpbGQgeyBcbiAgICAgICAgICBib3JkZXItYm90dG9tOiBub25lOyBcbiAgICAgICAgfVxuICAgICAgICAuaW5mby1sYWJlbCB7IFxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7IFxuICAgICAgICAgIGNvbG9yOiAjMzc0MTUxOyBcbiAgICAgICAgICBtaW4td2lkdGg6IDE0MHB4OyBcbiAgICAgICAgfVxuICAgICAgICAuaW5mby12YWx1ZSB7IFxuICAgICAgICAgIGNvbG9yOiAjNmI3MjgwOyBcbiAgICAgICAgICB0ZXh0LWFsaWduOiByaWdodDsgXG4gICAgICAgIH1cbiAgICAgICAgLnJlY29tbWVuZGF0aW9uIHsgXG4gICAgICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzNiODJmNiwgIzFkNGVkOCk7IFxuICAgICAgICAgIGNvbG9yOiB3aGl0ZTsgXG4gICAgICAgICAgcGFkZGluZzogMjBweDsgXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDsgXG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyBcbiAgICAgICAgICBtYXJnaW46IDMwcHggMDsgXG4gICAgICAgIH1cbiAgICAgICAgLnJlY29tbWVuZGF0aW9uIGgzIHsgXG4gICAgICAgICAgbWFyZ2luOiAwIDAgMTBweCAwOyBcbiAgICAgICAgICBmb250LXNpemU6IDI0cHg7IFxuICAgICAgICB9XG4gICAgICAgIC5yZWNvbW1lbmRhdGlvbiAucGxhbi1uYW1lIHsgXG4gICAgICAgICAgZm9udC1zaXplOiAzMnB4OyBcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDsgXG4gICAgICAgICAgbWFyZ2luOiAxMHB4IDA7IFxuICAgICAgICB9XG4gICAgICAgIC5jb250YWN0LWluZm8geyBcbiAgICAgICAgICBiYWNrZ3JvdW5kOiAjZjFmNWY5OyBcbiAgICAgICAgICBwYWRkaW5nOiAyMHB4OyBcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7IFxuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgXG4gICAgICAgICAgbWFyZ2luLXRvcDogMzBweDsgXG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRhY3QtaW5mbyBoMyB7IFxuICAgICAgICAgIGNvbG9yOiAjMWU0MGFmOyBcbiAgICAgICAgICBtYXJnaW46IDAgMCAxNXB4IDA7IFxuICAgICAgICB9XG4gICAgICAgIC5jb250YWN0LWl0ZW0geyBcbiAgICAgICAgICBtYXJnaW46IDhweCAwOyBcbiAgICAgICAgICBmb250LXdlaWdodDogNjAwOyBcbiAgICAgICAgfVxuICAgICAgICAudGltZXN0YW1wIHsgXG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyBcbiAgICAgICAgICBjb2xvcjogIzljYTNhZjsgXG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4OyBcbiAgICAgICAgICBtYXJnaW4tdG9wOiAzMHB4OyBcbiAgICAgICAgICBwYWRkaW5nLXRvcDogMjBweDsgXG4gICAgICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlNWU3ZWI7IFxuICAgICAgICB9XG4gICAgICAgIC51dG0taW5mbyB7IFxuICAgICAgICAgIGJhY2tncm91bmQ6ICNmZWYzYzc7IFxuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkICNmNTllMGI7IFxuICAgICAgICAgIHBhZGRpbmc6IDE1cHg7IFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDsgXG4gICAgICAgICAgbWFyZ2luOiAyMHB4IDA7IFxuICAgICAgICB9XG4gICAgICAgIC51dG0taW5mbyBoNCB7IFxuICAgICAgICAgIGNvbG9yOiAjOTI0MDBlOyBcbiAgICAgICAgICBtYXJnaW46IDAgMCAxMHB4IDA7IFxuICAgICAgICB9XG4gICAgICA8L3N0eWxlPlxuICAgIDwvaGVhZD5cbiAgICA8Ym9keT5cbiAgICAgIDxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImhlYWRlclwiPlxuICAgICAgICAgIDxoMT5cdUQ4M0NcdURGRTAgTk9WQSBDT1RBXHUwMEM3XHUwMEMzTyBSRUNFQklEQTwvaDE+XG4gICAgICAgICAgPHAgY2xhc3M9XCJzdWJ0aXRsZVwiPlp1cmljaCBTZWd1cm8gUmVzaWRcdTAwRUFuY2lhPC9wPlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvblwiIHN0eWxlPVwiYmFja2dyb3VuZDogI2Y4ZmFmYztcIj5cbiAgICAgICAgICA8aDIgc3R5bGU9XCJjb2xvcjogIzA1OTY2OTtcIj5cdUQ4M0RcdURDNjQgRGFkb3MgZG8gQ2xpZW50ZTwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tZ3JpZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5Ob21lOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+PHN0cm9uZz4ke2RhdGEubmFtZX08L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLWxhYmVsXCI+V2hhdHNBcHA6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj48c3Ryb25nPiR7ZGF0YS5waG9uZX08L3N0cm9uZz48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLWxhYmVsXCI+Q29tbyBjb25oZWNldTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPiR7Zm9ybWF0SG93RGlkWW91SGVhcihkYXRhLmhvd0RpZFlvdUhlYXIpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwic2VjdGlvblwiIHN0eWxlPVwiYmFja2dyb3VuZDogI2ZlZmJmMztcIj5cbiAgICAgICAgICA8aDIgc3R5bGU9XCJjb2xvcjogI2Q5NzcwNjtcIj5cdUQ4M0NcdURGRTEgUGVyZmlsIGRhIFJlc2lkXHUwMEVBbmNpYTwvaDI+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tZ3JpZFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5UaXBvOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtmb3JtYXRQcm9wZXJ0eVR5cGUoZGF0YS5wcm9wZXJ0eVR5cGUpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5WYWxvciBlc3RpbWFkbzo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPiR7Zm9ybWF0UHJvcGVydHlWYWx1ZShkYXRhLnByb3BlcnR5VmFsdWUpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5QcmlvcmlkYWRlOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtmb3JtYXRNYWluUHJpb3JpdHkoZGF0YS5tYWluUHJpb3JpdHkpfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5Pclx1MDBFN2FtZW50bzo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPiR7Zm9ybWF0QnVkZ2V0UmFuZ2UoZGF0YS5idWRnZXRSYW5nZSl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJyZWNvbW1lbmRhdGlvblwiPlxuICAgICAgICAgIDxoMz5cdUQ4M0NcdURGQUYgUmVjb21lbmRhXHUwMEU3XHUwMEUzbyBkbyBTaXN0ZW1hPC9oMz5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicGxhbi1uYW1lXCI+UExBTk8gJHtkYXRhLnJlY29tbWVuZGVkUGxhbi50b1VwcGVyQ2FzZSgpfTwvZGl2PlxuICAgICAgICAgIDxwPlBsYW5vIHN1Z2VyaWRvIGJhc2VhZG8gbm8gcGVyZmlsIGRvIGNsaWVudGU8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgICR7ZGF0YS51dG1fc291cmNlID8gYFxuICAgICAgICA8ZGl2IGNsYXNzPVwidXRtLWluZm9cIj5cbiAgICAgICAgICA8aDQ+XHVEODNEXHVEQ0NBIE9yaWdlbSBkbyBMZWFkPC9oND5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1ncmlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPkZvbnRlOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtkYXRhLnV0bV9zb3VyY2V9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAke2RhdGEudXRtX21lZGl1bSA/IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLWxhYmVsXCI+TWVpbzo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPiR7ZGF0YS51dG1fbWVkaXVtfTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYCA6ICcnfVxuICAgICAgICAgICAgJHtkYXRhLnV0bV9jYW1wYWlnbiA/IGBcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLWxhYmVsXCI+Q2FtcGFuaGE6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj4ke2RhdGEudXRtX2NhbXBhaWdufTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgYCA6ICcnfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgYCA6ICcnfVxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWN0LWluZm9cIj5cbiAgICAgICAgICA8aDM+XHVEODNEXHVERTgwIFByXHUwMEYzeGltb3MgUGFzc29zPC9oMz5cbiAgICAgICAgICA8cD48c3Ryb25nPkNsaWVudGUgcXVlciByZWNlYmVyIGNvdGFcdTAwRTdcdTAwRTNvIHBlcnNvbmFsaXphZGEhPC9zdHJvbmc+PC9wPlxuICAgICAgICAgIDxwIHN0eWxlPVwibWFyZ2luOiAxNXB4IDA7XCI+RW50cmUgZW0gY29udGF0byBvIG1haXMgclx1MDBFMXBpZG8gcG9zc1x1MDBFRHZlbDo8L3A+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhY3QtaXRlbVwiPlx1RDgzRFx1RENGMSBXaGF0c0FwcDogJHtkYXRhLnBob25lfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250YWN0LWl0ZW1cIj5cdUQ4M0RcdURDNjQgTm9tZTogJHtkYXRhLm5hbWV9PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lc3RhbXBcIj5cbiAgICAgICAgICA8cD5cdUQ4M0RcdURDQzUgQ290YVx1MDBFN1x1MDBFM28gc29saWNpdGFkYSBlbTogPHN0cm9uZz4ke3RpbWVzdGFtcH08L3N0cm9uZz48L3A+XG4gICAgICAgICAgPHAgc3R5bGU9XCJmb250LXNpemU6IDEycHg7IGNvbG9yOiAjNmI3MjgwOyBtYXJnaW4tdG9wOiAxMHB4O1wiPlxuICAgICAgICAgICAgU2lzdGVtYSBhdXRvbWF0aXphZG8gLSBKLkouIEFtb3JpbSBTZWd1cm9zXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gIGA7XG59O1xuXG4vLyBQbHVnaW4gcGFyYSBhZGljaW9uYXIgc2Vydmlkb3IgQVBJXG5mdW5jdGlvbiBhcGlTZXJ2ZXJQbHVnaW4oKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2FwaS1zZXJ2ZXInLFxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXI6IGFueSkge1xuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgnL2FwaScsIGV4cHJlc3MuanNvbigpKVxuICAgICAgXG4gICAgICAvLyBJbml0aWFsaXplIFJlc2VuZFxuICAgICAgY29uc3QgcmVzZW5kID0gbmV3IFJlc2VuZChwcm9jZXNzLmVudi5SRVNFTkRfQVBJX0tFWSB8fCAncmVfV0ZuU0JaWW5fRnFaZ1JkRjMycnRjZzNaenVOTjNWbzNXJyk7XG5cbiAgICAgIC8vIEFQSSBSb3V0ZXNcbiAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoJy9hcGkvc2VuZC1lbWFpbCcsIGFzeW5jIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlcS5tZXRob2QgIT09ICdQT1NUJykge1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDA1LCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnTWV0aG9kIG5vdCBhbGxvd2VkJyB9KSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7IGZvcm1EYXRhIH0gPSByZXEuYm9keTtcbiAgICAgICAgICBcbiAgICAgICAgICBpZiAoIWZvcm1EYXRhKSB7XG4gICAgICAgICAgICByZXMud3JpdGVIZWFkKDQwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnRm9ybSBkYXRhIGlzIHJlcXVpcmVkJyB9KSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc29sZS5sb2coJ1x1RDgzRFx1RENFNyBTZW5kaW5nIGVtYWlsIGZvcjonLCBmb3JtRGF0YS5uYW1lKTtcblxuICAgICAgICAgIC8vIFByZXBhcmUgZW1haWwgZGF0YSB3aXRoIHRpbWVzdGFtcFxuICAgICAgICAgIGNvbnN0IGVtYWlsRGF0YSA9IHtcbiAgICAgICAgICAgIC4uLmZvcm1EYXRhLFxuICAgICAgICAgICAgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCksXG4gICAgICAgICAgICB1c2VyQWdlbnQ6IHJlcS5oZWFkZXJzWyd1c2VyLWFnZW50J10gfHwgJ1Vua25vd24nXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIFNlbmQgZW1haWwgdmlhIFJlc2VuZFxuICAgICAgICAgIGNvbnN0IHsgZGF0YSwgZXJyb3IgfSA9IGF3YWl0IHJlc2VuZC5lbWFpbHMuc2VuZCh7XG4gICAgICAgICAgICBmcm9tOiAnU2lzdGVtYSBDb3RhXHUwMEU3XHUwMEUzbyA8bm9yZXBseUByZXNlbmQuZGV2PicsXG4gICAgICAgICAgICB0bzogWydjb250YXRvQGpqYW1vcmltc2VndXJvcy5jb20uYnInXSxcbiAgICAgICAgICAgIHN1YmplY3Q6IGBcdUQ4M0NcdURGRTAgTm92YSBDb3RhXHUwMEU3XHUwMEUzbyAtICR7ZW1haWxEYXRhLm5hbWV9IC0gUGxhbm8gJHtlbWFpbERhdGEucmVjb21tZW5kZWRQbGFufWAsXG4gICAgICAgICAgICBodG1sOiBjcmVhdGVFbWFpbEhUTUwoZW1haWxEYXRhKSxcbiAgICAgICAgICAgIHRleHQ6IGBOb3ZhIGNvdGFcdTAwRTdcdTAwRTNvIGRlICR7ZW1haWxEYXRhLm5hbWV9IHBhcmEgbyBwbGFubyAke2VtYWlsRGF0YS5yZWNvbW1lbmRlZFBsYW59LiBXaGF0c0FwcDogJHtlbWFpbERhdGEucGhvbmV9YFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdcdTI3NEMgUmVzZW5kIGVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNTAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdGYWlsZWQgdG8gc2VuZCBlbWFpbCcsIGRldGFpbHM6IGVycm9yIH0pKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zb2xlLmxvZygnXHUyNzA1IEVtYWlsIHNlbnQgc3VjY2Vzc2Z1bGx5OicsIGRhdGEpO1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUsIGRhdGEgfSkpO1xuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdcdTI3NEMgU2VydmVyIGVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICByZXMud3JpdGVIZWFkKDUwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0ludGVybmFsIHNlcnZlciBlcnJvcicsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gSGVhbHRoIGNoZWNrXG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKCcvYXBpL2hlYWx0aCcsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN0YXR1czogJ09LJywgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgYXBpU2VydmVyUGx1Z2luKCldLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyddXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZNLFNBQVMsb0JBQW9CO0FBQzFPLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxhQUFhO0FBRXBCLFNBQVMsY0FBYztBQUx2QixJQUFNLG1DQUFtQztBQVF6QyxJQUFNLHFCQUFxQixDQUFDLFNBQXlCO0FBQ25ELFFBQU0sUUFBZ0M7QUFBQSxJQUNwQyxlQUFlO0FBQUEsSUFDZixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxXQUFXO0FBQUEsRUFDYjtBQUNBLFNBQU8sTUFBTSxJQUFJLEtBQUs7QUFDeEI7QUFFQSxJQUFNLHNCQUFzQixDQUFDLFVBQTBCO0FBQ3JELFFBQU0sU0FBaUM7QUFBQSxJQUNyQyxZQUFZO0FBQUEsSUFDWixZQUFZO0FBQUEsSUFDWixXQUFXO0FBQUEsSUFDWCxZQUFZO0FBQUEsRUFDZDtBQUNBLFNBQU8sT0FBTyxLQUFLLEtBQUs7QUFDMUI7QUFFQSxJQUFNLHFCQUFxQixDQUFDLGFBQTZCO0FBQ3ZELFFBQU0sYUFBcUM7QUFBQSxJQUN6QyxTQUFTO0FBQUEsSUFDVCxlQUFlO0FBQUEsSUFDZixlQUFlO0FBQUEsSUFDZixTQUFTO0FBQUEsSUFDVCxjQUFjO0FBQUEsSUFDZCxZQUFZO0FBQUEsRUFDZDtBQUNBLFNBQU8sV0FBVyxRQUFRLEtBQUs7QUFD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LE1BQU07QUFBQSxZQUNOLElBQUksQ0FBQyxnQ0FBZ0M7QUFBQSxZQUNyQyxTQUFTLGtDQUFxQixVQUFVLElBQUksWUFBWSxVQUFVLGVBQWU7QUFBQSxZQUNqRixNQUFNLGdCQUFnQixTQUFTO0FBQUEsWUFDL0IsTUFBTSx5QkFBbUIsVUFBVSxJQUFJLGlCQUFpQixVQUFVLGVBQWUsZUFBZSxVQUFVLEtBQUs7QUFBQSxVQUNqSCxDQUFDO0FBRUQsY0FBSSxPQUFPO0FBQ1Qsb0JBQVEsTUFBTSx3QkFBbUIsS0FBSztBQUN0QyxnQkFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQsZ0JBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLHdCQUF3QixTQUFTLE1BQU0sQ0FBQyxDQUFDO0FBQ3pFO0FBQUEsVUFDRjtBQUVBLGtCQUFRLElBQUksbUNBQThCLElBQUk7QUFDOUMsY0FBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQsY0FBSSxJQUFJLEtBQUssVUFBVSxFQUFFLFNBQVMsTUFBTSxLQUFLLENBQUMsQ0FBQztBQUFBLFFBRWpELFNBQVMsT0FBWTtBQUNuQixrQkFBUSxNQUFNLHdCQUFtQixLQUFLO0FBQ3RDLGNBQUksVUFBVSxLQUFLLEVBQUUsZ0JBQWdCLG1CQUFtQixDQUFDO0FBQ3pELGNBQUksSUFBSSxLQUFLLFVBQVUsRUFBRSxPQUFPLHlCQUF5QixTQUFTLE1BQU0sUUFBUSxDQUFDLENBQUM7QUFBQSxRQUNwRjtBQUFBLE1BQ0YsQ0FBQztBQUdELGFBQU8sWUFBWSxJQUFJLGVBQWUsQ0FBQyxLQUFVLFFBQWE7QUFDNUQsWUFBSSxVQUFVLEtBQUssRUFBRSxnQkFBZ0IsbUJBQW1CLENBQUM7QUFDekQsWUFBSSxJQUFJLEtBQUssVUFBVSxFQUFFLFFBQVEsTUFBTSxZQUFXLG9CQUFJLEtBQUssR0FBRSxZQUFZLEVBQUUsQ0FBQyxDQUFDO0FBQUEsTUFDL0UsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0Y7QUFHQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLGdCQUFnQixDQUFDO0FBQUEsRUFDcEMsY0FBYztBQUFBLElBQ1osU0FBUyxDQUFDLHVCQUF1QjtBQUFBLEVBQ25DO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
