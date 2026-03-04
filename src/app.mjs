import {
  EGG_FIELDS,
  MEAT_FIELDS,
  EGG_DEFAULTS,
  MEAT_DEFAULTS,
  FORAGE_DENSITY_LEVELS,
  ANIMAL_CLASSES,
  STOCK_SINGLE_DEFAULTS,
  STOCK_MIXED_DEFAULTS,
  STOCK_FIELD_CONTROLS,
  computeEggPricing,
  computeMeatPricing,
  computeStockSingle,
  computeStockMixed,
} from "/src/calculators.mjs";

const CATEGORY_TITLES = {
  labor: "Labor & General",
  chicks: "Chicks",
  brooding: "Brooding",
  laying: "Laying",
  infrastructure: "Infrastructure",
  distribution: "Distribution",
  culling: "Culling",
  chickPurchase: "Chick Purchase",
  feed: "Feed",
  fieldLabor: "Field Labor",
  processingSentOut: "Processing (Sent Out)",
  processingDIY: "Processing (DIY)",
  other: "Other",
};

const BREAKDOWN_COLORS = {
  brooding: "#9a59c7",
  infrastructure: "#eb7e34",
  distribution: "#23a2c9",
  cartons: "#b88437",
  feed: "#3e7f6b",
  labor: "#f0b728",
  feedPickup: "#8db89f",
  stewHenCredit: "#bfd0c7",
  chickPurchase: "#9a59c7",
  fieldLabor: "#f0b728",
  processingSentOut: "#3e7f6b",
  processingDIY: "#23a2c9",
};

const BREAKDOWN_FALLBACK_COLORS = [
  "#1d4ed8",
  "#9333ea",
  "#0891b2",
  "#059669",
  "#ca8a04",
  "#dc2626",
  "#ea580c",
  "#7c3aed",
];

const BREAKDOWN_CREDIT_KEYS = new Set(["stewHenCredit"]);

const LANGUAGE_STORAGE_KEY = "opn-calculator-language";
const SUPPORTED_LANGUAGES = new Set(["en", "es"]);

const STATIC_TRANSLATIONS = {
  en: {
    "meta.home.title": "Producer Calculators",
    "meta.home.description": "Choose a calculator.",
    "page.home.title": "Producer Calculators",
    "page.home.description": "Choose a calculator.",
    "nav.home": "Home",
    "nav.egg": "Egg Price",
    "nav.meat": "Meat Chicken Price",
    "nav.stock": "Stock Density",
    "language.label": "Language",
    "home.calculators.heading": "Calculators",
    "home.calculators.egg": "Egg Price Calculator",
    "home.calculators.meat": "Meat Chicken Price Calculator",
    "home.calculators.stock": "Stock Density Calculator",
    "meta.egg.title": "Egg Price Calculator",
    "meta.egg.description": "Calculate egg pricing from production inputs.",
    "page.egg.title": "Egg Price Calculator",
    "page.egg.description": "Calculate egg pricing from production inputs.",
    "common.inputs": "Inputs",
    "common.reset": "Reset to defaults",
    "common.outputs": "Outputs",
    "egg.breakdown.heading": "Cost Breakdown (per dozen)",
    "meta.meat.title": "Meat Chicken Price Calculator",
    "meta.meat.description":
      "Calculate the true cost of production for pasture-raised meat chickens.",
    "page.meat.title": "Meat Chicken Price Calculator",
    "page.meat.description":
      "Calculate the true cost of production to ensure sustainable pricing for your pasture-raised meat chickens.",
    "meat.breakdown.heading": "Cost Breakdown (per bird)",
    "meta.stock.title": "Stock Density Calculator",
    "meta.stock.description":
      "Calculate paddock sizing and stocking density based on forage and herd inputs.",
    "page.stock.title": "Stock Density Calculator",
    "page.stock.description":
      "Calculate optimal stocking density for your pasture management.",
    "stock.breakdown.heading": "Animal Breakdown",
  },
  es: {
    "meta.home.title": "Calculadoras para productores",
    "meta.home.description": "Elige una calculadora.",
    "page.home.title": "Calculadoras para productores",
    "page.home.description": "Elige una calculadora.",
    "nav.home": "Inicio",
    "nav.egg": "Precio de huevos",
    "nav.meat": "Precio de pollo de engorde",
    "nav.stock": "Carga animal",
    "language.label": "Idioma",
    "home.calculators.heading": "Calculadoras",
    "home.calculators.egg": "Calculadora de precio de huevos",
    "home.calculators.meat": "Calculadora de precio de pollo de engorde",
    "home.calculators.stock": "Calculadora de carga animal",
    "meta.egg.title": "Calculadora de precio de huevos",
    "meta.egg.description":
      "Calcula el precio del huevo a partir de los insumos de producción.",
    "page.egg.title": "Calculadora de precio de huevos",
    "page.egg.description":
      "Calcula el precio del huevo a partir de los insumos de producción.",
    "common.inputs": "Entradas",
    "common.reset": "Restablecer valores",
    "common.outputs": "Resultados",
    "egg.breakdown.heading": "Desglose de costos (por docena)",
    "meta.meat.title": "Calculadora de precio de pollo de engorde",
    "meta.meat.description":
      "Calcula el costo real de producción para pollos de engorde en pastoreo.",
    "page.meat.title": "Calculadora de precio de pollo de engorde",
    "page.meat.description":
      "Calcula el costo real de producción para asegurar un precio sostenible de tus pollos de engorde en pastoreo.",
    "meat.breakdown.heading": "Desglose de costos (por ave)",
    "meta.stock.title": "Calculadora de carga animal",
    "meta.stock.description":
      "Calcula el tamaño de potreros y la carga animal según forraje y rodeo.",
    "page.stock.title": "Calculadora de carga animal",
    "page.stock.description":
      "Calcula la carga animal óptima para el manejo de tus pasturas.",
    "stock.breakdown.heading": "Desglose por animal",
  },
};

