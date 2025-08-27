import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, Phone, Star, Crown, Shield, Home, Zap, Users, Heart, Wrench, DollarSign, Smartphone, Bike } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Onboard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    propertyType: "",
    propertyValue: "",
    workFromHome: "",
    hasElectronics: "",
    hasBike: "",
    mainPriority: "",
    budgetRange: "",
    recommendedPlan: ""
  });

  const totalSteps = 8;

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

    // Trabalha em casa
    if (formData.workFromHome === "sim") {
      scores.completo += 2;
      scores.completoPlus += 2;
    } else if (formData.workFromHome === "nao") {
      scores.essencial += 1;
    }

    // Eletrônicos - NOVO DESTAQUE
    if (formData.hasElectronics === "sim-muito") {
      scores.completo += 3;
      scores.completoPlus += 2;
    } else if (formData.hasElectronics === "sim-normal") {
      scores.completo += 2;
      scores.completoPlus += 1;
    }

    // Bike - NOVO DESTAQUE
    if (formData.hasBike === "sim-valiosa" || formData.hasBike === "sim-normal") {
      scores.completo += 2;
      scores.completoPlus += 2;
    }

    // Prioridade principal
    if (formData.mainPriority === "preco") {
      scores.essencial += 3;
    } else if (formData.mainPriority === "emergencias") {
      scores.completo += 3;
    } else if (formData.mainPriority === "manutencao") {
      scores.completoPlus += 3;
    } else if (formData.mainPriority === "completo") {
      scores.completo += 2;
      scores.completoPlus += 2;
    } else if (formData.mainPriority === "eletronicos") {
      scores.completo += 3;
      scores.completoPlus += 2;
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

  const handleSubmit = () => {
    const recommendation = calculateRecommendation();
    setFormData(prev => ({ ...prev, recommendedPlan: recommendation }));

    const message = `
*Solicitação de Cotação - Zurich Residência*

*Contato:*
Nome: ${formData.name}
Telefone: ${formData.phone}

*Perfil:*
Tipo: ${formData.propertyType}
Valor: ${formData.propertyValue}
Trabalha em casa: ${formData.workFromHome}
Eletrônicos: ${formData.hasElectronics}
Bike: ${formData.hasBike}
Prioridade: ${formData.mainPriority}
Orçamento: ${formData.budgetRange}

*Plano Recomendado:* ${recommendation}

Gostaria de receber uma cotação personalizada!
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
              <p className="text-muted-foreground">Primeiro, como podemos te chamar?</p>
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
              <Button 
                onClick={handleNext}
                disabled={!formData.name || !formData.phone}
                className="w-full"
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
              <h2 className="text-3xl font-bold text-secondary mb-2">Que tipo de residência você tem?</h2>
              <p className="text-muted-foreground">Clique na opção que melhor descreve seu imóvel</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { id: "apartamento", label: "Apartamento", icon: "🏢", description: "Condomínio residencial" },
                { id: "casa", label: "Casa", icon: "🏠", description: "Casa térrea ou assobradada" },
                { id: "sobrado", label: "Sobrado", icon: "🏘️", description: "Casa de múltiplos andares" },
                { id: "chacara", label: "Chácara/Sítio", icon: "🌳", description: "Propriedade rural" }
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

      case 3:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <DollarSign className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Qual o valor estimado da sua residência?</h2>
              <p className="text-muted-foreground">Isso nos ajuda a entender o nível de proteção ideal</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {[
                { id: "ate-300k", label: "Até R$ 300.000", icon: "💰", description: "Imóvel mais simples" },
                { id: "300-600k", label: "R$ 300k - R$ 600k", icon: "💎", description: "Imóvel de valor médio" },
                { id: "600k-1m", label: "R$ 600k - R$ 1M", icon: "👑", description: "Imóvel de alto valor" },
                { id: "acima-1m", label: "Acima de R$ 1M", icon: "🏆", description: "Imóvel premium" }
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

      case 4:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <Users className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Você trabalha em casa?</h2>
              <p className="text-muted-foreground">Isso influencia no tipo de cobertura que você precisa</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { id: "sim", label: "Sim, sempre", icon: "💻", description: "Home office fixo" },
                { id: "as-vezes", label: "Às vezes", icon: "🔄", description: "Trabalho híbrido" },
                { id: "nao", label: "Não", icon: "🏢", description: "Trabalho externo" }
              ].map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 hover:border-primary ${
                    formData.workFromHome === option.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => selectOption('workFromHome', option.id)}
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
              <Smartphone className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Você tem eletrônicos de valor?</h2>
              <p className="text-muted-foreground">📱 Smartphones, notebooks, TVs, tablets, etc.</p>
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 mt-4 border border-gray-200">
                <p className="text-sm font-medium text-secondary">✨ Proteção especial disponível para dispositivos eletrônicos</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { id: "sim-muito", label: "Sim, muitos", icon: "📱💻📺", description: "iPhone, notebook, smart TV..." },
                { id: "sim-normal", label: "Alguns", icon: "📱💻", description: "Smartphone e um notebook" },
                { id: "nao", label: "Poucos/Antigos", icon: "📺", description: "Apenas TV e básicos" }
              ].map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 hover:border-primary ${
                    formData.hasElectronics === option.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => selectOption('hasElectronics', option.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{option.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6 text-center">
            <div className="mb-8">
              <Bike className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-secondary mb-2">Você tem bicicleta?</h2>
              <p className="text-muted-foreground">🚴‍♀️ Bike comum, elétrica ou de alto valor</p>
              <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 mt-4 border border-gray-200">
                <p className="text-sm font-medium text-secondary">🚲 Assistência completa e proteção para ciclistas</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
              {[
                { id: "sim-valiosa", label: "Sim, de valor", icon: "🚴‍♂️⚡", description: "Bike elétrica ou esportiva" },
                { id: "sim-normal", label: "Sim, comum", icon: "🚲", description: "Bike tradicional" },
                { id: "nao", label: "Não tenho", icon: "🚶‍♀️", description: "Não uso bicicleta" }
              ].map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 hover:border-primary ${
                    formData.hasBike === option.id ? 'border-primary bg-primary/5' : 'border-border'
                  }`}
                  onClick={() => selectOption('hasBike', option.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{option.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 7:
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
                { id: "eletronicos", label: "Proteção eletrônicos", icon: "📱", description: "Smartphones, notebooks, TVs" },
                { id: "manutencao", label: "Manutenção preventiva", icon: "🔧", description: "Cuidado contínuo da casa" },
                { id: "completo", label: "Proteção completa", icon: "🛡️", description: "Máxima tranquilidade" }
              ].map((option) => (
                <Card 
                  key={option.id}
                  className={`cursor-pointer transition-all hover:scale-105 border-2 hover:border-primary ${
                    formData.mainPriority === option.id ? 'border-primary bg-primary/5' : 'border-border'
                  } ${option.id === 'eletronicos' ? 'ring-2 ring-blue-200' : ''}`}
                  onClick={() => selectOption('mainPriority', option.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{option.icon}</div>
                    <h3 className="font-semibold text-lg mb-2">{option.label}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                    {option.id === 'eletronicos' && (
                      <div className="mt-2 text-xs text-blue-600 font-medium">⭐ DESTAQUE</div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 8:
        const recommendation = calculateRecommendation();
        const planDetails = {
          "Essencial": {
            icon: "💚",
            color: "green",
            description: "Proteção básica com excelente custo-benefício",
            features: ["Emergências essenciais", "Atendimento 24h", "Serviços básicos", "Cobertura eletrônicos básica"]
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

                {(formData.hasElectronics !== "nao" || formData.hasBike !== "nao") && (
                  <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                    <p className="text-sm font-semibold text-secondary mb-2">🎯 Perfeito para seu perfil:</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      {formData.hasElectronics !== "nao" && (
                        <div>📱 Proteção especial para seus dispositivos eletrônicos</div>
                      )}
                      {formData.hasBike !== "nao" && (
                        <div>🚲 Assistência completa para ciclistas</div>
                      )}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white font-bold py-3"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Solicitar Cotação no WhatsApp
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="no-header-page min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-4 sm:py-8">
      <div className="container mx-auto px-4 max-w-4xl">
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
