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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card
              key={index}
              className={`hover-lift card-gradient border-0 shadow-lg animate-fade-in-delay-${index}`}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-lg font-semibold text-secondary mb-2">
                  {service.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap justify-center gap-2">
                  {service.items.map((item, itemIndex) => (
                    <span key={itemIndex} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      {item}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção Eletrônicos e Bikes */}
        <div className="bg-slate-50 rounded-xl p-4 sm:p-8 mb-12">
          <div>
            <div className="text-center mb-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary mb-4">
                Proteção Além da Casa
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cuidamos também dos seus itens mais importantes do dia a dia
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
              {/* Eletrônicos Card */}
              <div>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-6">
                      <Smartphone className="w-16 h-16 text-blue-600 mx-auto" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-secondary mb-3">Dispositivos Móveis</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Smartphones, tablets e outros eletrônicos portáteis essenciais para o seu dia
                    </p>
                    
                    <div className="flex justify-center space-x-2 text-xs">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">📱 Smartphones</span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">📱 Tablets</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Bikes Card */}
              <div>
                <Card className="shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-6">
                      <Bike className="w-16 h-16 text-blue-600 mx-auto" />
                    </div>
                    
                    <h4 className="text-xl font-bold text-secondary mb-3">Ciclismo</h4>
                    <p className="text-muted-foreground text-sm mb-4">
                      Assistência completa para ciclistas e proteção para sua bicicleta
                    </p>
                    
                    <div className="flex justify-center space-x-2 text-xs">
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">🚲 Resgate</span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">🔧 Reparo</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold">Disponível nos planos Completo e Completo+</span> - 
                Proteção adicional para o que você mais valoriza
              </p>
            </div>
          </div>
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
