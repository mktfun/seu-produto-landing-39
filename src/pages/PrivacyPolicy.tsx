import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, Database, Users, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
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
                Política de Privacidade
              </h1>
              <p className="text-muted-foreground">
                Como coletamos, usamos e protegemos seus dados pessoais
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
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-2">
                      1. Quem Somos e Nossa Responsabilidade
                    </h2>
                    <p className="text-muted-foreground">
                      A <strong>JJ & Amorim Corretora de Seguros</strong> (CNPJ: 21.364.352/0001-04), 
                      localizada na R. Frei Gaspar, 941 - Sala 603, Vila Santa Rita de Cassia, 
                      São Bernardo do Campo - SP, é a controladora dos dados pessoais coletados 
                      através deste site. Somos uma corretora autorizada pela SUSEP (Registro: 37NDXJ) 
                      e credenciada pela Zurich Seguros.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Database className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-4">
                      2. Dados Coletados e Finalidades
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-secondary mb-2">Dados Pessoais Coletados:</h3>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                          <li>Nome completo</li>
                          <li>Endereço de e-mail</li>
                          <li>Número de telefone</li>
                          <li>Informações sobre o imóvel (tipo, valor, localização)</li>
                          <li>Preferências de cobertura e orçamento</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-secondary mb-2">Finalidades do Tratamento:</h3>
                        <ul className="list-disc pl-6 text-muted-foreground space-y-1">
                          <li>Elaboração de cotação personalizada de seguro residencial</li>
                          <li>Comunicação sobre propostas e produtos da Zurich Seguros</li>
                          <li>Atendimento e suporte ao cliente</li>
                          <li>Cumprimento de obrigações legais e regulatórias</li>
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
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-4">
                      3. Compartilhamento de Dados
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Seus dados pessoais são compartilhados com a <strong>Zurich Seguros</strong> 
                      para as seguintes finalidades:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Análise de risco e elaboração da proposta de seguro</li>
                      <li>Emissão da apólice de seguro, caso contratada</li>
                      <li>Gestão do relacionamento e atendimento ao segurado</li>
                      <li>Cumprimento de obrigações regulatórias da seguradora</li>
                    </ul>
                    <p className="text-muted-foreground mt-4">
                      <strong>Importante:</strong> A Zurich Seguros também atuará como controladora 
                      dos seus dados para fins de emissão e gestão da apólice, seguindo sua própria 
                      política de privacidade.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-secondary mb-4">
                      4. Seus Direitos (LGPD)
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      Conforme a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
                    </p>
                    <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                      <li>Confirmação da existência de tratamento dos seus dados</li>
                      <li>Acesso aos seus dados pessoais</li>
                      <li>Correção de dados incompletos, inexatos ou desatualizados</li>
                      <li>Anonimização, bloqueio ou eliminação de dados desnecessários</li>
                      <li>Portabilidade dos dados a outro fornecedor</li>
                      <li>Eliminação dos dados tratados com seu consentimento</li>
                      <li>Revogação do consentimento</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-secondary mb-4">
                  5. Segurança e Retenção
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Implementamos medidas técnicas e organizacionais adequadas para proteger 
                    seus dados pessoais contra acesso não autorizado, perda, destruição ou alteração.
                  </p>
                  <p>
                    Seus dados serão mantidos pelo período necessário para cumprimento das 
                    finalidades descritas ou conforme exigido pela legislação aplicável.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="card-gradient border-0 shadow-lg">
              <CardContent className="p-8">
                <h2 className="text-xl font-bold text-secondary mb-4">
                  6. Contato
                </h2>
                <div className="text-muted-foreground space-y-2">
                  <p>Para exercer seus direitos ou esclarecer dúvidas sobre esta política:</p>
                  <p><strong>E-mail:</strong> contato@jjamorimseguros.com.br</p>
                  <p><strong>Telefone:</strong> +55 11 97969-9832</p>
                  <p>
                    <strong>Endereço:</strong> R. Frei Gaspar, 941 - Sala 603, 
                    Vila Santa Rita de Cassia, São Bernardo do Campo - SP, 09720-440
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;