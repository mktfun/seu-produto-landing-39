import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, X, Shield, Home, Crown, Users, Clock, Phone, Award } from "lucide-react";
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
          <div className="flex justify-center">
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
              🔥 Oferta especial: Primeira mensalidade com 50% de desconto!
            </div>
          </div>
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

        {/* Social Proof e Garantias */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-secondary mb-4">Por que mais de 50.000 famílias confiam na Zurich?</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <Users className="w-8 h-8 text-primary mb-2" />
                <span className="text-2xl font-bold text-primary">+50.000</span>
                <span className="text-sm text-muted-foreground">Famílias protegidas</span>
              </div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <span className="text-2xl font-bold text-primary">24h/7dias</span>
                <span className="text-sm text-muted-foreground">Atendimento</span>
              </div>
              <div className="flex flex-col items-center">
                <Award className="w-8 h-8 text-primary mb-2" />
                <span className="text-2xl font-bold text-primary">95%</span>
                <span className="text-sm text-muted-foreground">Satisfação</span>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <span className="flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full">
                <Check className="w-4 h-4 mr-1" /> Sem taxa de adesão
              </span>
              <span className="flex items-center text-green-700 bg-green-100 px-3 py-1 rounded-full">
                <Check className="w-4 h-4 mr-1" /> Cancelamento gratuito
              </span>
              <span className="flex items-center text-blue-700 bg-blue-100 px-3 py-1 rounded-full">
                <Phone className="w-4 h-4 mr-1" /> 0800 729 14 00
              </span>
            </div>
            
            <div className="mt-6 p-4 bg-white/60 rounded-lg">
              <p className="text-sm text-muted-foreground mb-2">
                <strong>🔒 Garantia Total:</strong> Satisfação garantida ou seu dinheiro de volta em 30 dias.
              </p>
              <p className="text-xs text-muted-foreground">
                Plano garantido pela Zurich Minas Brasil Seguros S.A. (CNPJ 17.197.385/0001-21) 
                registrado na SUSEP nº 15414.004664_2004-95.
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Rápido */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-center text-secondary mb-8">Dúvidas Frequentes</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-secondary mb-2">🤔 Como funciona o atendimento?</h4>
              <p className="text-sm text-muted-foreground">Ligue 24h/7dias ou use nosso app. Chegamos em até 2 horas nas emergências.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-secondary mb-2">💳 Posso cancelar quando quiser?</h4>
              <p className="text-sm text-muted-foreground">Sim! Cancelamento gratuito a qualquer momento, sem multas ou burocracias.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-secondary mb-2">🏠 Cobre minha região?</h4>
              <p className="text-sm text-muted-foreground">Atendemos todo Brasil com rede credenciada em mais de 5.000 cidades.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-secondary mb-2">⚖️ Tem carência?</h4>
              <p className="text-sm text-muted-foreground">Apenas 30 dias para serviços eletivos. Emergências são atendidas imediatamente.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
