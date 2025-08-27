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
        <div className="absolute bottom-20 right-10 w-24 h-24 rounded-full bg-white animate-float animate-float-delay-1s"></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 rounded-full bg-white animate-float animate-float-delay-2s"></div>
        <div className="absolute top-1/3 left-1/4 w-20 h-20 rounded-full bg-white animate-float-delay-05"></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 rounded-full bg-white animate-float-delay-15"></div>
        <div className="absolute top-3/4 right-1/3 w-28 h-28 rounded-full bg-white animate-float-delay-25"></div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="text-white space-y-6 animate-fade-in">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">Assistência 24h Garantida</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-white">
              Zurich<br />
              <span className="text-white/90">Residência</span>
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 max-w-lg">
              Serviços de Assistência 24h e Sustentáveis
            </p>
            
            <p className="text-base sm:text-lg text-white/80 max-w-xl">
              Proteção completa para sua casa com cobertura diferenciada,
              pensada com todo cuidado para garantir itens básicos do dia-a-dia.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold shadow-lg"
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

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8">
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full mb-2 mx-auto">
                  <Clock className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <p className="text-xs sm:text-sm font-medium">24h</p>
                <p className="text-xs text-white/80">Atendimento</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full mb-2 mx-auto">
                  <Users className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <p className="text-xs sm:text-sm font-medium">+50K</p>
                <p className="text-xs text-white/80">Clientes</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full mb-2 mx-auto">
                  <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <p className="text-xs sm:text-sm font-medium">100%</p>
                <p className="text-xs text-white/80">Garantia</p>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in flex items-center justify-center mt-8 lg:mt-0">
            {/* Floating bubbles around the image - reduced for mobile */}
            <div className="hidden sm:block absolute -top-8 -left-8 w-6 h-6 bg-white/40 rounded-full animate-float-delay-05 opacity-60"></div>
            <div className="hidden lg:block absolute -top-12 left-20 w-4 h-4 bg-white/30 rounded-full animate-float-delay-12 opacity-70"></div>
            <div className="hidden sm:block absolute top-8 -left-12 w-8 h-8 bg-white/35 rounded-full animate-float-delay-21 opacity-50"></div>
            <div className="hidden lg:block absolute top-32 -left-6 w-5 h-5 bg-white/45 rounded-full animate-float-delay-08 opacity-65"></div>

            <div className="hidden sm:block absolute -top-6 -right-10 w-7 h-7 bg-white/40 rounded-full animate-float-delay-15 opacity-55"></div>
            <div className="hidden lg:block absolute top-12 -right-8 w-4 h-4 bg-white/35 rounded-full animate-float-delay-28 opacity-60"></div>
            <div className="hidden sm:block absolute top-40 -right-4 w-6 h-6 bg-white/30 rounded-full animate-float-delay-03 opacity-70"></div>

            {/* Zurich logo background - responsive size */}
            <div className="absolute -top-4 sm:-top-6 lg:-top-10 -left-4 sm:-left-6 lg:-left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-80 lg:h-80 rounded-full opacity-20 z-0 border border-white/60">
              <div className="w-full h-full bg-gradient-to-br from-white/60 to-white/40 rounded-full p-3 sm:p-4 lg:p-8 flex items-center justify-center">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F341d59d887524a4696fe7d894c9eaabb%2F306ae11207464861be1cb081421d2766?format=webp&width=800"
                  alt="Zurich Logo"
                  className="w-20 h-20 sm:w-32 sm:h-32 lg:w-64 lg:h-64 object-contain brightness-150 contrast-125"
                  style={{filter: 'brightness(1.5) contrast(1.2) saturate(0.3)'}}
                />
              </div>
            </div>

            {/* Main family image - circular design */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden shadow-2xl border-4 border-white/20 z-10 ml-8 sm:ml-12 lg:ml-20">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10"></div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8db09fcbd19243afa37a84aaf6b10caf%2F648ae6f7d2264f4985ef246a9db8f10b?format=webp&width=800"
                alt="Família feliz em casa - Zurich Residência"
                className="w-full h-full object-cover drop-shadow-2xl"
              />
              {/* Additional shadow overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
