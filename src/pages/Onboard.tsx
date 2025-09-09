import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, Phone, Star, Crown, Shield, Home, Zap, Users, Heart, Wrench, DollarSign, Smartphone, Bike, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { saveLead, type Lead } from "@/lib/supabase";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { trackConversion, trackEvent } from "@/lib/utils";

const Onboard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    howDidYouHear: "",
    propertyType: "",
    propertyValue: "",
    mainPriority: "",
    budgetRange: "",
    recommendedPlan: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: ""
  });

  const totalSteps = 5;

  // Capture UTM parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmData = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || ''
    };

    setFormData(prev => ({ ...prev, ...utmData }));
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const selectOption = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setTimeout(() => {
      handleNext();
    }, 500);
  };

  const calculateRecommendation = () => {
    let scores = { essencial: 0, completo: 0, completoPlus: 0 };

    // Tipo de propriedade
    if (formData.propertyType === "apartamento") {
      scores.essencial += 2;
      scores.completo += 1;
    } else if (formData.propertyType === "casa") {
      scores.completo += 2;
      scores.completoPlus += 1;
    } else if (formData.propertyType === "sobrado" || formData.propertyType === "chacara") {
      scores.completoPlus += 3;
    }

    // Valor da propriedade
    if (formData.propertyValue === "ate-300k") {
      scores.essencial += 3;
    } else if (formData.propertyValue === "300-600k") {
      scores.completo += 3;
    } else {
      scores.completoPlus += 3;
    }

    // Prioridade principal (agora engloba eletrônicos, bikes, etc)
    if (formData.mainPriority === "preco") {
      scores.essencial += 4;
    } else if (formData.mainPriority === "emergencias") {
      scores.completo += 4;
    } else if (formData.mainPriority === "eletronicos") {
      scores.completo += 4;
      scores.completoPlus += 2;
    } else if (formData.mainPriority === "bikes") {
      scores.completo += 3;
      scores.completoPlus += 3;
    } else if (formData.mainPriority === "manutencao") {
      scores.completoPlus += 4;
    } else if (formData.mainPriority === "completo") {
      scores.completo += 3;
      scores.completoPlus += 3;
    }

    // Orçamento
    if (formData.budgetRange === "economico") {
      scores.essencial += 3;
    } else if (formData.budgetRange === "medio") {
      scores.completo += 3;
    } else {
      scores.completoPlus += 3;
    }

    // Determinar recomendação
    const maxScore = Math.max(scores.essencial, scores.completo, scores.completoPlus);
    if (scores.essencial === maxScore) return "Essencial";
    if (scores.completo === maxScore) return "Completo";
    return "Completo+";
  };

  const validateForm = () => {
    const required = ['name', 'phone', 'howDidYouHear', 'propertyType', 'propertyValue', 'mainPriority', 'budgetRange'];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);

    if (missing.length > 0) {
      console.error('❌ Campos obrigatórios faltando:', missing);
      toast({
        title: "❌ Formulário incompleto",
        description: `Campos obrigatórios: ${missing.join(', ')}`,
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  // Auto-send email when reaching step 5
  useEffect(() => {
    if (currentStep === 5 && !emailSent && !isSubmitting) {
      sendEmailAutomatically();
    }
  }, [currentStep, emailSent, isSubmitting]);

  const sendEmailAutomatically = async () => {
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setEmailSent(true);
    console.log('🚀 Enviando email automaticamente com dados:', formData);

    try {
      const recommendation = calculateRecommendation();
      console.log('🎯 Recomendação calculada:', recommendation);

      // Prepare data for email
      const leadData: Omit<Lead, 'id' | 'created_at'> = {
        name: formData.name,
        phone: formData.phone,
        how_did_you_hear: formData.howDidYouHear,
        property_type: formData.propertyType,
        property_value: formData.propertyValue,
        main_priority: formData.mainPriority,
        budget_range: formData.budgetRange,
        recommended_plan: recommendation,
        utm_source: formData.utm_source || undefined,
        utm_medium: formData.utm_medium || undefined,
        utm_campaign: formData.utm_campaign || undefined,
        status: 'new'
      };

      // Update form data with recommendation
      setFormData(prev => ({ ...prev, recommendedPlan: recommendation }));

      // Save to Supabase first
      console.log('💾 Salvando lead no Supabase...');
      let supabaseResult: any = null;
      try {
        supabaseResult = await saveLead(leadData);
        if (supabaseResult.success) {
          console.log('✅ Lead salvo no Supabase com ID:', supabaseResult.data?.id);
        } else {
          console.error('❌ Erro ao salvar no Supabase:', supabaseResult.error);
        }
      } catch (error: any) {
        console.error('❌ Erro inesperado no Supabase:', error.message);
      }

      // Send email via Supabase Edge Function
      console.log('📧 Enviando email automaticamente...');
      try {
        const emailData = {
          name: formData.name,
          phone: formData.phone,
          propertyType: formData.propertyType,
          propertyValue: formData.propertyValue,
          mainPriority: formData.mainPriority,
          budgetRange: formData.budgetRange,
          howDidYouHear: formData.howDidYouHear,
          recommendedPlan: recommendation,
          utmSource: formData.utm_source,
          utmMedium: formData.utm_medium,
          leadId: supabaseResult?.data?.id,
          timestamp: new Date().toLocaleString('pt-BR')
        };

        const { data: emailResult, error: emailError } = await supabase.functions.invoke('send-quote-email', {
          body: emailData
        });

        if (emailError) {
          throw emailError;
        }

        if (emailResult?.success) {
          console.log('✅ Email enviado automaticamente com sucesso!');
          
          // Track main conversion - cotacao_completa
          const planValues = {
            'Essencial': 150,
            'Completo': 300, 
            'Completo+': 500
          };
          
          trackConversion('cotacao_completa', planValues[recommendation] || 300, {
            event_category: 'lead_generation',
            event_label: 'quote_completed',
            plan: recommendation,
            property_type: formData.propertyType,
            property_value: formData.propertyValue,
            budget_range: formData.budgetRange,
            utm_source: formData.utm_source,
            utm_medium: formData.utm_medium
          });
          
          toast({
            title: "✅ Cotação enviada!",
            description: "Dados salvos e email enviado automaticamente.",
          });
          
          // Redirect to thank you page with form data
          setTimeout(() => {
            navigate('/obrigado', { 
              state: { 
                formData: {
                  name: formData.name,
                  recommendedPlan: recommendation,
                  propertyType: formData.propertyType,
                  propertyValue: formData.propertyValue,
                  phone: formData.phone
                }
              }
            });
          }, 1500);
        } else {
          throw new Error(emailResult?.error || 'Erro desconhecido no envio do email');
        }
      } catch (error: any) {
        console.error('❌ Erro no envio automático:', error.message);
        toast({
          title: "❌ Erro no envio automático",
          description: "Dados salvos, mas problemas técnicos no email.",
          variant: "destructive",
        });
      }

    } catch (error) {
      console.error('❌ Erro geral no envio automático:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    // Get the final recommendation (use updated form data if available)
    const finalRecommendation = formData.recommendedPlan || calculateRecommendation();

    // Prepare WhatsApp message
    const message = `
*NOVA COTACAO - Zurich Residencia*

*DADOS DO CLIENTE:*
• Nome: ${formData.name}
• WhatsApp: ${formData.phone}
• Como conheceu: ${formData.howDidYouHear}

*PERFIL DA RESIDENCIA:*
• Tipo: ${formData.propertyType}
• Valor estimado: ${formData.propertyValue}
• Prioridade principal: ${formData.mainPriority}
• Orcamento mensal: ${formData.budgetRange}

*RECOMENDACAO SISTEMA:*
• Plano sugerido: *${finalRecommendation}*

${formData.utm_source ? `*ORIGEM:* ${formData.utm_source} (${formData.utm_medium})` : ''}

Cliente quer receber cotacao personalizada!

---
_Enviado automaticamente pelo sistema de cotacao em ${new Date().toLocaleString('pt-BR')}_
    `.trim();

    const whatsappUrl = `https://wa.me/5511979699832?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <Home className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Vamos começar!</h2>
              <p className="text-muted-foreground">Seus dados para contato e como nos conheceu</p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Seu nome"
                className="text-center"
              />
              <Input
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Seu WhatsApp"
                className="text-center"
              />

              <div className="grid grid-cols-1 gap-3 mt-6">
                <p className="text-sm font-medium text-secondary mb-2">Como nos conheceu?</p>
                {[
                  { id: "uber", label: "QR Code no Uber", icon: "🚗" },
                  { id: "google", label: "Google/Busca", icon: "🔍" },
                  { id: "indicacao", label: "Indicação", icon: "👥" },
                  { id: "social", label: "Redes Sociais", icon: "📱" },
                  { id: "outros", label: "Outros", icon: "💬" }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setFormData(prev => ({ ...prev, howDidYouHear: option.id }))}
                    className={`p-3 rounded-lg border-2 transition-all text-left ${
                      formData.howDidYouHear === option.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <span className="text-lg mr-2">{option.icon}</span>
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>

              <Button
                onClick={handleNext}
                disabled={!formData.name || !formData.phone || !formData.howDidYouHear}
                className="w-full mt-6"
              >
                Continuar
              </Button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <Home className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Sobre sua residência</h2>
              <p className="text-muted-foreground">Tipo e valor estimado do seu imóvel</p>
            </div>

            <div className="space-y-8 max-w-2xl mx-auto">
              {/* Tipo de propriedade */}
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-2">Tipo de residência que você mora:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: "apartamento", label: "Apartamento", icon: "🏢", description: "Unidade em edifício" },
                    { id: "casa", label: "Casa", icon: "🏠", description: "Residência térrea ou com múltiplos andares" },
                    { id: "sobrado", label: "Sobrado", icon: "🏘️", description: "Casa de dois ou mais pavimentos" },
                    { id: "chacara", label: "Chácara/Sítio", icon: "🌳", description: "Propriedade rural ou de lazer" }
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setFormData(prev => ({ ...prev, propertyType: option.id }))}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        formData.propertyType === option.id ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="text-sm font-medium mb-1">{option.label}</div>
                      <div className="text-xs text-muted-foreground">{option.description}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Valor da propriedade */}
              {formData.propertyType && (
                <div>
                  <h3 className="text-lg font-semibold text-secondary mb-2">Valor estimado do seu imóvel:</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: "ate-300k", label: "Até R$ 300mil", icon: "💰", description: "Residências de entrada" },
                      { id: "300-600k", label: "R$ 300k - 600k", icon: "💎", description: "Padrão médio do mercado" },
                      { id: "600k-1m", label: "R$ 600k - 1M", icon: "👑", description: "Imóveis de alto padrão" },
                      { id: "acima-1m", label: "Acima R$ 1M", icon: "🏆", description: "Propriedades de luxo" }
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => setFormData(prev => ({ ...prev, propertyValue: option.id }))}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.propertyValue === option.id ? 'border-primary bg-primary/5' : 'border-border'
                        }`}
                      >
                        <div className="text-2xl mb-2">{option.icon}</div>
                        <div className="text-sm font-medium mb-1">{option.label}</div>
                        <div className="text-xs text-muted-foreground">{option.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {formData.propertyType && formData.propertyValue && (
                <Button onClick={handleNext} className="w-full">
                  Continuar
                </Button>
              )}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <Star className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">O que é MAIS importante para você?</h2>
              <p className="text-muted-foreground">Escolha sua principal prioridade em um seguro residencial</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                { id: "preco", label: "Menor preço", icon: "💰", description: "Economia em primeiro lugar" },
                { id: "emergencias", label: "Cobertura emergencial", icon: "🚨", description: "Atendimento 24h para emergências" },
                { id: "eletronicos", label: "Proteção eletrônicos", icon: "📱", description: "Smartphones, notebooks, TVs", highlight: true },
                { id: "bikes", label: "Assistência para bikes", icon: "🚲", description: "Ciclismo e bicicletas", highlight: true },
                { id: "manutencao", label: "Manutenção preventiva", icon: "🔧", description: "Cuidado contínuo da casa" },
                { id: "completo", label: "Proteção completa", icon: "🛡️", description: "Máxima tranquilidade" }
              ].map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 hover:border-primary ${
                    formData.mainPriority === option.id ? 'border-primary bg-primary/5' : 'border-border'
                  } ${option.highlight ? 'ring-2 ring-blue-200' : ''}`}
                  onClick={() => selectOption('mainPriority', option.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    {option.highlight && (
                      <div className="mt-2 text-xs text-blue-600 font-medium">⭐ DESTAQUE</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Qual seu orçamento mensal?</h2>
              <p className="text-muted-foreground">Vamos encontrar a melhor opção para seu bolso</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { id: "economico", label: "Até R$ 100/mês", icon: "💚", description: "Proteção essencial" },
                { id: "medio", label: "R$ 100 - R$ 200/mês", icon: "💙", description: "Cobertura completa" },
                { id: "premium", label: "Acima R$ 200/mês", icon: "💜", description: "Máxima proteção" }
              ].map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 hover:border-primary ${
                    formData.budgetRange === option.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => selectOption('budgetRange', option.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 5:
        const recommendation = calculateRecommendation();
        const planDetails = {
          "Essencial": {
            icon: "💚",
            color: "green",
            description: "Proteção básica com excelente custo-benefício",
            features: ["Emergências essenciais", "Atendimento 24h", "Serviços básicos", "Proteção básica"]
          },
          "Completo": {
            icon: "💙",
            color: "blue",
            description: "Cobertura completa para o dia a dia",
            features: ["Todas as emergências", "📱 Proteção para eletrônicos", "🚲 Assistência para bikes", "Hospedagem", "Assistência para pets"]
          },
          "Completo+": {
            icon: "💜",
            color: "purple",
            description: "Máxima proteção com manutenção preventiva",
            features: ["Tudo do Completo", "📱 Eletrônicos premium", "🚲 Assistência completa bikes", "Manutenção preventiva", "Atendimento VIP"]
          }
        };

        const plan = planDetails[recommendation as keyof typeof planDetails];

        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-secondary mb-2">Perfeito, {formData.name}!</h2>
              <p className="text-muted-foreground">Baseado no seu perfil, encontramos o plano ideal</p>
            </div>

            <Card className="border-4 border-primary bg-gradient-to-br from-primary/10 via-white to-primary/5 max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">{plan.icon}</div>
                <h3 className="text-3xl font-bold text-primary mb-2">Plano {recommendation}</h3>
                <p className="text-lg text-muted-foreground mb-6">{plan.description}</p>

                <div className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {(formData.mainPriority === "eletronicos" || formData.mainPriority === "bikes") && (
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                    <p className="text-sm font-semibold text-secondary mb-2">🎯 Perfeito para seu perfil:</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {formData.mainPriority === "eletronicos" && (
                        <div>📱 Proteção especial para seus dispositivos eletrônicos</div>
                      )}
                      {formData.mainPriority === "bikes" && (
                        <div>🚲 Assistência completa para ciclistas</div>
                      )}
                    </div>
                  </div>
                )}

                {/* Auto-email status */}
                {emailSent && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center justify-center space-x-2 text-green-700">
                      <CheckCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">✅ Dados salvos com sucesso!</span>
                    </div>
                    <p className="text-xs text-green-600 mt-2">📧 Email enviado automaticamente para nossa equipe</p>
                    <p className="text-xs text-green-600">📱 Você será direcionado para WhatsApp para finalizar</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="no-header-page min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 pt-0 pb-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl pt-4 sm:pt-0">
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao início
          </Button>

          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-secondary mb-2">Qual plano é ideal para você?</h1>
            <p className="text-muted-foreground text-lg">
              Etapa {currentStep} de {totalSteps} - Descobrindo seu plano perfeito
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-3 mb-8">
            <div 
              className="bg-gradient-to-r from-primary to-blue-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-xl border-0">
          <CardContent className="p-8 lg:p-12">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Contact info */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-6 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>11 97969-9832</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Zurich - Segurança que você confia</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
