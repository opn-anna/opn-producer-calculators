// Schema for Stock Density Calculator

export type ForageDensity = 1 | 2 | 3;

export const FORAGE_DENSITY_OPTIONS: Record<ForageDensity, { label: string; multiplier: number }> = {
  1: { label: "85-90% coverage", multiplier: 100 },
  2: { label: "90-95% coverage", multiplier: 200 },
  3: { label: "95%+ coverage", multiplier: 300 },
};

export type AnimalClass = "stocker_cattle" | "dry_cow" | "lactating_cow" | "sheep_goats" | "lactating_sheep";

export const ANIMAL_CLASSES: Record<AnimalClass, { label: string; dryMatterPercent: number }> = {
  stocker_cattle: { label: "Stocker Cattle", dryMatterPercent: 0.025 },
  dry_cow: { label: "Dry Cow", dryMatterPercent: 0.03 },
  lactating_cow: { label: "Lactating Cow", dryMatterPercent: 0.035 },
  sheep_goats: { label: "Sheep/Goats", dryMatterPercent: 0.025 },
  lactating_sheep: { label: "Lactating Sheep", dryMatterPercent: 0.045 },
};

export type CalculatorMode = "single" | "mixed";

// Single class inputs
export interface SingleClassInputs {
  forageHeight: number;
  forageDensity: ForageDensity;
  numberOfHead: number;
  averageWeight: number;
  animalClass: AnimalClass;
  utilizationPercent: number;
  paddockSideLength: number;
  movesPerDay: number;
}

// Mixed class inputs - one entry per animal class
export interface MixedClassAnimal {
  numberOfHead: number;
  averageWeight: number;
}

export interface MixedClassInputs {
  forageHeight: number;
  forageDensity: ForageDensity;
  animals: Record<AnimalClass, MixedClassAnimal>;
  utilizationPercent: number;
  paddockSideLength: number;
  movesPerDay: number;
}

export const DEFAULT_SINGLE_CLASS_INPUTS: SingleClassInputs = {
  forageHeight: 10,
  forageDensity: 2,
  numberOfHead: 16,
  averageWeight: 1100,
  animalClass: "stocker_cattle",
  utilizationPercent: 50,
  paddockSideLength: 50,
  movesPerDay: 1,
};

export const DEFAULT_MIXED_CLASS_INPUTS: MixedClassInputs = {
  forageHeight: 7,
  forageDensity: 2,
  animals: {
    stocker_cattle: { numberOfHead: 4, averageWeight: 750 },
    dry_cow: { numberOfHead: 0, averageWeight: 800 },
    lactating_cow: { numberOfHead: 2, averageWeight: 1000 },
    sheep_goats: { numberOfHead: 25, averageWeight: 100 },
    lactating_sheep: { numberOfHead: 0, averageWeight: 120 },
  },
  utilizationPercent: 50,
  paddockSideLength: 16,
  movesPerDay: 1,
};

// Calculation functions
export function calculateForageLbsPerAcre(height: number, density: ForageDensity): number {
  return height * FORAGE_DENSITY_OPTIONS[density].multiplier;
}

export function calculateSingleClassResults(inputs: SingleClassInputs) {
  const forageLbsPerAcre = calculateForageLbsPerAcre(inputs.forageHeight, inputs.forageDensity);
  const totalAnimalWeight = inputs.numberOfHead * inputs.averageWeight;
  const dryMatterPercent = ANIMAL_CLASSES[inputs.animalClass].dryMatterPercent;
  const dryMatterNeededPerDay = totalAnimalWeight * dryMatterPercent;

  // Guard against division by zero for utilization
  const dryMatterAvailable = inputs.utilizationPercent > 0 ? forageLbsPerAcre * (inputs.utilizationPercent / 100) : 0;

  const acresNeededPerDay = dryMatterAvailable > 0 ? dryMatterNeededPerDay / dryMatterAvailable : 0;

  const squareFeet = acresNeededPerDay * 43560;

  // Guard against division by zero for paddock side length
  const paddockWidth = inputs.paddockSideLength > 0 ? squareFeet / inputs.paddockSideLength : 0;

  const stockingDensityPerAcre = acresNeededPerDay > 0 ? totalAnimalWeight / acresNeededPerDay : 0;

  // Multi-move calculations with guards
  const paddockSizeWithMoves = inputs.movesPerDay > 0 ? acresNeededPerDay / inputs.movesPerDay : 0;

  const stockingDensityWithMoves = paddockSizeWithMoves > 0 ? totalAnimalWeight / paddockSizeWithMoves : 0;

  return {
    forageLbsPerAcre,
    totalAnimalWeight,
    dryMatterPercent,
    dryMatterNeededPerDay,
    dryMatterAvailable,
    acresNeededPerDay,
    squareFeet,
    paddockWidth,
    stockingDensityPerAcre,
    paddockSizeWithMoves,
    stockingDensityWithMoves,
  };
}

export function calculateMixedClassResults(inputs: MixedClassInputs) {
  const forageLbsPerAcre = calculateForageLbsPerAcre(inputs.forageHeight, inputs.forageDensity);

  // Calculate totals across all animal classes
  let totalAnimalWeight = 0;
  let totalDryMatterNeeded = 0;

  const animalBreakdown = Object.entries(inputs.animals).map(([classKey, animal]) => {
    const animalClass = classKey as AnimalClass;
    const classInfo = ANIMAL_CLASSES[animalClass];
    const totalWeight = animal.numberOfHead * animal.averageWeight;
    const dryMatterNeeded = totalWeight * classInfo.dryMatterPercent;

    totalAnimalWeight += totalWeight;
    totalDryMatterNeeded += dryMatterNeeded;

    return {
      class: animalClass,
      label: classInfo.label,
      numberOfHead: animal.numberOfHead,
      averageWeight: animal.averageWeight,
      totalWeight,
      dryMatterPercent: classInfo.dryMatterPercent,
      dryMatterNeeded,
    };
  });

  const weightedDryMatterPercent = totalAnimalWeight > 0 ? totalDryMatterNeeded / totalAnimalWeight : 0;
  const dryMatterAvailable = forageLbsPerAcre * (inputs.utilizationPercent / 100);
  const acresNeededPerDay = dryMatterAvailable > 0 ? totalDryMatterNeeded / dryMatterAvailable : 0;
  const squareFeet = acresNeededPerDay * 43560;
  const paddockWidth = inputs.paddockSideLength > 0 ? squareFeet / inputs.paddockSideLength : 0;
  const stockingDensityPerAcre = acresNeededPerDay > 0 ? totalAnimalWeight / acresNeededPerDay : 0;

  // Multi-move calculations
  const paddockSizeWithMoves = inputs.movesPerDay > 0 ? acresNeededPerDay / inputs.movesPerDay : 0;
  const stockingDensityWithMoves = paddockSizeWithMoves > 0 ? totalAnimalWeight / paddockSizeWithMoves : 0;

  return {
    forageLbsPerAcre,
    totalAnimalWeight,
    weightedDryMatterPercent,
    totalDryMatterNeeded,
    dryMatterAvailable,
    acresNeededPerDay,
    squareFeet,
    paddockWidth,
    stockingDensityPerAcre,
    paddockSizeWithMoves,
    stockingDensityWithMoves,
    animalBreakdown,
  };
}
