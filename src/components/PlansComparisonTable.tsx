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
    service: "Indicação de mão de obra",
    essencial: "3 utilizações",
    completo: "3 utilizações", 
    completoPlus: "3 utilizações"
  },
  {
    service: "Serviços emergenciais (encanador, eletricista, chaveiro)",
    essencial: "4 conjuntos",
    completo: "12 conjuntos",
    completoPlus: "12 conjuntos"
  },
  {
    service: "Cobertura provisória de telhados",
    essencial: true,
    completo: true,
    completoPlus: true
  },
  {
    service: "Vigilante",
    essencial: true,
    completo: true,
    completoPlus: true
  },
  {
    service: "Limpeza",
    essencial: true,
    completo: true,
    completoPlus: true
  },
  {
    service: "Regresso antecipado",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Hospedagem",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Restaurante e lavanderia",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Locação de eletrodomésticos",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Locação de televisão",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Escritório provisório",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Mudança e guarda móveis",
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
    service: "Reparo ar condicionado",
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
    service: "Assistência a bike",
    essencial: false,
    completo: true,
    completoPlus: true
  },
  {
    service: "Manutenção geral (3 serviços à escolha)",
    essencial: false,
    completo: false,
    completoPlus: true
  },
  {
    service: "Inspeção domiciliar (2 serviços à escolha)",
    essencial: false,
    completo: false,
    completoPlus: true
  },
  {
    service: "Descarte sustentável",
    essencial: true,
    completo: true,
    completoPlus: true
  },
  {
    service: "Consultoria ambiental",
    essencial: "Ilimitado",
    completo: "Ilimitado",
    completoPlus: "Ilimitado"
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
          Comparação Detalhada dos Planos
        </CardTitle>
        <p className="text-muted-foreground">
          Compare todos os serviços incluídos em cada plano Zurich Residência
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-semibold text-secondary min-w-[250px]">
                  Serviços
                </th>
                <th className="text-center py-4 px-4 font-semibold text-secondary min-w-[150px]">
                  Essencial
                </th>
                <th className="text-center py-4 px-4 font-semibold text-primary min-w-[150px]">
                  Completo
                  <div className="text-xs font-normal text-primary/80 mt-1">
                    Mais Popular
                  </div>
                </th>
                <th className="text-center py-4 px-4 font-semibold text-secondary min-w-[150px]">
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
            <strong>Legenda:</strong> ✓ = Incluído | ✗ = Não incluído | Valores específicos quando aplicável
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlansComparisonTable;
