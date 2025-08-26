import { Button } from "@/components/ui/button";
import { Shield, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img 
              src="/lovable-uploads/286307c9-2b48-4465-8943-9d890a8bfd04.png" 
              alt="Zurich Logo" 
              className="h-8 w-auto"
            />
            <div>
              <p className="text-sm font-medium text-secondary">Residência</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <a href="#servicos" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-lg hover:bg-blue-50">
              Serviços
            </a>
            <a href="#planos" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-lg hover:bg-blue-50">
              Planos
            </a>
            <a href="#contato" className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium hover:scale-105 px-3 py-2 rounded-lg hover:bg-blue-50">
              Contato
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-blue-700 bg-blue-50/50 rounded-lg px-3 py-2 hover:bg-blue-100/70 transition-colors group">
                <Phone className="w-4 h-4 group-hover:animate-bounce" />
                <span className="font-medium">+55 11 97969-9832</span>
              </div>
            </div>
            <Button
              variant="premium"
              size="default"
              className="font-semibold group"
              onClick={() => navigate("/onboard")}
            >
              <Phone className="w-4 h-4 group-hover:animate-pulse" />
              Solicitar Cotação
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
