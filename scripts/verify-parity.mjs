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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const baselinePath = path.resolve(__dirname, "../spec/baseline-outputs.json");
const baseline = JSON.parse(fs.readFileSync(baselinePath, "utf8"));

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function compareValues(
  actual,
  expected,
  currentPath = "root",
  tolerance = 1e-9,
) {
  if (typeof expected === "number") {
    if (!Number.isFinite(actual) || Math.abs(actual - expected) > tolerance) {
      throw new Error(`${currentPath}: expected ${expected}, got ${actual}`);
    }
    return;
  }

  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) {
      throw new Error(`${currentPath}: expected array`);
    }
    if (actual.length !== expected.length) {
      throw new Error(
        `${currentPath}: expected length ${expected.length}, got ${actual.length}`,
      );
    }
    expected.forEach((expectedItem, index) => {
      compareValues(
        actual[index],
        expectedItem,
        `${currentPath}[${index}]`,
        tolerance,
      );
    });
    return;
  }

  if (expected && typeof expected === "object") {
    if (!actual || typeof actual !== "object") {
      throw new Error(`${currentPath}: expected object`);
    }
    const expectedKeys = Object.keys(expected);
    expectedKeys.forEach((key) => {
      compareValues(
        actual[key],
        expected[key],
        `${currentPath}.${key}`,
        tolerance,
      );
    });
    return;
  }

  if (actual !== expected) {
    throw new Error(`${currentPath}: expected ${expected}, got ${actual}`);
  }
}

const actual = {
  egg: computeEggPricing(EGG_DEFAULTS),
  meat: computeMeatPricing(MEAT_DEFAULTS),
  stockSingle: computeStockSingle(STOCK_SINGLE_DEFAULTS),
  stockMixed: computeStockMixed(clone(STOCK_MIXED_DEFAULTS)),
};

compareValues(actual, baseline);
console.log("Parity verification passed.");