const PHRASE_TRANSLATIONS_ES = {
  "Labor & General": "Mano de obra y general",
  Chicks: "Pollitos",
  Brooding: "Crianza",
  Laying: "Postura",
  Infrastructure: "Infraestructura",
  Distribution: "Distribución",
  Culling: "Descarte",
  "Chick Purchase": "Compra de pollitos",
  Feed: "Alimento",
  "Field Labor": "Trabajo en campo",
  "Processing (Sent Out)": "Procesamiento (externo)",
  "Processing (DIY)": "Procesamiento (propio)",
  Other: "Otros",
  "Labor Rate": "Tarifa de mano de obra",
  "Desired Gross Margin": "Margen bruto deseado",
  "Chicks Purchased": "Pollitos comprados",
  "Total Cost of Chicks": "Costo total de pollitos",
  "Chick Mortality Rate": "Tasa de mortalidad de pollitos",
  "Brooding Hours per Day": "Horas de crianza por día",
  "Total Brooding Days": "Días totales de crianza",
  "Starter Feed Cost": "Costo del alimento iniciador",
  "Starter Feed Unit Size": "Tamaño de unidad del alimento iniciador",
  "Size of Flock": "Tamaño del lote",
  "Feed per Bird per Day": "Alimento por ave por día",
  "Feed Price per Unit": "Precio del alimento por unidad",
  "Feed Unit Size": "Tamaño de unidad del alimento",
  "Expected Lay Rate (Year 1)": "Tasa de postura esperada (año 1)",
  "Years to Keep Hens": "Años para mantener gallinas",
  "Laying Labor Hours per Day": "Horas de trabajo de postura por día",
  "Building Materials Cost": "Costo de materiales de construcción",
  "Annual Repairs": "Reparaciones anuales",
  "Infrastructure Lifespan": "Vida útil de infraestructura",
  "Miles per Delivery": "Millas por entrega",
  "Deliveries per Year": "Entregas por año",
  "Cost per Mile": "Costo por milla",
  "Labor Hours per Delivery": "Horas de mano de obra por entrega",
  "Egg Carton Cost": "Costo del cartón de huevos",
  "Feed Pickup Hours per Trip": "Horas de recogida de alimento por viaje",
  "Feed Pickup Trips per Year": "Viajes de recogida de alimento por año",
  "Feed Pickup Mileage": "Millaje de recogida de alimento",
  "Net Value per Stew Hen": "Valor neto por gallina de descarte",
  "Total Cost of Chicks (incl. Shipping)":
    "Costo total de pollitos (incluye envío)",
  "Bedding Cost per Unit": "Costo de cama por unidad",
  "Bedding Units per Batch": "Unidades de cama por lote",
  "Annual Feed Cost": "Costo anual de alimento",
  "Birds Finished Annually": "Aves terminadas al año",
  "Feed Pickup Travel Time": "Tiempo de traslado para recoger alimento",
  "Feed Pickup Trips per Batch": "Viajes de recogida de alimento por lote",
  "Feed Pickup Round Trip Miles": "Millas ida y vuelta para recoger alimento",
  "IRS Mileage Rate": "Tarifa de millaje del IRS",
  "Chicken Tractor Materials Cost": "Costo de materiales del tractor de pollos",
  "Annual Repair Cost": "Costo anual de reparación",
  "Tractor Lifespan": "Vida útil del tractor",
  "Birds per Tractor per Batch": "Aves por tractor por lote",
  "Batches per Year per Tractor": "Lotes por año por tractor",
  "Days in Field per Batch": "Días en campo por lote",
  "Field Labor Hours per Day": "Horas de trabajo en campo por día",
  "Processing Total Cost": "Costo total de procesamiento",
  "Birds Processed": "Aves procesadas",
  "Processor Travel Time": "Tiempo de traslado al procesador",
  "Processor Round Trip Mileage": "Millaje ida y vuelta al procesador",
  "Equipment Cost": "Costo del equipo",
  "Equipment Lifespan": "Vida útil del equipo",
  "Birds Processed per Year": "Aves procesadas por año",
  "Processing Crew Size": "Tamaño del equipo de procesamiento",
  "Hours per Person on Processing Day":
    "Horas por persona el día de procesamiento",
  "Birds Processed per Day": "Aves procesadas por día",
  "Packaging Cost per Bag": "Costo de empaque por bolsa",
  "Label Cost Each": "Costo por etiqueta",
  "Propane Cost per Batch": "Costo de propano por lote",
  "Average Dressed Weight": "Peso canal promedio",
  "Recommended Price / Dozen": "Precio recomendado / docena",
  "Cost / Dozen": "Costo / docena",
  "Profit / Dozen": "Ganancia / docena",
  "Average Dozen / Hen / Year": "Docenas promedio / gallina / año",
  "Total Eggs / Hen": "Huevos totales / gallina",
  "Annual Revenue / Hen": "Ingreso anual / gallina",
  "Recommended Price / lb (Sent Out)": "Precio recomendado / lb (externo)",
  "Recommended Price / lb (DIY)": "Precio recomendado / lb (propio)",
  "Cost / lb (Sent Out)": "Costo / lb (externo)",
  "Cost / lb (DIY)": "Costo / lb (propio)",
  "Total Cost / Bird (Sent Out)": "Costo total / ave (externo)",
  "Total Cost / Bird (DIY)": "Costo total / ave (propio)",
  "Forage (lbs/acre)": "Forraje (lb/acre)",
  "Total Animal Weight (lbs)": "Peso animal total (lb)",
  "Dry Matter %": "% de materia seca",
  "Dry Matter Needed / Day": "Materia seca necesaria / día",
  "Dry Matter Available": "Materia seca disponible",
  "Acres Needed / Day": "Acres necesarios / día",
  "Square Feet": "Pies cuadrados",
  "Paddock Width": "Ancho del potrero",
  "Stocking Density / Acre": "Carga animal / acre",
  "Paddock Size with Moves": "Tamaño de potrero con movimientos",
  "Stocking Density with Moves": "Carga animal con movimientos",
  "Total Cost": "Costo total",
  "Weighted Dry Matter %": "% de materia seca ponderado",
  "Total Dry Matter Needed / Day": "Materia seca total necesaria / día",
  Component: "Componente",
  Amount: "Monto",
  Class: "Clase",
  Head: "Cabezas",
  "Avg Weight": "Peso prom.",
  "Total Weight": "Peso total",
  "Dry Matter Needed": "Materia seca necesaria",
  Labor: "Mano de obra",
  "Feed Pickup": "Recogida de alimento",
  Cartons: "Cartones",
  "Stew Hen Credit": "Crédito por gallina de descarte",
  "Processing Sent Out": "Procesamiento externo",
  "Processing DIY": "Procesamiento propio",
  "Single Class": "Clase única",
  "Mixed Herd": "Rodeo mixto",
  "Animal Groups": "Grupos de animales",
  "Average Forage Height": "Altura promedio del forraje",
  "Ground Coverage Density": "Densidad de cobertura del suelo",
  "Forage Utilization Goal": "Objetivo de utilización del forraje",
  "Paddock Side Length": "Largo del lado del potrero",
  "Paddock Moves per Day": "Movimientos de potrero por día",
  "Number of Head": "Número de cabezas",
  "Average Weight": "Peso promedio",
  "Animal Class": "Clase animal",
  "85-90% coverage": "85-90% cobertura",
  "90-95% coverage": "90-95% cobertura",
  "95%+ coverage": "95%+ cobertura",
  "Stocker Cattle": "Novillos de engorde",
  "Dry Cow": "Vaca seca",
  "Lactating Cow": "Vaca lactante",
  "Sheep/Goats": "Ovejas/Cabras",
  "Lactating Sheep": "Oveja lactante",
  "/hr": "/h",
  hrs: "h",
  days: "días",
  years: "años",
  yrs: "años",
  each: "cada uno",
  "Show Cost Breakdown": "Mostrar desglose de costos",
  "Hide Cost Breakdown": "Ocultar desglose de costos",
  "Daily Paddock Size": "Tamaño diario del potrero",
  acres: "acres",
  "sq ft": "pies²",
  "Forage Analysis": "Análisis de forraje",
  "lbs/acre": "lb/acre",
  "Herd Requirements": "Requerimientos del rodeo",
  "Daily Dry Matter Need": "Necesidad diaria de materia seca",
  lbs: "lb",
  "Stocking Density": "Carga animal",
  "Paddock Dimensions": "Dimensiones del potrero",
  "ft (set)": "ft (definido)",
  "ft (calculated)": "ft (calculado)",
  "Production Summary": "Resumen de producción",
  "Total Meat (Annual)": "Carne total (anual)",
  "Single class mode does not include an animal breakdown table.":
    "El modo de clase única no incluye una tabla de desglose por animal.",
};

