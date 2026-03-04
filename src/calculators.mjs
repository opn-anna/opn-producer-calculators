export const EGG_FIELDS = [
  {
    key: "laborRate",
    label: "Labor Rate",
    category: "labor",
    defaultValue: 20,
    min: 0,
    max: 100,
    step: 0.5,
    prefix: "$",
    suffix: "/hr",
  },
  {
    key: "desiredMargin",
    label: "Desired Gross Margin",
    category: "labor",
    defaultValue: 50,
    min: 0,
    max: 80,
    step: 1,
    suffix: "%",
  },
  {
    key: "chicksCount",
    label: "Chicks Purchased",
    category: "chicks",
    defaultValue: 125,
    min: 1,
    max: 1000,
    step: 1,
  },
  {
    key: "chicksCost",
    label: "Total Cost of Chicks",
    category: "chicks",
    defaultValue: 500,
    min: 0,
    max: 10000,
    step: 10,
    prefix: "$",
  },
  {
    key: "chickMortalityRate",
    label: "Chick Mortality Rate",
    category: "chicks",
    defaultValue: 5,
    min: 0,
    max: 50,
    step: 0.5,
    suffix: "%",
  },
  {
    key: "broodingHoursPerDay",
    label: "Brooding Hours per Day",
    category: "brooding",
    defaultValue: 0.33,
    min: 0,
    max: 4,
    step: 0.1,
    suffix: "hrs",
  },
  {
    key: "broodingDays",
    label: "Total Brooding Days",
    category: "brooding",
    defaultValue: 21,
    min: 0,
    max: 70,
    step: 1,
    suffix: "days",
  },
  {
    key: "chicksStarterFeedCost",
    label: "Starter Feed Cost",
    category: "brooding",
    defaultValue: 700,
    min: 0,
    max: 2000,
    step: 10,
    prefix: "$",
  },
  {
    key: "chicksStarterFeedSize",
    label: "Starter Feed Unit Size",
    category: "brooding",
    defaultValue: 2000,
    min: 40,
    max: 2000,
    step: 10,
    suffix: "lbs",
  },
  {
    key: "flockSize",
    label: "Size of Flock",
    category: "laying",
    defaultValue: 250,
    min: 10,
    max: 5000,
    step: 1,
  },
  {
    key: "feedConsumedPerDay",
    label: "Feed per Bird per Day",
    category: "laying",
    defaultValue: 4,
    min: 4,
    max: 6,
    step: 0.1,
    suffix: "oz",
  },
  {
    key: "feedPricePerUnit",
    label: "Feed Price per Unit",
    category: "laying",
    defaultValue: 600,
    min: 0,
    max: 2000,
    step: 10,
    prefix: "$",
  },
  {
    key: "feedUnitSize",
    label: "Feed Unit Size",
    category: "laying",
    defaultValue: 2000,
    min: 40,
    max: 2000,
    step: 10,
    suffix: "lbs",
  },
  {
    key: "layRateYear1",
    label: "Expected Lay Rate (Year 1)",
    category: "laying",
    defaultValue: 225,
    min: 100,
    max: 365,
    step: 1,
    suffix: "eggs/yr",
  },
  {
    key: "yearsToKeepHen",
    label: "Years to Keep Hens",
    category: "laying",
    defaultValue: 2,
    min: 1,
    max: 4,
    step: 1,
    suffix: "years",
  },
  {
    key: "layingLaborHoursPerDay",
    label: "Laying Labor Hours per Day",
    category: "laying",
    defaultValue: 1,
    min: 0,
    max: 8,
    step: 0.25,
    suffix: "hrs",
  },
  {
    key: "buildingMaterialsCost",
    label: "Building Materials Cost",
    category: "infrastructure",
    defaultValue: 2500,
    min: 0,
    max: 50000,
    step: 100,
    prefix: "$",
  },
  {
    key: "annualRepairs",
    label: "Annual Repairs",
    category: "infrastructure",
    defaultValue: 100,
    min: 0,
    max: 5000,
    step: 10,
    prefix: "$",
  },
  {
    key: "yearsOfLife",
    label: "Infrastructure Lifespan",
    category: "infrastructure",
    defaultValue: 10,
    min: 1,
    max: 30,
    step: 1,
    suffix: "years",
  },
  {
    key: "milesPerDelivery",
    label: "Miles per Delivery",
    category: "distribution",
    defaultValue: 50,
    min: 0,
    max: 500,
    step: 5,
    suffix: "mi",
  },
  {
    key: "deliveriesPerYear",
    label: "Deliveries per Year",
    category: "distribution",
    defaultValue: 52,
    min: 0,
    max: 365,
    step: 1,
  },
  {
    key: "costPerMile",
    label: "Cost per Mile",
    category: "distribution",
    defaultValue: 0.7,
    min: 0,
    max: 2,
    step: 0.05,
    prefix: "$",
  },
  {
    key: "laborHoursPerDelivery",
    label: "Labor Hours per Delivery",
    category: "distribution",
    defaultValue: 2,
    min: 0,
    max: 8,
    step: 0.25,
    suffix: "hrs",
  },
  {
    key: "eggCartonCost",
    label: "Egg Carton Cost",
    category: "distribution",
    defaultValue: 0.4,
    min: 0,
    max: 2,
    step: 0.05,
    prefix: "$",
    suffix: "each",
  },
  {
    key: "feedPickupHoursPerTrip",
    label: "Feed Pickup Hours per Trip",
    category: "distribution",
    defaultValue: 3,
    min: 0,
    max: 8,
    step: 0.5,
    suffix: "hrs",
  },
  {
    key: "feedPickupTripsPerYear",
    label: "Feed Pickup Trips per Year",
    category: "distribution",
    defaultValue: 6,
    min: 0,
    max: 52,
    step: 1,
  },
  {
    key: "feedPickupMileage",
    label: "Feed Pickup Mileage",
    category: "distribution",
    defaultValue: 80,
    min: 0,
    max: 500,
    step: 5,
    suffix: "mi",
  },
  {
    key: "stewHenNetValue",
    label: "Net Value per Stew Hen",
    category: "culling",
    defaultValue: 10,
    min: 0,
    max: 50,
    step: 1,
    prefix: "$",
  },
];

