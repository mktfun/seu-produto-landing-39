import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Star, Shield, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Onboard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados básicos para contato
    name: "",
    phone: "",
    // Perfil da residência
    propertyType: "",
    propertyValue: "",
    belongingsValue: "",
    workFromHome: "",
    homeFrequency: "",
    // Prioridades
    mainConcerns: [] as string[],
    mostImportant: "",
    // Experiências anteriores
    previousClaims: "",
    // Recomendação final
    recommendedPlan: ""
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConcernToggle = (concern: string) => {
    setFormData(prev => ({
      ...prev,
      mainConcerns: prev.mainConcerns.includes(concern)
        ? prev.mainConcerns.filter(c => c !== concern)
        : [...prev.mainConcerns, concern]
    }));
  };

  const calculateRecommendation = () => {
    let score = { essencial: 0, completo: 0, completoPlus: 0 };

    // Baseado no valor da propriedade
    if (formData.propertyValue === "ate-300k" || formData.belongingsValue === "ate-50k") {
      score.essencial += 3;
      score.completo += 1;
    } else if (formData.propertyValue === "300-600k" || formData.belongingsValue === "50-150k") {
      score.essencial += 1;
      score.completo += 3;
      score.completoPlus += 1;
    } else if (formData.propertyValue === "acima-600k" || formData.belongingsValue === "acima-150k") {
      score.completo += 2;
      score.completoPlus += 3;
    }

    // Baseado em trabalhar de casa
    if (formData.workFromHome === "sim") {
      score.completo += 2;
      score.completoPlus += 2;
    }

    // Baseado em frequência em casa
    if (formData.homeFrequency === "sempre" || formData.homeFrequency === "maior-parte") {
      score.completo += 2;
      score.completoPlus += 1;
    }

    // Baseado nas preocupações principais
    if (formData.mainConcerns.includes("emergencias")) {
      score.essencial += 2;
      score.completo += 3;
      score.completoPlus += 3;
    }
    if (formData.mainConcerns.includes("manutencao")) {
      score.completoPlus += 3;
    }
    if (formData.mainConcerns.includes("pets")) {
      score.completo += 2;
      score.completoPlus += 2;
    }
    if (formData.mainConcerns.includes("mudancas")) {
      score.completo += 2;
      score.completoPlus += 2;
    }

    // Baseado no que é mais importante
    if (formData.mostImportant === "preco") {
      score.essencial += 3;
    } else if (formData.mostImportant === "cobertura") {
      score.completo += 2;
      score.completoPlus += 3;
    } else if (formData.mostImportant === "manutencao") {
      score.completoPlus += 3;
    }

    // Determinar recomendação
    const maxScore = Math.max(score.essencial, score.completo, score.completoPlus);
    if (score.completoPlus === maxScore) return "Completo+";
    if (score.completo === maxScore) return "Completo";
    return "Essencial";
  };

  const handleSubmit = () => {
    const recommendation = calculateRecommendation();
    setFormData(prev => ({ ...prev, recommendedPlan: recommendation }));

    const message = `
*Solicitação de Cotação - Zurich Residência*

*Dados de Contato:*
Nome: ${formData.name}
Telefone: ${formData.phone}

*Perfil da Residência:*
Tipo: ${formData.propertyType}
Valor estimado: ${formData.propertyValue}
Valor dos bens: ${formData.belongingsValue}
Trabalha em casa: ${formData.workFromHome}
Frequência em casa: ${formData.homeFrequency}

*Principais Preocupações:*
${formData.mainConcerns.join(', ')}

*Mais Importante:* ${formData.mostImportant}

*Plano Recomendado:* ${recommendation}

Gostaria de receber uma cotação personalizada para o plano ${recommendation}.
    `.trim();

    const whatsappUrl = `https://wa.me/5511979699832?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const getPlanDescription = (plan: string) => {
    switch (plan) {
      case "Essencial":
        return "Proteção básica com foco em emergências essenciais";
      case "Completo":
        return "Cobertura completa para quem valoriza segurança e conveniência";
      case "Completo+":
        return "Máxima proteção com manutenção preventiva incluída";
      default:
        return "";
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-2">Vamos começar!</h2>
              <p className="text-muted-foreground">Primeiro, seus dados para contato</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Seu nome</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Como podemos te chamar?"
                />
              </div>

              <div>
                <Label htmlFor="phone">Seu WhatsApp</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-2">Sobre sua residência</h2>
              <p className="text-muted-foreground">Vamos entender o perfil da sua casa</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label>Tipo da sua residência</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="apartamento">Apartamento</SelectItem>
                    <SelectItem value="sobrado">Sobrado</SelectItem>
                    <SelectItem value="chacara">Chácara/Sítio</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Valor estimado da sua residência</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, propertyValue: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Faixa de valor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ate-300k">Até R$ 300.000</SelectItem>
                    <SelectItem value="300-600k">R$ 300.000 - R$ 600.000</SelectItem>
                    <SelectItem value="600k-1m">R$ 600.000 - R$ 1.000.000</SelectItem>
                    <SelectItem value="acima-1m">Acima de R$ 1.000.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Valor estimado dos seus bens (móveis, eletrodomésticos, etc.)</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, belongingsValue: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Faixa de valor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ate-50k">Até R$ 50.000</SelectItem>
                    <SelectItem value="50-150k">R$ 50.000 - R$ 150.000</SelectItem>
                    <SelectItem value="150-300k">R$ 150.000 - R$ 300.000</SelectItem>
                    <SelectItem value="acima-300k">Acima de R$ 300.000</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Você trabalha em casa?</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, workFromHome: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sim">Sim, sempre</SelectItem>
                      <SelectItem value="as-vezes">Às vezes</SelectItem>
                      <SelectItem value="nao">Não</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Com que frequência você fica em casa?</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, homeFrequency: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sempre">Sempre em casa</SelectItem>
                      <SelectItem value="maior-parte">Maior parte do tempo</SelectItem>
                      <SelectItem value="metade">Metade do tempo</SelectItem>
                      <SelectItem value="pouco">Pouco tempo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-2">Suas principais preocupações</h2>
              <p className="text-muted-foreground">Selecione o que mais te preocupa em relação à sua casa (pode escolher várias)</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { id: "emergencias", label: "Emergências (encanamento, elétrica, chaveiro)" },
                  { id: "manutencao", label: "Manutenção preventiva regular" },
                  { id: "pets", label: "Cuidados com pets" },
                  { id: "mudancas", label: "Mudanças e transporte de móveis" },
                  { id: "eletrodomesticos", label: "Conserto de eletrodomésticos" },
                  { id: "seguranca", label: "Segurança e vigilância" },
                  { id: "limpeza", label: "Limpeza pós-sinistro" },
                  { id: "hospedagem", label: "Hospedagem temporária" }
                ].map((concern) => (
                  <Card 
                    key={concern.id}
                    className={`cursor-pointer transition-all border-2 ${
                      formData.mainConcerns.includes(concern.id) 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => handleConcernToggle(concern.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded border-2 ${
                          formData.mainConcerns.includes(concern.id) 
                            ? 'border-primary bg-primary' 
                            : 'border-muted-foreground'
                        }`} />
                        <span className="text-sm">{concern.label}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <Label>O que é MAIS importante para você em um seguro residencial?</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, mostImportant: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Escolha a principal prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="preco">Menor preço possível</SelectItem>
                    <SelectItem value="cobertura">Cobertura completa para emergências</SelectItem>
                    <SelectItem value="manutencao">Manutenção preventiva incluída</SelectItem>
                    <SelectItem value="atendimento">Atendimento 24h rápido</SelectItem>
                    <SelectItem value="sustentabilidade">Serviços sustentáveis</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        const recommendation = calculateRecommendation();
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-secondary mb-2">Recomendação Personalizada</h2>
              <p className="text-muted-foreground">Baseado no seu perfil, este é o plano ideal para você</p>
            </div>

            <Card className="border-2 border-primary bg-gradient-to-r from-primary/5 to-blue/5">
              <CardContent className="p-8 text-center">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <Star className="w-8 h-8 text-primary fill-current" />
                  <h3 className="text-3xl font-bold text-primary">Plano {recommendation}</h3>
                </div>
                <p className="text-lg text-muted-foreground mb-6">
                  {getPlanDescription(recommendation)}
                </p>
                
                <div className="bg-white rounded-lg p-6 mb-6">
                  <h4 className="font-semibold text-secondary mb-4">Por que este plano é ideal para você:</h4>
                  <div className="text-left space-y-2 text-sm">
                    {recommendation === "Essencial" && (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Cobertura essencial com ótimo custo-benefício</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Perfeito para emergências básicas</span>
                        </div>
                      </>
                    )}
                    {recommendation === "Completo" && (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Cobertura ampla para seu estilo de vida</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Inclui hospedagem e serviços especiais</span>
                        </div>
                      </>
                    )}
                    {recommendation === "Completo+" && (
                      <>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Máxima proteção para sua residência</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>Manutenção preventiva incluída</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-muted/30 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
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
            <h1 className="text-3xl font-bold text-secondary mb-2">Qual plano é ideal para você?</h1>
            <p className="text-muted-foreground">
              Etapa {currentStep} de {totalSteps} - Vamos descobrir juntos
            </p>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-muted rounded-full h-2 mb-8">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            {renderStep()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 1 && (!formData.name || !formData.phone)) ||
                    (currentStep === 2 && (!formData.propertyType || !formData.propertyValue || !formData.belongingsValue)) ||
                    (currentStep === 3 && (!formData.mostImportant || formData.mainConcerns.length === 0))
                  }
                >
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-primary hover:bg-primary/90"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Solicitar Cotação
                </Button>
              )}
            </div>
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
