import { Button } from "@/components/ui/button";
import { Shield, CheckCircle, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-white animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-white animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-white animate-float" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 rounded-full bg-white animate-float" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-28 h-28 rounded-full bg-white animate-float" style={{animationDelay: '2.5s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Assistência 24h Garantida</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white">
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
                variant="transparentWhite"
                onClick={() => navigate("/onboard")}
              >
                Solicitar Cotação Gratuita
              </Button>
              <Button
                size="lg"
                variant="transparentWhite"
                onClick={() => {
                  const planosElement = document.getElementById('planos');
                  planosElement?.scrollIntoView({ behavior: 'smooth' });
                }}
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
            {/* Floating bubbles around the image */}
            <div className="absolute -top-8 -left-8 w-6 h-6 bg-white/40 rounded-full animate-float opacity-60" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute -top-12 left-20 w-4 h-4 bg-white/30 rounded-full animate-float opacity-70" style={{animationDelay: '1.2s'}}></div>
            <div className="absolute top-8 -left-12 w-8 h-8 bg-white/35 rounded-full animate-float opacity-50" style={{animationDelay: '2.1s'}}></div>
            <div className="absolute top-32 -left-6 w-5 h-5 bg-white/45 rounded-full animate-float opacity-65" style={{animationDelay: '0.8s'}}></div>

            <div className="absolute -top-6 -right-10 w-7 h-7 bg-white/40 rounded-full animate-float opacity-55" style={{animationDelay: '1.5s'}}></div>
            <div className="absolute top-12 -right-8 w-4 h-4 bg-white/35 rounded-full animate-float opacity-60" style={{animationDelay: '2.8s'}}></div>
            <div className="absolute top-40 -right-4 w-6 h-6 bg-white/30 rounded-full animate-float opacity-70" style={{animationDelay: '0.3s'}}></div>

            <div className="absolute -bottom-8 -left-6 w-5 h-5 bg-white/45 rounded-full animate-float opacity-50" style={{animationDelay: '1.8s'}}></div>
            <div className="absolute -bottom-4 left-16 w-7 h-7 bg-white/35 rounded-full animate-float opacity-65" style={{animationDelay: '2.5s'}}></div>
            <div className="absolute bottom-20 -right-8 w-4 h-4 bg-white/40 rounded-full animate-float opacity-55" style={{animationDelay: '1.1s'}}></div>
            <div className="absolute -bottom-10 right-12 w-6 h-6 bg-white/30 rounded-full animate-float opacity-60" style={{animationDelay: '0.7s'}}></div>

            {/* Above the image */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 w-5 h-5 bg-white/50 rounded-full animate-float opacity-70" style={{animationDelay: '1.9s'}}></div>
            <div className="absolute -top-20 left-1/3 w-3 h-3 bg-white/40 rounded-full animate-float opacity-60" style={{animationDelay: '2.3s'}}></div>
            <div className="absolute -top-24 right-1/3 w-4 h-4 bg-white/35 rounded-full animate-float opacity-50" style={{animationDelay: '0.9s'}}></div>

            <div className="relative w-96 h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8db09fcbd19243afa37a84aaf6b10caf%2F648ae6f7d2264f4985ef246a9db8f10b?format=webp&width=800"
                alt="Família feliz em casa - Zurich Residência"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
