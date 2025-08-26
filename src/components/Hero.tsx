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
            <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-white/25 to-blue-100/25 backdrop-blur-md rounded-full px-6 py-3 border border-white/30 shadow-xl group hover:scale-105 transition-all duration-300">
              <div className="p-1 bg-white/20 rounded-full">
                <Shield className="w-5 h-5 text-white group-hover:rotate-12 transition-transform" />
              </div>
              <span className="text-sm font-semibold text-white drop-shadow-md">Assistência 24h Garantida</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl xl:text-8xl font-black leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent drop-shadow-2xl animate-pulse">Zurich</span><br />
              <span className="bg-gradient-to-r from-blue-200 via-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">Residência</span>
            </h1>
            
            <p className="text-xl lg:text-3xl font-semibold text-white/95 max-w-lg leading-relaxed drop-shadow-lg">
              Serviços de <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent font-bold">Assistência 24h</span> e <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent font-bold">Sustentáveis</span>
            </p>
            
            <p className="text-lg lg:text-xl text-white/85 max-w-xl leading-relaxed font-medium drop-shadow-md">
              Proteção completa para sua casa com cobertura diferenciada,
              pensada com todo cuidado para garantir itens básicos do dia-a-dia.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                variant="hero"
                className="font-bold text-lg shadow-2xl group"
                onClick={() => navigate("/onboard")}
              >
                <Shield className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Solicitar Cotação Gratuita
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 backdrop-blur-sm font-semibold text-lg group"
                onClick={() => {
                  const planosElement = document.getElementById('planos');
                  planosElement?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <CheckCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Ver Planos Disponíveis
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-400/30 to-blue-600/40 rounded-2xl mb-3 mx-auto backdrop-blur-sm border border-white/20 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Clock className="w-8 h-8 text-white drop-shadow-lg group-hover:animate-pulse" />
                </div>
                <p className="text-lg font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">24h</p>
                <p className="text-sm text-white/90 font-medium">Atendimento</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400/30 to-emerald-600/40 rounded-2xl mb-3 mx-auto backdrop-blur-sm border border-white/20 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <Users className="w-8 h-8 text-white drop-shadow-lg group-hover:animate-bounce" />
                </div>
                <p className="text-lg font-bold bg-gradient-to-r from-white to-green-100 bg-clip-text text-transparent">+50K</p>
                <p className="text-sm text-white/90 font-medium">Clientes</p>
              </div>
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-600/40 rounded-2xl mb-3 mx-auto backdrop-blur-sm border border-white/20 shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <CheckCircle className="w-8 h-8 text-white drop-shadow-lg group-hover:animate-spin" />
                </div>
                <p className="text-lg font-bold bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent">100%</p>
                <p className="text-sm text-white/90 font-medium">Garantia</p>
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