let currentLanguage = readStoredLanguage();
const languageChangeListeners = new Set();
let fieldIdCounter = 0;

function normalizeLanguage(language) {
  const candidate = String(language ?? "")
    .trim()
    .toLowerCase();
  return SUPPORTED_LANGUAGES.has(candidate) ? candidate : "en";
}

function readStoredLanguage() {
  try {
    return normalizeLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
  } catch (error) {
    return "en";
  }
}

function persistLanguage(language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    // Ignore storage failures in private or restricted contexts.
  }
}

function translateStatic(key, fallback = "") {
  const localized = STATIC_TRANSLATIONS[currentLanguage]?.[key];
  if (localized) {
    return localized;
  }
  const english = STATIC_TRANSLATIONS.en[key];
  return english ?? fallback;
}

function translatePhrase(phrase) {
  if (currentLanguage === "es") {
    return PHRASE_TRANSLATIONS_ES[phrase] ?? phrase;
  }
  return phrase;
}

function applyStaticTranslations() {
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) {
      return;
    }
    node.textContent = translateStatic(key, node.textContent ?? "");
  });

  document.querySelectorAll("[data-i18n-content]").forEach((node) => {
    const key = node.getAttribute("data-i18n-content");
    if (!key) {
      return;
    }
    const fallback = node.getAttribute("content") ?? "";
    node.setAttribute("content", translateStatic(key, fallback));
  });
}

