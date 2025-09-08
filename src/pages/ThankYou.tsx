import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ExternalLink, Timer } from "lucide-react";

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Get form data from navigation state
  const formData = location.state?.formData || {};

  useEffect(() => {
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRedirect = () => {
    setIsRedirecting(true);
    window.location.href = "https://jjamorimseguros.com.br";
  };

  const handleManualRedirect = () => {
    handleRedirect();
  };

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto shadow-xl">
        <CardContent className="p-8 text-center space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          {/* Thank You Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-secondary">
              Obrigado, {formData.name || "Cliente"}! 🎉
            </h1>
            <p className="text-lg text-muted-foreground">
              Sua cotação foi enviada com sucesso!
            </p>
          </div>

          {/* Form Summary */}
          {formData.recommendedPlan && (
            <div className="bg-primary/5 rounded-lg p-6 text-left">
              <h3 className="font-semibold text-secondary mb-3">Resumo da sua cotação:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plano recomendado:</span>
                  <span className="font-medium text-primary">{formData.recommendedPlan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tipo de imóvel:</span>
                  <span className="font-medium">{formData.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Valor estimado:</span>
                  <span className="font-medium">{formData.propertyValue}</span>
                </div>
              </div>
            </div>
          )}

          {/* Countdown and Redirect */}
          <div className="space-y-4">
            {countdown > 0 ? (
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-blue-700">
                  <Timer className="w-5 h-5" />
                  <span className="font-medium">
                    Redirecionando em {countdown} segundos...
                  </span>
                </div>
                <div className="w-full bg-blue-200 rounded-full h-2 mt-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${((5 - countdown) / 5) * 100}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-center space-x-2 text-green-700">
                  <ExternalLink className="w-5 h-5" />
                  <span className="font-medium">
                    {isRedirecting ? "Redirecionando..." : "Redirecionamento em andamento..."}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={handleManualRedirect}
              className="bg-primary hover:bg-primary/90"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Ir para JJ Amorim Seguros
            </Button>
            <Button 
              variant="outline" 
              onClick={handleBackToHome}
            >
              Voltar ao início
            </Button>
          </div>

          {/* Additional Information */}
          <div className="text-xs text-muted-foreground space-y-1">
            <p>✅ Seus dados foram salvos com segurança</p>
            <p>📧 Um email com sua cotação foi enviado</p>
            <p>📞 Nossa equipe entrará em contato em breve</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankYou;