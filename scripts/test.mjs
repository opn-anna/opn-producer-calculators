import { describe, test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  EGG_DEFAULTS,
  MEAT_DEFAULTS,
  STOCK_SINGLE_DEFAULTS,
  STOCK_MIXED_DEFAULTS,
  computeEggPricing,
  computeMeatPricing,
  computeStockSingle,
  computeStockMixed,
} from "../src/calculators.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseline = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "../spec/baseline-outputs.json"),
    "utf8",
  ),
);

const TOLERANCE = 1e-9;

/** Assert two numbers are equal within floating-point tolerance. */
function near(actual, expected, label) {
  assert.ok(
    Number.isFinite(actual) && Math.abs(actual - expected) <= TOLERANCE,
    `${label}: expected ${expected}, got ${actual}`,
  );
}

/** Assert no NaN or Infinity anywhere in an output object/array/number. */
function noNaN(value, label = "value") {
  if (typeof value === "number") {
    assert.ok(Number.isFinite(value), `${label}: expected finite, got ${value}`);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => noNaN(v, `${label}[${i}]`));
    return;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([k, v]) => noNaN(v, `${label}.${k}`));
  }
}

/** Recursively compare actual output against expected, tolerating fp rounding. */
function matchBaseline(actual, expected, label = "root") {
  if (typeof expected === "number") {
    near(actual, expected, label);
    return;
  }
  if (Array.isArray(expected)) {
    assert.strictEqual(actual.length, expected.length, `${label}.length`);
    expected.forEach((v, i) => matchBaseline(actual[i], v, `${label}[${i}]`));
    return;
  }
  if (expected && typeof expected === "object") {
    Object.keys(expected).forEach((k) =>
      matchBaseline(actual[k], expected[k], `${label}.${k}`),
    );
  }
}

function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

// ─── Suite 1: Parity at defaults ─────────────────────────────────────────────

describe("parity at defaults", () => {
  test("egg pricing matches baseline", () => {
    matchBaseline(computeEggPricing(EGG_DEFAULTS), baseline.egg, "egg");
  });

  test("meat pricing matches baseline", () => {
    matchBaseline(computeMeatPricing(MEAT_DEFAULTS), baseline.meat, "meat");
  });

  test("stock single matches baseline", () => {
    matchBaseline(
      computeStockSingle(STOCK_SINGLE_DEFAULTS),
      baseline.stockSingle,
      "stockSingle",
    );
  });

  test("stock mixed matches baseline", () => {
    matchBaseline(
      computeStockMixed(clone(STOCK_MIXED_DEFAULTS)),
      baseline.stockMixed,
      "stockMixed",
    );
  });

  test("computeStockMixed does not mutate input", () => {
    const input = clone(STOCK_MIXED_DEFAULTS);
    computeStockMixed(input);
    assert.deepStrictEqual(input, clone(STOCK_MIXED_DEFAULTS));
  });
});

// ─── Suite 2: Off-default inputs ─────────────────────────────────────────────

describe("off-default inputs", () => {
  test("meat feed cost is annualFeedCost / birdsFinished, not a function of chicksCount", () => {
    // Previously computed as annualFeedCost * chicksCount / birdsFinished².
    // With chicksCount=500 and birdsFinished=200 the bug gives $51.25 instead of $20.50.
    const chicksCount = 500;
    const birdsFinished = 200;
    const r = computeMeatPricing({ ...MEAT_DEFAULTS, chicksCount, birdsFinished });
    near(
      r.costBreakdown.feed,
      MEAT_DEFAULTS.annualFeedCost / birdsFinished,
      "feed per bird",
    );
  });

  test("egg yearsToKeepHen=1: totalEggsPerHen equals layRateYear1", () => {
    const r = computeEggPricing({ ...EGG_DEFAULTS, yearsToKeepHen: 1 });
    near(r.totalEggsPerHen, EGG_DEFAULTS.layRateYear1, "totalEggsPerHen");
    near(
      r.averageDozenPerHenPerYear,
      EGG_DEFAULTS.layRateYear1 / 12,
      "averageDozenPerHenPerYear",
    );
  });

  test("stock single movesPerDay=2: paddockSizeWithMoves is half acresNeededPerDay", () => {
    const r = computeStockSingle({ ...STOCK_SINGLE_DEFAULTS, movesPerDay: 2 });
    near(
      r.paddockSizeWithMoves,
      r.acresNeededPerDay / 2,
      "paddockSizeWithMoves",
    );
  });

  test("stock mixed all-zero head counts: output is finite throughout", () => {
    const input = clone(STOCK_MIXED_DEFAULTS);
    Object.keys(input.animals).forEach((k) => {
      input.animals[k].numberOfHead = 0;
    });
    noNaN(computeStockMixed(input), "stockMixed(zero animals)");
  });
});

