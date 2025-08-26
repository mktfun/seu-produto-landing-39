import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, Shield, Home, Crown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PlansComparisonTable from "./PlansComparisonTable";

const plans = [
  {
    name: "Essencial",
    description: "Proteção básica para emergências domésticas",
    dailyPrice: "2,90",
    popular: false,
    icon: Shield,
    badge: "Econômico",
    badgeColor: "bg-green-100 text-green-700",
    cta: "Começar Agora",
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
    popular: true,
    icon: Home,
    badge: "Mais Escolhido",
    badgeColor: "bg-blue-100 text-blue-700",
    cta: "Quero Este Plano",
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
    popular: false,
    icon: Crown,
    badge: "Premium",
    badgeColor: "bg-purple-100 text-purple-700",
    cta: "Cobertura Total",
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
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
            Planos oficiais Zurich com diferentes níveis de proteção. 
            Compare as opções e encontre a cobertura ideal para sua residência.
          </p>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
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
                <div className="flex justify-center mb-4">
                  <plan.icon className="w-12 h-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold text-secondary mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-2">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${plan.badgeColor}`}>
                    {plan.badge}
                  </span>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline justify-center space-x-1">
                    <span className="text-sm text-muted-foreground">A partir de</span>
                    <span className="text-4xl font-bold text-primary">R$ {plan.dailyPrice}</span>
                    <span className="text-sm text-muted-foreground">por dia</span>
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

                </div>

                <div className="pt-4 border-t">
                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all'
                        : 'bg-secondary hover:bg-secondary/90 hover:shadow-lg transform hover:scale-105 transition-all'
                    }`}
                    size="lg"
                    onClick={() => navigate("/onboard")}
                  >
                    {plan.cta}
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

      </div>
    </section>
  );
};

export default PlansSection;
