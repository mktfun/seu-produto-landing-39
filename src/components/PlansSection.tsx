import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const plans = [
  {
    name: "Essencial",
    description: "Proteção básica para emergências domésticas",
    popular: false,
    features: [
      "3 utilizações de indicação de mão de obra",
      "4 conjuntos de serviços emergenciais (R$ 200 por evento)",
      "Cobertura provisória de telhados (R$ 400)",
      "Vigilante (R$ 300)",
      "Limpeza (R$ 300)",
      "2 utilizações de descarte sustentável",
      "Consultoria ambiental sem limite"
    ],
    notIncluded: [
      "Regresso antecipado",
      "Hospedagem",
      "Locação de eletrodomésticos",
      "Manutenção geral",
      "Inspeção domiciliar",
      "Assistência a pets"
    ]
  },
  {
    name: "Completo",
    description: "Cobertura completa para o dia a dia",
    popular: true,
    features: [
      "3 utilizações de indicação de mão de obra",
      "12 conjuntos de serviços emergenciais (R$ 200 por evento)",
      "Cobertura provisória de telhados (R$ 400)",
      "Vigilante (R$ 300)",
      "Limpeza (R$ 300)",
      "Regresso antecipado (1 MTA)",
      "Hospedagem (R$ 300)",
      "Restaurante e lavanderia (R$ 300)",
      "Locação de eletrodomésticos (R$ 120)",
      "Locação de televisão (R$ 120)",
      "Escritório provisório (3 diárias R$ 60)",
      "Mudança e guarda móveis (R$ 600)",
      "Conserto de eletrodomésticos (R$ 300)",
      "Reparo ar condicionado (R$ 200)",
      "Guarda de animal doméstico (R$ 200)",
      "Funeral pet (R$ 200)",
      "Assistência a bike (R$ 200)",
      "Resgate/apoio ao ciclista (15 KM)",
      "2 utilizações de descarte sustentável",
      "Consultoria ambiental sem limite"
    ],
    notIncluded: [
      "Manutenção geral",
      "Inspeção domiciliar"
    ]
  },
  {
    name: "Completo+",
    description: "Máxima proteção com serviços premium",
    popular: false,
    features: [
      "Todos os serviços do plano Completo",
      "Manutenção geral (escolha de até 3 serviços):",
      "• Fixação de quadros, persianas e prateleiras (3 itens)",
      "• Fixação de telas e grades de segurança (25m²)",
      "• Instalação de chuveiro e torneira",
      "• Instalação de pias e tanques",
      "• Instalação ou substituição de fechaduras",
      "• Lubrificação de fechaduras e dobradiças (3 unidades)",
      "• Limpeza de ralos e sifões",
      "• Revisão hidráulica para vazamentos",
      "• Revisão elétrica",
      "• Troca de lâmpadas, interruptores e tomadas (3 unidades)",
      "• Instalação de luz de emergência",
      "• Inspeção para combate a dengue",
      "Inspeção domiciliar (escolha de até 2 serviços):",
      "• Limpeza de caixa d'água (até 5 mil litros)",
      "• Limpeza de calhas (até 30 metros)",
      "• Dedetização",
      "• Caçamba",
      "• Mudança de móveis entre cômodos",
      "• Reversão de gás para fogão"
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
            Planos oficiais Zurich com coberturas e limites definidos. 
            Compare as opções e encontre a proteção ideal para sua residência.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                <p className="text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="font-semibold text-secondary mb-3 flex items-center">
                    <Check className="w-5 h-5 text-primary mr-2" />
                    Incluído no plano:
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

        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground">
            <strong>Importante:</strong> Seguro cobre o valor da mão de obra. 
            As peças ficam por conta do cliente.
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
