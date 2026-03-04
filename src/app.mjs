import {
  EGG_FIELDS,
  MEAT_FIELDS,
  EGG_DEFAULTS,
  MEAT_DEFAULTS,
  FORAGE_DENSITY_LEVELS,
  ANIMAL_CLASSES,
  STOCK_SINGLE_DEFAULTS,
  STOCK_MIXED_DEFAULTS,
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

function formatMoney(value) {
  return `$${formatNumber(value, 2)}`;
}

function formatPercent(value) {
  return `${formatNumber(value * 100, 2)}%`;
}

function clearNode(node) {
  node.innerHTML = "";
}

function renderSummary(node, metrics) {
  clearNode(node);
  const grid = document.createElement("div");
  grid.className = "summary-grid";

  metrics.forEach((metric) => {
    const card = document.createElement("article");
    card.className = "metric";

    const label = document.createElement("p");
    label.className = "metric-label";
    label.textContent = metric.label;

    const value = document.createElement("p");
    value.className = "metric-value";
    value.textContent = metric.value;

    card.append(label, value);
    grid.append(card);
  });

  node.append(grid);
}

function renderTable(node, columns, rows) {
  clearNode(node);
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");

  columns.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column.label;
    headRow.append(th);
  });
  thead.append(headRow);
  table.append(thead);

  const tbody = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    columns.forEach((column) => {
      const td = document.createElement("td");
      td.textContent = row[column.key];
      tr.append(td);
    });
    tbody.append(tr);
  });
  table.append(tbody);

  node.append(table);
}

function createNumberField(field, currentValue, onChange) {
  const row = document.createElement("div");
  row.className = "field";
  const fieldId = createFieldId(field.key ?? "input");

  const label = document.createElement("label");
  label.htmlFor = fieldId;
  label.textContent = field.label;

  const control = document.createElement("div");
  control.className = "field-control";

  if (field.prefix) {
    const prefix = document.createElement("span");
    prefix.className = "affix";
    prefix.textContent = field.prefix;
    control.append(prefix);
  }

  const input = document.createElement("input");
  input.id = fieldId;
  input.name = field.key;
  input.type = "number";
  input.inputMode = "decimal";
  input.min = String(field.min);
  input.max = String(field.max);
  input.step = String(field.step);
  input.value = String(currentValue);
  input.addEventListener("input", () => {
    const parsed = Number.parseFloat(input.value);
    onChange(Number.isFinite(parsed) ? parsed : 0);
  });
  control.append(input);

  if (field.suffix) {
    const suffix = document.createElement("span");
    suffix.className = "affix";
    suffix.textContent = translatePhrase(field.suffix);
    control.append(suffix);
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

function renderGroupedFields(node, fields, state, onUpdate) {
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

    const title = document.createElement("h3");
    title.textContent = translatePhrase(
      CATEGORY_TITLES[category] ?? humanizeKey(category),
    );
    section.append(title);

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
      section.append(row);
    });

    node.append(section);
  });
}

