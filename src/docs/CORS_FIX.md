# 🔧 Correção do Erro CORS - Email API

## ❌ Problema Original

```
Access to fetch at 'https://api.resend.com/emails' from origin 'https://...' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

## 🔍 Causa

O navegador bloqueia requests diretos do frontend para a API do Resend por questões de segurança (política CORS).

## ✅ Solução Implementada

### 1. Plugin Vite Integrado
Criamos um plugin Vite que adiciona middleware de API diretamente no servidor de desenvolvimento:

```typescript
// vite.config.ts
function apiServerPlugin() {
  return {
    name: 'api-server',
    configureServer(server) {
      // Adiciona endpoint /api/send-email
      // Faz proxy para Resend do backend
    }
  }
}
```

### 2. Endpoint Local
- **URL**: `http://localhost:5173/api/send-email`
- **Método**: POST
- **Payload**: `{ formData: {...} }`

### 3. Fluxo Atualizado
```
Frontend → /api/send-email → Resend API → Email enviado
```

## 🚀 Benefícios

1. **Sem CORS**: API local não tem restrições
2. **Segurança**: API key fica no servidor
3. **Integrado**: Roda junto com Vite
4. **Simples**: Mesma porta (5173)

## 📁 Arquivos Modificados

### `vite.config.ts`
- Plugin de API integrado
- Middleware para `/api/send-email`
- Formatação de emails no servidor

### `src/services/resendEmailService.ts`
- URL atualizada para `window.location.origin/api/send-email`
- Payload simplificado

### `package.json`
- Dependências Express adicionadas
- Scripts para servidor standalone (opcional)

## 🧪 Como Testar

1. **Health Check**:
   ```bash
   curl http://localhost:5173/api/health
   ```

2. **Formulário**:
   - Acesse `/onboard`
   - Complete todas as etapas
   - Clique "Solicitar Cotação"
   - Verifique console para logs

3. **Verificar Email**:
   - Email deve chegar em `contato@jjamorimseguros.com.br`
   - Console mostra "✅ Email sent successfully"

## 📊 Status Atual

- ✅ **CORS**: Resolvido
- ✅ **API**: Funcionando na porta 5173
- ✅ **Resend**: Integrado no servidor
- ✅ **Frontend**: Atualizado para nova API

## 🔄 Backup

Se precisar reverter, use o `server.js` standalone:
```bash
npm run server  # Porta 3001
```

E ajuste o frontend para `http://localhost:3001/api/send-email`

---

**✅ PROBLEMA RESOLVIDO**: O sistema agora funciona sem erros CORS!
