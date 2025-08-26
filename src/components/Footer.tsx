import { Separator } from "@/components/ui/separator";
const Footer = () => {
  return <footer className="bg-secondary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/lovable-uploads/286307c9-2b48-4465-8943-9d890a8bfd04.png" alt="Zurich Logo" className="h-8 w-auto brightness-0 invert" />
              <div>
                <p className="text-sm font-medium text-white/90">Residência</p>
              </div>
            </div>
            <p className="text-white/80 text-sm">
              Proteção completa para sua casa com assistência 24h 
              e serviços sustentáveis de qualidade.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Assistência Elétrica</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Hidráulica</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Chaveiro 24h</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vidraçaria</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mudanças</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Planos</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><a href="#" className="hover:text-white transition-colors">Essencial</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Completo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Completo+</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Comparar Planos</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>+55 11 97969-9832</li>
              <li>contato@jjamorimseguros.com.br</li>
              <li>CNPJ: 21.364.352/0001-04</li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/80">
          <div className="space-y-1">
            <p>© 2025 Corretora JJ & Amorim - Autorizada pela Zurich</p>
            <p>Especialistas em Seguro Residencial</p>
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">SUSEP</a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;