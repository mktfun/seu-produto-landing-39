import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, CheckCircle, Phone, Mail, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Onboard = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Dados pessoais
    name: "",
    email: "",
    phone: "",
    // Dados da residência
    cep: "",
    address: "",
    propertyType: "",
    propertySize: "",
    // Plano desejado
    selectedPlan: "",
    // Serviços de interesse
    services: [] as string[],
    // Observações
    notes: ""
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

  const handleServiceToggle = (service: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const handleSubmit = () => {
    // Aqui você pode integrar com API ou enviar por WhatsApp
    const message = `
*Solicitação de Cotação - Zurich Residência*

*Dados Pessoais:*
Nome: ${formData.name}
Email: ${formData.email}
Telefone: ${formData.phone}

*Residência:*
CEP: ${formData.cep}
Endereço: ${formData.address}
Tipo: ${formData.propertyType}
Tamanho: ${formData.propertySize}

*Plano de Interesse:* ${formData.selectedPlan}

*Serviços Prioritários:*
${formData.services.join(', ')}

*Observações:*
${formData.notes}
    `.trim();

    const whatsappUrl = `https://wa.me/5511979699832?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-2">Dados Pessoais</h2>
              <p className="text-muted-foreground">Vamos começar com suas informações básicas</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div>
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone">Telefone/WhatsApp</Label>
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
              <h2 className="text-2xl font-bold text-secondary mb-2">Dados da Residência</h2>
              <p className="text-muted-foreground">Informações sobre o imóvel a ser protegido</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  value={formData.cep}
                  onChange={(e) => setFormData(prev => ({ ...prev, cep: e.target.value }))}
                  placeholder="00000-000"
                />
              </div>

              <div>
                <Label htmlFor="address">Endereço Completo</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Rua, número, bairro, cidade"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Tipo do Imóvel</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, propertyType: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="sobrado">Sobrado</SelectItem>
                      <SelectItem value="chacara">Chácara</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Tamanho Aproximado</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, propertySize: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ate-50m2">Até 50m²</SelectItem>
                      <SelectItem value="50-100m2">50m² - 100m²</SelectItem>
                      <SelectItem value="100-200m2">100m² - 200m²</SelectItem>
                      <SelectItem value="acima-200m2">Acima de 200m²</SelectItem>
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
              <h2 className="text-2xl font-bold text-secondary mb-2">Plano de Interesse</h2>
              <p className="text-muted-foreground">Qual plano melhor atende suas necessidades?</p>
            </div>

            <div className="space-y-4">
              {[
                { 
                  id: "essencial", 
                  name: "Essencial", 
                  description: "Proteção básica com serviços emergenciais essenciais",
                  highlight: "4 conjuntos de serviços emergenciais por vigência"
                },
                { 
                  id: "completo", 
                  name: "Completo", 
                  description: "Cobertura completa para o dia a dia",
                  highlight: "12 conjuntos de serviços + hospedagem + regresso antecipado"
                },
                { 
                  id: "completo-plus", 
                  name: "Completo+", 
                  description: "Máxima proteção com serviços premium",
                  highlight: "Todos os serviços + manutenção geral + inspeção domiciliar"
                }
              ].map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`cursor-pointer transition-all border-2 ${
                    formData.selectedPlan === plan.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-border hover:border-primary/50'
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, selectedPlan: plan.id }))}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        formData.selectedPlan === plan.id 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-secondary">{plan.name}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{plan.description}</p>
                        <p className="text-xs text-primary font-medium">{plan.highlight}</p>
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
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-secondary mb-2">Serviços Prioritários</h2>
              <p className="text-muted-foreground">Quais serviços são mais importantes para você?</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  "Serviços emergenciais (encanador, eletricista, chaveiro)",
                  "Cobertura provisória de telhados",
                  "Vigilante e segurança",
                  "Limpeza pós-sinistro",
                  "Hospedagem temporária",
                  "Conserto de eletrodomésticos",
                  "Reparo de ar condicionado",
                  "Assistência para pets",
                  "Mudança e guarda de móveis",
                  "Serviços sustentáveis (descarte ecológico)",
                  "Manutenção geral da residência",
                  "Inspeção domiciliar"
                ].map((service) => (
                  <div key={service} className="flex items-center space-x-2">
                    <Checkbox
                      id={service}
                      checked={formData.services.includes(service)}
                      onCheckedChange={() => handleServiceToggle(service)}
                    />
                    <Label htmlFor={service} className="text-sm cursor-pointer">
                      {service}
                    </Label>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <Label htmlFor="notes">Observações Adicionais</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Alguma observação especial sobre sua residência ou necessidades específicas?"
                  rows={3}
                />
              </div>
            </div>
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
            <h1 className="text-3xl font-bold text-secondary mb-2">Solicitar Cotação</h1>
            <p className="text-muted-foreground">
              Etapa {currentStep} de {totalSteps} - Vamos personalizar sua proposta
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
                    (currentStep === 1 && (!formData.name || !formData.email || !formData.phone)) ||
                    (currentStep === 2 && (!formData.cep || !formData.propertyType)) ||
                    (currentStep === 3 && !formData.selectedPlan)
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
                  Enviar Solicitação
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
              <Mail className="w-4 h-4" />
              <span>contato@jjamorimseguros.com.br</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
