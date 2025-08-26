import { Card, CardContent } from "@/components/ui/card";
import { Wrench, Zap, Shield, Droplets, Lock, Flame, Users, Truck, Phone, Leaf, Recycle } from "lucide-react";
const services = [{
  icon: Wrench,
  title: "Reparos Residenciais",
  description: "Serviços de manutenção e reparo para sua casa",
  items: ["Encanamento", "Elétrica", "Pintura", "Marcenaria"]
}, {
  icon: Zap,
  title: "Emergências Elétricas",
  description: "Atendimento 24h para problemas elétricos",
  items: ["Quedas de energia", "Curto-circuito", "Instalações", "Manutenção"]
}, {
  icon: Droplets,
  title: "Assistência Hidráulica",
  description: "Solução para problemas de água e esgoto",
  items: ["Vazamentos", "Entupimentos", "Instalação", "Emergências"]
}, {
  icon: Lock,
  title: "Segurança & Chaveiro",
  description: "Serviços de segurança e fechaduras",
  items: ["Chaves perdidas", "Troca de fechaduras", "Cofres", "Alarmes"]
}, {
  icon: Shield,
  title: "Vidraçaria & Proteção",
  description: "Reparo e instalação de vidros e telhados",
  items: ["Janelas", "Portas", "Box de banheiro", "Cobertura provisória"]
}, {
  icon: Truck,
  title: "Mudanças & Transporte",
  description: "Assistência em mudanças e transporte",
  items: ["Transporte", "Embalagem", "Montagem", "Guarda de móveis"]
}, {
  icon: Users,
  title: "Serviços Especializados",
  description: "Assistência para necessidades específicas",
  items: ["Assistência para pets", "Assistência a bike", "Hospedagem", "Vigilante"]
}, {
  icon: Leaf,
  title: "Serviços Sustentáveis",
  description: "Soluções ecológicas para sua residência",
  items: ["Descarte de móveis/eletrodomésticos", "Descarte de entulho", "Consultoria ambiental", "Projetos sustentáveis"],
  isEco: true
}];
const ServicesSection = () => {
  return <section id="servicos" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Cobertura completa para todas as necessidades da sua residência, 
            com profissionais qualificados e atendimento 24 horas por dia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => <Card key={index} className={`hover-lift border-0 shadow-lg animate-fade-in ${
            service.isEco
              ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-200'
              : 'card-gradient'
          }`} style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <CardContent className="p-6">
                {service.isEco && (
                  <div className="flex items-center justify-center w-full mb-4">
                    <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Recycle className="w-3 h-3" />
                      <span>Sustentável</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    service.isEco
                      ? 'bg-green-200/50'
                      : 'bg-primary/10'
                  }`}>
                    <service.icon className={`w-6 h-6 ${
                      service.isEco
                        ? 'text-green-600'
                        : 'text-primary'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary">
                      {service.title}
                    </h3>
                  </div>
                </div>

                <p className="text-muted-foreground mb-4">
                  {service.description}
                </p>

                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => <li key={itemIndex} className="flex items-center space-x-2 text-sm">
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        service.isEco
                          ? 'bg-green-600'
                          : 'bg-primary'
                      }`}></div>
                      <span>{item}</span>
                    </li>)}
                </ul>
              </CardContent>
            </Card>)}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-6 py-3">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">Atendimento 24h: 11 97969-9832</span>
          </div>
        </div>
      </div>
    </section>;
};
export default ServicesSection;
