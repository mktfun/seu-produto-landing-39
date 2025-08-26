
import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Clock, Users } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-white animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Assistência 24h Garantida</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
              Zurich<br />
              <span className="text-white/90">Residência</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 max-w-lg">
              Serviços de Assistência 24h e Sustentáveis
            </p>
            
            <p className="text-lg text-white/80 max-w-xl">
              Proteção completa para sua casa com cobertura diferenciada, 
              pensada com todo cuidado para garantir itens básicos do dia-a-dia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-white text-secondary hover:bg-white/90 shadow-lg hover-lift"
              >
                Solicitar Cotação Gratuita
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-secondary"
              >
                Ver Planos Disponíveis
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 mx-auto">
                  <Clock className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">24h</p>
                <p className="text-xs text-white/80">Atendimento</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">+50K</p>
                <p className="text-xs text-white/80">Clientes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-2 mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">100%</p>
                <p className="text-xs text-white/80">Garantia</p>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl"></div>
            <img
              src="/lovable-uploads/98786726-1f5a-4a7b-b00b-78e645c14be3.png"
              alt="Casal feliz em casa - Zurich Residência"
              className="rounded-3xl shadow-2xl w-full h-[600px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
