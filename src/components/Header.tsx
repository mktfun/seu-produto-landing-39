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
            <a href="#servicos" className="text-foreground hover:text-primary transition-colors">
              Serviços
            </a>
            <a href="#planos" className="text-foreground hover:text-primary transition-colors">
              Planos
            </a>
            <a href="#contato" className="text-foreground hover:text-primary transition-colors">
              Contato
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+55 11 97969-9832</span>
              </div>
            </div>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90"
              onClick={() => navigate("/onboard")}
            >
              Solicitar Cotação
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
