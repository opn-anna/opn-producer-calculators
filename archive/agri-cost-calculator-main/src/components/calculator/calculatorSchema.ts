// Single source of truth for all calculator inputs

export type InputCategory = "labor" | "chicks" | "brooding" | "laying" | "infrastructure" | "distribution" | "culling";

export interface InputDefinition {
  label: string;
  category: InputCategory;
  default: number;
  min: number;
  max: number;
  step: number;
  prefix?: string;
  suffix?: string;
}

export const CATEGORY_TITLES: Record<InputCategory, string> = {
  labor: "Labor & General",
  chicks: "Chicks Purchased",
  brooding: "Brooding",
  laying: "Laying Flock",
  infrastructure: "Infrastructure",
  distribution: "Distribution",
  culling: "Culling",
};

export const INPUT_DEFINITIONS = {
  // Labor & General
  laborRate: {
    label: "Labor Rate",
    category: "labor",
    default: 20,
    min: 0,
    max: 100,
    step: 0.5,
    prefix: "$",
    suffix: "/hr",
  },
  desiredMargin: {
    label: "Desired Gross Margin",
    category: "labor",
    default: 50,
    min: 0,
    max: 80,
    step: 1,
    suffix: "%",
  },

  // Chicks
  chicksCount: {
    label: "Chicks Purchased",
    category: "chicks",
    default: 125,
    min: 1,
    max: 1000,
    step: 1,
  },
  chicksCost: {
    label: "Total Cost of Chicks",
    category: "chicks",
    default: 500,
    min: 0,
    max: 10000,
    step: 10,
    prefix: "$",
  },
  chickMortalityRate: {
    label: "Chick Mortality Rate",
    category: "chicks",
    default: 5,
    min: 0,
    max: 50,
    step: 0.5,
    suffix: "%",
  },

  // Brooding
  broodingHoursPerDay: {
    label: "Brooding Hours per Day",
    category: "brooding",
    default: 0.33,
    min: 0,
    max: 4,
    step: 0.1,
    suffix: " hrs",
  },
  broodingDays: {
    label: "Total Brooding Days",
    category: "brooding",
    default: 21,
    min: 0,
    max: 70,
    step: 1,
    suffix: " days",
  },

  // Feed
  chicksStarterFeedCost: {
    label: "Starter Feed Cost",
    category: "brooding",
    default: 700,
    min: 0,
    max: 2000,
    step: 10,
    prefix: "$",
  },
  chicksStarterFeedSize: {
    label: "Starter Feed Unit Size",
    category: "brooding",
    default: 2000,
    min: 40,
    max: 2000,
    step: 10,
    suffix: " lbs",
  },

  // Laying Flock
  flockSize: {
    label: "Size of Flock",
    category: "laying",
    default: 250,
    min: 10,
    max: 5000,
    step: 1,
  },
  feedConsumedPerDay: {
    label: "Feed per Bird per Day",
    category: "laying",
    default: 4,
    min: 4,
    max: 6,
    step: 0.1,
    suffix: " oz",
  },
  feedPricePerUnit: {
    label: "Feed Price per Unit",
    category: "laying",
    default: 600,
    min: 0,
    max: 2000,
    step: 10,
    prefix: "$",
  },
  feedUnitSize: {
    label: "Feed Unit Size",
    category: "laying",
    default: 2000,
    min: 40,
    max: 2000,
    step: 10,
    suffix: " lbs",
  },
  layRateYear1: {
    label: "Expected Lay Rate (Year 1)",
    category: "laying",
    default: 225,
    min: 100,
    max: 365,
    step: 1,
    suffix: " eggs/yr",
  },
  yearsToKeepHen: {
    label: "Years to Keep Hens",
    category: "laying",
    default: 2,
    min: 1,
    max: 4,
    step: 1,
    suffix: " years",
  },
  layingLaborHoursPerDay: {
    label: "Laying Labor Hours per Day",
    category: "laying",
    default: 1,
    min: 0,
    max: 8,
    step: 0.25,
    suffix: " hrs",
  },

  // Infrastructure
  buildingMaterialsCost: {
    label: "Building Materials Cost",
    category: "infrastructure",
    default: 2500,
    min: 0,
    max: 50000,
    step: 100,
    prefix: "$",
  },
  annualRepairs: {
    label: "Annual Repairs",
    category: "infrastructure",
    default: 100,
    min: 0,
    max: 5000,
    step: 10,
    prefix: "$",
  },
  yearsOfLife: {
    label: "Infrastructure Lifespan",
    category: "infrastructure",
    default: 10,
    min: 1,
    max: 30,
    step: 1,
    suffix: " years",
  },

  // Distribution
  milesPerDelivery: {
    label: "Miles per Delivery",
    category: "distribution",
    default: 50,
    min: 0,
    max: 500,
    step: 5,
    suffix: " mi",
  },
  deliveriesPerYear: {
    label: "Deliveries per Year",
    category: "distribution",
    default: 52,
    min: 0,
    max: 365,
    step: 1,
  },
  costPerMile: {
    label: "Cost per Mile",
    category: "distribution",
    default: 0.7,
    min: 0,
    max: 2,
    step: 0.05,
    prefix: "$",
  },
  laborHoursPerDelivery: {
    label: "Labor Hours per Delivery",
    category: "distribution",
    default: 2,
    min: 0,
    max: 8,
    step: 0.25,
    suffix: " hrs",
  },
  eggCartonCost: {
    label: "Egg Carton Cost",
    category: "distribution",
    default: 0.4,
    min: 0,
    max: 2,
    step: 0.05,
    prefix: "$",
    suffix: " each",
  },
  feedPickupHoursPerTrip: {
    label: "Feed Pickup Hours per Trip",
    category: "distribution",
    default: 3,
    min: 0,
    max: 8,
    step: 0.5,
    suffix: " hrs",
  },
  feedPickupTripsPerYear: {
    label: "Feed Pickup Trips per Year",
    category: "distribution",
    default: 6,
    min: 0,
    max: 52,
    step: 1,
  },
  feedPickupMileage: {
    label: "Feed Pickup Mileage",
    category: "distribution",
    default: 80,
    min: 0,
    max: 500,
    step: 5,
    suffix: " mi",
  },

  // Culling
  stewHenNetValue: {
    label: "Net Value per Stew Hen",
    category: "culling",
    default: 10,
    min: 0,
    max: 50,
    step: 1,
    prefix: "$",
  },
} as const satisfies Record<string, InputDefinition>;

// Auto-derive TypeScript type from schema
export type CalculatorInputs = {
  [K in keyof typeof INPUT_DEFINITIONS]: number;
};

// Auto-generate default inputs from schema
export const DEFAULT_INPUTS: CalculatorInputs = Object.fromEntries(
  Object.entries(INPUT_DEFINITIONS).map(([key, def]) => [key, def.default]),
) as CalculatorInputs;

// Group inputs by category for UI rendering
export function getInputsByCategory() {
  return Object.entries(INPUT_DEFINITIONS).reduce(
    (acc, [key, def]) => {
      const category = def.category as InputCategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        key: key as keyof CalculatorInputs,
        ...def,
      });
      return acc;
    },
    {} as Record<InputCategory, Array<{ key: keyof CalculatorInputs } & InputDefinition>>,
  );
}

// Category order for consistent rendering
export const CATEGORY_ORDER: InputCategory[] = [
  "labor",
  "brooding",
  "laying",
  "infrastructure",
  "distribution",
  "culling",
];