export const MEAT_FIELDS = [
  {
    key: "laborRate",
    label: "Labor Rate",
    category: "labor",
    defaultValue: 20,
    min: 0,
    max: 100,
    step: 0.5,
    prefix: "$",
    suffix: "/hr",
  },
  {
    key: "desiredMargin",
    label: "Desired Gross Margin",
    category: "labor",
    defaultValue: 50,
    min: 0,
    max: 80,
    step: 1,
    suffix: "%",
  },
  {
    key: "chicksCount",
    label: "Chicks Purchased",
    category: "chickPurchase",
    defaultValue: 200,
    min: 1,
    max: 10000,
    step: 1,
  },
  {
    key: "chicksTotalCost",
    label: "Total Cost of Chicks (incl. Shipping)",
    category: "chickPurchase",
    defaultValue: 590,
    min: 0,
    max: 50000,
    step: 10,
    prefix: "$",
  },
  {
    key: "chickMortalityRate",
    label: "Chick Mortality Rate",
    category: "chickPurchase",
    defaultValue: 5,
    min: 0,
    max: 50,
    step: 0.5,
    suffix: "%",
  },
  {
    key: "beddingCostPerUnit",
    label: "Bedding Cost per Unit",
    category: "brooding",
    defaultValue: 9,
    min: 0,
    max: 100,
    step: 0.5,
    prefix: "$",
  },
  {
    key: "beddingUnitsPerBatch",
    label: "Bedding Units per Batch",
    category: "brooding",
    defaultValue: 4,
    min: 0,
    max: 50,
    step: 1,
  },
  {
    key: "broodingHoursPerDay",
    label: "Brooding Hours per Day",
    category: "brooding",
    defaultValue: 0.3,
    min: 0,
    max: 8,
    step: 0.1,
    suffix: "hrs",
  },
  {
    key: "broodingDays",
    label: "Total Brooding Days",
    category: "brooding",
    defaultValue: 21,
    min: 1,
    max: 60,
    step: 1,
    suffix: "days",
  },
  {
    key: "annualFeedCost",
    label: "Annual Feed Cost",
    category: "feed",
    defaultValue: 4100,
    min: 0,
    max: 100000,
    step: 50,
    prefix: "$",
  },
  {
    key: "birdsFinished",
    label: "Birds Finished Annually",
    category: "feed",
    defaultValue: 925,
    min: 1,
    max: 10000,
    step: 1,
  },
  {
    key: "feedPickupTravelTime",
    label: "Feed Pickup Travel Time",
    category: "feed",
    defaultValue: 3,
    min: 0,
    max: 24,
    step: 0.25,
    suffix: "hrs",
  },
  {
    key: "feedPickupTripsPerBatch",
    label: "Feed Pickup Trips per Batch",
    category: "feed",
    defaultValue: 1.25,
    min: 0,
    max: 20,
    step: 0.25,
  },
  {
    key: "feedPickupMiles",
    label: "Feed Pickup Round Trip Miles",
    category: "feed",
    defaultValue: 80,
    min: 0,
    max: 500,
    step: 5,
    suffix: "mi",
  },
  {
    key: "irsMileageRate",
    label: "IRS Mileage Rate",
    category: "feed",
    defaultValue: 0.73,
    min: 0,
    max: 2,
    step: 0.01,
    prefix: "$",
    suffix: "/mi",
  },
  {
    key: "tractorMaterialsCost",
    label: "Chicken Tractor Materials Cost",
    category: "infrastructure",
    defaultValue: 350,
    min: 0,
    max: 10000,
    step: 25,
    prefix: "$",
  },
  {
    key: "annualRepairCost",
    label: "Annual Repair Cost",
    category: "infrastructure",
    defaultValue: 35,
    min: 0,
    max: 1000,
    step: 5,
    prefix: "$",
  },
  {
    key: "tractorLifespanYears",
    label: "Tractor Lifespan",
    category: "infrastructure",
    defaultValue: 4,
    min: 1,
    max: 20,
    step: 1,
    suffix: "yrs",
  },
  {
    key: "birdsPerTractorPerBatch",
    label: "Birds per Tractor per Batch",
    category: "infrastructure",
    defaultValue: 60,
    min: 1,
    max: 500,
    step: 5,
  },
  {
    key: "batchesPerYearPerTractor",
    label: "Batches per Year per Tractor",
    category: "infrastructure",
    defaultValue: 6,
    min: 1,
    max: 12,
    step: 1,
  },
  {
    key: "daysInField",
    label: "Days in Field per Batch",
    category: "fieldLabor",
    defaultValue: 35,
    min: 1,
    max: 120,
    step: 1,
    suffix: "days",
  },
  {
    key: "fieldHoursPerDay",
    label: "Field Labor Hours per Day",
    category: "fieldLabor",
    defaultValue: 0.75,
    min: 0,
    max: 12,
    step: 0.25,
    suffix: "hrs",
  },
  {
    key: "processingTotalCost",
    label: "Processing Total Cost",
    category: "processingSentOut",
    defaultValue: 900,
    min: 0,
    max: 20000,
    step: 50,
    prefix: "$",
  },
  {
    key: "processingBirdsProcessed",
    label: "Birds Processed",
    category: "processingSentOut",
    defaultValue: 150,
    min: 1,
    max: 5000,
    step: 10,
  },
  {
    key: "processingTravelTime",
    label: "Processor Travel Time",
    category: "processingSentOut",
    defaultValue: 4,
    min: 0,
    max: 24,
    step: 0.5,
    suffix: "hrs",
  },
  {
    key: "processingMileage",
    label: "Processor Round Trip Mileage",
    category: "processingSentOut",
    defaultValue: 150,
    min: 0,
    max: 500,
    step: 10,
    suffix: "mi",
  },
  {
    key: "diyEquipmentCost",
    label: "Equipment Cost",
    category: "processingDIY",
    defaultValue: 10000,
    min: 0,
    max: 100000,
    step: 500,
    prefix: "$",
  },
  {
    key: "diyEquipmentLifespan",
    label: "Equipment Lifespan",
    category: "processingDIY",
    defaultValue: 10,
    min: 1,
    max: 30,
    step: 1,
    suffix: "yrs",
  },
  {
    key: "diyBirdsPerYear",
    label: "Birds Processed per Year",
    category: "processingDIY",
    defaultValue: 1000,
    min: 1,
    max: 50000,
    step: 100,
  },
  {
    key: "diyCrewSize",
    label: "Processing Crew Size",
    category: "processingDIY",
    defaultValue: 5,
    min: 1,
    max: 20,
    step: 1,
  },
  {
    key: "diyHoursPerPerson",
    label: "Hours per Person on Processing Day",
    category: "processingDIY",
    defaultValue: 4,
    min: 1,
    max: 16,
    step: 0.5,
    suffix: "hrs",
  },
  {
    key: "diyBirdsPerDay",
    label: "Birds Processed per Day",
    category: "processingDIY",
    defaultValue: 200,
    min: 1,
    max: 2000,
    step: 25,
  },
  {
    key: "diyPackagingCost",
    label: "Packaging Cost per Bag",
    category: "processingDIY",
    defaultValue: 0.14,
    min: 0,
    max: 2,
    step: 0.01,
    prefix: "$",
  },
  {
    key: "diyLabelCost",
    label: "Label Cost Each",
    category: "processingDIY",
    defaultValue: 0.07,
    min: 0,
    max: 1,
    step: 0.01,
    prefix: "$",
  },
  {
    key: "diyPropaneCost",
    label: "Propane Cost per Batch",
    category: "processingDIY",
    defaultValue: 20,
    min: 0,
    max: 200,
    step: 5,
    prefix: "$",
  },
  {
    key: "averageWeight",
    label: "Average Dressed Weight",
    category: "other",
    defaultValue: 4.5,
    min: 1,
    max: 15,
    step: 0.25,
    suffix: "lbs",
  },
];

