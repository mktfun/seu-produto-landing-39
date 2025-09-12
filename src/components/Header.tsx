import { Button } from "@/components/ui/button";
import { Shield, Phone, Mail, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";

const Header = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > 100);
  }, []);

  useEffect(() => {
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  return (
    <header className={`fixed z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? 'top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 bg-white/98 backdrop-blur-lg border border-gray-200/50 shadow-xl rounded-xl sm:rounded-2xl'
          : 'top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b shadow-sm'
      }`}>
      <div className={`container mx-auto transition-all duration-500 ease-in-out ${
        isScrolled ? 'px-6 py-2' : 'px-4 py-3'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/lovable-uploads/286307c9-2b48-4465-8943-9d890a8bfd04.png"
              alt="Zurich Logo"
              className={`w-auto transition-all duration-500 ease-in-out ${
                isScrolled ? 'h-6' : 'h-8'
              }`}
            />
            <div className={`transition-all duration-500 ease-in-out ${
              isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}>
              <p className="text-sm font-medium text-secondary">Residência</p>
            </div>
            <div className="hidden sm:flex items-center space-x-3">
              <div className="w-px bg-border h-8"></div>
              <div className={`transition-all duration-500 ease-in-out ${isScrolled ? 'text-xs' : 'text-sm'}`}>
                <p className="font-medium text-secondary">JJ & Amorim</p>
                <p className="text-xs text-muted-foreground">Corretora Autorizada</p>
              </div>
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

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <div className={`hidden lg:flex items-center space-x-4 text-sm transition-all duration-500 ease-in-out ${
              isScrolled ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'
            }`}>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+55 11 97969-9832</span>
              </div>
            </div>
            <Button
              variant="default"
              className={`transition-all duration-500 ease-in-out ${
                isScrolled ? 'h-9 px-4 text-sm' : 'h-12 px-6'
              }`}
              onClick={() => navigate("/onboard")}
            >
              {isScrolled ? 'Simular Cotação' : 'Simular Cotação Grátis Agora'}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t transition-all duration-300 ease-in-out ${
            isScrolled
              ? 'bg-white/98 backdrop-blur-lg mt-2 rounded-xl border border-gray-200/50'
              : 'bg-white/95 backdrop-blur-sm'
          }`}>
            <nav className="px-4 py-4 space-y-4">
              <a
                href="#servicos"
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Serviços
              </a>
              <a
                href="#planos"
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Planos
              </a>
              <a
                href="#contato"
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contato
              </a>
              <div className="pt-4 border-t">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    navigate("/onboard");
                    setMobileMenuOpen(false);
                  }}
                >
                  Simular Cotação Grátis Agora
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
