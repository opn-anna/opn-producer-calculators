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
].map((field) => ({
  ...field,
  control: field.control ?? "slider+number",
}));

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
].map((field) => ({
  ...field,
  control: field.control ?? "slider+number",
}));

/**
 * Build a defaults object from a field definition array.
 * @param {Array<{key: string, defaultValue: number}>} fields
 * @returns {Record<string, number>}
 */
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

export const STOCK_FIELD_CONTROLS = Object.freeze({
  forageHeight: "slider+number",
  utilizationPercent: "slider+number",
  paddockSideLength: "slider+number",
  movesPerDay: "slider+number",
  numberOfHead: "slider+number",
  averageWeight: "slider+number",
});

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

/**
 * Calculate recommended egg pricing from per-bird cost inputs.
 *
 * Note: `chicksStarterFeedCost` and `chicksStarterFeedSize` appear in
 * EGG_FIELDS (brooding category) but are not used here — the starter feed
 * cost is the hardcoded constant $8.51/chick from the original spreadsheet.
 * The chicks category (chicksCount, chicksCost, chickMortalityRate) is also
 * present in the schema but hidden from the UI via EGG_VISIBLE_FIELDS.
 *
 * @param {Partial<typeof EGG_DEFAULTS>} input
 * @returns {{
 *   pricePerDozen: number,
 *   costPerDozen: number,
 *   profitPerDozen: number,
 *   averageDozenPerHenPerYear: number,
 *   totalEggsPerHen: number,
 *   costBreakdown: Record<string, number>
 * }}
 */
