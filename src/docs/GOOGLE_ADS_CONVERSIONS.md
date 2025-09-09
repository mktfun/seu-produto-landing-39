# Google Ads Conversion Tracking - Configuração

## Conversões Implementadas

### 1. **cotacao_completa** (Conversão Principal)
- **Evento**: Quando usuário completa formulário e email é enviado
- **Valor**: Variável baseado no plano (R$ 150-500)
- **Localização**: `src/pages/Onboard.tsx` - linha ~215
- **Parâmetros**:
  - `plan`: Plano recomendado (Essencial/Completo/Completo+)
  - `property_type`: Tipo de propriedade
  - `property_value`: Valor estimado do imóvel  
  - `budget_range`: Faixa de orçamento
  - `utm_source`: Origem do tráfego
  - `utm_medium`: Meio de aquisição

### 2. **whatsapp_contact** (Conversão Secundária)
- **Evento**: Quando usuário clica para contato via WhatsApp
- **Valor**: R$ 50
- **Localização**: `src/pages/ThankYou.tsx` - linha ~35
- **Parâmetros**:
  - `plan`: Plano recomendado
  - `property_type`: Tipo de propriedade
  - `property_value`: Valor estimado do imóvel

### 3. **formulario_iniciado** (Micro-conversão)
- **Evento**: Quando usuário clica em "Solicitar Cotação"
- **Valor**: R$ 0
- **Localização**: `src/components/Hero.tsx` - linha ~46
- **Parâmetros**:
  - `source`: hero_button
  - `event_category`: engagement
  - `event_label`: cotacao_iniciada

## Configuração do Google Ads

### ID de Conversão: `AW-16801136452`

### Scripts Implementados:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-16801136452"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-16801136452');
</script>
```

## Funções Utilitárias

### `trackConversion(action, value, additionalParams)`
- Envia evento de conversão para Google Ads
- Gera transaction_id único
- Inclui valor em BRL
- Localização: `src/lib/utils.ts`

### `trackEvent(eventName, parameters)`
- Envia evento personalizado
- Para tracking de engajamento
- Localização: `src/lib/utils.ts`

## Valores de Conversão por Plano

| Plano | Valor da Conversão |
|-------|-------------------|
| Essencial | R$ 150 |
| Completo | R$ 300 |
| Completo+ | R$ 500 |

## Próximos Passos

1. **Configurar Conversões no Google Ads**:
   - Criar ação de conversão "cotacao_completa"
   - Criar ação de conversão "whatsapp_contact" 
   - Criar ação de conversão "formulario_iniciado"

2. **Enhanced Conversions** (Opcional):
   - Implementar hash de email/telefone
   - Adicionar dados de usuário enriquecidos

3. **Monitoramento**:
   - Verificar eventos no Google Analytics
   - Validar conversões no Google Ads
   - Ajustar valores conforme performance

## Troubleshooting

### Verificar se eventos estão sendo enviados:
```javascript
// No console do navegador
window.dataLayer
```

### Testar conversões:
1. Preencher formulário completo
2. Verificar console para logs de conversão
3. Checar Google Ads em 24-48h