function createDefaults(fields) {
  return Object.fromEntries(
    fields.map((field) => [field.key, field.defaultValue]),
  );
}

export const EGG_DEFAULTS = createDefaults(EGG_FIELDS);
export const MEAT_DEFAULTS = createDefaults(MEAT_FIELDS);

export const FORAGE_DENSITY_LEVELS = {
  1: { label: "85-90% coverage", multiplier: 100 },
  2: { label: "90-95% coverage", multiplier: 200 },
  3: { label: "95%+ coverage", multiplier: 300 },
};

export const ANIMAL_CLASSES = {
  stocker_cattle: { label: "Stocker Cattle", dryMatterPercent: 0.025 },
  dry_cow: { label: "Dry Cow", dryMatterPercent: 0.03 },
  lactating_cow: { label: "Lactating Cow", dryMatterPercent: 0.035 },
  sheep_goats: { label: "Sheep/Goats", dryMatterPercent: 0.025 },
  lactating_sheep: { label: "Lactating Sheep", dryMatterPercent: 0.045 },
};

export const STOCK_SINGLE_DEFAULTS = {
  forageHeight: 10,
  forageDensity: 2,
  numberOfHead: 16,
  averageWeight: 1100,
  animalClass: "stocker_cattle",
  utilizationPercent: 50,
  paddockSideLength: 50,
  movesPerDay: 1,
};