export function computeEggPricing(input) {
  const e = { ...EGG_DEFAULTS, ...input };

  // Chick purchase cost per surviving bird
  const u = Math.max(0.01, 1 - e.chickMortalityRate / 100); // chick survival rate
  const c = Math.max(1, e.chicksCount); // safe chick count
  const f = e.chicksCost / c / u; // chick cost per surviving bird

  // Brooding cost per chick: labor + fixed starter feed constant from original spreadsheet.
  // 126 is a fixed total brooding labor hours constant (not derived from broodingDays).
  // $8.51 is the per-chick starter feed cost from the original spreadsheet calculation.
  const g = (e.broodingHoursPerDay * 126 * e.laborRate) / c + 8.51;

  // Annual feed cost per laying bird
  const h = e.feedPricePerUnit / e.feedUnitSize / 16; // feed price per oz (unit size in lbs → oz)
  const v = e.feedConsumedPerDay * 365 * h; // annual feed cost per bird

  // Infrastructure cost per bird per year (capital amortized + annual repairs)
  const y =
    (e.buildingMaterialsCost / e.yearsOfLife + e.annualRepairs) / e.flockSize;

  // Laying labor cost per bird per year
  const m = (e.layingLaborHoursPerDay * 365 * e.laborRate) / e.flockSize;

  // Distribution cost per bird per year (delivery mileage + delivery labor)
  const b = e.milesPerDelivery * e.deliveriesPerYear * e.costPerMile; // annual delivery mileage cost
  const S = e.laborHoursPerDelivery * e.deliveriesPerYear * e.laborRate; // annual delivery labor cost
  const w = (b + S) / e.flockSize; // distribution cost per bird

  // Feed pickup cost per bird per year
  const P = e.feedPickupHoursPerTrip * e.feedPickupTripsPerYear * e.laborRate; // pickup labor
  const E = e.feedPickupMileage * e.feedPickupTripsPerYear * e.costPerMile; // pickup mileage
  const O = (P + E) / e.flockSize; // feed pickup cost per bird

  // Total eggs per hen across all kept years. Lay rate declines 20% per year
  // relative to the year-1 rate (e.g. year 2 = 80%, year 3 = 60%).
  let C = 0; // total eggs per hen over yearsToKeepHen
  for (let year = 1; year <= e.yearsToKeepHen; year += 1) {
    const declineMultiplier = 1 - (year - 1) * 0.2;
    C += e.layRateYear1 * declineMultiplier;
  }

  const k = C / e.yearsToKeepHen / 12; // average dozen per hen per year

  // Stew hen credit spread across the hen's productive years
  const A = e.stewHenNetValue / e.yearsToKeepHen;

  // Brooding cost amortized across productive years
  const broodingTotal = (f + g) / e.yearsToKeepHen; // amortized brooding cost per bird per year

  // Base cost per dozen: sum all per-bird-per-year costs, subtract credit, divide by output
  const N = (broodingTotal + v + y + m + w + O - A) / k;

  // Carton and total cost per dozen
  const I = e.eggCartonCost; // carton cost per dozen
  const R = N + I; // total cost per dozen

  // Recommended price per dozen (gross margin applied on top of cost)
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

/**
 * Calculate recommended meat chicken pricing from per-bird cost inputs.
 * Produces two parallel price paths: sent-out processing and DIY processing.
 *
 * @param {Partial<typeof MEAT_DEFAULTS>} input
 * @returns {{
 *   pricePerPoundSentOut: number,
 *   pricePerPoundDIY: number,
 *   costPerPoundSentOut: number,
 *   costPerPoundDIY: number,
 *   totalCostPerBirdSentOut: number,
 *   totalCostPerBirdDIY: number,
 *   costBreakdown: Record<string, number>
 * }}
 */
export function computeMeatPricing(input) {
  const e = { ...MEAT_DEFAULTS, ...input };

  // Safe denominators — prevent division by zero on edge-case inputs
  const d = Math.max(1, e.chicksCount); // safe chick count per batch
  const p = Math.max(0.01, 1 - e.chickMortalityRate / 100); // chick survival rate
  const g = Math.max(1, e.birdsFinished); // safe birds finished annually
  const h = Math.max(1, e.processingBirdsProcessed); // safe birds per sent-out processing run
  const v = Math.max(1, e.diyEquipmentLifespan); // safe DIY equipment lifespan (years)
  const y = Math.max(1, e.diyBirdsPerYear); // safe DIY birds processed per year
  const m = Math.max(1, e.diyBirdsPerDay); // safe DIY birds processed per day
  const b = Math.max(0.1, e.averageWeight); // safe average dressed weight (lbs)
  const S = Math.max(0.01, 1 - e.desiredMargin / 100); // safe gross margin denominator
  const w = Math.max(1, e.tractorLifespanYears); // safe tractor lifespan (years)
  const P = Math.max(1, e.birdsPerTractorPerBatch); // safe birds per tractor per batch
  const E = Math.max(1, e.batchesPerYearPerTractor); // safe batches per year per tractor

  // Chick purchase cost per surviving bird
  const O = e.chicksTotalCost / d / p;

  // Brooding cost per bird (bedding + labor)
  const C = (e.beddingCostPerUnit * e.beddingUnitsPerBatch) / d; // bedding cost per bird
  const k = (e.broodingHoursPerDay * e.broodingDays * e.laborRate) / d; // brooding labor per bird
  const A = C + k; // total brooding cost per bird

  // Feed cost per bird: total annual feed cost divided by annual birds finished.
  const feed = e.annualFeedCost / g;

  // Infrastructure: chicken tractor depreciation + annual repairs, spread across birds per tractor per year
  const D = e.tractorMaterialsCost / w + e.annualRepairCost; // annual tractor cost
  const N = P * E; // birds per tractor per year
  const I = D / N; // infrastructure cost per bird

  // Field labor cost per bird
  const R = (e.daysInField * e.fieldHoursPerDay * e.laborRate) / d;

  // Processing — Sent Out: service fee + travel labor + travel mileage, divided by birds in the run
  const L = e.processingTravelTime * e.laborRate; // travel labor cost
  const j = e.processingMileage * e.irsMileageRate; // travel mileage cost
  const M = (e.processingTotalCost + L + j) / h; // sent-out processing cost per bird

  // Processing — DIY: equipment depreciation + processing-day labor + supplies per bird
  const B = e.diyEquipmentCost / v / y; // equipment cost per bird
  const V = (e.diyCrewSize * e.diyHoursPerPerson * e.laborRate) / m; // labor cost per bird
  const F = e.diyPackagingCost + e.diyLabelCost + e.diyPropaneCost / m; // supplies cost per bird
  const q = B + V + F; // total DIY processing cost per bird

  // Feed pickup cost per bird (shared across both processing paths)
  const Y = e.feedPickupTravelTime * e.feedPickupTripsPerBatch * e.laborRate; // pickup labor per batch
  const se = e.feedPickupMiles * e.feedPickupTripsPerBatch * e.irsMileageRate; // pickup mileage per batch
  const de = (Y + se) / d; // feed pickup cost per bird

  // Total cost per bird: base (shared) + processing-path-specific cost
  const X = O + A + feed + I + R + de; // base cost per bird (pre-processing)
  const fe = X + M; // total cost per bird — Sent Out
  const G = X + q; // total cost per bird — DIY

  // Cost per pound and price per pound (gross margin applied)
  const Q = fe / b; // cost per pound — Sent Out
  const Z = G / b; // cost per pound — DIY
  const U = Q / S; // price per pound — Sent Out
  const ve = Z / S; // price per pound — DIY

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

/**
 * Estimate standing forage mass from canopy height and ground-coverage density.
 * @param {number} height - Average forage height in inches.
 * @param {number} densityLevel - Key into FORAGE_DENSITY_LEVELS (1 | 2 | 3).
 * @returns {number} Estimated forage lbs per acre.
 */
function forageLbsPerAcre(height, densityLevel) {
  const level = FORAGE_DENSITY_LEVELS[densityLevel] ?? FORAGE_DENSITY_LEVELS[2];
  return height * level.multiplier;
}

/**
 * Calculate daily paddock requirements for a single-class herd.
 *
 * @param {Partial<typeof STOCK_SINGLE_DEFAULTS>} input
 * @returns {{
 *   forageLbsPerAcre: number,
 *   totalAnimalWeight: number,
 *   dryMatterPercent: number,
 *   dryMatterNeededPerDay: number,
 *   dryMatterAvailable: number,
 *   acresNeededPerDay: number,
 *   squareFeet: number,
 *   paddockWidth: number,
 *   stockingDensityPerAcre: number,
 *   paddockSizeWithMoves: number,
 *   stockingDensityWithMoves: number
 * }}
 */
export function computeStockSingle(input) {
  const e = { ...STOCK_SINGLE_DEFAULTS, ...input };

  const t = forageLbsPerAcre(e.forageHeight, e.forageDensity); // forage lbs per acre
  const r = e.numberOfHead * e.averageWeight; // total herd weight (lbs)
  const n = ANIMAL_CLASSES[e.animalClass].dryMatterPercent; // dry matter intake as % of body weight
  const i = r * n; // dry matter needed per day (lbs)
  const o = e.utilizationPercent > 0 ? t * (e.utilizationPercent / 100) : 0; // dry matter available per acre at utilization goal
  const a = o > 0 ? i / o : 0; // acres needed per day
  const s = a * 43560; // square feet per day (1 acre = 43,560 sq ft)
  const l = e.paddockSideLength > 0 ? s / e.paddockSideLength : 0; // calculated paddock width (ft)
  const u = a > 0 ? r / a : 0; // stocking density (lbs/acre)
  const c = e.movesPerDay > 0 ? a / e.movesPerDay : 0; // paddock size per move (acres)
  const f = c > 0 ? r / c : 0; // stocking density per move (lbs/acre)

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

/**
 * Calculate daily paddock requirements for a mixed-class herd.
 * Each animal class contributes its own dry matter demand based on its
 * species-specific intake percentage.
 *
 * @param {Partial<typeof STOCK_MIXED_DEFAULTS>} input
 * @returns {{
 *   forageLbsPerAcre: number,
 *   totalAnimalWeight: number,
 *   weightedDryMatterPercent: number,
 *   totalDryMatterNeeded: number,
 *   dryMatterAvailable: number,
 *   acresNeededPerDay: number,
 *   squareFeet: number,
 *   paddockWidth: number,
 *   stockingDensityPerAcre: number,
 *   paddockSizeWithMoves: number,
 *   stockingDensityWithMoves: number,
 *   animalBreakdown: Array<object>
 * }}
 */
export function computeStockMixed(input) {
  const e = {
    ...STOCK_MIXED_DEFAULTS,
    ...input,
    animals: { ...STOCK_MIXED_DEFAULTS.animals, ...(input.animals ?? {}) },
  };

  const t = forageLbsPerAcre(e.forageHeight, e.forageDensity); // forage lbs per acre
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
