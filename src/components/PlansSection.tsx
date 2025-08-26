
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Essencial",
    description: "Proteção básica para sua residência",
    popular: false,
    features: [
      "Assistência elétrica básica",
      "Chaveiro 24h",
      "Desentupimento simples", 
      "Atendimento telefônico",
      "1 chamado por mês"
    ]
  },
  {
    name: "Completo",
    description: "Cobertura completa para o dia a dia",
    popular: true,
    features: [
      "Todos os serviços do Essencial",
      "Reparo hidráulico completo",
      "Serviços de pintura",
      "Vidraçaria básica",
      "Até 3 chamados por mês",
      "Atendimento prioritário"
    ]
  },
  {
    name: "Completo+",
    description: "Máxima proteção e serviços premium",
    popular: false,
    features: [
      "Todos os serviços anteriores",
      "Mudanças assistidas",
      "Jardinagem e limpeza",
      "Assistência para pets",
      "Chamados ilimitados",
      "Técnicos especializados",
      "Garantia estendida"
    ]
  }
];

const PlansSection = () => {
  return (
    <section id="planos" className="py-20 bg-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Temos o plano ideal para cada necessidade. Compare nossas opções 
            e encontre a proteção perfeita para sua residência.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative hover-lift ${
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

              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full mt-8 ${
                    plan.popular
                      ? 'bg-primary hover:bg-primary/90 text-white'
                      : 'bg-secondary hover:bg-secondary/90'
                  }`}
                  size="lg"
                >
                  Solicitar Cotação
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 space-y-4">
          <p className="text-muted-foreground">
            <strong>Importante:</strong> Seguro cobre o valor de máx. de obra. 
            As peças ficam por conta do cliente.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span>✓ Sem taxa de adesão</span>
            <span>✓ Cancelamento gratuito</span>
            <span>✓ Primeira manutenção grátis</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlansSection;