function updateLanguageButtons() {
  document.querySelectorAll("[data-language-option]").forEach((button) => {
    const option = normalizeLanguage(
      button.getAttribute("data-language-option"),
    );
    const isActive = option === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function setLanguage(language, { persist = true, notify = true } = {}) {
  currentLanguage = normalizeLanguage(language);
  if (persist) {
    persistLanguage(currentLanguage);
  }
  applyStaticTranslations();
  updateLanguageButtons();
  if (notify) {
    languageChangeListeners.forEach((listener) => listener(currentLanguage));
  }
}

function onLanguageChange(listener) {
  languageChangeListeners.add(listener);
  return () => languageChangeListeners.delete(listener);
}

function initLanguageControls() {
  document.querySelectorAll("[data-language-option]").forEach((button) => {
    button.addEventListener("click", () => {
      const selectedLanguage = button.getAttribute("data-language-option");
      setLanguage(selectedLanguage, { persist: true, notify: true });
    });
  });
  setLanguage(currentLanguage, { persist: false, notify: false });
}

function createFieldId(key) {
  const normalized = String(key)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  fieldIdCounter += 1;
  return `${normalized || "field"}-${fieldIdCounter}`;
}

function humanizeKey(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatNumber(value, digits = 2) {
  return Number.isFinite(value) ? value.toFixed(digits) : "0.00";
}

function formatGroupedNumber(value, digits = 0) {
  if (!Number.isFinite(value)) {
    return "0";
  }
  return new Intl.NumberFormat(currentLanguage === "es" ? "es-ES" : "en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function formatMoney(value) {
  return `$${formatNumber(value, 2)}`;
}

function formatSignedMoney(value) {
  const absoluteValue = Math.abs(value);
  const sign = value < 0 ? "-" : "";
  return `${sign}$${formatNumber(absoluteValue, 2)}`;
}

function formatPercent(value) {
  return `${formatNumber(value * 100, 2)}%`;
}

function countStepDecimals(step) {
  const stepText = String(step ?? "");
  if (!stepText.includes(".")) {
    return 0;
  }
  return stepText.split(".")[1].length;
}

function normalizeFieldValue(field, rawValue, fallbackValue = 0) {
  const parsedValue = Number.parseFloat(String(rawValue));
  let nextValue = Number.isFinite(parsedValue) ? parsedValue : fallbackValue;
  const minimum = Number(field.min);
  const maximum = Number(field.max);
  const step = Number(field.step);

  if (Number.isFinite(minimum)) {
    nextValue = Math.max(minimum, nextValue);
  }

  if (Number.isFinite(maximum)) {
    nextValue = Math.min(maximum, nextValue);
  }

  if (Number.isFinite(step) && step > 0) {
    const origin = Number.isFinite(minimum) ? minimum : 0;
    const stepCount = Math.round((nextValue - origin) / step);
    const steppedValue = origin + stepCount * step;
    nextValue = Number(steppedValue.toFixed(countStepDecimals(step)));
  }

  return nextValue;
}

function getFieldControlMode(field) {
  return field.control === "slider+number" ? "slider+number" : "number";
}

function clearNode(node) {
  node.innerHTML = "";
}

function createSvgNode(tagName) {
  return document.createElementNS("http://www.w3.org/2000/svg", tagName);
}

function resolveBreakdownColor(key, index) {
  return (
    BREAKDOWN_COLORS[key] ??
    BREAKDOWN_FALLBACK_COLORS[index % BREAKDOWN_FALLBACK_COLORS.length]
  );
}

function buildBreakdownEntries(costBreakdown) {
  return Object.entries(costBreakdown)
    .map(([key, value], index) => {
      const numericValue = Number(value);
      const amount = Number.isFinite(numericValue) ? numericValue : 0;
      const isCredit = BREAKDOWN_CREDIT_KEYS.has(key) || amount < 0;
      const signedAmount = isCredit ? -Math.abs(amount) : amount;
      return {
        key,
        label: translatePhrase(humanizeKey(key)),
        signedAmount,
        magnitude: Math.abs(signedAmount),
        isCredit,
        color: resolveBreakdownColor(key, index),
      };
    })
    .filter((entry) => entry.magnitude > 0);
}

function createBreakdownLegendItem(entry, { signed = false } = {}) {
  const row = document.createElement("div");
  row.className = "cost-legend-item";

  const labelWrap = document.createElement("div");
  labelWrap.className = "cost-legend-label-wrap";

  const dot = document.createElement("span");
  dot.className = "cost-legend-dot";
  dot.style.backgroundColor = entry.color;
  labelWrap.append(dot);

  const label = document.createElement("span");
  label.className = "cost-legend-label";
  label.textContent = entry.label;
  labelWrap.append(label);

  const amount = document.createElement("span");
  amount.className = "cost-legend-value";
  amount.textContent = signed
    ? formatSignedMoney(entry.signedAmount)
    : formatMoney(entry.signedAmount);

  row.append(labelWrap, amount);
  return row;
}

function renderCostBreakdownChart(node, { costBreakdown, totalCost }) {
  clearNode(node);

  const entries = buildBreakdownEntries(costBreakdown);
  if (!entries.length) {
    return;
  }

  const positiveEntries = entries.filter((entry) => !entry.isCredit);
  const creditEntries = entries.filter((entry) => entry.isCredit);

  const wrapper = document.createElement("section");
  wrapper.className = "cost-breakdown-chart";

  const donut = document.createElement("div");
  donut.className = "cost-donut";

  const svg = createSvgNode("svg");
  svg.setAttribute("viewBox", "0 0 220 220");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", formatSignedMoney(totalCost));

  const track = createSvgNode("circle");
  track.classList.add("cost-donut-track");
  track.setAttribute("cx", "110");
  track.setAttribute("cy", "110");
  track.setAttribute("r", "78");
  svg.append(track);

  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const positiveTotal = positiveEntries.reduce(
    (sum, entry) => sum + entry.magnitude,
    0,
  );

  let dashOffset = 0;
  positiveEntries.forEach((entry) => {
    if (positiveTotal <= 0) {
      return;
    }
    const ratio = entry.magnitude / positiveTotal;
    const dashLength = ratio * circumference;
    const slice = createSvgNode("circle");
    slice.classList.add("cost-donut-slice");
    slice.setAttribute("cx", "110");
    slice.setAttribute("cy", "110");
    slice.setAttribute("r", String(radius));
    slice.setAttribute("stroke", entry.color);
    slice.setAttribute(
      "stroke-dasharray",
      `${dashLength} ${circumference - dashLength}`,
    );
    slice.setAttribute("stroke-dashoffset", String(-dashOffset));
    svg.append(slice);
    dashOffset += dashLength;
  });

  donut.append(svg);

  const center = document.createElement("div");
  center.className = "cost-donut-center";

  const centerLabel = document.createElement("p");
  centerLabel.className = "cost-donut-center-label";
  centerLabel.textContent = translatePhrase("Total Cost");

  const centerValue = document.createElement("p");
  centerValue.className = "cost-donut-center-value";
  centerValue.textContent = formatMoney(totalCost);

  center.append(centerLabel, centerValue);
  donut.append(center);
  wrapper.append(donut);

  const legend = document.createElement("div");
  legend.className = "cost-legend-grid";
  positiveEntries.forEach((entry) => {
    legend.append(createBreakdownLegendItem(entry));
  });
  wrapper.append(legend);

  if (creditEntries.length > 0) {
    const divider = document.createElement("hr");
    divider.className = "cost-credits-divider";
    wrapper.append(divider);

    const credits = document.createElement("div");
    credits.className = "cost-credits-list";
    creditEntries.forEach((entry) => {
      credits.append(createBreakdownLegendItem(entry, { signed: true }));
    });
    wrapper.append(credits);
  }

  node.append(wrapper);
}

function createMeatCostBreakdown(costBreakdown, processingKey) {
  return {
    chickPurchase: costBreakdown.chickPurchase ?? 0,
    brooding: costBreakdown.brooding ?? 0,
    feed: costBreakdown.feed ?? 0,
    infrastructure: costBreakdown.infrastructure ?? 0,
    fieldLabor: costBreakdown.fieldLabor ?? 0,
    feedPickup: costBreakdown.feedPickup ?? 0,
    [processingKey]: costBreakdown[processingKey] ?? 0,
  };
}

function createNumberField(field, currentValue, onChange) {
  const row = document.createElement("div");
  row.className = "field";
  const fieldId = createFieldId(field.key ?? "input");
  const controlMode = getFieldControlMode(field);
  let syncedValue = normalizeFieldValue(field, currentValue, 0);

  const label = document.createElement("label");
  label.id = `${fieldId}-label`;
  label.htmlFor = fieldId;
  label.textContent = field.label;

  const control = document.createElement("div");
  control.className = "field-control";
  if (controlMode === "slider+number") {
    control.classList.add("field-control--slider");
  }

  const numberControl = document.createElement("div");
  numberControl.className = "field-number-control";

  if (field.prefix) {
    const prefix = document.createElement("span");
    prefix.className = "affix";
    prefix.textContent = field.prefix;
    numberControl.append(prefix);
  }

  const input = document.createElement("input");
  input.id = fieldId;
  input.name = field.key;
  input.type = "number";
  input.inputMode = "decimal";
  input.min = String(field.min);
  input.max = String(field.max);
  input.step = String(field.step);
  input.value = String(syncedValue);
  numberControl.append(input);

  if (field.suffix) {
    const suffix = document.createElement("span");
    suffix.className = "affix";
    suffix.textContent = translatePhrase(field.suffix);
    numberControl.append(suffix);
  }
  control.append(numberControl);

  let slider = null;
  if (controlMode === "slider+number") {
    slider = document.createElement("input");
    slider.className = "field-slider";
    slider.type = "range";
    slider.min = String(field.min);
    slider.max = String(field.max);
    slider.step = String(field.step);
    slider.value = String(syncedValue);
    slider.setAttribute("aria-labelledby", label.id);
    control.append(slider);
  }

  function syncControls(rawValue) {
    const nextValue = normalizeFieldValue(field, rawValue, syncedValue);
    const hasChanged = nextValue !== syncedValue;
    syncedValue = nextValue;
    input.value = String(nextValue);
    if (slider) {
      slider.value = String(nextValue);
    }
    if (hasChanged) {
      onChange(nextValue);
    }
  }

  input.addEventListener("input", () => {
    syncControls(input.value);
  });

  if (slider) {
    slider.addEventListener("input", () => {
      syncControls(slider.value);
    });
  }

  row.append(label, control);
  return row;
}

function createSelectField({ label, options, value, onChange }) {
  const row = document.createElement("div");
  row.className = "field";
  const fieldId = createFieldId(label);

  const labelNode = document.createElement("label");
  labelNode.htmlFor = fieldId;
  labelNode.textContent = label;

  const control = document.createElement("div");
  control.className = "field-control";
  const select = document.createElement("select");
  select.id = fieldId;
  options.forEach((option) => {
    const element = document.createElement("option");
    element.value = String(option.value);
    element.textContent = option.label;
    if (String(option.value) === String(value)) {
      element.selected = true;
    }
    select.append(element);
  });
  select.addEventListener("change", () => onChange(select.value));
  control.append(select);
  row.append(labelNode, control);
  return row;
}

function renderGroupedFields(
  node,
  fields,
  state,
  onUpdate,
  { openCategories = new Set(), onToggleCategory = () => {} } = {},
) {
  clearNode(node);

  const grouped = new Map();
  fields.forEach((field) => {
    if (!grouped.has(field.category)) {
      grouped.set(field.category, []);
    }
    grouped.get(field.category).push(field);
  });

  grouped.forEach((categoryFields, category) => {
    const section = document.createElement("section");
    section.className = "category";
    const isOpen = openCategories.has(category);

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "category-toggle";
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = translatePhrase(
      CATEGORY_TITLES[category] ?? humanizeKey(category),
    );
    toggle.addEventListener("click", () => {
      onToggleCategory(category);
    });
    section.append(toggle);

    const content = document.createElement("div");
    content.className = "category-content";
    content.hidden = !isOpen;

    categoryFields.forEach((field) => {
      const translatedField = {
        ...field,
        label: translatePhrase(field.label),
      };
      const row = createNumberField(
        translatedField,
        state[field.key],
        (value) => onUpdate(field.key, value),
      );
      content.append(row);
    });
    section.append(content);

    node.append(section);
  });
}

function createSummaryMetricCard(label, value, { primary = false } = {}) {
  const card = document.createElement("article");
  card.className = primary
    ? "hero-summary-card hero-summary-card--primary"
    : "hero-summary-card";

  const labelNode = document.createElement("p");
  labelNode.className = "hero-summary-label";
  labelNode.textContent = label;

  const valueNode = document.createElement("p");
  valueNode.className = "hero-summary-value";
  valueNode.textContent = value;

  card.append(labelNode, valueNode);
  return card;
}

function createProductionSummary(rows) {
  const section = document.createElement("section");
  section.className = "production-summary";

  const heading = document.createElement("p");
  heading.className = "production-summary-heading";
  heading.textContent = translatePhrase("Production Summary");
  section.append(heading);

  rows.forEach(({ label, value }) => {
    const row = document.createElement("div");
    row.className = "production-summary-row";
    const labelNode = document.createElement("p");
    labelNode.className = "production-summary-label";
    labelNode.textContent = label;
    const valueNode = document.createElement("p");
    valueNode.className = "production-summary-value";
    valueNode.textContent = value;
    row.append(labelNode, valueNode);
    section.append(row);
  });

  return section;
}

function renderEggOutputSummary(node, result) {
  clearNode(node);

  const hero = document.createElement("section");
  hero.className = "hero-summary";
  hero.append(
    createSummaryMetricCard(
      translatePhrase("Recommended Price / Dozen"),
      formatMoney(result.pricePerDozen),
      { primary: true },
    ),
  );

  const supporting = document.createElement("div");
  supporting.className = "hero-summary-grid";
  supporting.append(
    createSummaryMetricCard(
      translatePhrase("Cost / Dozen"),
      formatMoney(result.costPerDozen),
    ),
    createSummaryMetricCard(
      translatePhrase("Profit / Dozen"),
      formatMoney(result.profitPerDozen),
    ),
    createSummaryMetricCard(
      translatePhrase("Average Dozen / Hen / Year"),
      formatGroupedNumber(result.averageDozenPerHenPerYear, 1),
    ),
  );
  hero.append(supporting);
  node.append(hero);

  node.append(
    createProductionSummary([
      {
        label: translatePhrase("Average Dozen / Hen / Year"),
        value: formatGroupedNumber(result.averageDozenPerHenPerYear, 1),
      },
      {
        label: translatePhrase("Total Eggs / Hen"),
        value: formatGroupedNumber(result.totalEggsPerHen, 0),
      },
      {
        label: translatePhrase("Annual Revenue / Hen"),
        value: formatMoney(
          result.pricePerDozen * result.averageDozenPerHenPerYear,
        ),
      },
    ]),
  );
}

function renderMeatOutputSummary(node, state, result) {
  clearNode(node);

  const hero = document.createElement("section");
  hero.className = "hero-summary";

  const primaryGrid = document.createElement("div");
  primaryGrid.className = "hero-summary-primary-grid";
  primaryGrid.append(
    createSummaryMetricCard(
      translatePhrase("Recommended Price / lb (Sent Out)"),
      formatMoney(result.pricePerPoundSentOut),
      { primary: true },
    ),
    createSummaryMetricCard(
      translatePhrase("Recommended Price / lb (DIY)"),
      formatMoney(result.pricePerPoundDIY),
      { primary: true },
    ),
  );
  hero.append(primaryGrid);

  const supporting = document.createElement("div");
  supporting.className = "hero-summary-grid";
  supporting.append(
    createSummaryMetricCard(
      translatePhrase("Total Cost / Bird (Sent Out)"),
      formatMoney(result.totalCostPerBirdSentOut),
    ),
    createSummaryMetricCard(
      translatePhrase("Cost / lb (Sent Out)"),
      formatMoney(result.costPerPoundSentOut),
    ),
    createSummaryMetricCard(
      translatePhrase("Total Cost / Bird (DIY)"),
      formatMoney(result.totalCostPerBirdDIY),
    ),
    createSummaryMetricCard(
      translatePhrase("Cost / lb (DIY)"),
      formatMoney(result.costPerPoundDIY),
    ),
  );
  hero.append(supporting);

  const strip = document.createElement("div");
  strip.className = "hero-summary-strip";
  strip.append(
    createSummaryMetricCard(
      translatePhrase("Desired Gross Margin"),
      `${formatGroupedNumber(state.desiredMargin, 0)}%`,
    ),
    createSummaryMetricCard(
      translatePhrase("Average Dressed Weight"),
      `${formatGroupedNumber(state.averageWeight, 1)} ${translatePhrase(
        "lbs",
      )}`,
    ),
  );
  hero.append(strip);
  node.append(hero);

  node.append(
    createProductionSummary([
      {
        label: translatePhrase("Birds Finished Annually"),
        value: formatGroupedNumber(state.birdsFinished, 0),
      },
      {
        label: translatePhrase("Average Dressed Weight"),
        value: `${formatGroupedNumber(
          state.averageWeight,
          1,
        )} ${translatePhrase("lbs")}`,
      },
      {
        label: translatePhrase("Total Meat (Annual)"),
        value: `${formatGroupedNumber(
          state.birdsFinished * state.averageWeight,
          1,
        )} ${translatePhrase("lbs")}`,
      },
    ]),
  );
}

function initEggPage() {
  const fieldsNode = document.getElementById("fields");
  const summaryNode = document.getElementById("summary");
  const breakdownNode = document.getElementById("breakdown");
  const breakdownHeading = breakdownNode?.previousElementSibling;
  const resetButton = document.getElementById("reset-defaults");

  let state = { ...EGG_DEFAULTS };
  const openCategories = new Set();
  let isBreakdownOpen = false;

  const breakdownToggle = document.createElement("button");
  breakdownToggle.type = "button";
  breakdownToggle.className = "breakdown-toggle";
  if (breakdownHeading) {
    breakdownHeading.insertAdjacentElement("afterend", breakdownToggle);
  }
  breakdownToggle.addEventListener("click", () => {
    isBreakdownOpen = !isBreakdownOpen;
    renderBreakdownVisibility();
  });

  function renderBreakdownVisibility() {
    breakdownNode.hidden = !isBreakdownOpen;
    breakdownToggle.classList.toggle("is-open", isBreakdownOpen);
    breakdownToggle.setAttribute("aria-expanded", String(isBreakdownOpen));
    breakdownToggle.textContent = isBreakdownOpen
      ? translatePhrase("Hide Cost Breakdown")
      : translatePhrase("Show Cost Breakdown");
  }

  function toggleCategory(category) {
    if (openCategories.has(category)) {
      openCategories.delete(category);
    } else {
      openCategories.add(category);
    }
    buildForm();
  }

  function updateOutputs() {
    const result = computeEggPricing(state);
    renderEggOutputSummary(summaryNode, result);

    renderCostBreakdownChart(breakdownNode, {
      costBreakdown: result.costBreakdown,
      totalCost: result.costPerDozen,
    });
    renderBreakdownVisibility();
  }

  function updateField(key, value) {
    state = { ...state, [key]: value };
    updateOutputs();
  }

  function buildForm() {
    renderGroupedFields(fieldsNode, EGG_FIELDS, state, updateField, {
      openCategories,
      onToggleCategory: toggleCategory,
    });
  }

  resetButton.addEventListener("click", () => {
    state = { ...EGG_DEFAULTS };
    buildForm();
    updateOutputs();
  });

  onLanguageChange(() => {
    buildForm();
    updateOutputs();
  });

  buildForm();
  updateOutputs();
}

function initMeatPage() {
  const fieldsNode = document.getElementById("fields");
  const summaryNode = document.getElementById("summary");
  const breakdownNode = document.getElementById("breakdown");
  const breakdownHeading = breakdownNode?.previousElementSibling;
  const resetButton = document.getElementById("reset-defaults");

  let state = { ...MEAT_DEFAULTS };
  const openCategories = new Set();
  let isBreakdownOpen = false;

  const breakdownToggle = document.createElement("button");
  breakdownToggle.type = "button";
  breakdownToggle.className = "breakdown-toggle";
  if (breakdownHeading) {
    breakdownHeading.insertAdjacentElement("afterend", breakdownToggle);
  }
  breakdownToggle.addEventListener("click", () => {
    isBreakdownOpen = !isBreakdownOpen;
    renderBreakdownVisibility();
  });

  function renderBreakdownVisibility() {
    breakdownNode.hidden = !isBreakdownOpen;
    breakdownToggle.classList.toggle("is-open", isBreakdownOpen);
    breakdownToggle.setAttribute("aria-expanded", String(isBreakdownOpen));
    breakdownToggle.textContent = isBreakdownOpen
      ? translatePhrase("Hide Cost Breakdown")
      : translatePhrase("Show Cost Breakdown");
  }

  function toggleCategory(category) {
    if (openCategories.has(category)) {
      openCategories.delete(category);
    } else {
      openCategories.add(category);
    }
    buildForm();
  }

  function updateOutputs() {
    const result = computeMeatPricing(state);
    renderMeatOutputSummary(summaryNode, state, result);

    clearNode(breakdownNode);

    const sentOutSection = document.createElement("section");
    sentOutSection.className = "cost-breakdown-subsection";

    const sentOutTitle = document.createElement("h4");
    sentOutTitle.className = "cost-breakdown-subtitle";
    sentOutTitle.textContent = translatePhrase("Processing Sent Out");
    sentOutSection.append(sentOutTitle);

    const sentOutChartNode = document.createElement("div");
    sentOutSection.append(sentOutChartNode);

    renderCostBreakdownChart(sentOutChartNode, {
      costBreakdown: createMeatCostBreakdown(
        result.costBreakdown,
        "processingSentOut",
      ),
      totalCost: result.totalCostPerBirdSentOut,
    });
    breakdownNode.append(sentOutSection);

    const diySection = document.createElement("section");
    diySection.className = "cost-breakdown-subsection";

    const diyTitle = document.createElement("h4");
    diyTitle.className = "cost-breakdown-subtitle";
    diyTitle.textContent = translatePhrase("Processing DIY");
    diySection.append(diyTitle);

    const diyChartNode = document.createElement("div");
    diySection.append(diyChartNode);

    renderCostBreakdownChart(diyChartNode, {
      costBreakdown: createMeatCostBreakdown(
        result.costBreakdown,
        "processingDIY",
      ),
      totalCost: result.totalCostPerBirdDIY,
    });
    breakdownNode.append(diySection);
    renderBreakdownVisibility();
  }

  function updateField(key, value) {
    state = { ...state, [key]: value };
    updateOutputs();
  }

  function buildForm() {
    renderGroupedFields(fieldsNode, MEAT_FIELDS, state, updateField, {
      openCategories,
      onToggleCategory: toggleCategory,
    });
  }

  resetButton.addEventListener("click", () => {
    state = { ...MEAT_DEFAULTS };
    buildForm();
    updateOutputs();
  });

  onLanguageChange(() => {
    buildForm();
    updateOutputs();
  });

  buildForm();
  updateOutputs();
}

function cloneMixedDefaults() {
  return {
    ...STOCK_MIXED_DEFAULTS,
    animals: JSON.parse(JSON.stringify(STOCK_MIXED_DEFAULTS.animals)),
  };
}

function initStockPage() {
  const modeNode = document.getElementById("stock-mode");
  const fieldsNode = document.getElementById("fields");
  const summaryNode = document.getElementById("summary");
  const breakdownNode = document.getElementById("breakdown");
  const breakdownHeading = breakdownNode?.previousElementSibling;
  const resetButton = document.getElementById("reset-defaults");

  if (breakdownHeading) {
    breakdownHeading.hidden = true;
  }
  breakdownNode.hidden = true;

  let mode = "single";
  let singleState = { ...STOCK_SINGLE_DEFAULTS };
  let mixedState = cloneMixedDefaults();

  function renderModeToggle() {
    clearNode(modeNode);
    const group = document.createElement("div");
    group.className = "mode-tabs";
    group.setAttribute("role", "tablist");

    const modes = [
      { value: "single", label: translatePhrase("Single Class") },
      { value: "mixed", label: translatePhrase("Mixed Herd") },
    ];

    modes.forEach((option) => {
      const button = document.createElement("button");
      const isActive = option.value === mode;
      button.type = "button";
      button.className = "mode-tab";
      button.textContent = option.label;
      button.setAttribute("role", "tab");
      button.setAttribute("aria-selected", String(isActive));
      button.setAttribute("aria-pressed", String(isActive));
      button.classList.toggle("is-active", isActive);
      button.addEventListener("click", () => {
        if (mode === option.value) {
          return;
        }
        mode = option.value;
        renderModeToggle();
        renderFields();
        renderOutputs();
      });
      group.append(button);
    });

    modeNode.append(group);
  }

  function renderFields() {
    clearNode(fieldsNode);

    const activeState = mode === "single" ? singleState : mixedState;

    fieldsNode.append(
      createNumberField(
        {
          key: "forageHeight",
          label: translatePhrase("Average Forage Height"),
          min: 1,
          max: 24,
          step: 0.5,
          control: STOCK_FIELD_CONTROLS.forageHeight,
          suffix: "in",
        },
        activeState.forageHeight,
        (value) => {
          if (mode === "single")
            singleState = { ...singleState, forageHeight: value };
          else mixedState = { ...mixedState, forageHeight: value };
          renderOutputs();
        },
      ),
    );

    fieldsNode.append(
      createSelectField({
        label: translatePhrase("Ground Coverage Density"),
        value: activeState.forageDensity,
        options: Object.entries(FORAGE_DENSITY_LEVELS).map(
          ([value, config]) => ({
            value,
            label: translatePhrase(config.label),
          }),
        ),
        onChange: (value) => {
          if (mode === "single")
            singleState = {
              ...singleState,
              forageDensity: Number.parseInt(value, 10),
            };
          else
            mixedState = {
              ...mixedState,
              forageDensity: Number.parseInt(value, 10),
            };
          renderOutputs();
        },
      }),
    );

    fieldsNode.append(
      createNumberField(
        {
          key: "utilizationPercent",
          label: translatePhrase("Forage Utilization Goal"),
          min: 1,
          max: 100,
          step: 1,
          control: STOCK_FIELD_CONTROLS.utilizationPercent,
          suffix: "%",
        },
        activeState.utilizationPercent,
        (value) => {
          if (mode === "single")
            singleState = { ...singleState, utilizationPercent: value };
          else mixedState = { ...mixedState, utilizationPercent: value };
          renderOutputs();
        },
      ),
    );

    fieldsNode.append(
      createNumberField(
        {
          key: "paddockSideLength",
          label: translatePhrase("Paddock Side Length"),
          min: 1,
          max: 3000,
          step: 1,
          control: STOCK_FIELD_CONTROLS.paddockSideLength,
          suffix: "ft",
        },
        activeState.paddockSideLength,
        (value) => {
          if (mode === "single")
            singleState = { ...singleState, paddockSideLength: value };
          else mixedState = { ...mixedState, paddockSideLength: value };
          renderOutputs();
        },
      ),
    );

    fieldsNode.append(
      createNumberField(
        {
          key: "movesPerDay",
          label: translatePhrase("Paddock Moves per Day"),
          min: 1,
          max: 24,
          step: 1,
          control: STOCK_FIELD_CONTROLS.movesPerDay,
        },
        activeState.movesPerDay,
        (value) => {
          if (mode === "single")
            singleState = { ...singleState, movesPerDay: value };
          else mixedState = { ...mixedState, movesPerDay: value };
          renderOutputs();
        },
      ),
    );

    if (mode === "single") {
      fieldsNode.append(
        createNumberField(
          {
            key: "numberOfHead",
            label: translatePhrase("Number of Head"),
            min: 0,
            max: 50000,
            step: 1,
            control: STOCK_FIELD_CONTROLS.numberOfHead,
          },
          singleState.numberOfHead,
          (value) => {
            singleState = { ...singleState, numberOfHead: value };
            renderOutputs();
          },
        ),
      );

      fieldsNode.append(
        createNumberField(
          {
            key: "averageWeight",
            label: translatePhrase("Average Weight"),
            min: 1,
            max: 5000,
            step: 1,
            control: STOCK_FIELD_CONTROLS.averageWeight,
            suffix: "lbs",
          },
          singleState.averageWeight,
          (value) => {
            singleState = { ...singleState, averageWeight: value };
            renderOutputs();
          },
        ),
      );

      fieldsNode.append(
        createSelectField({
          label: translatePhrase("Animal Class"),
          value: singleState.animalClass,
          options: Object.entries(ANIMAL_CLASSES).map(([value, details]) => ({
            value,
            label: translatePhrase(details.label),
          })),
          onChange: (value) => {
            singleState = { ...singleState, animalClass: value };
            renderOutputs();
          },
        }),
      );
    } else {
      const section = document.createElement("section");
      section.className = "category";

      const title = document.createElement("h3");
      title.textContent = translatePhrase("Animal Groups");
      section.append(title);

      Object.entries(ANIMAL_CLASSES).forEach(([animalClass, details]) => {
        section.append(
          createNumberField(
            {
              key: `${animalClass}-head`,
              label: `${translatePhrase(details.label)}: ${translatePhrase(
                "Number of Head",
              )}`,
              min: 0,
              max: 50000,
              step: 1,
            },
            mixedState.animals[animalClass].numberOfHead,
            (value) => {
              mixedState = {
                ...mixedState,
                animals: {
                  ...mixedState.animals,
                  [animalClass]: {
                    ...mixedState.animals[animalClass],
                    numberOfHead: value,
                  },
                },
              };
              renderOutputs();
            },
          ),
        );

        section.append(
          createNumberField(
            {
              key: `${animalClass}-weight`,
              label: `${translatePhrase(details.label)}: ${translatePhrase(
                "Average Weight",
              )}`,
              min: 1,
              max: 5000,
              step: 1,
              suffix: "lbs",
            },
            mixedState.animals[animalClass].averageWeight,
            (value) => {
              mixedState = {
                ...mixedState,
                animals: {
                  ...mixedState.animals,
                  [animalClass]: {
                    ...mixedState.animals[animalClass],
                    averageWeight: value,
                  },
                },
              };
              renderOutputs();
            },
          ),
        );
      });

      fieldsNode.append(section);
    }
  }

  function renderStockPanels(summaryTarget, result) {
    clearNode(summaryTarget);

    const panels = document.createElement("div");
    panels.className = "stock-panels";

    const heroCard = document.createElement("div");
    heroCard.className = "stock-hero-card";
    const heroLabel = document.createElement("p");
    heroLabel.className = "stock-hero-label";
    heroLabel.textContent = translatePhrase("Daily Paddock Size");
    const heroValue = document.createElement("p");
    heroValue.className = "stock-hero-value";
    heroValue.textContent = `${formatGroupedNumber(
      result.acresNeededPerDay,
      2,
    )} ${translatePhrase("acres")}`;
    const heroSub = document.createElement("p");
    heroSub.className = "stock-hero-sub";
    heroSub.textContent = `(${formatGroupedNumber(
      result.squareFeet,
      0,
    )} ${translatePhrase("sq ft")})`;
    heroCard.append(heroLabel, heroValue, heroSub);
    panels.append(heroCard);

    function addPanel(title, items) {
      const card = document.createElement("div");
      card.className = "stock-info-card";
      const heading = document.createElement("p");
      heading.className = "stock-info-heading";
      heading.textContent = title;
      card.append(heading);
      const grid = document.createElement("div");
      grid.className = "stock-info-grid";
      items.forEach(({ label, value }) => {
        const item = document.createElement("div");
        item.className = "stock-info-item";
        const itemLabel = document.createElement("p");
        itemLabel.className = "stock-info-item-label";
        itemLabel.textContent = label;
        const itemValue = document.createElement("p");
        itemValue.className = "stock-info-item-value";
        itemValue.textContent = value;
        item.append(itemLabel, itemValue);
        grid.append(item);
      });
      card.append(grid);
      panels.append(card);
    }

    addPanel(translatePhrase("Forage Analysis"), [
      {
        label: translatePhrase("Forage Available"),
        value: `${formatGroupedNumber(
          result.forageLbsPerAcre,
          0,
        )} ${translatePhrase("lbs/acre")}`,
      },
      {
        label: translatePhrase("Dry Matter Available"),
        value: `${formatGroupedNumber(
          result.dryMatterAvailable,
          0,
        )} ${translatePhrase("lbs/acre")}`,
      },
    ]);

    const dmNeededValue =
      result.dryMatterNeededPerDay != null
        ? result.dryMatterNeededPerDay
        : result.totalDryMatterNeeded;
    addPanel(translatePhrase("Herd Requirements"), [
      {
        label: translatePhrase("Daily Dry Matter Need"),
        value: `${formatGroupedNumber(dmNeededValue, 0)} ${translatePhrase(
          "lbs",
        )}`,
      },
      {
        label: translatePhrase("Stocking Density"),
        value: `${formatGroupedNumber(
          result.stockingDensityPerAcre,
          0,
        )} ${translatePhrase("lbs/acre")}`,
      },
    ]);

    const setSide =
      mode === "single"
        ? singleState.paddockSideLength
        : mixedState.paddockSideLength;
    const dimensionsCard = document.createElement("div");
    dimensionsCard.className = "stock-info-card";
    const dimensionsHeading = document.createElement("p");
    dimensionsHeading.className = "stock-info-heading";
    dimensionsHeading.textContent = translatePhrase("Paddock Dimensions");
    dimensionsCard.append(dimensionsHeading);

    const dimensionsRow = document.createElement("div");
    dimensionsRow.className = "stock-dimensions-row";

    const setBlock = document.createElement("div");
    setBlock.className = "stock-dimensions-block";
    const setValue = document.createElement("p");
    setValue.className = "stock-dimensions-value";
    setValue.textContent = formatGroupedNumber(setSide, 0);
    const setLabel = document.createElement("p");
    setLabel.className = "stock-dimensions-label";
    setLabel.textContent = translatePhrase("ft (set)");
    setBlock.append(setValue, setLabel);

    const separator = document.createElement("p");
    separator.className = "stock-dimensions-separator";
    separator.textContent = "×";

    const calcBlock = document.createElement("div");
    calcBlock.className = "stock-dimensions-block";
    const calcValue = document.createElement("p");
    calcValue.className = "stock-dimensions-value";
    calcValue.textContent = formatGroupedNumber(result.paddockWidth, 0);
    const calcLabel = document.createElement("p");
    calcLabel.className = "stock-dimensions-label";
    calcLabel.textContent = translatePhrase("ft (calculated)");
    calcBlock.append(calcValue, calcLabel);

    dimensionsRow.append(setBlock, separator, calcBlock);
    dimensionsCard.append(dimensionsRow);
    panels.append(dimensionsCard);

    summaryTarget.append(panels);
  }

  function renderOutputs() {
    if (mode === "single") {
      const result = computeStockSingle(singleState);
      renderStockPanels(summaryNode, result);
    } else {
      const result = computeStockMixed(mixedState);
      renderStockPanels(summaryNode, result);
    }
  }

  resetButton.addEventListener("click", () => {
    mode = "single";
    singleState = { ...STOCK_SINGLE_DEFAULTS };
    mixedState = cloneMixedDefaults();
    renderModeToggle();
    renderFields();
    renderOutputs();
  });

  onLanguageChange(() => {
    renderModeToggle();
    renderFields();
    renderOutputs();
  });

  renderModeToggle();
  renderFields();
  renderOutputs();
}

initLanguageControls();

const page = document.body.dataset.calculator;
if (page === "egg") {
  initEggPage();
} else if (page === "meat") {
  initMeatPage();
} else if (page === "stock") {
  initStockPage();
}
