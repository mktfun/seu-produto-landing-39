// vite.config.ts
import { defineConfig } from "file:///app/code/node_modules/vite/dist/node/index.js";
import react from "file:///app/code/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import express from "file:///app/code/node_modules/express/index.js";
import { Resend } from "file:///app/code/node_modules/resend/dist/index.mjs";
var __vite_injected_original_dirname = "/app/code";
var formatPropertyType = (type) => {
  if (!type || typeof type !== "string") return "N\xE3o informado";
  const types = {
    "apartamento": "Apartamento",
    "casa": "Casa",
    "sobrado": "Sobrado",
    "chacara": "Ch\xE1cara/S\xEDtio"
  };
  return types[type.toLowerCase()] || type;
};
var formatPropertyValue = (value) => {
  if (!value || typeof value !== "string") return "N\xE3o informado";
  const values = {
    "ate-300k": "At\xE9 R$ 300mil",
    "300-600k": "R$ 300k - 600k",
    "600k-1m": "R$ 600k - 1M",
    "acima-1m": "Acima R$ 1M"
  };
  return values[value.toLowerCase()] || value;
};
var formatMainPriority = (priority) => {
  if (!priority || typeof priority !== "string") return "N\xE3o informado";
  const priorities = {
    "preco": "Menor pre\xE7o",
    "emergencias": "Cobertura emergencial",
    "eletronicos": "Prote\xE7\xE3o eletr\xF4nicos",
    "bikes": "Assist\xEAncia para bikes",
    "manutencao": "Manuten\xE7\xE3o preventiva",
    "completo": "Prote\xE7\xE3o completa"
  };
  return priorities[priority.toLowerCase()] || priority;
};
var formatBudgetRange = (budget) => {
  if (!budget || typeof budget !== "string") return "N\xE3o informado";
  const budgets = {
    "economico": "At\xE9 R$ 100/m\xEAs (Econ\xF4mico)",
    "medio": "R$ 100 - R$ 200/m\xEAs (M\xE9dio)",
    "premium": "Acima R$ 200/m\xEAs (Premium)"
  };
  return budgets[budget.toLowerCase()] || budget;
};
var formatHowDidYouHear = (source) => {
  if (!source || typeof source !== "string") return "N\xE3o informado";
  const sources = {
    "uber": "QR Code no Uber",
    "google": "Google/Busca",
    "indicacao": "Indica\xE7\xE3o",
    "social": "Redes Sociais",
    "outros": "Outros"
  };
  return sources[source.toLowerCase()] || source;
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
      <title>Nova Cota\xE7\xE3o - Zurich Resid\uFFFD\uFFFDncia</title>
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
    include: ["@supabase/supabase-js"]
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: void 0
        // Evita problemas de chunk loading
      }
    },
    chunkSizeWarningLimit: 1e3,
    sourcemap: false
    // Reduz tamanho e problemas de debug
  },
  server: {
    timeout: 12e4,
    // 2 minutos de timeout
    hmr: {
      timeout: 6e4
      // 1 minuto para HMR
    }
  },
  preview: {
    timeout: 12e4
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL2NvZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvY29kZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYXBwL2NvZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycydcbmltcG9ydCB7IFJlc2VuZCB9IGZyb20gJ3Jlc2VuZCdcblxuLy8gRW1haWwgZm9ybWF0dGluZyBmdW5jdGlvbnNcbmNvbnN0IGZvcm1hdFByb3BlcnR5VHlwZSA9ICh0eXBlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXR5cGUgfHwgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSByZXR1cm4gJ05cdTAwRTNvIGluZm9ybWFkbyc7XG4gIGNvbnN0IHR5cGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdhcGFydGFtZW50byc6ICdBcGFydGFtZW50bycsXG4gICAgJ2Nhc2EnOiAnQ2FzYScsXG4gICAgJ3NvYnJhZG8nOiAnU29icmFkbycsXG4gICAgJ2NoYWNhcmEnOiAnQ2hcdTAwRTFjYXJhL1NcdTAwRUR0aW8nXG4gIH07XG4gIHJldHVybiB0eXBlc1t0eXBlLnRvTG93ZXJDYXNlKCldIHx8IHR5cGU7XG59O1xuXG5jb25zdCBmb3JtYXRQcm9wZXJ0eVZhbHVlID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHJldHVybiAnTlx1MDBFM28gaW5mb3JtYWRvJztcbiAgY29uc3QgdmFsdWVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdhdGUtMzAwayc6ICdBdFx1MDBFOSBSJCAzMDBtaWwnLFxuICAgICczMDAtNjAwayc6ICdSJCAzMDBrIC0gNjAwaycsXG4gICAgJzYwMGstMW0nOiAnUiQgNjAwayAtIDFNJyxcbiAgICAnYWNpbWEtMW0nOiAnQWNpbWEgUiQgMU0nXG4gIH07XG4gIHJldHVybiB2YWx1ZXNbdmFsdWUudG9Mb3dlckNhc2UoKV0gfHwgdmFsdWU7XG59O1xuXG5jb25zdCBmb3JtYXRNYWluUHJpb3JpdHkgPSAocHJpb3JpdHk6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghcHJpb3JpdHkgfHwgdHlwZW9mIHByaW9yaXR5ICE9PSAnc3RyaW5nJykgcmV0dXJuICdOXHUwMEUzbyBpbmZvcm1hZG8nO1xuICBjb25zdCBwcmlvcml0aWVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdwcmVjbyc6ICdNZW5vciBwcmVcdTAwRTdvJyxcbiAgICAnZW1lcmdlbmNpYXMnOiAnQ29iZXJ0dXJhIGVtZXJnZW5jaWFsJyxcbiAgICAnZWxldHJvbmljb3MnOiAnUHJvdGVcdTAwRTdcdTAwRTNvIGVsZXRyXHUwMEY0bmljb3MnLFxuICAgICdiaWtlcyc6ICdBc3Npc3RcdTAwRUFuY2lhIHBhcmEgYmlrZXMnLFxuICAgICdtYW51dGVuY2FvJzogJ01hbnV0ZW5cdTAwRTdcdTAwRTNvIHByZXZlbnRpdmEnLFxuICAgICdjb21wbGV0byc6ICdQcm90ZVx1MDBFN1x1MDBFM28gY29tcGxldGEnXG4gIH07XG4gIHJldHVybiBwcmlvcml0aWVzW3ByaW9yaXR5LnRvTG93ZXJDYXNlKCldIHx8IHByaW9yaXR5O1xufTtcblxuY29uc3QgZm9ybWF0QnVkZ2V0UmFuZ2UgPSAoYnVkZ2V0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIWJ1ZGdldCB8fCB0eXBlb2YgYnVkZ2V0ICE9PSAnc3RyaW5nJykgcmV0dXJuICdOXHUwMEUzbyBpbmZvcm1hZG8nO1xuICBjb25zdCBidWRnZXRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdlY29ub21pY28nOiAnQXRcdTAwRTkgUiQgMTAwL21cdTAwRUFzIChFY29uXHUwMEY0bWljbyknLFxuICAgICdtZWRpbyc6ICdSJCAxMDAgLSBSJCAyMDAvbVx1MDBFQXMgKE1cdTAwRTlkaW8pJyxcbiAgICAncHJlbWl1bSc6ICdBY2ltYSBSJCAyMDAvbVx1MDBFQXMgKFByZW1pdW0pJ1xuICB9O1xuICByZXR1cm4gYnVkZ2V0c1tidWRnZXQudG9Mb3dlckNhc2UoKV0gfHwgYnVkZ2V0O1xufTtcblxuY29uc3QgZm9ybWF0SG93RGlkWW91SGVhciA9IChzb3VyY2U6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSByZXR1cm4gJ05cdTAwRTNvIGluZm9ybWFkbyc7XG4gIGNvbnN0IHNvdXJjZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgJ3ViZXInOiAnUVIgQ29kZSBubyBVYmVyJyxcbiAgICAnZ29vZ2xlJzogJ0dvb2dsZS9CdXNjYScsXG4gICAgJ2luZGljYWNhbyc6ICdJbmRpY2FcdTAwRTdcdTAwRTNvJyxcbiAgICAnc29jaWFsJzogJ1JlZGVzIFNvY2lhaXMnLFxuICAgICdvdXRyb3MnOiAnT3V0cm9zJ1xuICB9O1xuICByZXR1cm4gc291cmNlc1tzb3VyY2UudG9Mb3dlckNhc2UoKV0gfHwgc291cmNlO1xufTtcblxuY29uc3QgY3JlYXRlRW1haWxIVE1MID0gKGRhdGE6IGFueSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKGRhdGEudGltZXN0YW1wKS50b0xvY2FsZVN0cmluZygncHQtQlInLCB7IFxuICAgIHRpbWVab25lOiAnQW1lcmljYS9TYW9fUGF1bG8nLFxuICAgIGRheTogJzItZGlnaXQnLFxuICAgIG1vbnRoOiAnMi1kaWdpdCcsIFxuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgbWludXRlOiAnMi1kaWdpdCdcbiAgfSk7XG5cbiAgcmV0dXJuIGBcbiAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICA8aHRtbD5cbiAgICA8aGVhZD5cbiAgICAgIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxuICAgICAgPHRpdGxlPk5vdmEgQ290YVx1MDBFN1x1MDBFM28gLSBadXJpY2ggUmVzaWRcdUZGRkRcdUZGRkRuY2lhPC90aXRsZT5cbiAgICAgIDxzdHlsZT5cbiAgICAgICAgYm9keSB7IFxuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjsgXG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNjsgXG4gICAgICAgICAgY29sb3I6ICMzMzM7IFxuICAgICAgICAgIG1heC13aWR0aDogNjAwcHg7IFxuICAgICAgICAgIG1hcmdpbjogMCBhdXRvOyBcbiAgICAgICAgICBwYWRkaW5nOiAyMHB4OyBcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmYWZjO1xuICAgICAgICB9XG4gICAgICAgIC5jb250YWluZXIgeyBcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsgXG4gICAgICAgICAgcGFkZGluZzogMzBweDsgXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDsgXG4gICAgICAgICAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTsgXG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlciB7IFxuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgXG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDsgXG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7IFxuICAgICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjM2I4MmY2OyBcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyIGgxIHsgXG4gICAgICAgICAgY29sb3I6ICMxZTQwYWY7IFxuICAgICAgICAgIG1hcmdpbjogMDsgXG4gICAgICAgICAgZm9udC1zaXplOiAyOHB4OyBcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDsgXG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlciAuc3VidGl0bGUgeyBcbiAgICAgICAgICBjb2xvcjogIzZiNzI4MDsgXG4gICAgICAgICAgZm9udC1zaXplOiAxNnB4OyBcbiAgICAgICAgICBtYXJnaW46IDhweCAwIDAgMDsgXG4gICAgICAgIH1cbiAgICAgICAgLnNlY3Rpb24geyBcbiAgICAgICAgICBtYXJnaW46IDI1cHggMDsgXG4gICAgICAgICAgcGFkZGluZzogMjBweDsgXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4OyBcbiAgICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICMzYjgyZjY7IFxuICAgICAgICB9XG4gICAgICAgIC5zZWN0aW9uIGgyIHsgXG4gICAgICAgICAgY29sb3I6ICMxZTQwYWY7IFxuICAgICAgICAgIG1hcmdpbjogMCAwIDE1cHggMDsgXG4gICAgICAgICAgZm9udC1zaXplOiAyMHB4OyBcbiAgICAgICAgfVxuICAgICAgICAuaW5mby1ncmlkIHsgXG4gICAgICAgICAgZGlzcGxheTogZ3JpZDsgXG4gICAgICAgICAgZ2FwOiAxMnB4OyBcbiAgICAgICAgfVxuICAgICAgICAuaW5mby1pdGVtIHsgXG4gICAgICAgICAgZGlzcGxheTogZmxleDsgXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBcbiAgICAgICAgICBwYWRkaW5nOiA4cHggMDsgXG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNWU3ZWI7IFxuICAgICAgICB9XG4gICAgICAgIC5pbmZvLWl0ZW06bGFzdC1jaGlsZCB7IFxuICAgICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7IFxuICAgICAgICB9XG4gICAgICAgIC5pbmZvLWxhYmVsIHsgXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDsgXG4gICAgICAgICAgY29sb3I6ICMzNzQxNTE7IFxuICAgICAgICAgIG1pbi13aWR0aDogMTQwcHg7IFxuICAgICAgICB9XG4gICAgICAgIC5pbmZvLXZhbHVlIHsgXG4gICAgICAgICAgY29sb3I6ICM2YjcyODA7IFxuICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0OyBcbiAgICAgICAgfVxuICAgICAgICAucmVjb21tZW5kYXRpb24geyBcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjM2I4MmY2LCAjMWQ0ZWQ4KTsgXG4gICAgICAgICAgY29sb3I6IHdoaXRlOyBcbiAgICAgICAgICBwYWRkaW5nOiAyMHB4OyBcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4OyBcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IFxuICAgICAgICAgIG1hcmdpbjogMzBweCAwOyBcbiAgICAgICAgfVxuICAgICAgICAucmVjb21tZW5kYXRpb24gaDMgeyBcbiAgICAgICAgICBtYXJnaW46IDAgMCAxMHB4IDA7IFxuICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDsgXG4gICAgICAgIH1cbiAgICAgICAgLnJlY29tbWVuZGF0aW9uIC5wbGFuLW5hbWUgeyBcbiAgICAgICAgICBmb250LXNpemU6IDMycHg7IFxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyBcbiAgICAgICAgICBtYXJnaW46IDEwcHggMDsgXG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRhY3QtaW5mbyB7IFxuICAgICAgICAgIGJhY2tncm91bmQ6ICNmMWY1Zjk7IFxuICAgICAgICAgIHBhZGRpbmc6IDIwcHg7IFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDsgXG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyBcbiAgICAgICAgICBtYXJnaW4tdG9wOiAzMHB4OyBcbiAgICAgICAgfVxuICAgICAgICAuY29udGFjdC1pbmZvIGgzIHsgXG4gICAgICAgICAgY29sb3I6ICMxZTQwYWY7IFxuICAgICAgICAgIG1hcmdpbjogMCAwIDE1cHggMDsgXG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRhY3QtaXRlbSB7IFxuICAgICAgICAgIG1hcmdpbjogOHB4IDA7IFxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7IFxuICAgICAgICB9XG4gICAgICAgIC50aW1lc3RhbXAgeyBcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IFxuICAgICAgICAgIGNvbG9yOiAjOWNhM2FmOyBcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7IFxuICAgICAgICAgIG1hcmdpbi10b3A6IDMwcHg7IFxuICAgICAgICAgIHBhZGRpbmctdG9wOiAyMHB4OyBcbiAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2U1ZTdlYjsgXG4gICAgICAgIH1cbiAgICAgICAgLnV0bS1pbmZvIHsgXG4gICAgICAgICAgYmFja2dyb3VuZDogI2ZlZjNjNzsgXG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2Y1OWUwYjsgXG4gICAgICAgICAgcGFkZGluZzogMTVweDsgXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4OyBcbiAgICAgICAgICBtYXJnaW46IDIwcHggMDsgXG4gICAgICAgIH1cbiAgICAgICAgLnV0bS1pbmZvIGg0IHsgXG4gICAgICAgICAgY29sb3I6ICM5MjQwMGU7IFxuICAgICAgICAgIG1hcmdpbjogMCAwIDEwcHggMDsgXG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG4gICAgPC9oZWFkPlxuICAgIDxib2R5PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgPGgxPlx1RDgzQ1x1REZFMCBOT1ZBIENPVEFcdTAwQzdcdTAwQzNPIFJFQ0VCSURBPC9oMT5cbiAgICAgICAgICA8cCBjbGFzcz1cInN1YnRpdGxlXCI+WnVyaWNoIFNlZ3VybyBSZXNpZFx1MDBFQW5jaWE8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZjhmYWZjO1wiPlxuICAgICAgICAgIDxoMiBzdHlsZT1cImNvbG9yOiAjMDU5NjY5O1wiPlx1RDgzRFx1REM2NCBEYWRvcyBkbyBDbGllbnRlPC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1ncmlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPk5vbWU6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj48c3Ryb25nPiR7ZGF0YS5uYW1lfTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5XaGF0c0FwcDo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPjxzdHJvbmc+JHtkYXRhLnBob25lfTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5Db21vIGNvbmhlY2V1Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtmb3JtYXRIb3dEaWRZb3VIZWFyKGRhdGEuaG93RGlkWW91SGVhcil9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmVmYmYzO1wiPlxuICAgICAgICAgIDxoMiBzdHlsZT1cImNvbG9yOiAjZDk3NzA2O1wiPlx1RDgzQ1x1REZFMSBQZXJmaWwgZGEgUmVzaWRcdTAwRUFuY2lhPC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1ncmlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPlRpcG86PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj4ke2Zvcm1hdFByb3BlcnR5VHlwZShkYXRhLnByb3BlcnR5VHlwZSl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPlZhbG9yIGVzdGltYWRvOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtmb3JtYXRQcm9wZXJ0eVZhbHVlKGRhdGEucHJvcGVydHlWYWx1ZSl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPlByaW9yaWRhZGU6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj4ke2Zvcm1hdE1haW5Qcmlvcml0eShkYXRhLm1haW5Qcmlvcml0eSl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPk9yXHUwMEU3YW1lbnRvOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtmb3JtYXRCdWRnZXRSYW5nZShkYXRhLmJ1ZGdldFJhbmdlKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlY29tbWVuZGF0aW9uXCI+XG4gICAgICAgICAgPGgzPlx1RDgzQ1x1REZBRiBSZWNvbWVuZGFcdTAwRTdcdTAwRTNvIGRvIFNpc3RlbWE8L2gzPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGFuLW5hbWVcIj5QTEFOTyAke2RhdGEucmVjb21tZW5kZWRQbGFuLnRvVXBwZXJDYXNlKCl9PC9kaXY+XG4gICAgICAgICAgPHA+UGxhbm8gc3VnZXJpZG8gYmFzZWFkbyBubyBwZXJmaWwgZG8gY2xpZW50ZTwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgJHtkYXRhLnV0bV9zb3VyY2UgPyBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1dG0taW5mb1wiPlxuICAgICAgICAgIDxoND5cdUQ4M0RcdURDQ0EgT3JpZ2VtIGRvIExlYWQ8L2g0PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWdyaWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLWxhYmVsXCI+Rm9udGU6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj4ke2RhdGEudXRtX3NvdXJjZX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICR7ZGF0YS51dG1fbWVkaXVtID8gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5NZWlvOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtkYXRhLnV0bV9tZWRpdW19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgIDogJyd9XG4gICAgICAgICAgICAke2RhdGEudXRtX2NhbXBhaWduID8gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5DYW1wYW5oYTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPiR7ZGF0YS51dG1fY2FtcGFpZ259PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgIDogJyd9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgIDogJyd9XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhY3QtaW5mb1wiPlxuICAgICAgICAgIDxoMz5cdUQ4M0RcdURFODAgUHJcdTAwRjN4aW1vcyBQYXNzb3M8L2gzPlxuICAgICAgICAgIDxwPjxzdHJvbmc+Q2xpZW50ZSBxdWVyIHJlY2ViZXIgY290YVx1MDBFN1x1MDBFM28gcGVyc29uYWxpemFkYSE8L3N0cm9uZz48L3A+XG4gICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDE1cHggMDtcIj5FbnRyZSBlbSBjb250YXRvIG8gbWFpcyByXHUwMEUxcGlkbyBwb3NzXHUwMEVEdmVsOjwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFjdC1pdGVtXCI+XHVEODNEXHVEQ0YxIFdoYXRzQXBwOiAke2RhdGEucGhvbmV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhY3QtaXRlbVwiPlx1RDgzRFx1REM2NCBOb21lOiAke2RhdGEubmFtZX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRpbWVzdGFtcFwiPlxuICAgICAgICAgIDxwPlx1RDgzRFx1RENDNSBDb3RhXHUwMEU3XHUwMEUzbyBzb2xpY2l0YWRhIGVtOiA8c3Ryb25nPiR7dGltZXN0YW1wfTwvc3Ryb25nPjwvcD5cbiAgICAgICAgICA8cCBzdHlsZT1cImZvbnQtc2l6ZTogMTJweDsgY29sb3I6ICM2YjcyODA7IG1hcmdpbi10b3A6IDEwcHg7XCI+XG4gICAgICAgICAgICBTaXN0ZW1hIGF1dG9tYXRpemFkbyAtIEouSi4gQW1vcmltIFNlZ3Vyb3NcbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9ib2R5PlxuICAgIDwvaHRtbD5cbiAgYDtcbn07XG5cbi8vIFBsdWdpbiBwYXJhIGFkaWNpb25hciBzZXJ2aWRvciBBUElcbmZ1bmN0aW9uIGFwaVNlcnZlclBsdWdpbigpIHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiAnYXBpLXNlcnZlcicsXG4gICAgY29uZmlndXJlU2VydmVyKHNlcnZlcjogYW55KSB7XG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKCcvYXBpJywgZXhwcmVzcy5qc29uKCkpXG4gICAgICBcbiAgICAgIC8vIEluaXRpYWxpemUgUmVzZW5kXG4gICAgICBjb25zdCByZXNlbmQgPSBuZXcgUmVzZW5kKHByb2Nlc3MuZW52LlJFU0VORF9BUElfS0VZIHx8ICdyZV9XRm5TQlpZbl9GcVpnUmRGMzJydGNnM1p6dU5OM1ZvM1cnKTtcblxuICAgICAgLy8gQVBJIFJvdXRlc1xuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgnL2FwaS9zZW5kLWVtYWlsJywgYXN5bmMgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ1BPU1QnKSB7XG4gICAgICAgICAgcmVzLndyaXRlSGVhZCg0MDUsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdNZXRob2Qgbm90IGFsbG93ZWQnIH0pKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHsgZm9ybURhdGEgfSA9IHJlcS5ib2R5O1xuICAgICAgICAgIFxuICAgICAgICAgIGlmICghZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdGb3JtIGRhdGEgaXMgcmVxdWlyZWQnIH0pKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zb2xlLmxvZygnXHVEODNEXHVEQ0U3IFNlbmRpbmcgZW1haWwgZm9yOicsIGZvcm1EYXRhLm5hbWUpO1xuXG4gICAgICAgICAgLy8gUHJlcGFyZSBlbWFpbCBkYXRhIHdpdGggdGltZXN0YW1wXG4gICAgICAgICAgY29uc3QgZW1haWxEYXRhID0ge1xuICAgICAgICAgICAgLi4uZm9ybURhdGEsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgIHVzZXJBZ2VudDogcmVxLmhlYWRlcnNbJ3VzZXItYWdlbnQnXSB8fCAnVW5rbm93bidcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gU2VuZCBlbWFpbCB2aWEgUmVzZW5kXG4gICAgICAgICAgY29uc3QgeyBkYXRhLCBlcnJvciB9ID0gYXdhaXQgcmVzZW5kLmVtYWlscy5zZW5kKHtcbiAgICAgICAgICAgIGZyb206ICdTaXN0ZW1hIENvdGFcdTAwRTdcdTAwRTNvIDxub3JlcGx5QHJlc2VuZC5kZXY+JyxcbiAgICAgICAgICAgIHRvOiBbJ2NvbnRhdG9AamphbW9yaW1zZWd1cm9zLmNvbS5iciddLFxuICAgICAgICAgICAgc3ViamVjdDogYFx1RDgzQ1x1REZFMCBOb3ZhIENvdGFcdTAwRTdcdTAwRTNvIC0gJHtlbWFpbERhdGEubmFtZX0gLSBQbGFubyAke2VtYWlsRGF0YS5yZWNvbW1lbmRlZFBsYW59YCxcbiAgICAgICAgICAgIGh0bWw6IGNyZWF0ZUVtYWlsSFRNTChlbWFpbERhdGEpLFxuICAgICAgICAgICAgdGV4dDogYE5vdmEgY290YVx1MDBFN1x1MDBFM28gZGUgJHtlbWFpbERhdGEubmFtZX0gcGFyYSBvIHBsYW5vICR7ZW1haWxEYXRhLnJlY29tbWVuZGVkUGxhbn0uIFdoYXRzQXBwOiAke2VtYWlsRGF0YS5waG9uZX1gXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1x1Mjc0QyBSZXNlbmQgZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmVzLndyaXRlSGVhZCg1MDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0ZhaWxlZCB0byBzZW5kIGVtYWlsJywgZGV0YWlsczogZXJyb3IgfSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdcdTI3MDUgRW1haWwgc2VudCBzdWNjZXNzZnVsbHk6JywgZGF0YSk7XG4gICAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSwgZGF0YSB9KSk7XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1x1Mjc0QyBTZXJ2ZXIgZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoNTAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJywgZGV0YWlsczogZXJyb3IubWVzc2FnZSB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBIZWFsdGggY2hlY2tcbiAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoJy9hcGkvaGVhbHRoJywgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xuICAgICAgICByZXMud3JpdGVIZWFkKDIwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgc3RhdHVzOiAnT0snLCB0aW1lc3RhbXA6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSB9KSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBhcGlTZXJ2ZXJQbHVnaW4oKV0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGluY2x1ZGU6IFsnQHN1cGFiYXNlL3N1cGFiYXNlLWpzJ11cbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBtYW51YWxDaHVua3M6IHVuZGVmaW5lZCwgLy8gRXZpdGEgcHJvYmxlbWFzIGRlIGNodW5rIGxvYWRpbmdcbiAgICAgIH1cbiAgICB9LFxuICAgIGNodW5rU2l6ZVdhcm5pbmdMaW1pdDogMTAwMCxcbiAgICBzb3VyY2VtYXA6IGZhbHNlIC8vIFJlZHV6IHRhbWFuaG8gZSBwcm9ibGVtYXMgZGUgZGVidWdcbiAgfSxcbiAgc2VydmVyOiB7XG4gICAgdGltZW91dDogMTIwMDAwLCAvLyAyIG1pbnV0b3MgZGUgdGltZW91dFxuICAgIGhtcjoge1xuICAgICAgdGltZW91dDogNjAwMDAgLy8gMSBtaW51dG8gcGFyYSBITVJcbiAgICB9XG4gIH0sXG4gIHByZXZpZXc6IHtcbiAgICB0aW1lb3V0OiAxMjAwMDBcbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNk0sU0FBUyxvQkFBb0I7QUFDMU8sT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLGFBQWE7QUFFcEIsU0FBUyxjQUFjO0FBTHZCLElBQU0sbUNBQW1DO0FBUXpDLElBQU0scUJBQXFCLENBQUMsU0FBeUI7QUFDbkQsTUFBSSxDQUFDLFFBQVEsT0FBTyxTQUFTLFNBQVUsUUFBTztBQUM5QyxRQUFNLFFBQWdDO0FBQUEsSUFDcEMsZUFBZTtBQUFBLElBQ2YsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBLEVBQ2I7QUFDQSxTQUFPLE1BQU0sS0FBSyxZQUFZLENBQUMsS0FBSztBQUN0QztBQUVBLElBQU0sc0JBQXNCLENBQUMsVUFBMEI7QUFDckQsTUFBSSxDQUFDLFNBQVMsT0FBTyxVQUFVLFNBQVUsUUFBTztBQUNoRCxRQUFNLFNBQWlDO0FBQUEsSUFDckMsWUFBWTtBQUFBLElBQ1osWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsWUFBWTtBQUFBLEVBQ2Q7QUFDQSxTQUFPLE9BQU8sTUFBTSxZQUFZLENBQUMsS0FBSztBQUN4QztBQUVBLElBQU0scUJBQXFCLENBQUMsYUFBNkI7QUFDdkQsTUFBSSxDQUFDLFlBQVksT0FBTyxhQUFhLFNBQVUsUUFBTztBQUN0RCxRQUFNLGFBQXFDO0FBQUEsSUFDekMsU0FBUztBQUFBLElBQ1QsZUFBZTtB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
