import { Card, CardContent } from "@/components/ui/card";
import { Shield, MapPin, Phone, Mail, FileText, User } from "lucide-react";
import { memo } from "react";

const BrokerSection = memo(() => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
              Conte com a Expertise da JJ & Amorim, 
              <span className="text-primary block mt-2">sua Corretora Autorizada Zurich</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Somos especialistas em seguros residenciais e representantes oficiais da Zurich. 
              Nossa missão é encontrar a proteção ideal para sua casa com toda transparência e segurança.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary mb-2">Razão Social</h3>
                    <p className="text-muted-foreground text-sm">
                      JJ & Amorim Corretora de Seguros
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary mb-2">CNPJ</h3>
                    <p className="text-muted-foreground text-sm">
                      21.364.352/0001-04
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary mb-2">Registro SUSEP</h3>
                    <p className="text-muted-foreground text-sm">
                      37NDXJ
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary mb-2">Endereço</h3>
                    <p className="text-muted-foreground text-sm">
                      R. Frei Gaspar, 941 - Sala 603<br />
                      Vila Santa Rita de Cassia<br />
                      São Bernardo do Campo - SP<br />
                      CEP: 09720-440
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary mb-2">Telefone</h3>
                    <p className="text-muted-foreground text-sm">
                      +55 11 97969-9832
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg hover-lift">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary mb-2">E-mail</h3>
                    <p className="text-muted-foreground text-sm">
                      contato@jjamorimseguros.com.br
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl font-bold text-secondary mb-4">
                🏆 Autorização e Credenciamento
              </h3>
              <p className="text-muted-foreground mb-6">
                A JJ & Amorim é uma corretora devidamente autorizada pela SUSEP e credenciada pela Zurich Seguros. 
                Trabalhamos com total transparência e dentro das regulamentações do mercado segurador brasileiro.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span className="bg-primary/5 px-3 py-1 rounded-full">✓ Autorizada SUSEP</span>
                <span className="bg-primary/5 px-3 py-1 rounded-full">✓ Credenciada Zurich</span>
                <span className="bg-primary/5 px-3 py-1 rounded-full">✓ Especialista em Residencial</span>
                <span className="bg-primary/5 px-3 py-1 rounded-full">✓ Atendimento Personalizado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

BrokerSection.displayName = 'BrokerSection';
export default BrokerSection;