// ─── Suite 3: Identity / property tests ──────────────────────────────────────

describe("identity and property tests", () => {
  test("egg desiredMargin=0: pricePerDozen equals costPerDozen", () => {
    const r = computeEggPricing({ ...EGG_DEFAULTS, desiredMargin: 0 });
    near(r.pricePerDozen, r.costPerDozen, "pricePerDozen");
  });

  test("egg profitPerDozen equals pricePerDozen minus costPerDozen", () => {
    const r = computeEggPricing(EGG_DEFAULTS);
    near(
      r.profitPerDozen,
      r.pricePerDozen - r.costPerDozen,
      "profitPerDozen",
    );
  });

  test("meat desiredMargin=0: price per pound equals cost per pound", () => {
    const r = computeMeatPricing({ ...MEAT_DEFAULTS, desiredMargin: 0 });
    near(r.pricePerPoundSentOut, r.costPerPoundSentOut, "sent-out price");
    near(r.pricePerPoundDIY, r.costPerPoundDIY, "DIY price");
  });

  test("meat cost delta between sent-out and DIY equals processing cost delta", () => {
    const r = computeMeatPricing(MEAT_DEFAULTS);
    near(
      r.totalCostPerBirdSentOut - r.totalCostPerBirdDIY,
      r.costBreakdown.processingSentOut - r.costBreakdown.processingDIY,
      "cost delta",
    );
  });

  test("stock single squareFeet equals acresNeededPerDay * 43560", () => {
    const r = computeStockSingle(STOCK_SINGLE_DEFAULTS);
    near(r.squareFeet, r.acresNeededPerDay * 43560, "squareFeet");
  });

  test("stock mixed squareFeet equals acresNeededPerDay * 43560", () => {
    const r = computeStockMixed(clone(STOCK_MIXED_DEFAULTS));
    near(r.squareFeet, r.acresNeededPerDay * 43560, "squareFeet");
  });
});

// ─── Suite 4: Zero-guard tests ────────────────────────────────────────────────

describe("zero-guard tests", () => {
  test("stock single movesPerDay=0: paddockSizeWithMoves and stockingDensityWithMoves are 0", () => {
    const r = computeStockSingle({ ...STOCK_SINGLE_DEFAULTS, movesPerDay: 0 });
    assert.strictEqual(r.paddockSizeWithMoves, 0);
    assert.strictEqual(r.stockingDensityWithMoves, 0);
  });

  test("stock single utilizationPercent=0: dryMatterAvailable, acresNeededPerDay, squareFeet are 0", () => {
    const r = computeStockSingle({
      ...STOCK_SINGLE_DEFAULTS,
      utilizationPercent: 0,
    });
    assert.strictEqual(r.dryMatterAvailable, 0);
    assert.strictEqual(r.acresNeededPerDay, 0);
    assert.strictEqual(r.squareFeet, 0);
  });

  test("stock mixed utilizationPercent=0: acresNeededPerDay and squareFeet are 0", () => {
    const r = computeStockMixed({
      ...clone(STOCK_MIXED_DEFAULTS),
      utilizationPercent: 0,
    });
    assert.strictEqual(r.acresNeededPerDay, 0);
    assert.strictEqual(r.squareFeet, 0);
  });

  test("stock single at extreme zeros: no NaN or Infinity in output", () => {
    const r = computeStockSingle({
      ...STOCK_SINGLE_DEFAULTS,
      movesPerDay: 0,
      utilizationPercent: 0,
    });
    noNaN(r, "stockSingle(zero guards)");
  });
});