export const STOCK_MIXED_DEFAULTS = {
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

export function computeEggPricing(input) {
  const e = { ...EGG_DEFAULTS, ...input };
  const u = Math.max(0.01, 1 - e.chickMortalityRate / 100);
  const c = Math.max(1, e.chicksCount);
  const f = e.chicksCost / c / u;
  const g = (e.broodingHoursPerDay * 126 * e.laborRate) / c + 8.51;
  const h = e.feedPricePerUnit / e.feedUnitSize / 16;
  const v = e.feedConsumedPerDay * 365 * h;
  const y =
    (e.buildingMaterialsCost / e.yearsOfLife + e.annualRepairs) / e.flockSize;
  const m = (e.layingLaborHoursPerDay * 365 * e.laborRate) / e.flockSize;
  const b = e.milesPerDelivery * e.deliveriesPerYear * e.costPerMile;
  const S = e.laborHoursPerDelivery * e.deliveriesPerYear * e.laborRate;
  const w = (b + S) / e.flockSize;
  const P = e.feedPickupHoursPerTrip * e.feedPickupTripsPerYear * e.laborRate;
  const E = e.feedPickupMileage * e.feedPickupTripsPerYear * e.costPerMile;
  const O = (P + E) / e.flockSize;

  let C = 0;
  for (let year = 1; year <= e.yearsToKeepHen; year += 1) {
    const declineMultiplier = 1 - (year - 1) * 0.2;
    C += e.layRateYear1 * declineMultiplier;
  }

  const k = C / e.yearsToKeepHen / 12;
  const A = e.stewHenNetValue / e.yearsToKeepHen;
  const broodingTotal = (f + g) / e.yearsToKeepHen;
  const N = (broodingTotal + v + y + m + w + O - A) / k;
  const I = e.eggCartonCost;
  const R = N + I;
  const L = R / (1 - e.desiredMargin / 100);

  const costBreakdown = {
    brooding: broodingTotal / k,
    feed: v / k,
    infrastructure: y / k,
    labor: m / k,
    distribution: w / k,
    feedPickup: O / k,
    cartons: I,
    stewHenCredit: A / k,
  };

  return {
    pricePerDozen: L,
    costPerDozen: R,
    profitPerDozen: L - R,
    averageDozenPerHenPerYear: k,
    totalEggsPerHen: C,
    costBreakdown,
  };
}

export function computeMeatPricing(input) {
  const e = { ...MEAT_DEFAULTS, ...input };

  const d = Math.max(1, e.chicksCount);
  const p = Math.max(0.01, 1 - e.chickMortalityRate / 100);
  const g = Math.max(1, e.birdsFinished);
  const h = Math.max(1, e.processingBirdsProcessed);
  const v = Math.max(1, e.diyEquipmentLifespan);
  const y = Math.max(1, e.diyBirdsPerYear);
  const m = Math.max(1, e.diyBirdsPerDay);
  const b = Math.max(0.1, e.averageWeight);
  const S = Math.max(0.01, 1 - e.desiredMargin / 100);
  const w = Math.max(1, e.tractorLifespanYears);
  const P = Math.max(1, e.birdsPerTractorPerBatch);
  const E = Math.max(1, e.batchesPerYearPerTractor);

  const O = e.chicksTotalCost / d / p;
  const C = (e.beddingCostPerUnit * e.beddingUnitsPerBatch) / d;
  const k = (e.broodingHoursPerDay * e.broodingDays * e.laborRate) / d;
  const A = C + k;
  const feedPerBirdAnnual = e.annualFeedCost / g;
  const feed = (feedPerBirdAnnual * d) / g;
  const D = e.tractorMaterialsCost / w + e.annualRepairCost;
  const N = P * E;
  const I = D / N;
  const R = (e.daysInField * e.fieldHoursPerDay * e.laborRate) / d;
  const L = e.processingTravelTime * e.laborRate;
  const j = e.processingMileage * e.irsMileageRate;
  const M = (e.processingTotalCost + L + j) / h;
  const B = e.diyEquipmentCost / v / y;
  const V = (e.diyCrewSize * e.diyHoursPerPerson * e.laborRate) / m;
  const F = e.diyPackagingCost + e.diyLabelCost + e.diyPropaneCost / m;
  const q = B + V + F;
  const Y = e.feedPickupTravelTime * e.feedPickupTripsPerBatch * e.laborRate;
  const se = e.feedPickupMiles * e.feedPickupTripsPerBatch * e.irsMileageRate;
  const de = (Y + se) / d;
  const X = O + A + feed + I + R + de;
  const fe = X + M;
  const G = X + q;
  const Q = fe / b;
  const Z = G / b;
  const U = Q / S;
  const ve = Z / S;

  return {
    pricePerPoundSentOut: U,
    pricePerPoundDIY: ve,
    costPerPoundSentOut: Q,
    costPerPoundDIY: Z,
    totalCostPerBirdSentOut: fe,
    totalCostPerBirdDIY: G,
    costBreakdown: {
      chickPurchase: O,
      brooding: A,
      feed,
      infrastructure: I,
      fieldLabor: R,
      processingSentOut: M,
      processingDIY: q,
      feedPickup: de,
    },
  };
}

function forageLbsPerAcre(height, densityLevel) {
  const level = FORAGE_DENSITY_LEVELS[densityLevel] ?? FORAGE_DENSITY_LEVELS[2];
  return height * level.multiplier;
}

export function computeStockSingle(input) {
  const e = { ...STOCK_SINGLE_DEFAULTS, ...input };
  const t = forageLbsPerAcre(e.forageHeight, e.forageDensity);
  const r = e.numberOfHead * e.averageWeight;
  const n = ANIMAL_CLASSES[e.animalClass].dryMatterPercent;
  const i = r * n;
  const o = e.utilizationPercent > 0 ? t * (e.utilizationPercent / 100) : 0;
  const a = o > 0 ? i / o : 0;
  const s = a * 43560;
  const l = e.paddockSideLength > 0 ? s / e.paddockSideLength : 0;
  const u = a > 0 ? r / a : 0;
  const c = e.movesPerDay > 0 ? a / e.movesPerDay : 0;
  const f = c > 0 ? r / c : 0;

  return {
    forageLbsPerAcre: t,
    totalAnimalWeight: r,
    dryMatterPercent: n,
    dryMatterNeededPerDay: i,
    dryMatterAvailable: o,
    acresNeededPerDay: a,
    squareFeet: s,
    paddockWidth: l,
    stockingDensityPerAcre: u,
    paddockSizeWithMoves: c,
    stockingDensityWithMoves: f,
  };
}

export function computeStockMixed(input) {
  const e = {
    ...STOCK_MIXED_DEFAULTS,
    ...input,
    animals: { ...STOCK_MIXED_DEFAULTS.animals, ...(input.animals ?? {}) },
  };

  const t = forageLbsPerAcre(e.forageHeight, e.forageDensity);
  let totalAnimalWeight = 0;
  let totalDryMatterNeeded = 0;

  const animalBreakdown = Object.entries(e.animals).map(
    ([animalClass, animalConfig]) => {
      const info = ANIMAL_CLASSES[animalClass];
      const totalWeight =
        animalConfig.numberOfHead * animalConfig.averageWeight;
      const dryMatterNeeded = totalWeight * info.dryMatterPercent;
      totalAnimalWeight += totalWeight;
      totalDryMatterNeeded += dryMatterNeeded;

      return {
        class: animalClass,
        label: info.label,
        numberOfHead: animalConfig.numberOfHead,
        averageWeight: animalConfig.averageWeight,
        totalWeight,
        dryMatterPercent: info.dryMatterPercent,
        dryMatterNeeded,
      };
    },
  );

  const weightedDryMatterPercent =
    totalAnimalWeight > 0 ? totalDryMatterNeeded / totalAnimalWeight : 0;
  const dryMatterAvailable = t * (e.utilizationPercent / 100);
  const acresNeededPerDay =
    dryMatterAvailable > 0 ? totalDryMatterNeeded / dryMatterAvailable : 0;
  const squareFeet = acresNeededPerDay * 43560;
  const paddockWidth =
    e.paddockSideLength > 0 ? squareFeet / e.paddockSideLength : 0;
  const stockingDensityPerAcre =
    acresNeededPerDay > 0 ? totalAnimalWeight / acresNeededPerDay : 0;
  const paddockSizeWithMoves =
    e.movesPerDay > 0 ? acresNeededPerDay / e.movesPerDay : 0;
  const stockingDensityWithMoves =
    paddockSizeWithMoves > 0 ? totalAnimalWeight / paddockSizeWithMoves : 0;

  return {
    forageLbsPerAcre: t,
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
