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

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          {services.map((service, index) => (
            <Card key={index} className="hover-lift card-gradient border-0 shadow-lg animate-fade-in" style={{
              animationDelay: `${index * 0.1}s`
            }}>
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

        {/* Seção Elegante - Eletrônicos e Bikes */}
        <div className="relative overflow-hidden bg-gradient-to-r from-slate-50 to-gray-100 rounded-3xl p-12 mb-12">
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-32 h-32 bg-primary/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-secondary/5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-accent/5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-10">
              <h3 className="text-2xl lg:text-3xl font-bold text-secondary mb-4">
                Proteção Além da Casa
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Cuidamos também dos seus itens mais importantes do dia a dia
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {/* Eletrônicos Card */}
              <div className="group">
                <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      {/* Smartphone mockup */}
                      <div className="relative mx-auto w-20 h-32 bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl border-2 border-slate-700 group-hover:rotate-12 transition-transform duration-500">
                        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-slate-600 rounded-full"></div>
                        <div className="absolute top-4 bottom-6 left-1 right-1 bg-gradient-to-b from-blue-400 to-purple-500 rounded-xl flex items-center justify-center">
                          <Smartphone className="w-8 h-8 text-white animate-bounce" />
                        </div>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 border-2 border-slate-600 rounded-full"></div>
                      </div>
                      
                      {/* Elementos flutuantes */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
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
              <div className="group">
                <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      {/* Bike mockup */}
                      <div className="relative mx-auto group-hover:translate-x-4 transition-transform duration-700">
                        {/* Bike body */}
                        <div className="relative">
                          {/* Wheels */}
                          <div className="flex items-center justify-between w-24">
                            <div className="w-8 h-8 border-4 border-slate-700 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 group-hover:rotate-180 transition-transform duration-1000"></div>
                            <div className="w-8 h-8 border-4 border-slate-700 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 group-hover:rotate-180 transition-transform duration-1000"></div>
                          </div>
                          {/* Frame */}
                          <div className="absolute top-3 left-2 w-20 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform rotate-12"></div>
                          <div className="absolute top-1 left-4 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform -rotate-45"></div>
                          <div className="absolute top-1 right-4 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-green-500 transform rotate-45"></div>
                          {/* Seat */}
                          <div className="absolute -top-1 left-6 w-6 h-2 bg-slate-800 rounded-full"></div>
                          {/* Handlebars */}
                          <div className="absolute -top-1 right-2 w-6 h-1 bg-slate-700 rounded-full"></div>
                        </div>
                      </div>
                      
                      {/* Elementos flutuantes */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-ping"></div>
                      <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
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
