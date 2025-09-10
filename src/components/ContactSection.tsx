import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ContactSection = () => {
  const navigate = useNavigate();

  return (
    <section id="contato" className="py-12 sm:py-16 lg:py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary mb-3 sm:mb-4">
            Entre em Contato
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto px-2">
            Estamos prontos para atender você. Solicite sua cotação gratuita
            ou tire suas dúvidas com nossa equipe especializada.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 max-w-6xl mx-auto">
          <div className="space-y-6 sm:space-y-8">
            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-4 sm:mb-6">
                  Solicitar Cotação Personalizada
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Preencha seus dados em nosso formulário inteligente e receba
                    uma proposta personalizada para sua residência.
                  </p>

                  <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span>Formulário guiado passo a passo</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span>Proposta personalizada para sua casa</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs sm:text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                      <span>Atendimento por WhatsApp</span>
                    </div>
                  </div>

                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-sm sm:text-base"
                    size="lg"
                    onClick={() => navigate("/onboard")}
                  >
                    Simular Cotação Grátis Agora
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-secondary text-sm sm:text-base">WhatsApp</h4>
                    <p className="text-base sm:text-lg font-bold text-primary break-all">+55 11 97969-9832</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Atendimento personalizado</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-secondary text-sm sm:text-base">E-mail</h4>
                    <p className="text-sm sm:text-lg font-bold text-accent break-all">contato@jjamorimseguros.com</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Resposta em até 2 horas úteis</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-secondary text-sm sm:text-base">Horário de Atendimento</h4>
                    <p className="text-base sm:text-lg font-bold">Segunda a Sexta</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">8h às 18h - Sábados: 8h às 12h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-semibold text-secondary text-sm sm:text-base">Especialistas</h4>
                    <p className="text-base sm:text-lg font-bold">Seguro Residencial</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Corretora autorizada Zurich</p>
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
