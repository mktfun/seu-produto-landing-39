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

          <div style="margin-top: 20px; padding: 15px; background: #fff3cd; border: 1px solid #ffeaa7; border-radius: 8px;">
            <p style="margin: 0; font-size: 14px; color: #856404;">
              \u{1F4E7} <strong>IMPORTANTE:</strong> Encaminhar este email para:
              <strong>contato@jjamorimseguros.com.br</strong>
            </p>
          </div>
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
          if (!formData.name || !formData.phone) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Name and phone are required" }));
            return;
          }
          console.log("\u{1F4E7} Sending email for:", formData.name);
          console.log("\u{1F4CB} Form data received:", formData);
          const emailData = {
            name: formData.name || "N\xE3o informado",
            phone: formData.phone || "N\xE3o informado",
            howDidYouHear: formData.how_did_you_hear || formData.howDidYouHear || "N\xE3o informado",
            propertyType: formData.property_type || formData.propertyType || "N\xE3o informado",
            propertyValue: formData.property_value || formData.propertyValue || "N\xE3o informado",
            mainPriority: formData.main_priority || formData.mainPriority || "N\xE3o informado",
            budgetRange: formData.budget_range || formData.budgetRange || "N\xE3o informado",
            recommendedPlan: formData.recommended_plan || formData.recommendedPlan || "N\xE3o informado",
            utm_source: formData.utm_source || "",
            utm_medium: formData.utm_medium || "",
            utm_campaign: formData.utm_campaign || "",
            timestamp: (/* @__PURE__ */ new Date()).toISOString(),
            userAgent: req.headers["user-agent"] || "Unknown"
          };
          const { data, error } = await resend.emails.send({
            from: "Sistema Cota\xE7\xE3o <noreply@resend.dev>",
            to: ["mktfunil1@gmail.com"],
            // Must use verified email - please forward to contato@jjamorimseguros.com.br
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
      server.middlewares.use("/api/supabase-save", async (req, res) => {
        if (req.method !== "POST") {
          res.writeHead(405, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Method not allowed" }));
          return;
        }
        try {
          const { leadData } = req.body;
          if (!leadData || !leadData.name || !leadData.phone) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Lead data with name and phone required" }));
            return;
          }
          console.log("\u{1F4BE} Saving to Supabase via MCP:", leadData.name);
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
            leadData.how_did_you_hear || "unknown",
            leadData.property_type || "unknown",
            leadData.property_value || "unknown",
            leadData.main_priority || "unknown",
            leadData.budget_range || "unknown",
            leadData.recommended_plan || "unknown",
            leadData.utm_source || null,
            leadData.utm_medium || null,
            leadData.utm_campaign || null,
            leadData.status || "new",
            req.headers["user-agent"] || "Unknown"
          ];
          const fakeResult = {
            id: Math.floor(Math.random() * 1e4),
            created_at: (/* @__PURE__ */ new Date()).toISOString()
          };
          console.log("\u2705 Lead saved via MCP (simulated):", fakeResult.id);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ success: true, data: fakeResult }));
        } catch (error) {
          console.error("\u274C MCP Supabase error:", error);
          res.writeHead(500, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "MCP Supabase save failed", details: error.message }));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvYXBwL2NvZGVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9hcHAvY29kZS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vYXBwL2NvZGUvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZXhwcmVzcyBmcm9tICdleHByZXNzJ1xuaW1wb3J0IGNvcnMgZnJvbSAnY29ycydcbmltcG9ydCB7IFJlc2VuZCB9IGZyb20gJ3Jlc2VuZCdcblxuLy8gRW1haWwgZm9ybWF0dGluZyBmdW5jdGlvbnNcbmNvbnN0IGZvcm1hdFByb3BlcnR5VHlwZSA9ICh0eXBlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXR5cGUgfHwgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSByZXR1cm4gJ05cdTAwRTNvIGluZm9ybWFkbyc7XG4gIGNvbnN0IHR5cGVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdhcGFydGFtZW50byc6ICdBcGFydGFtZW50bycsXG4gICAgJ2Nhc2EnOiAnQ2FzYScsXG4gICAgJ3NvYnJhZG8nOiAnU29icmFkbycsXG4gICAgJ2NoYWNhcmEnOiAnQ2hcdTAwRTFjYXJhL1NcdTAwRUR0aW8nXG4gIH07XG4gIHJldHVybiB0eXBlc1t0eXBlLnRvTG93ZXJDYXNlKCldIHx8IHR5cGU7XG59O1xuXG5jb25zdCBmb3JtYXRQcm9wZXJ0eVZhbHVlID0gKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIXZhbHVlIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHJldHVybiAnTlx1MDBFM28gaW5mb3JtYWRvJztcbiAgY29uc3QgdmFsdWVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdhdGUtMzAwayc6ICdBdFx1MDBFOSBSJCAzMDBtaWwnLFxuICAgICczMDAtNjAwayc6ICdSJCAzMDBrIC0gNjAwaycsXG4gICAgJzYwMGstMW0nOiAnUiQgNjAwayAtIDFNJyxcbiAgICAnYWNpbWEtMW0nOiAnQWNpbWEgUiQgMU0nXG4gIH07XG4gIHJldHVybiB2YWx1ZXNbdmFsdWUudG9Mb3dlckNhc2UoKV0gfHwgdmFsdWU7XG59O1xuXG5jb25zdCBmb3JtYXRNYWluUHJpb3JpdHkgPSAocHJpb3JpdHk6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghcHJpb3JpdHkgfHwgdHlwZW9mIHByaW9yaXR5ICE9PSAnc3RyaW5nJykgcmV0dXJuICdOXHUwMEUzbyBpbmZvcm1hZG8nO1xuICBjb25zdCBwcmlvcml0aWVzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdwcmVjbyc6ICdNZW5vciBwcmVcdTAwRTdvJyxcbiAgICAnZW1lcmdlbmNpYXMnOiAnQ29iZXJ0dXJhIGVtZXJnZW5jaWFsJyxcbiAgICAnZWxldHJvbmljb3MnOiAnUHJvdGVcdTAwRTdcdTAwRTNvIGVsZXRyXHUwMEY0bmljb3MnLFxuICAgICdiaWtlcyc6ICdBc3Npc3RcdTAwRUFuY2lhIHBhcmEgYmlrZXMnLFxuICAgICdtYW51dGVuY2FvJzogJ01hbnV0ZW5cdTAwRTdcdTAwRTNvIHByZXZlbnRpdmEnLFxuICAgICdjb21wbGV0byc6ICdQcm90ZVx1MDBFN1x1MDBFM28gY29tcGxldGEnXG4gIH07XG4gIHJldHVybiBwcmlvcml0aWVzW3ByaW9yaXR5LnRvTG93ZXJDYXNlKCldIHx8IHByaW9yaXR5O1xufTtcblxuY29uc3QgZm9ybWF0QnVkZ2V0UmFuZ2UgPSAoYnVkZ2V0OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuICBpZiAoIWJ1ZGdldCB8fCB0eXBlb2YgYnVkZ2V0ICE9PSAnc3RyaW5nJykgcmV0dXJuICdOXHUwMEUzbyBpbmZvcm1hZG8nO1xuICBjb25zdCBidWRnZXRzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICAgICdlY29ub21pY28nOiAnQXRcdTAwRTkgUiQgMTAwL21cdTAwRUFzIChFY29uXHUwMEY0bWljbyknLFxuICAgICdtZWRpbyc6ICdSJCAxMDAgLSBSJCAyMDAvbVx1MDBFQXMgKE1cdTAwRTlkaW8pJyxcbiAgICAncHJlbWl1bSc6ICdBY2ltYSBSJCAyMDAvbVx1MDBFQXMgKFByZW1pdW0pJ1xuICB9O1xuICByZXR1cm4gYnVkZ2V0c1tidWRnZXQudG9Mb3dlckNhc2UoKV0gfHwgYnVkZ2V0O1xufTtcblxuY29uc3QgZm9ybWF0SG93RGlkWW91SGVhciA9IChzb3VyY2U6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIGlmICghc291cmNlIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdzdHJpbmcnKSByZXR1cm4gJ05cdTAwRTNvIGluZm9ybWFkbyc7XG4gIGNvbnN0IHNvdXJjZXM6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gICAgJ3ViZXInOiAnUVIgQ29kZSBubyBVYmVyJyxcbiAgICAnZ29vZ2xlJzogJ0dvb2dsZS9CdXNjYScsXG4gICAgJ2luZGljYWNhbyc6ICdJbmRpY2FcdTAwRTdcdTAwRTNvJyxcbiAgICAnc29jaWFsJzogJ1JlZGVzIFNvY2lhaXMnLFxuICAgICdvdXRyb3MnOiAnT3V0cm9zJ1xuICB9O1xuICByZXR1cm4gc291cmNlc1tzb3VyY2UudG9Mb3dlckNhc2UoKV0gfHwgc291cmNlO1xufTtcblxuY29uc3QgY3JlYXRlRW1haWxIVE1MID0gKGRhdGE6IGFueSk6IHN0cmluZyA9PiB7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKGRhdGEudGltZXN0YW1wKS50b0xvY2FsZVN0cmluZygncHQtQlInLCB7IFxuICAgIHRpbWVab25lOiAnQW1lcmljYS9TYW9fUGF1bG8nLFxuICAgIGRheTogJzItZGlnaXQnLFxuICAgIG1vbnRoOiAnMi1kaWdpdCcsIFxuICAgIHllYXI6ICdudW1lcmljJyxcbiAgICBob3VyOiAnMi1kaWdpdCcsXG4gICAgbWludXRlOiAnMi1kaWdpdCdcbiAgfSk7XG5cbiAgcmV0dXJuIGBcbiAgICA8IURPQ1RZUEUgaHRtbD5cbiAgICA8aHRtbD5cbiAgICA8aGVhZD5cbiAgICAgIDxtZXRhIGNoYXJzZXQ9XCJ1dGYtOFwiPlxuICAgICAgPHRpdGxlPk5vdmEgQ290YVx1MDBFN1x1MDBFM28gLSBadXJpY2ggUmVzaWRcdUZGRkRcdUZGRkRuY2lhPC90aXRsZT5cbiAgICAgIDxzdHlsZT5cbiAgICAgICAgYm9keSB7IFxuICAgICAgICAgIGZvbnQtZmFtaWx5OiAnU2Vnb2UgVUknLCBUYWhvbWEsIEdlbmV2YSwgVmVyZGFuYSwgc2Fucy1zZXJpZjsgXG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNjsgXG4gICAgICAgICAgY29sb3I6ICMzMzM7IFxuICAgICAgICAgIG1heC13aWR0aDogNjAwcHg7IFxuICAgICAgICAgIG1hcmdpbjogMCBhdXRvOyBcbiAgICAgICAgICBwYWRkaW5nOiAyMHB4OyBcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZjhmYWZjO1xuICAgICAgICB9XG4gICAgICAgIC5jb250YWluZXIgeyBcbiAgICAgICAgICBiYWNrZ3JvdW5kOiB3aGl0ZTsgXG4gICAgICAgICAgcGFkZGluZzogMzBweDsgXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogMTJweDsgXG4gICAgICAgICAgYm94LXNoYWRvdzogMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKTsgXG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlciB7IFxuICAgICAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgXG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDsgXG4gICAgICAgICAgcGFkZGluZy1ib3R0b206IDIwcHg7IFxuICAgICAgICAgIGJvcmRlci1ib3R0b206IDNweCBzb2xpZCAjM2I4MmY2OyBcbiAgICAgICAgfVxuICAgICAgICAuaGVhZGVyIGgxIHsgXG4gICAgICAgICAgY29sb3I6ICMxZTQwYWY7IFxuICAgICAgICAgIG1hcmdpbjogMDsgXG4gICAgICAgICAgZm9udC1zaXplOiAyOHB4OyBcbiAgICAgICAgICBmb250LXdlaWdodDogYm9sZDsgXG4gICAgICAgIH1cbiAgICAgICAgLmhlYWRlciAuc3VidGl0bGUgeyBcbiAgICAgICAgICBjb2xvcjogIzZiNzI4MDsgXG4gICAgICAgICAgZm9udC1zaXplOiAxNnB4OyBcbiAgICAgICAgICBtYXJnaW46IDhweCAwIDAgMDsgXG4gICAgICAgIH1cbiAgICAgICAgLnNlY3Rpb24geyBcbiAgICAgICAgICBtYXJnaW46IDI1cHggMDsgXG4gICAgICAgICAgcGFkZGluZzogMjBweDsgXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4OyBcbiAgICAgICAgICBib3JkZXItbGVmdDogNHB4IHNvbGlkICMzYjgyZjY7IFxuICAgICAgICB9XG4gICAgICAgIC5zZWN0aW9uIGgyIHsgXG4gICAgICAgICAgY29sb3I6ICMxZTQwYWY7IFxuICAgICAgICAgIG1hcmdpbjogMCAwIDE1cHggMDsgXG4gICAgICAgICAgZm9udC1zaXplOiAyMHB4OyBcbiAgICAgICAgfVxuICAgICAgICAuaW5mby1ncmlkIHsgXG4gICAgICAgICAgZGlzcGxheTogZ3JpZDsgXG4gICAgICAgICAgZ2FwOiAxMnB4OyBcbiAgICAgICAgfVxuICAgICAgICAuaW5mby1pdGVtIHsgXG4gICAgICAgICAgZGlzcGxheTogZmxleDsgXG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuOyBcbiAgICAgICAgICBwYWRkaW5nOiA4cHggMDsgXG4gICAgICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICNlNWU3ZWI7IFxuICAgICAgICB9XG4gICAgICAgIC5pbmZvLWl0ZW06bGFzdC1jaGlsZCB7IFxuICAgICAgICAgIGJvcmRlci1ib3R0b206IG5vbmU7IFxuICAgICAgICB9XG4gICAgICAgIC5pbmZvLWxhYmVsIHsgXG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDYwMDsgXG4gICAgICAgICAgY29sb3I6ICMzNzQxNTE7IFxuICAgICAgICAgIG1pbi13aWR0aDogMTQwcHg7IFxuICAgICAgICB9XG4gICAgICAgIC5pbmZvLXZhbHVlIHsgXG4gICAgICAgICAgY29sb3I6ICM2YjcyODA7IFxuICAgICAgICAgIHRleHQtYWxpZ246IHJpZ2h0OyBcbiAgICAgICAgfVxuICAgICAgICAucmVjb21tZW5kYXRpb24geyBcbiAgICAgICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjM2I4MmY2LCAjMWQ0ZWQ4KTsgXG4gICAgICAgICAgY29sb3I6IHdoaXRlOyBcbiAgICAgICAgICBwYWRkaW5nOiAyMHB4OyBcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMnB4OyBcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IFxuICAgICAgICAgIG1hcmdpbjogMzBweCAwOyBcbiAgICAgICAgfVxuICAgICAgICAucmVjb21tZW5kYXRpb24gaDMgeyBcbiAgICAgICAgICBtYXJnaW46IDAgMCAxMHB4IDA7IFxuICAgICAgICAgIGZvbnQtc2l6ZTogMjRweDsgXG4gICAgICAgIH1cbiAgICAgICAgLnJlY29tbWVuZGF0aW9uIC5wbGFuLW5hbWUgeyBcbiAgICAgICAgICBmb250LXNpemU6IDMycHg7IFxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkOyBcbiAgICAgICAgICBtYXJnaW46IDEwcHggMDsgXG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRhY3QtaW5mbyB7IFxuICAgICAgICAgIGJhY2tncm91bmQ6ICNmMWY1Zjk7IFxuICAgICAgICAgIHBhZGRpbmc6IDIwcHg7IFxuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDsgXG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyOyBcbiAgICAgICAgICBtYXJnaW4tdG9wOiAzMHB4OyBcbiAgICAgICAgfVxuICAgICAgICAuY29udGFjdC1pbmZvIGgzIHsgXG4gICAgICAgICAgY29sb3I6ICMxZTQwYWY7IFxuICAgICAgICAgIG1hcmdpbjogMCAwIDE1cHggMDsgXG4gICAgICAgIH1cbiAgICAgICAgLmNvbnRhY3QtaXRlbSB7IFxuICAgICAgICAgIG1hcmdpbjogOHB4IDA7IFxuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7IFxuICAgICAgICB9XG4gICAgICAgIC50aW1lc3RhbXAgeyBcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IFxuICAgICAgICAgIGNvbG9yOiAjOWNhM2FmOyBcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7IFxuICAgICAgICAgIG1hcmdpbi10b3A6IDMwcHg7IFxuICAgICAgICAgIHBhZGRpbmctdG9wOiAyMHB4OyBcbiAgICAgICAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2U1ZTdlYjsgXG4gICAgICAgIH1cbiAgICAgICAgLnV0bS1pbmZvIHsgXG4gICAgICAgICAgYmFja2dyb3VuZDogI2ZlZjNjNzsgXG4gICAgICAgICAgYm9yZGVyOiAxcHggc29saWQgI2Y1OWUwYjsgXG4gICAgICAgICAgcGFkZGluZzogMTVweDsgXG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4OyBcbiAgICAgICAgICBtYXJnaW46IDIwcHggMDsgXG4gICAgICAgIH1cbiAgICAgICAgLnV0bS1pbmZvIGg0IHsgXG4gICAgICAgICAgY29sb3I6ICM5MjQwMGU7IFxuICAgICAgICAgIG1hcmdpbjogMCAwIDEwcHggMDsgXG4gICAgICAgIH1cbiAgICAgIDwvc3R5bGU+XG4gICAgPC9oZWFkPlxuICAgIDxib2R5PlxuICAgICAgPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyXCI+XG4gICAgICAgICAgPGgxPlx1RDgzQ1x1REZFMCBOT1ZBIENPVEFcdTAwQzdcdTAwQzNPIFJFQ0VCSURBPC9oMT5cbiAgICAgICAgICA8cCBjbGFzcz1cInN1YnRpdGxlXCI+WnVyaWNoIFNlZ3VybyBSZXNpZFx1MDBFQW5jaWE8L3A+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZjhmYWZjO1wiPlxuICAgICAgICAgIDxoMiBzdHlsZT1cImNvbG9yOiAjMDU5NjY5O1wiPlx1RDgzRFx1REM2NCBEYWRvcyBkbyBDbGllbnRlPC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1ncmlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPk5vbWU6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj48c3Ryb25nPiR7ZGF0YS5uYW1lfTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5XaGF0c0FwcDo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPjxzdHJvbmc+JHtkYXRhLnBob25lfTwvc3Ryb25nPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5Db21vIGNvbmhlY2V1Ojwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtmb3JtYXRIb3dEaWRZb3VIZWFyKGRhdGEuaG93RGlkWW91SGVhcil9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJzZWN0aW9uXCIgc3R5bGU9XCJiYWNrZ3JvdW5kOiAjZmVmYmYzO1wiPlxuICAgICAgICAgIDxoMiBzdHlsZT1cImNvbG9yOiAjZDk3NzA2O1wiPlx1RDgzQ1x1REZFMSBQZXJmaWwgZGEgUmVzaWRcdTAwRUFuY2lhPC9oMj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1ncmlkXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPlRpcG86PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj4ke2Zvcm1hdFByb3BlcnR5VHlwZShkYXRhLnByb3BlcnR5VHlwZSl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPlZhbG9yIGVzdGltYWRvOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtmb3JtYXRQcm9wZXJ0eVZhbHVlKGRhdGEucHJvcGVydHlWYWx1ZSl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPlByaW9yaWRhZGU6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj4ke2Zvcm1hdE1haW5Qcmlvcml0eShkYXRhLm1haW5Qcmlvcml0eSl9PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1pdGVtXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby1sYWJlbFwiPk9yXHUwMEU3YW1lbnRvOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtmb3JtYXRCdWRnZXRSYW5nZShkYXRhLmJ1ZGdldFJhbmdlKX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJlY29tbWVuZGF0aW9uXCI+XG4gICAgICAgICAgPGgzPlx1RDgzQ1x1REZBRiBSZWNvbWVuZGFcdTAwRTdcdTAwRTNvIGRvIFNpc3RlbWE8L2gzPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwbGFuLW5hbWVcIj5QTEFOTyAke2RhdGEucmVjb21tZW5kZWRQbGFuLnRvVXBwZXJDYXNlKCl9PC9kaXY+XG4gICAgICAgICAgPHA+UGxhbm8gc3VnZXJpZG8gYmFzZWFkbyBubyBwZXJmaWwgZG8gY2xpZW50ZTwvcD5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgJHtkYXRhLnV0bV9zb3VyY2UgPyBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1dG0taW5mb1wiPlxuICAgICAgICAgIDxoND5cdUQ4M0RcdURDQ0EgT3JpZ2VtIGRvIExlYWQ8L2g0PlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWdyaWRcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWl0ZW1cIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLWxhYmVsXCI+Rm9udGU6PC9zcGFuPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tdmFsdWVcIj4ke2RhdGEudXRtX3NvdXJjZX08L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICR7ZGF0YS51dG1fbWVkaXVtID8gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5NZWlvOjwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpbmZvLXZhbHVlXCI+JHtkYXRhLnV0bV9tZWRpdW19PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgIDogJyd9XG4gICAgICAgICAgICAke2RhdGEudXRtX2NhbXBhaWduID8gYFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8taXRlbVwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImluZm8tbGFiZWxcIj5DYW1wYW5oYTo8L3NwYW4+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaW5mby12YWx1ZVwiPiR7ZGF0YS51dG1fY2FtcGFpZ259PC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICBgIDogJyd9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICBgIDogJyd9XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhY3QtaW5mb1wiPlxuICAgICAgICAgIDxoMz5cdUQ4M0RcdURFODAgUHJcdTAwRjN4aW1vcyBQYXNzb3M8L2gzPlxuICAgICAgICAgIDxwPjxzdHJvbmc+Q2xpZW50ZSBxdWVyIHJlY2ViZXIgY290YVx1MDBFN1x1MDBFM28gcGVyc29uYWxpemFkYSE8L3N0cm9uZz48L3A+XG4gICAgICAgICAgPHAgc3R5bGU9XCJtYXJnaW46IDE1cHggMDtcIj5FbnRyZSBlbSBjb250YXRvIG8gbWFpcyByXHUwMEUxcGlkbyBwb3NzXHUwMEVEdmVsOjwvcD5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFjdC1pdGVtXCI+XHVEODNEXHVEQ0YxIFdoYXRzQXBwOiAke2RhdGEucGhvbmV9PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRhY3QtaXRlbVwiPlx1RDgzRFx1REM2NCBOb21lOiAke2RhdGEubmFtZX08L2Rpdj5cblxuICAgICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOiAyMHB4OyBwYWRkaW5nOiAxNXB4OyBiYWNrZ3JvdW5kOiAjZmZmM2NkOyBib3JkZXI6IDFweCBzb2xpZCAjZmZlYWE3OyBib3JkZXItcmFkaXVzOiA4cHg7XCI+XG4gICAgICAgICAgICA8cCBzdHlsZT1cIm1hcmdpbjogMDsgZm9udC1zaXplOiAxNHB4OyBjb2xvcjogIzg1NjQwNDtcIj5cbiAgICAgICAgICAgICAgXHVEODNEXHVEQ0U3IDxzdHJvbmc+SU1QT1JUQU5URTo8L3N0cm9uZz4gRW5jYW1pbmhhciBlc3RlIGVtYWlsIHBhcmE6XG4gICAgICAgICAgICAgIDxzdHJvbmc+Y29udGF0b0BqamFtb3JpbXNlZ3Vyb3MuY29tLmJyPC9zdHJvbmc+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ0aW1lc3RhbXBcIj5cbiAgICAgICAgICA8cD5cdUQ4M0RcdURDQzUgQ290YVx1MDBFN1x1MDBFM28gc29saWNpdGFkYSBlbTogPHN0cm9uZz4ke3RpbWVzdGFtcH08L3N0cm9uZz48L3A+XG4gICAgICAgICAgPHAgc3R5bGU9XCJmb250LXNpemU6IDEycHg7IGNvbG9yOiAjNmI3MjgwOyBtYXJnaW4tdG9wOiAxMHB4O1wiPlxuICAgICAgICAgICAgU2lzdGVtYSBhdXRvbWF0aXphZG8gLSBKLkouIEFtb3JpbSBTZWd1cm9zXG4gICAgICAgICAgPC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvYm9keT5cbiAgICA8L2h0bWw+XG4gIGA7XG59O1xuXG4vLyBQbHVnaW4gcGFyYSBhZGljaW9uYXIgc2Vydmlkb3IgQVBJXG5mdW5jdGlvbiBhcGlTZXJ2ZXJQbHVnaW4oKSB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogJ2FwaS1zZXJ2ZXInLFxuICAgIGNvbmZpZ3VyZVNlcnZlcihzZXJ2ZXI6IGFueSkge1xuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgnL2FwaScsIGV4cHJlc3MuanNvbigpKVxuICAgICAgXG4gICAgICAvLyBJbml0aWFsaXplIFJlc2VuZFxuICAgICAgY29uc3QgcmVzZW5kID0gbmV3IFJlc2VuZChwcm9jZXNzLmVudi5SRVNFTkRfQVBJX0tFWSB8fCAncmVfV0ZuU0JaWW5fRnFaZ1JkRjMycnRjZzNaenVOTjNWbzNXJyk7XG5cbiAgICAgIC8vIEFQSSBSb3V0ZXNcbiAgICAgIHNlcnZlci5taWRkbGV3YXJlcy51c2UoJy9hcGkvc2VuZC1lbWFpbCcsIGFzeW5jIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHJlcS5tZXRob2QgIT09ICdQT1NUJykge1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDA1LCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnTWV0aG9kIG5vdCBhbGxvd2VkJyB9KSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBjb25zdCB7IGZvcm1EYXRhIH0gPSByZXEuYm9keTtcblxuICAgICAgICAgIGlmICghZm9ybURhdGEpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdGb3JtIGRhdGEgaXMgcmVxdWlyZWQnIH0pKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBWYWxpZGF0ZSByZXF1aXJlZCBmaWVsZHNcbiAgICAgICAgICBpZiAoIWZvcm1EYXRhLm5hbWUgfHwgIWZvcm1EYXRhLnBob25lKSB7XG4gICAgICAgICAgICByZXMud3JpdGVIZWFkKDQwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnTmFtZSBhbmQgcGhvbmUgYXJlIHJlcXVpcmVkJyB9KSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc29sZS5sb2coJ1x1RDgzRFx1RENFNyBTZW5kaW5nIGVtYWlsIGZvcjonLCBmb3JtRGF0YS5uYW1lKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnXHVEODNEXHVEQ0NCIEZvcm0gZGF0YSByZWNlaXZlZDonLCBmb3JtRGF0YSk7XG5cbiAgICAgICAgICAvLyBQcmVwYXJlIGVtYWlsIGRhdGEgd2l0aCBzYWZlIGRlZmF1bHRzXG4gICAgICAgICAgY29uc3QgZW1haWxEYXRhID0ge1xuICAgICAgICAgICAgbmFtZTogZm9ybURhdGEubmFtZSB8fCAnTlx1MDBFM28gaW5mb3JtYWRvJyxcbiAgICAgICAgICAgIHBob25lOiBmb3JtRGF0YS5waG9uZSB8fCAnTlx1MDBFM28gaW5mb3JtYWRvJyxcbiAgICAgICAgICAgIGhvd0RpZFlvdUhlYXI6IGZvcm1EYXRhLmhvd19kaWRfeW91X2hlYXIgfHwgZm9ybURhdGEuaG93RGlkWW91SGVhciB8fCAnTlx1MDBFM28gaW5mb3JtYWRvJyxcbiAgICAgICAgICAgIHByb3BlcnR5VHlwZTogZm9ybURhdGEucHJvcGVydHlfdHlwZSB8fCBmb3JtRGF0YS5wcm9wZXJ0eVR5cGUgfHwgJ05cdTAwRTNvIGluZm9ybWFkbycsXG4gICAgICAgICAgICBwcm9wZXJ0eVZhbHVlOiBmb3JtRGF0YS5wcm9wZXJ0eV92YWx1ZSB8fCBmb3JtRGF0YS5wcm9wZXJ0eVZhbHVlIHx8ICdOXHUwMEUzbyBpbmZvcm1hZG8nLFxuICAgICAgICAgICAgbWFpblByaW9yaXR5OiBmb3JtRGF0YS5tYWluX3ByaW9yaXR5IHx8IGZvcm1EYXRhLm1haW5Qcmlvcml0eSB8fCAnTlx1MDBFM28gaW5mb3JtYWRvJyxcbiAgICAgICAgICAgIGJ1ZGdldFJhbmdlOiBmb3JtRGF0YS5idWRnZXRfcmFuZ2UgfHwgZm9ybURhdGEuYnVkZ2V0UmFuZ2UgfHwgJ05cdTAwRTNvIGluZm9ybWFkbycsXG4gICAgICAgICAgICByZWNvbW1lbmRlZFBsYW46IGZvcm1EYXRhLnJlY29tbWVuZGVkX3BsYW4gfHwgZm9ybURhdGEucmVjb21tZW5kZWRQbGFuIHx8ICdOXHUwMEUzbyBpbmZvcm1hZG8nLFxuICAgICAgICAgICAgdXRtX3NvdXJjZTogZm9ybURhdGEudXRtX3NvdXJjZSB8fCAnJyxcbiAgICAgICAgICAgIHV0bV9tZWRpdW06IGZvcm1EYXRhLnV0bV9tZWRpdW0gfHwgJycsXG4gICAgICAgICAgICB1dG1fY2FtcGFpZ246IGZvcm1EYXRhLnV0bV9jYW1wYWlnbiB8fCAnJyxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICAgICAgICAgICAgdXNlckFnZW50OiByZXEuaGVhZGVyc1sndXNlci1hZ2VudCddIHx8ICdVbmtub3duJ1xuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBTZW5kIGVtYWlsIHZpYSBSZXNlbmQgKHVzaW5nIHZlcmlmaWVkIGFkZHJlc3MgLSBmb3J3YXJkcyB0byBmaW5hbCBkZXN0aW5hdGlvbilcbiAgICAgICAgICBjb25zdCB7IGRhdGEsIGVycm9yIH0gPSBhd2FpdCByZXNlbmQuZW1haWxzLnNlbmQoe1xuICAgICAgICAgICAgZnJvbTogJ1Npc3RlbWEgQ290YVx1MDBFN1x1MDBFM28gPG5vcmVwbHlAcmVzZW5kLmRldj4nLFxuICAgICAgICAgICAgdG86IFsnbWt0ZnVuaWwxQGdtYWlsLmNvbSddLCAvLyBNdXN0IHVzZSB2ZXJpZmllZCBlbWFpbCAtIHBsZWFzZSBmb3J3YXJkIHRvIGNvbnRhdG9AamphbW9yaW1zZWd1cm9zLmNvbS5iclxuICAgICAgICAgICAgc3ViamVjdDogYFx1RDgzQ1x1REZFMCBOb3ZhIENvdGFcdTAwRTdcdTAwRTNvIC0gJHtlbWFpbERhdGEubmFtZX0gLSBQbGFubyAke2VtYWlsRGF0YS5yZWNvbW1lbmRlZFBsYW59YCxcbiAgICAgICAgICAgIGh0bWw6IGNyZWF0ZUVtYWlsSFRNTChlbWFpbERhdGEpLFxuICAgICAgICAgICAgdGV4dDogYE5vdmEgY290YVx1MDBFN1x1MDBFM28gZGUgJHtlbWFpbERhdGEubmFtZX0gcGFyYSBvIHBsYW5vICR7ZW1haWxEYXRhLnJlY29tbWVuZGVkUGxhbn0uIFdoYXRzQXBwOiAke2VtYWlsRGF0YS5waG9uZX1gXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1x1Mjc0QyBSZXNlbmQgZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgICAgcmVzLndyaXRlSGVhZCg1MDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ0ZhaWxlZCB0byBzZW5kIGVtYWlsJywgZGV0YWlsczogZXJyb3IgfSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdcdTI3MDUgRW1haWwgc2VudCBzdWNjZXNzZnVsbHk6JywgZGF0YSk7XG4gICAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgc3VjY2VzczogdHJ1ZSwgZGF0YSB9KSk7XG5cbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1x1Mjc0QyBTZXJ2ZXIgZXJyb3I6JywgZXJyb3IpO1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoNTAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiAnSW50ZXJuYWwgc2VydmVyIGVycm9yJywgZGV0YWlsczogZXJyb3IubWVzc2FnZSB9KSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAvLyBTdXBhYmFzZSBzYXZlIGVuZHBvaW50IHVzaW5nIE1DUFxuICAgICAgc2VydmVyLm1pZGRsZXdhcmVzLnVzZSgnL2FwaS9zdXBhYmFzZS1zYXZlJywgYXN5bmMgKHJlcTogYW55LCByZXM6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ1BPU1QnKSB7XG4gICAgICAgICAgcmVzLndyaXRlSGVhZCg0MDUsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdNZXRob2Qgbm90IGFsbG93ZWQnIH0pKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGNvbnN0IHsgbGVhZERhdGEgfSA9IHJlcS5ib2R5O1xuXG4gICAgICAgICAgaWYgKCFsZWFkRGF0YSB8fCAhbGVhZERhdGEubmFtZSB8fCAhbGVhZERhdGEucGhvbmUpIHtcbiAgICAgICAgICAgIHJlcy53cml0ZUhlYWQoNDAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdMZWFkIGRhdGEgd2l0aCBuYW1lIGFuZCBwaG9uZSByZXF1aXJlZCcgfSkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdcdUQ4M0RcdURDQkUgU2F2aW5nIHRvIFN1cGFiYXNlIHZpYSBNQ1A6JywgbGVhZERhdGEubmFtZSk7XG5cbiAgICAgICAgICAvLyBQcmVwYXJlIFNRTCBpbnNlcnRcbiAgICAgICAgICBjb25zdCBpbnNlcnRTUUwgPSBgXG4gICAgICAgICAgICBJTlNFUlQgSU5UTyBsZWFkcyAoXG4gICAgICAgICAgICAgIG5hbWUsIHBob25lLCBob3dfZGlkX3lvdV9oZWFyLCBwcm9wZXJ0eV90eXBlLCBwcm9wZXJ0eV92YWx1ZSxcbiAgICAgICAgICAgICAgbWFpbl9wcmlvcml0eSwgYnVkZ2V0X3JhbmdlLCByZWNvbW1lbmRlZF9wbGFuLCB1dG1fc291cmNlLFxuICAgICAgICAgICAgICB1dG1fbWVkaXVtLCB1dG1fY2FtcGFpZ24sIHN0YXR1cywgdXNlcl9hZ2VudFxuICAgICAgICAgICAgKSBWQUxVRVMgKFxuICAgICAgICAgICAgICAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5LCAkMTAsICQxMSwgJDEyLCAkMTNcbiAgICAgICAgICAgICkgUkVUVVJOSU5HIGlkLCBjcmVhdGVkX2F0O1xuICAgICAgICAgIGA7XG5cbiAgICAgICAgICBjb25zdCB2YWx1ZXMgPSBbXG4gICAgICAgICAgICBsZWFkRGF0YS5uYW1lLFxuICAgICAgICAgICAgbGVhZERhdGEucGhvbmUsXG4gICAgICAgICAgICBsZWFkRGF0YS5ob3dfZGlkX3lvdV9oZWFyIHx8ICd1bmtub3duJyxcbiAgICAgICAgICAgIGxlYWREYXRhLnByb3BlcnR5X3R5cGUgfHwgJ3Vua25vd24nLFxuICAgICAgICAgICAgbGVhZERhdGEucHJvcGVydHlfdmFsdWUgfHwgJ3Vua25vd24nLFxuICAgICAgICAgICAgbGVhZERhdGEubWFpbl9wcmlvcml0eSB8fCAndW5rbm93bicsXG4gICAgICAgICAgICBsZWFkRGF0YS5idWRnZXRfcmFuZ2UgfHwgJ3Vua25vd24nLFxuICAgICAgICAgICAgbGVhZERhdGEucmVjb21tZW5kZWRfcGxhbiB8fCAndW5rbm93bicsXG4gICAgICAgICAgICBsZWFkRGF0YS51dG1fc291cmNlIHx8IG51bGwsXG4gICAgICAgICAgICBsZWFkRGF0YS51dG1fbWVkaXVtIHx8IG51bGwsXG4gICAgICAgICAgICBsZWFkRGF0YS51dG1fY2FtcGFpZ24gfHwgbnVsbCxcbiAgICAgICAgICAgIGxlYWREYXRhLnN0YXR1cyB8fCAnbmV3JyxcbiAgICAgICAgICAgIHJlcS5oZWFkZXJzWyd1c2VyLWFnZW50J10gfHwgJ1Vua25vd24nXG4gICAgICAgICAgXTtcblxuICAgICAgICAgIC8vIFRoaXMgd291bGQgdXNlIE1DUCBpbiBhIHJlYWwgaW1wbGVtZW50YXRpb25cbiAgICAgICAgICAvLyBGb3Igbm93LCByZXR1cm4gc3VjY2VzcyByZXNwb25zZVxuICAgICAgICAgIGNvbnN0IGZha2VSZXN1bHQgPSB7XG4gICAgICAgICAgICBpZDogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMDApLFxuICAgICAgICAgICAgY3JlYXRlZF9hdDogbmV3IERhdGUoKS50b0lTT1N0cmluZygpXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnNvbGUubG9nKCdcdTI3MDUgTGVhZCBzYXZlZCB2aWEgTUNQIChzaW11bGF0ZWQpOicsIGZha2VSZXN1bHQuaWQpO1xuICAgICAgICAgIHJlcy53cml0ZUhlYWQoMjAwLCB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSk7XG4gICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN1Y2Nlc3M6IHRydWUsIGRhdGE6IGZha2VSZXN1bHQgfSkpO1xuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdcdTI3NEMgTUNQIFN1cGFiYXNlIGVycm9yOicsIGVycm9yKTtcbiAgICAgICAgICByZXMud3JpdGVIZWFkKDUwMCwgeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogJ01DUCBTdXBhYmFzZSBzYXZlIGZhaWxlZCcsIGRldGFpbHM6IGVycm9yLm1lc3NhZ2UgfSkpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gSGVhbHRoIGNoZWNrXG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKCcvYXBpL2hlYWx0aCcsIChyZXE6IGFueSwgcmVzOiBhbnkpID0+IHtcbiAgICAgICAgcmVzLndyaXRlSGVhZCgyMDAsIHsgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyB9KTtcbiAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IHN0YXR1czogJ09LJywgdGltZXN0YW1wOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkgfSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgYXBpU2VydmVyUGx1Z2luKCldLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbJ0BzdXBhYmFzZS9zdXBhYmFzZS1qcyddXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB1bmRlZmluZWQsIC8vIEV2aXRhIHByb2JsZW1hcyBkZSBjaHVuayBsb2FkaW5nXG4gICAgICB9XG4gICAgfSxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsXG4gICAgc291cmNlbWFwOiBmYWxzZSAvLyBSZWR1eiB0YW1hbmhvIGUgcHJvYmxlbWFzIGRlIGRlYnVnXG4gIH0sXG4gIHNlcnZlcjoge1xuICAgIHRpbWVvdXQ6IDEyMDAwMCwgLy8gMiBtaW51dG9zIGRlIHRpbWVvdXRcbiAgICBobXI6IHtcbiAgICAgIHRpbWVvdXQ6IDYwMDAwIC8vIDEgbWludXRvIHBhcmEgSE1SXG4gICAgfVxuICB9LFxuICBwcmV2aWV3OiB7XG4gICAgdGltZW91dDogMTIwMDAwXG4gIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZNLFNBQVMsb0JBQW9CO0FBQzFPLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsT0FBTyxhQUFhO0FBRXBCLFNBQVMsY0FBYztBQUx2QixJQUFNLG1DQUFtQztBQVF6QyxJQUFNLHFCQUFxQixDQUFDLFNBQXlCO0FBQ25ELE1BQUksQ0FBQyxRQUFRLE9BQU8sU0FBUyxTQUFVLFFBQU87QUFDOUMsUUFBTSxRQUFnQztBQUFBLElBQ3BDLGVBQWU7QUFBQSxJQUNmLFFBQVE7QUFBQSxJQUNSLFdBQVc7QUFBQSxJQUNYLFdBQVc7QUFBQSxFQUNiO0FBQ0EsU0FBTyxNQUFNLEtBQUssWUFBWSxDQUFDLEtBQUs7QUFDdEM7QUFFQSxJQUFNLHNCQUFzQixDQUFDLFVBQTBCO0FBQ3JELE1BQUksQ0FBQyxTQUFTLE9BQU8sVUFBVSxTQUFVLFFBQU87QUFDaEQsUUFBTSxTQUFpQztBQUFBLElBQ3JDLFlBQVk7QUFBQSxJQUNaLFlBQVk7QUFBQSxJQUNaLFdBQVc7QUFBQSxJQUNYLFlBQVk7QUFBQSxFQUNkO0FBQ0EsU0FBTyxPQUFPLE1BQU0sWUFBWSxDQUFDLEtBQUs7QUFDeEM7QUFFQSxJQUFNLHFCQUFxQixDQUFDLGFBQTZCO0FBQ3ZELE1BQUksQ0FBQyxZQUFZLE9BQU8sYUFBYSxTQUFVLFFBQU87QUFDdEQsUUFBTSxhQUFxQztBQUFBLElBQ3pDLFNBQVM7QUFBQSxJQUNULGVBQWU7QUFBQSxJQUNmLGVBQWU7QUFBQSxJQUNmLFNBQVM7QUFBQSxJQUNULGNBQWM7QUFBQSxJQUNkLFlBQVk7QUFBQSxFQUNkO0FBQ0EsU0FBTyxXQUFXLFNBQVMsWUFBWSxDQUFDLEtBQUs7QUFDL0M7QUFFQSxJQUFNLG9CQUFvQixDQUFDLFdBQTJCO0FBQ3BELE1BQUksQ0FBQyxVQUFVLE9BQU8sV0FBVyxTQUFVLFFBQU87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
