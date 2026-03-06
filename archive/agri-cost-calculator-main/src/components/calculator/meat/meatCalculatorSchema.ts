export type MeatInputCategory =
  | "labor"
  | "chickPurchase"
  | "brooding"
  | "feed"
  | "infrastructure"
  | "fieldLabor"
  | "processingSentOut"
  | "processingDIY"
  | "other";

export interface MeatInputDefinition {
  label: string;
  category: MeatInputCategory;
  default: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

export const MEAT_INPUT_DEFINITIONS = {
  // Labor
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

  // Chick Purchase
  chicksCount: {
    label: "Chicks Purchased",
    category: "chickPurchase",
    default: 200,
    min: 1,
    max: 10000,
    step: 1,
  },
  chicksTotalCost: {
    label: "Total Cost of Chicks (incl. Shipping)",
    category: "chickPurchase",
    default: 590,
    min: 0,
    max: 50000,
    step: 10,
    prefix: "$",
  },
  chickMortalityRate: {
    label: "Chick Mortality Rate",
    category: "chickPurchase",
    default: 5,
    min: 0,
    max: 50,
    step: 0.5,
    suffix: "%",
  },

  // Brooding
  beddingCostPerUnit: {
    label: "Bedding Cost per Unit",
    category: "brooding",
    default: 9,
    min: 0,
    max: 100,
    step: 0.5,
    prefix: "$",
  },
  beddingUnitsPerBatch: {
    label: "Bedding Units per Batch",
    category: "brooding",
    default: 4,
    min: 0,
    max: 50,
    step: 1,
  },
  broodingHoursPerDay: {
    label: "Brooding Hours per Day",
    category: "brooding",
    default: 0.3,
    min: 0,
    max: 8,
    step: 0.1,
    suffix: " hrs",
  },
  broodingDays: {
    label: "Total Brooding Days",
    category: "brooding",
    default: 21,
    min: 1,
    max: 60,
    step: 1,
    suffix: " days",
  },

  // Feed
  annualFeedCost: {
    label: "Annual Feed Cost",
    category: "feed",
    default: 4100,
    min: 0,
    max: 100000,
    step: 50,
    prefix: "$",
  },
  birdsFinished: {
    label: "Birds Finished Annually",
    category: "feed",
    default: 925,
    min: 1,
    max: 10000,
    step: 1,
  },
  feedPickupTravelTime: {
    label: "Feed Pickup Travel Time",
    category: "feed",
    default: 3,
    min: 0,
    max: 24,
    step: 0.25,
    suffix: " hrs",
  },
  feedPickupTripsPerBatch: {
    label: "Feed Pickup Trips per Batch",
    category: "feed",
    default: 1.25,
    min: 0,
    max: 20,
    step: 0.25,
  },
  feedPickupMiles: {
    label: "Feed Pickup Round Trip Miles",
    category: "feed",
    default: 80,
    min: 0,
    max: 500,
    step: 5,
    suffix: " mi",
  },
  irsMileageRate: {
    label: "IRS Mileage Rate",
    category: "feed",
    default: 0.73,
    min: 0,
    max: 2,
    step: 0.01,
    prefix: "$",
    suffix: "/mi",
  },

  // Infrastructure
  tractorMaterialsCost: {
    label: "Chicken Tractor Materials Cost",
    category: "infrastructure",
    default: 350,
    min: 0,
    max: 10000,
    step: 25,
    prefix: "$",
  },
  annualRepairCost: {
    label: "Annual Repair Cost",
    category: "infrastructure",
    default: 35,
    min: 0,
    max: 1000,
    step: 5,
    prefix: "$",
  },
  tractorLifespanYears: {
    label: "Tractor Lifespan",
    category: "infrastructure",
    default: 4,
    min: 1,
    max: 20,
    step: 1,
    suffix: " yrs",
  },
  birdsPerTractorPerBatch: {
    label: "Birds per Tractor per Batch",
    category: "infrastructure",
    default: 60,
    min: 1,
    max: 500,
    step: 5,
  },
  batchesPerYearPerTractor: {
    label: "Batches per Year per Tractor",
    category: "infrastructure",
    default: 6,
    min: 1,
    max: 12,
    step: 1,
  },

  // Field Labor
  daysInField: {
    label: "Days in Field per Batch",
    category: "fieldLabor",
    default: 35,
    min: 1,
    max: 120,
    step: 1,
    suffix: " days",
  },
  fieldHoursPerDay: {
    label: "Field Labor Hours per Day",
    category: "fieldLabor",
    default: 0.75,
    min: 0,
    max: 12,
    step: 0.25,
    suffix: " hrs",
  },

  // Processing - Sent Out
  processingTotalCost: {
    label: "Processing Total Cost",
    category: "processingSentOut",
    default: 900,
    min: 0,
    max: 20000,
    step: 50,
    prefix: "$",
  },
  processingBirdsProcessed: {
    label: "Birds Processed",
    category: "processingSentOut",
    default: 150,
    min: 1,
    max: 5000,
    step: 10,
  },
  processingTravelTime: {
    label: "Processor Travel Time",
    category: "processingSentOut",
    default: 4,
    min: 0,
    max: 24,
    step: 0.5,
    suffix: " hrs",
  },
  processingMileage: {
    label: "Processor Round Trip Mileage",
    category: "processingSentOut",
    default: 150,
    min: 0,
    max: 500,
    step: 10,
    suffix: " mi",
  },

  // Processing - DIY
  diyEquipmentCost: {
    label: "Equipment Cost",
    category: "processingDIY",
    default: 10000,
    min: 0,
    max: 100000,
    step: 500,
    prefix: "$",
  },
  diyEquipmentLifespan: {
    label: "Equipment Lifespan",
    category: "processingDIY",
    default: 10,
    min: 1,
    max: 30,
    step: 1,
    suffix: " yrs",
  },
  diyBirdsPerYear: {
    label: "Birds Processed per Year",
    category: "processingDIY",
    default: 1000,
    min: 1,
    max: 50000,
    step: 100,
  },
  diyCrewSize: {
    label: "Processing Crew Size",
    category: "processingDIY",
    default: 5,
    min: 1,
    max: 20,
    step: 1,
  },
  diyHoursPerPerson: {
    label: "Hours per Person on Processing Day",
    category: "processingDIY",
    default: 4,
    min: 1,
    max: 16,
    step: 0.5,
    suffix: " hrs",
  },
  diyBirdsPerDay: {
    label: "Birds Processed per Day",
    category: "processingDIY",
    default: 200,
    min: 1,
    max: 2000,
    step: 25,
  },
  diyPackagingCost: {
    label: "Packaging Cost per Bag",
    category: "processingDIY",
    default: 0.14,
    min: 0,
    max: 2,
    step: 0.01,
    prefix: "$",
  },
  diyLabelCost: {
    label: "Label Cost Each",
    category: "processingDIY",
    default: 0.07,
    min: 0,
    max: 1,
    step: 0.01,
    prefix: "$",
  },
  diyPropaneCost: {
    label: "Propane Cost per Batch",
    category: "processingDIY",
    default: 20,
    min: 0,
    max: 200,
    step: 5,
    prefix: "$",
  },

  // Other
  averageWeight: {
    label: "Average Dressed Weight",
    category: "other",
    default: 4.5,
    min: 1,
    max: 15,
    step: 0.25,
    suffix: " lbs",
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
} as const;

// Auto-derive TypeScript type from schema
export type MeatCalculatorInputs = {
  [K in keyof typeof MEAT_INPUT_DEFINITIONS]: number;
};

// Auto-generate default inputs
export const MEAT_DEFAULT_INPUTS: MeatCalculatorInputs = Object.fromEntries(
  Object.entries(MEAT_INPUT_DEFINITIONS).map(([key, def]) => [key, def.default]),
) as MeatCalculatorInputs;

// Category order for UI rendering
export const MEAT_CATEGORY_ORDER: MeatInputCategory[] = [
  "labor",
  "chickPurchase",
  "brooding",
  "feed",
  "infrastructure",
  "fieldLabor",
  "processingSentOut",
  "processingDIY",
  "other",
];

// Category titles for display
export const MEAT_CATEGORY_TITLES: Record<MeatInputCategory, string> = {
  labor: "Labor & General",
  chickPurchase: "Chick Purchase",
  brooding: "Brooding",
  feed: "Feed",
  infrastructure: "Infrastructure",
  fieldLabor: "Field Labor",
  processingSentOut: "Processing - Sent Out",
  processingDIY: "Processing - DIY",
  other: "Other Factors",
};

// Group inputs by category
export function getMeatInputsByCategory() {
  return Object.entries(MEAT_INPUT_DEFINITIONS).reduce(
    (acc, [key, def]) => {
      const category = def.category as MeatInputCategory;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push({
        key: key as keyof MeatCalculatorInputs,
        ...def,
      });
      return acc;
    },
    {} as Record<MeatInputCategory, Array<{ key: keyof MeatCalculatorInputs } & MeatInputDefinition>>,
  );
}
