import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, X } from "lucide-react";

interface ComparisonItem {
  service: string;
  essencial: boolean | string;
  completo: boolean | string;
  completoPlus: boolean | string;
}

const comparisonData: ComparisonItem[] = [
  {
    service: "Serviços emergenciais",
    essencial: "Básico",
    completo: "Completo", 
    completoPlus: "Completo"
  },
  {
    service: "Chaveiro e vidraceiro",
    essencial: true,
    completo: true,
    completoPlus: true
  },
  {
    service: "Cobertura de telhados",
    essencial: true,
    completo: true,
    completoPlus: true
  },
  {
    service: "Hospedagem temporária",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Mudança e transporte",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Assistência para pets",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Conserto de eletrodomésticos",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Manutenção preventiva",
    essencial: false,
    completo: false,
    completoPlus: true
  },
  {
    service: "Inspeção domiciliar",
    essencial: false,
    completo: false,
    completoPlus: true
  },
  {
    service: "Serviços sustentáveis",
    essencial: true,
    completo: true,
    completoPlus: true
  }
];

const PlansComparisonTable = () => {
  const renderValue = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-primary mx-auto" />
      ) : (
        <X className="w-5 h-5 text-muted-foreground mx-auto" />
      );
    }
    return <span className="text-sm font-medium text-center block">{value}</span>;
  };

  return (
    <Card className="w-full card-gradient shadow-lg">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-secondary">
          Comparação dos Planos
        </CardTitle>
        <p className="text-muted-foreground">
          Veja rapidamente as principais diferenças entre os planos
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 sm:py-4 sm:px-4 font-semibold text-secondary min-w-[150px] sm:min-w-[200px] text-sm sm:text-base">
                  Principais Serviços
                </th>
                <th className="text-center py-3 px-2 sm:py-4 sm:px-4 font-semibold text-secondary min-w-[80px] sm:min-w-[120px] text-sm sm:text-base">
                  Essencial
                </th>
                <th className="text-center py-3 px-2 sm:py-4 sm:px-4 font-semibold text-primary min-w-[80px] sm:min-w-[120px] text-sm sm:text-base">
                  Completo
                  <div className="text-xs font-normal text-primary/80 mt-1">
                    Popular
                  </div>
                </th>
                <th className="text-center py-3 px-2 sm:py-4 sm:px-4 font-semibold text-secondary min-w-[80px] sm:min-w-[120px] text-sm sm:text-base">
                  Completo+
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item, index) => (
                <tr 
                  key={index} 
                  className={`border-b border-border/50 hover:bg-muted/30 transition-colors ${
                    index % 2 === 0 ? 'bg-muted/10' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-sm">
                    {item.service}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {renderValue(item.essencial)}
                  </td>
                  <td className="py-3 px-4 text-center bg-primary/5">
                    {renderValue(item.completo)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {renderValue(item.completoPlus)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            <strong>Legenda:</strong> ✓ = Incluído | ✗ = Não incluído
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlansComparisonTable;
