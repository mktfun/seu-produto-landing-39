import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactSection = () => {
  const navigate = useNavigate();

  return (
    <section id="contato" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-secondary mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Estamos prontos para atender você. Solicite sua cotação gratuita 
            ou tire suas dúvidas com nossa equipe especializada.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-secondary mb-6">
                  Solicitar Cotação
                </h3>
                
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input placeholder="Seu nome completo" />
                    <Input placeholder="Seu telefone" type="tel" />
                  </div>
                  <Input placeholder="Seu e-mail" type="email" />
                  <Input placeholder="CEP da residência" />
                  <Textarea 
                    placeholder="Descreva brevemente quais serviços você precisa..."
                    rows={4}
                  />
                  <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
                    Enviar Solicitação
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">WhatsApp</h4>
                    <p className="text-lg font-bold text-primary">+55 11 97969-9832</p>
                    <p className="text-sm text-muted-foreground">Atendimento personalizado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">E-mail</h4>
                    <p className="text-lg font-bold text-accent">contato@jjamorimseguros.com.br</p>
                    <p className="text-sm text-muted-foreground">Resposta em até 2 horas úteis</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">Horário de Atendimento</h4>
                    <p className="text-lg font-bold">Segunda a Sexta</p>
                    <p className="text-sm text-muted-foreground">8h às 18h - Sábados: 8h às 12h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-secondary">Especialistas</h4>
                    <p className="text-lg font-bold">Seguro Residencial</p>
                    <p className="text-sm text-muted-foreground">Corretora autorizada Zurich</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
