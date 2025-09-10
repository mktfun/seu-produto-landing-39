import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, Phone, Star, Crown, Shield, Home, Zap, Users, Heart, Wrench, DollarSign, Smartphone, Bike, AlertCircle, Mail } from "lucide-react";
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
    email: "",
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

  const totalSteps = 7;

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
    // Implementação dos 4 fluxos do motor de recomendação

    // Fluxo 1: "Conveniência e Serviços"
    if (formData.mainPriority === "ajuda_rapida") {
      // Se orçamento baixo, downgrade para Completo
      if (formData.budgetRange === "ate_50") {
        return "Completo";
      }
      return "Completo+";
    }

    // Fluxo 2: "Proteção Máxima" 
    if (formData.mainPriority === "seguro_completo") {
      // Se orçamento baixo, downgrade para Completo
      if (formData.budgetRange === "ate_50") {
        return "Completo";
      }
      return "Completo+";
    }

    // Fluxo 3: "Segurança Essencial"
    if (formData.mainPriority === "proteger_bens" || formData.mainPriority === "estabilidade_financeira") {
      if (formData.budgetRange === "ate_50") {
        return "Essencial";
      }
      return "Completo";
    }

    // Fluxo 4: "Ponto de Partida" (orçamento baixo + não é ajuda_rapida nem seguro_completo)
    if (formData.budgetRange === "ate_50") {
      return "Essencial";
    }

    // Fallback para casos não cobertos
    if (formData.budgetRange === "50_100") return "Completo";
    return "Completo+";
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const required = ['name', 'email', 'phone', 'howDidYouHear', 'propertyType', 'propertyValue', 'mainPriority', 'budgetRange'];
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

    if (!validateEmail(formData.email)) {
      toast({
        title: "❌ Email inválido",
        description: "Por favor, insira um email válido",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  // Auto-send email when reaching step 7
  useEffect(() => {
    if (currentStep === 7 && !emailSent && !isSubmitting) {
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
        email: formData.email,
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
          
          // Send to Google Sheets in background (fire-and-forget)
          fetch('https://nmmthliwtdcnsqfpjceu.supabase.co/functions/v1/send-to-sheets', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: supabaseResult.data?.id,
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              how_did_you_hear: formData.howDidYouHear,
              property_type: formData.propertyType,
              property_value: formData.propertyValue,
              main_priority: formData.mainPriority,
              budget_range: formData.budgetRange,
              recommended_plan: recommendation,
              conversao: 'simulador_residencial'
            })
          }).catch(error => console.log('📊 Sheets error (non-blocking):', error));
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
          email: formData.email,
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
                  email: formData.email,
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
• Email: ${formData.email}
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
              <h2 className="text-3xl font-bold text-secondary mb-2">Tipo de residência</h2>
              <p className="text-muted-foreground">Qual tipo de imóvel você mora?</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { id: "apartamento", label: "Apartamento", icon: "🏢", description: "Unidade em edifício" },
                { id: "casa", label: "Casa", icon: "🏠", description: "Residência térrea ou com múltiplos andares" },
                { id: "sobrado", label: "Sobrado", icon: "🏘️", description: "Casa de dois ou mais pavimentos" },
                { id: "chacara", label: "Chácara/Sítio", icon: "🌳", description: "Propriedade rural ou de lazer" }
              ].map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 hover:border-primary ${
                    formData.propertyType === option.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => selectOption('propertyType', option.id)}
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

      case 2:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Valor do seu imóvel</h2>
              <p className="text-muted-foreground">Qual o valor estimado da sua residência?</p>
            </div>

            <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { id: "ate-300k", label: "Até R$ 300mil", icon: "💰", description: "Residências de entrada" },
                { id: "300-600k", label: "R$ 300k - 600k", icon: "💎", description: "Padrão médio do mercado" },
                { id: "600k-1m", label: "R$ 600k - 1M", icon: "👑", description: "Imóveis de alto padrão" },
                { id: "acima-1m", label: "Acima R$ 1M", icon: "🏆", description: "Propriedades de luxo" }
              ].map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 hover:border-primary ${
                    formData.propertyValue === option.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => selectOption('propertyValue', option.id)}
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

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Suas prioridades de proteção</h2>
              <p className="text-muted-foreground">Pensando na proteção do seu lar, qual a sua maior preocupação hoje?</p>
            </div>

            <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
              {[
                { 
                  id: "proteger_bens", 
                  label: "Proteger meus bens (móveis, eletrônicos) contra roubo e danos", 
                  icon: "🛡️", 
                  description: "Proteção patrimonial completa" 
                },
                { 
                  id: "ajuda_rapida", 
                  label: "Ter ajuda rápida para imprevistos do dia a dia (chaveiro, eletricista)", 
                  icon: "🚨", 
                  description: "Assistências emergenciais 24h" 
                },
                { 
                  id: "estabilidade_financeira", 
                  label: "Garantir a estabilidade financeira em caso de danos maiores (incêndio, vendaval)", 
                  icon: "💰", 
                  description: "Segurança contra grandes sinistros" 
                },
                { 
                  id: "seguro_completo", 
                  label: "Ter o seguro mais completo possível, cobrindo tudo que tenho direito", 
                  icon: "👑", 
                  description: "Máxima cobertura disponível" 
                }
              ].map((option) => (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 hover:border-primary ${
                    formData.mainPriority === option.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => selectOption('mainPriority', option.id)}
                >
                  <CardContent className="p-6 text-left">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{option.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                        <p className="text-sm text-muted-foreground">{option.description}</p>
                      </div>
                    </div>
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
              <h2 className="text-3xl font-bold text-secondary mb-2">Planejamento financeiro</h2>
              <p className="text-muted-foreground">Para encontrarmos o plano com o melhor encaixe para você, qual valor mensal se alinha ao seu planejamento?</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                { id: "ate_50", label: "Algo em torno de R$ 50/mês (Plano Essencial)", icon: "💚", description: "Proteção básica e econômica" },
                { id: "50_100", label: "Entre R$ 50 e R$ 100/mês (Plano Conforto)", icon: "💙", description: "Cobertura equilibrada" },
                { id: "acima_100", label: "Acima de R$ 100/mês (Plano Premium)", icon: "💜", description: "Máxima proteção" },
                { id: "nao_certeza", label: "Não tenho certeza, quero ver as melhores opções", icon: "🤔", description: "Vamos encontrar juntos" }
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
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <Users className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Seus dados para contato</h2>
              <p className="text-muted-foreground">Para que possamos enviar sua cotação personalizada</p>
            </div>

            <div className="space-y-4 max-w-md mx-auto">
              <div className="relative">
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Seu nome completo"
                  className="pl-10"
                />
                <Users className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>
              
              <div className="relative">
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Seu melhor email"
                  className={`pl-10 ${formData.email && !validateEmail(formData.email) ? 'border-red-300' : ''}`}
                />
                <Mail className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                {formData.email && !validateEmail(formData.email) && (
                  <p className="text-xs text-red-500 mt-1 text-left">Email deve conter @ e .</p>
                )}
              </div>
              
              <div className="relative">
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="Seu WhatsApp"
                  className="pl-10"
                />
                <Phone className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              </div>

              <Button
                onClick={handleNext}
                disabled={!formData.name || !formData.email || !formData.phone || !validateEmail(formData.email)}
                className="w-full mt-6"
              >
                Continuar
              </Button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Como nos conheceu?</h2>
              <p className="text-muted-foreground">Isso nos ajuda a melhorar nossos serviços</p>
            </div>

            <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
              {[
                { id: "uber", label: "QR Code no Uber", icon: "🚗" },
                { id: "google", label: "Google/Busca", icon: "🔍" },
                { id: "indicacao", label: "Indicação", icon: "👥" },
                { id: "social", label: "Redes Sociais", icon: "📱" },
                { id: "outros", label: "Outros", icon: "💬" }
              ].map((option) => (
                <button
                  key={option.id}
                  onClick={() => selectOption('howDidYouHear', option.id)}
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
          </div>
        );

      case 7:
        const recommendation = calculateRecommendation();
        
        // Função para obter texto personalizado baseado no fluxo
        const getPersonalizedText = (plan: string) => {
          // Fluxo 1: Conveniência e Serviços
          if (formData.mainPriority === "ajuda_rapida") {
            return "Vimos que sua prioridade é ter assistências completas para o dia a dia. Por isso, encontramos o plano que cobre tudo o que você precisa.";
          }
          
          // Fluxo 2: Proteção Máxima
          if (formData.mainPriority === "seguro_completo") {
            return "Você busca a proteção mais completa disponível. Encontramos o plano que oferece máxima cobertura para sua tranquilidade.";
          }
          
          // Fluxo 3: Segurança Essencial
          if (formData.mainPriority === "proteger_bens" || formData.mainPriority === "estabilidade_financeira") {
            return "Sua prioridade é proteger seu patrimônio. Selecionamos o plano ideal para garantir sua segurança financeira.";
          }
          
          // Fluxo 4: Ponto de Partida
          return "Encontramos o plano ideal para começar sua proteção residencial de forma inteligente e econômica.";
        };
        
        const planDetails = {
          "Essencial": {
            icon: "💚",
            color: "green",
            description: getPersonalizedText("Essencial"),
            features: ["Emergências essenciais", "Atendimento 24h", "Serviços básicos", "Proteção básica"]
          },
          "Completo": {
            icon: "💙",
            color: "blue", 
            description: getPersonalizedText("Completo"),
            features: ["Todas as emergências", "📱 Proteção para eletrônicos", "🚲 Assistência para bikes", "Hospedagem", "Assistência para pets"]
          },
          "Completo+": {
            icon: "💜",
            color: "purple",
            description: getPersonalizedText("Completo+"),
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