import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

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
              Prote��ão completa para sua casa com cobertura diferenciada, 
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

          <div className="relative animate-scale-in flex items-center justify-center">
            {/* Elementos decorativos do lado esquerdo */}
            <div className="absolute left-0 top-1/4 w-20 h-20 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full opacity-80 animate-float"></div>
            <div className="absolute left-4 bottom-1/4 w-12 h-12 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full opacity-70 animate-float" style={{animationDelay: '1s'}}></div>

            {/* Elementos decorativos do lado direito */}
            <div className="absolute right-0 top-1/3 w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full opacity-75 animate-float" style={{animationDelay: '2s'}}></div>
            <div className="absolute right-6 bottom-1/3 w-10 h-10 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full opacity-80 animate-float" style={{animationDelay: '0.5s'}}></div>

            {/* Container circular da imagem */}
            <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8db09fcbd19243afa37a84aaf6b10caf%2F648ae6f7d2264f4985ef246a9db8f10b?format=webp&width=800"
                alt="Família feliz em casa - Zurich Residência"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Elementos decorativos adicionais */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full opacity-60 animate-float" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute bottom-0 left-1/3 w-6 h-6 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full opacity-70 animate-float" style={{animationDelay: '2.5s'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
