import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlansComparisonTable from "./PlansComparisonTable";

const plans = [
  {
    name: "Essencial",
    description: "Proteção básica para emergências domésticas",
    dailyPrice: "2,90",
    monthlyPrice: "87,00",
    popular: false,
    features: [
      "Serviços emergenciais básicos",
      "Chaveiro e vidraceiro",
      "Cobertura provisória de telhados",
      "Serviços de limpeza",
      "📱 Proteção eletrônicos básica",
      "Descarte sustentável",
      "Consultoria ambiental"
    ],
    notIncluded: [
      "Hospedagem temporária",
      "Mudanças e transporte",
      "Manutenção preventiva",
      "🚲 Assistência para bikes",
      "📱 Eletrônicos premium"
    ]
  },
  {
    name: "Completo",
    description: "Cobertura completa para o dia a dia",
    dailyPrice: "4,50",
    monthlyPrice: "135,00",
    popular: true,
    features: [
      "Todos os serviços do Essencial",
      "📱 Proteção completa eletrônicos",
      "🚲 Assistência completa para bikes",
      "Hospedagem e alimentação",
      "Mudança e guarda de móveis",
      "Conserto de eletrodomésticos",
      "Assistência para pets",
      "Regresso antecipado",
      "Locação de equipamentos"
    ],
    notIncluded: [
      "Manutenção preventiva",
      "Inspeção domiciliar"
    ]
  },
  {
    name: "Completo+",
    description: "Máxima proteção com serviços premium",
    dailyPrice: "6,80",
    monthlyPrice: "204,00",
    popular: false,
    features: [
      "Todos os serviços do Completo",
      "📱 Eletrônicos premium + resgate",
      "🚲 Assistência bikes + resgate 24h",
      "Manutenção preventiva da residência",
      "Inspeção domiciliar completa",
      "Serviços especializados",
      "Cobertura ampliada",
      "Atendimento prioritário VIP"
    ],
    notIncluded: []
  }
];

const PlansSection = () => {
  const navigate = useNavigate();

  return (
    <section id="planos" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Planos oficiais Zurich com diferentes níveis de proteção. 
            Compare as opções e encontre a cobertura ideal para sua residência.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative hover-lift h-full flex flex-col ${
                plan.popular 
                  ? 'border-primary shadow-xl scale-105 bg-gradient-to-b from-primary/5 to-white' 
                  : 'card-gradient'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Mais Popular</span>
                  </div>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-secondary mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-sm text-muted-foreground">apenas</span>
                    <span className="text-4xl font-bold text-primary">R$ {plan.dailyPrice}</span>
                    <span className="text-sm text-muted-foreground">/dia</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ou R$ {plan.monthlyPrice}/mês
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="font-semibold text-secondary mb-3 flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    Incluído:
                  </h4>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2">
                        <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {plan.notIncluded.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-muted-foreground mb-3 flex items-center">
                        <X className="w-5 h-5 text-muted-foreground mr-2" />
                        Não incluído:
                      </h4>
                      <ul className="space-y-2">
                        {plan.notIncluded.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center space-x-2">
                            <X className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t">
                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 text-white'
                        : 'bg-secondary hover:bg-secondary/90'
                    }`}
                    size="lg"
                    onClick={() => navigate("/onboard")}
                  >
                    Solicitar Cotação
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabela de Comparação Simplificada */}
        <div className="mt-16">
          <PlansComparisonTable />
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground">
            <strong>Importante:</strong> Valores e condições serão apresentados na cotação personalizada.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ Sem taxa de adesão</span>
            <span>✓ Cancelamento gratuito</span>
            <span>✓ Atendimento 24h: 0800 729 14 00</span>
          </div>
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            Este plano de seguro é garantido pela Zurich Minas Brasil Seguros S.A. (CNPJ 17.197.385/0001-21) 
            e está registrado na SUSEP sob o número 15414.004664_2004-95.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