function initEggPage() {
  const fieldsNode = document.getElementById("fields");
  const summaryNode = document.getElementById("summary");
  const breakdownNode = document.getElementById("breakdown");
  const resetButton = document.getElementById("reset-defaults");

  let state = { ...EGG_DEFAULTS };

  function updateOutputs() {
    const result = computeEggPricing(state);
    renderSummary(summaryNode, [
      {
        label: translatePhrase("Recommended Price / Dozen"),
        value: formatMoney(result.pricePerDozen),
      },
      {
        label: translatePhrase("Cost / Dozen"),
        value: formatMoney(result.costPerDozen),
      },
      {
        label: translatePhrase("Profit / Dozen"),
        value: formatMoney(result.profitPerDozen),
      },
      {
        label: translatePhrase("Average Dozen / Hen / Year"),
        value: formatNumber(result.averageDozenPerHenPerYear, 2),
      },
      {
        label: translatePhrase("Total Eggs / Hen"),
        value: formatNumber(result.totalEggsPerHen, 0),
      },
      {
        label: translatePhrase("Annual Revenue / Hen"),
        value: formatMoney(
          result.pricePerDozen * result.averageDozenPerHenPerYear,
        ),
      },
    ]);

    const rows = Object.entries(result.costBreakdown).map(([key, value]) => ({
      component: translatePhrase(humanizeKey(key)),
      amount: formatMoney(value),
    }));

    renderTable(
      breakdownNode,
      [
        { key: "component", label: translatePhrase("Component") },
        { key: "amount", label: translatePhrase("Amount") },
      ],
      rows,
    );
  }

  function updateField(key, value) {
    state = { ...state, [key]: value };
    updateOutputs();
  }

  function buildForm() {
    renderGroupedFields(fieldsNode, EGG_FIELDS, state, updateField);
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
  const resetButton = document.getElementById("reset-defaults");

  let state = { ...MEAT_DEFAULTS };

  function updateOutputs() {
    const result = computeMeatPricing(state);
    renderSummary(summaryNode, [
      {
        label: translatePhrase("Recommended Price / lb (Sent Out)"),
        value: formatMoney(result.pricePerPoundSentOut),
      },
      {
        label: translatePhrase("Recommended Price / lb (DIY)"),
        value: formatMoney(result.pricePerPoundDIY),
      },
      {
        label: translatePhrase("Cost / lb (Sent Out)"),
        value: formatMoney(result.costPerPoundSentOut),
      },
      {
        label: translatePhrase("Cost / lb (DIY)"),
        value: formatMoney(result.costPerPoundDIY),
      },
      {
        label: translatePhrase("Total Cost / Bird (Sent Out)"),
        value: formatMoney(result.totalCostPerBirdSentOut),
      },
      {
        label: translatePhrase("Total Cost / Bird (DIY)"),
        value: formatMoney(result.totalCostPerBirdDIY),
      },
    ]);

    const rows = Object.entries(result.costBreakdown).map(([key, value]) => ({
      component: translatePhrase(humanizeKey(key)),
      amount: formatMoney(value),
    }));

    renderTable(
      breakdownNode,
      [
        { key: "component", label: translatePhrase("Component") },
        { key: "amount", label: translatePhrase("Amount") },
      ],
      rows,
    );
  }

  function updateField(key, value) {
    state = { ...state, [key]: value };
    updateOutputs();
  }

  function buildForm() {
    renderGroupedFields(fieldsNode, MEAT_FIELDS, state, updateField);
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
  const resetButton = document.getElementById("reset-defaults");

  let mode = "single";
  let singleState = { ...STOCK_SINGLE_DEFAULTS };
  let mixedState = cloneMixedDefaults();

  function renderModeToggle() {
    clearNode(modeNode);
    const group = document.createElement("div");
    group.className = "radio-group";

    const modes = [
      { value: "single", label: translatePhrase("Single Class") },
      { value: "mixed", label: translatePhrase("Mixed Herd") },
    ];

    modes.forEach((option) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = "stock-mode";
      input.value = option.value;
      input.checked = option.value === mode;
      input.addEventListener("change", () => {
        mode = option.value;
        renderFields();
        renderOutputs();
      });
      label.append(input, document.createTextNode(option.label));
      group.append(label);
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

  function renderOutputs() {
    if (mode === "single") {
      const result = computeStockSingle(singleState);
      renderSummary(summaryNode, [
        {
          label: translatePhrase("Forage (lbs/acre)"),
          value: formatNumber(result.forageLbsPerAcre, 2),
        },
        {
          label: translatePhrase("Total Animal Weight (lbs)"),
          value: formatNumber(result.totalAnimalWeight, 2),
        },
        {
          label: translatePhrase("Dry Matter %"),
          value: formatPercent(result.dryMatterPercent),
        },
        {
          label: translatePhrase("Dry Matter Needed / Day"),
          value: formatNumber(result.dryMatterNeededPerDay, 2),
        },
        {
          label: translatePhrase("Dry Matter Available"),
          value: formatNumber(result.dryMatterAvailable, 2),
        },
        {
          label: translatePhrase("Acres Needed / Day"),
          value: formatNumber(result.acresNeededPerDay, 4),
        },
        {
          label: translatePhrase("Square Feet"),
          value: formatNumber(result.squareFeet, 2),
        },
        {
          label: translatePhrase("Paddock Width"),
          value: formatNumber(result.paddockWidth, 2),
        },
        {
          label: translatePhrase("Stocking Density / Acre"),
          value: formatNumber(result.stockingDensityPerAcre, 2),
        },
        {
          label: translatePhrase("Paddock Size with Moves"),
          value: formatNumber(result.paddockSizeWithMoves, 4),
        },
        {
          label: translatePhrase("Stocking Density with Moves"),
          value: formatNumber(result.stockingDensityWithMoves, 2),
        },
      ]);

      clearNode(breakdownNode);
      const note = document.createElement("p");
      note.textContent = translatePhrase(
        "Single class mode does not include an animal breakdown table.",
      );
      breakdownNode.append(note);
    } else {
      const result = computeStockMixed(mixedState);
      renderSummary(summaryNode, [
        {
          label: translatePhrase("Forage (lbs/acre)"),
          value: formatNumber(result.forageLbsPerAcre, 2),
        },
        {
          label: translatePhrase("Total Animal Weight (lbs)"),
          value: formatNumber(result.totalAnimalWeight, 2),
        },
        {
          label: translatePhrase("Weighted Dry Matter %"),
          value: formatPercent(result.weightedDryMatterPercent),
        },
        {
          label: translatePhrase("Total Dry Matter Needed / Day"),
          value: formatNumber(result.totalDryMatterNeeded, 2),
        },
        {
          label: translatePhrase("Dry Matter Available"),
          value: formatNumber(result.dryMatterAvailable, 2),
        },
        {
          label: translatePhrase("Acres Needed / Day"),
          value: formatNumber(result.acresNeededPerDay, 4),
        },
        {
          label: translatePhrase("Square Feet"),
          value: formatNumber(result.squareFeet, 2),
        },
        {
          label: translatePhrase("Paddock Width"),
          value: formatNumber(result.paddockWidth, 2),
        },
        {
          label: translatePhrase("Stocking Density / Acre"),
          value: formatNumber(result.stockingDensityPerAcre, 2),
        },
        {
          label: translatePhrase("Paddock Size with Moves"),
          value: formatNumber(result.paddockSizeWithMoves, 4),
        },
        {
          label: translatePhrase("Stocking Density with Moves"),
          value: formatNumber(result.stockingDensityWithMoves, 2),
        },
      ]);

      renderTable(
        breakdownNode,
        [
          { key: "label", label: translatePhrase("Class") },
          { key: "numberOfHead", label: translatePhrase("Head") },
          { key: "averageWeight", label: translatePhrase("Avg Weight") },
          { key: "totalWeight", label: translatePhrase("Total Weight") },
          { key: "dryMatterPercent", label: translatePhrase("Dry Matter %") },
          {
            key: "dryMatterNeeded",
            label: translatePhrase("Dry Matter Needed"),
          },
        ],
        result.animalBreakdown.map((row) => ({
          label: translatePhrase(row.label),
          numberOfHead: formatNumber(row.numberOfHead, 0),
          averageWeight: formatNumber(row.averageWeight, 0),
          totalWeight: formatNumber(row.totalWeight, 2),
          dryMatterPercent: formatPercent(row.dryMatterPercent),
          dryMatterNeeded: formatNumber(row.dryMatterNeeded, 2),
        })),
      );
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
