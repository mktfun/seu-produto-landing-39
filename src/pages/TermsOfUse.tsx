import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Shield, AlertCircle, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TermsOfUse = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Site
            </Button>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-secondary mb-4">
                Termos de Uso
              </h1>
              <p className="text-muted-foreground">
                Condições gerais de uso da plataforma de cotação
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Última atualização: Janeiro de 2025
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-4">
                      1. Sobre Este Site e Nossos Serviços
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        Este site é uma <strong>plataforma de cotação de seguros residenciais</strong> 
                        operada pela <strong>JJ & Amorim Corretora de Seguros</strong> 
                        (CNPJ: 21.364.352/0001-04), corretora autorizada pela SUSEP (Registro: 37NDXJ) 
                        e credenciada pela Zurich Seguros.
                      </p>
                      <p>
                        Nosso serviço consiste em <strong>intermediar a cotação e contratação</strong> 
                        de produtos de seguro residencial da <strong>Zurich Seguros</strong>, 
                        oferecendo uma experiência digital simplificada para nossos clientes.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-4">
                      2. Como Funciona Nossa Plataforma
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-secondary mb-2">Processo de Cotação:</h3>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                          <li>Você fornece informações sobre seu perfil e imóvel</li>
                          <li>Nossa plataforma processa essas informações</li>
                          <li>Elaboramos cotações personalizadas dos produtos Zurich</li>
                          <li>Apresentamos as opções mais adequadas ao seu perfil</li>
                          <li>Auxiliamos no processo de contratação, se desejado</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary mb-2">Papel da JJ & Amorim:</h3>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                          <li>Intermediação entre cliente e Zurich Seguros</li>
                          <li>Consultoria personalizada sobre coberturas</li>
                          <li>Suporte durante todo o processo</li>
                          <li>Atendimento pós-venda e apoio em sinistros</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-4">
                      3. Responsabilidades e Limitações
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-secondary mb-2">Nossas Responsabilidades:</h3>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                          <li>Fornecer informações precisas sobre os produtos Zurich</li>
                          <li>Processar suas informações com segurança e confidencialidade</li>
                          <li>Prestar atendimento qualificado e profissional</li>
                          <li>Cumprir todas as regulamentações da SUSEP</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary mb-2">Suas Responsabilidades:</h3>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                          <li>Fornecer informações verdadeiras e completas</li>
                          <li>Ler atentamente as condições gerais da apólice</li>
                          <li>Comunicar alterações que possam afetar o risco</li>
                          <li>Utilizar o site de forma adequada e legal</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-4">
                      4. Importante: Sobre os Seguros
                    </h2>
                    <div className="space-y-4 text-muted-foreground">
                      <p>
                        <strong>As apólices de seguro são emitidas pela Zurich Seguros</strong>, 
                        e todos os direitos, deveres e condições estão sujeitos às Condições 
                        Gerais e Especiais de cada produto.
                      </p>
                      <p>
                        A JJ & Amorim atua exclusivamente como <strong>intermediária</strong> 
                        no processo de cotação e contratação. Para questões sobre cobertura, 
                        sinistros e condições contratuais, consulte sempre as Condições Gerais 
                        da apólice ou entre em contato conosco para orientação.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-secondary mb-4">
                  5. Propriedade Intelectual
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Este site contém materiais protegidos por direitos autorais, incluindo 
                    textos, imagens, logos e software, pertencentes à JJ & Amorim ou licenciados 
                    por terceiros.
                  </p>
                  <p>
                    O uso do site não concede qualquer direito sobre estes materiais, 
                    exceto para fins de cotação e contratação de seguros.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-secondary mb-4">
                  6. Modificações e Disponibilidade
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Reservamos o direito de modificar estes termos a qualquer momento. 
                    As alterações entrarão em vigor imediatamente após a publicação no site.
                  </p>
                  <p>
                    Embora nos esforcemos para manter o site sempre disponível, não garantimos 
                    disponibilidade ininterrupta e nos reservamos o direito de suspender o 
                    serviço para manutenção quando necessário.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-secondary mb-4">
                  7. Lei Aplicável e Contato
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Estes termos são regidos pela legislação brasileira, especialmente 
                    pelo Código Civil, Código de Defesa do Consumidor e regulamentações da SUSEP.
                  </p>
                  <div className="bg-primary/5 p-4 rounded-lg">
                    <p className="font-semibold text-secondary mb-2">Para dúvidas ou suporte:</p>
                    <p><strong>E-mail:</strong> contato@jjamorimseguros.com.br</p>
                    <p><strong>Telefone:</strong> +55 11 97969-9832</p>
                    <p>
                      <strong>Endereço:</strong> R. Frei Gaspar, 941 - Sala 603, 
                      Vila Santa Rita de Cassia, São Bernardo do Campo - SP, 09720-440
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUse;