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

  const label = document.createElement("label");
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
  input.type = "number";
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
    suffix.textContent = field.suffix;
    control.append(suffix);
  }

  row.append(label, control);
  return row;
}

function createSelectField({ label, options, value, onChange }) {
  const row = document.createElement("div");
  row.className = "field";

  const labelNode = document.createElement("label");
  labelNode.textContent = label;

  const control = document.createElement("div");
  control.className = "field-control";
  const select = document.createElement("select");
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
    title.textContent = CATEGORY_TITLES[category] ?? category;
    section.append(title);

    categoryFields.forEach((field) => {
      const row = createNumberField(field, state[field.key], (value) =>
        onUpdate(field.key, value),
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
        label: "Recommended Price / Dozen",
        value: formatMoney(result.pricePerDozen),
      },
      { label: "Cost / Dozen", value: formatMoney(result.costPerDozen) },
      { label: "Profit / Dozen", value: formatMoney(result.profitPerDozen) },
      {
        label: "Average Dozen / Hen / Year",
        value: formatNumber(result.averageDozenPerHenPerYear, 2),
      },
      {
        label: "Total Eggs / Hen",
        value: formatNumber(result.totalEggsPerHen, 0),
      },
      {
        label: "Annual Revenue / Hen",
        value: formatMoney(
          result.pricePerDozen * result.averageDozenPerHenPerYear,
        ),
      },
    ]);

    const rows = Object.entries(result.costBreakdown).map(([key, value]) => ({
      component: key,
      amount: formatMoney(value),
    }));

    renderTable(
      breakdownNode,
      [
        { key: "component", label: "Component" },
        { key: "amount", label: "Amount" },
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
        label: "Recommended Price / lb (Sent Out)",
        value: formatMoney(result.pricePerPoundSentOut),
      },
      {
        label: "Recommended Price / lb (DIY)",
        value: formatMoney(result.pricePerPoundDIY),
      },
      {
        label: "Cost / lb (Sent Out)",
        value: formatMoney(result.costPerPoundSentOut),
      },
      { label: "Cost / lb (DIY)", value: formatMoney(result.costPerPoundDIY) },
      {
        label: "Total Cost / Bird (Sent Out)",
        value: formatMoney(result.totalCostPerBirdSentOut),
      },
      {
        label: "Total Cost / Bird (DIY)",
        value: formatMoney(result.totalCostPerBirdDIY),
      },
    ]);

    const rows = Object.entries(result.costBreakdown).map(([key, value]) => ({
      component: key,
      amount: formatMoney(value),
    }));

    renderTable(
      breakdownNode,
      [
        { key: "component", label: "Component" },
        { key: "amount", label: "Amount" },
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
      { value: "single", label: "Single Class" },
      { value: "mixed", label: "Mixed Herd" },
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
          label: "Average Forage Height",
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
        label: "Ground Coverage Density",
        value: activeState.forageDensity,
        options: Object.entries(FORAGE_DENSITY_LEVELS).map(
          ([value, config]) => ({ value, label: config.label }),
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
          label: "Forage Utilization Goal",
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
          label: "Paddock Side Length",
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
          label: "Paddock Moves per Day",
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
            label: "Number of Head",
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
            label: "Average Weight",
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
          label: "Animal Class",
          value: singleState.animalClass,
          options: Object.entries(ANIMAL_CLASSES).map(([value, details]) => ({
            value,
            label: details.label,
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
      title.textContent = "Animal Groups";
      section.append(title);

      Object.entries(ANIMAL_CLASSES).forEach(([animalClass, details]) => {
        section.append(
          createNumberField(
            {
              key: `${animalClass}-head`,
              label: `${details.label}: Number of Head`,
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
              label: `${details.label}: Average Weight`,
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
          label: "Forage (lbs/acre)",
          value: formatNumber(result.forageLbsPerAcre, 2),
        },
        {
          label: "Total Animal Weight (lbs)",
          value: formatNumber(result.totalAnimalWeight, 2),
        },
        {
          label: "Dry Matter %",
          value: formatPercent(result.dryMatterPercent),
        },
        {
          label: "Dry Matter Needed / Day",
          value: formatNumber(result.dryMatterNeededPerDay, 2),
        },
        {
          label: "Dry Matter Available",
          value: formatNumber(result.dryMatterAvailable, 2),
        },
        {
          label: "Acres Needed / Day",
          value: formatNumber(result.acresNeededPerDay, 4),
        },
        { label: "Square Feet", value: formatNumber(result.squareFeet, 2) },
        { label: "Paddock Width", value: formatNumber(result.paddockWidth, 2) },
        {
          label: "Stocking Density / Acre",
          value: formatNumber(result.stockingDensityPerAcre, 2),
        },
        {
          label: "Paddock Size with Moves",
          value: formatNumber(result.paddockSizeWithMoves, 4),
        },
        {
          label: "Stocking Density with Moves",
          value: formatNumber(result.stockingDensityWithMoves, 2),
        },
      ]);

      clearNode(breakdownNode);
      const note = document.createElement("p");
      note.textContent =
        "Single class mode does not include an animal breakdown table.";
      breakdownNode.append(note);
    } else {
      const result = computeStockMixed(mixedState);
      renderSummary(summaryNode, [
        {
          label: "Forage (lbs/acre)",
          value: formatNumber(result.forageLbsPerAcre, 2),
        },
        {
          label: "Total Animal Weight (lbs)",
          value: formatNumber(result.totalAnimalWeight, 2),
        },
        {
          label: "Weighted Dry Matter %",
          value: formatPercent(result.weightedDryMatterPercent),
        },
        {
          label: "Total Dry Matter Needed / Day",
          value: formatNumber(result.totalDryMatterNeeded, 2),
        },
        {
          label: "Dry Matter Available",
          value: formatNumber(result.dryMatterAvailable, 2),
        },
        {
          label: "Acres Needed / Day",
          value: formatNumber(result.acresNeededPerDay, 4),
        },
        { label: "Square Feet", value: formatNumber(result.squareFeet, 2) },
        { label: "Paddock Width", value: formatNumber(result.paddockWidth, 2) },
        {
          label: "Stocking Density / Acre",
          value: formatNumber(result.stockingDensityPerAcre, 2),
        },
        {
          label: "Paddock Size with Moves",
          value: formatNumber(result.paddockSizeWithMoves, 4),
        },
        {
          label: "Stocking Density with Moves",
          value: formatNumber(result.stockingDensityWithMoves, 2),
        },
      ]);

      renderTable(
        breakdownNode,
        [
          { key: "label", label: "Class" },
          { key: "numberOfHead", label: "Head" },
          { key: "averageWeight", label: "Avg Weight" },
          { key: "totalWeight", label: "Total Weight" },
          { key: "dryMatterPercent", label: "Dry Matter %" },
          { key: "dryMatterNeeded", label: "Dry Matter Needed" },
        ],
        result.animalBreakdown.map((row) => ({
          label: row.label,
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

  renderModeToggle();
  renderFields();
  renderOutputs();
}

const page = document.body.dataset.calculator;
if (page === "egg") {
  initEggPage();
} else if (page === "meat") {
  initMeatPage();
} else if (page === "stock") {
  initStockPage();
}
