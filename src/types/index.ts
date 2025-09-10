// Form data types for onboarding
export interface OnboardFormData {
  name: string;
  email: string;
  phone: string;
  propertyType: PropertyType;
  propertyValue: PropertyValue;
  workFromHome: WorkFromHome;
  hasElectronics: ElectronicsLevel;
  hasBike: BikeLevel;
  mainPriority: MainPriority;
  budgetRange: BudgetRange;
  recommendedPlan: RecommendedPlan;
}

export type PropertyType = "apartamento" | "casa" | "sobrado" | "chacara" | "";

export type PropertyValue = "ate-300k" | "300-600k" | "600k-1m" | "acima-1m" | "";

export type WorkFromHome = "sim" | "as-vezes" | "nao" | "";

export type ElectronicsLevel = "sim-muito" | "sim-normal" | "nao" | "";

export type BikeLevel = "sim-valiosa" | "sim-normal" | "nao" | "";

export type MainPriority = "proteger_bens" | "ajuda_rapida" | "estabilidade_financeira" | "seguro_completo" | "";

export type BudgetRange = "ate_50" | "50_100" | "acima_100" | "nao_certeza" | "";

export type RecommendedPlan = "Essencial" | "Completo" | "Completo+" | "";

// Service types
export interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  items: string[];
}

// Plan types
export interface Plan {
  name: string;
  description: string;
  dailyPrice: string;
  popular: boolean;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  badgeColor: string;
  cta: string;
  features: string[];
  notIncluded: string[];
}

// Scores type for plan recommendation calculation
export interface PlanScores {
  essencial: number;
  completo: number;
  completoPlus: number;
}

// Animation delay type
export type AnimationDelay = 0 | 1 | 2 | 3;
