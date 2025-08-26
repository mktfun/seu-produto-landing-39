import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Zap, Shield, Phone, Leaf, Smartphone, Bike } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Reparos Essenciais",
    description: "Emergências domésticas 24h",
    items: ["Encanamento", "Elétrica", "Chaveiro", "Vidraceiro"]
  },
  {
    icon: Smartphone,
    title: "Eletrônicos",
    description: "Proteção para seus dispositivos",
    items: ["Smartphones", "Notebooks", "TVs", "Tablets"],
    isHighlight: true,
    highlightText: "Até R$ 5.000"
  },
  {
    icon: Bike,
    title: "Assistência Bike",
    description: "Cuidados com sua bicicleta",
    items: ["Resgate", "Reparo", "Manutenção", "Cobertura"],
    isHighlight: true,
    highlightText: "Até R$ 5.000"
  },
  {
    icon: Shield,
    title: "Proteção & Segurança",
    description: "Segurança para sua residência",
    items: ["Cobertura de telhados", "Vigilante", "Limpeza", "Hospedagem"]
  },
  {
    icon: Zap,
    title: "Serviços Especiais",
    description: "Conveniência e comodidade",
    items: ["Pets", "Mudanças", "Eletrodomésticos", "Manutenção"]
  },
  {
    icon: Leaf,
    title: "Sustentabilidade",
    description: "Soluções ecológicas",
    items: ["Descarte ecológico", "Consultoria ambiental", "Projetos sustentáveis"]
  }
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cobertura completa para todas as necessidades da sua residência com atendimento 24 horas.
          </p>
        </div>

        {/* Destaque Especial - Eletrônicos e Bikes */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 mb-12 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">🎯 Destaques Especiais</h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
              <Smartphone className="w-12 h-12 mx-auto mb-3" />
              <h4 className="text-xl font-semibold mb-2">📱 Eletrônicos</h4>
              <p className="text-sm mb-2">Smartphones, notebooks, TVs, tablets</p>
              <p className="text-lg font-bold">Cobertura até R$ 5.000</p>
            </div>
            <div className="bg-white/20 rounded-lg p-6 backdrop-blur-sm">
              <Bike className="w-12 h-12 mx-auto mb-3" />
              <h4 className="text-xl font-semibold mb-2">🚲 Bikes</h4>
              <p className="text-sm mb-2">Assistência completa e resgate</p>
              <p className="text-lg font-bold">Cobertura até R$ 5.000</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card key={index} className={`hover-lift border-0 shadow-lg animate-fade-in ${
              service.isHighlight 
                ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 ring-2 ring-blue-100' 
                : 'card-gradient'
            }`} style={{
              animationDelay: `${index * 0.1}s`
            }}>
              <CardContent className="p-6 text-center">
                {service.isHighlight && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium mb-4 inline-block">
                    ⭐ DESTAQUE
                  </div>
                )}
                
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  service.isHighlight 
                    ? 'bg-gradient-to-r from-blue-100 to-purple-100' 
                    : 'bg-primary/10'
                }`}>
                  <service.icon className={`w-8 h-8 ${
                    service.isHighlight ? 'text-blue-600' : 'text-primary'
                  }`} />
                </div>
                
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  {service.title}
                </h3>
                
                {service.isHighlight && (
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-3">
                    {service.highlightText}
                  </div>
                )}
                
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {service.items.map((item, itemIndex) => (
                    <span key={itemIndex} className={`text-xs px-2 py-1 rounded-full ${
                      service.isHighlight 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-10">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Atendimento 24h: 11 97969-9832</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
