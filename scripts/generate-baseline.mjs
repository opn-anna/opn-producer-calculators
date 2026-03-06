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
const baselinePath = path.resolve(__dirname, "../spec/baseline-outputs.json");

// Clone to prevent computeStockMixed from mutating the exported defaults.
const baseline = {
  egg: computeEggPricing(EGG_DEFAULTS),
  meat: computeMeatPricing(MEAT_DEFAULTS),
  stockSingle: computeStockSingle(STOCK_SINGLE_DEFAULTS),
  stockMixed: computeStockMixed(JSON.parse(JSON.stringify(STOCK_MIXED_DEFAULTS))),
};

fs.writeFileSync(baselinePath, JSON.stringify(baseline, null, 2) + "\n");
console.log(`Wrote ${baselinePath}`);
