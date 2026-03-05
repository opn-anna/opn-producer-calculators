# opn-producer-calculators

This repository contains source-controlled static pages for three producer calculators:

- Egg price calculator: `/` and `/egg-price/`
- Egg price calculator: `/egg-price/`
- Meat chicken price calculator: `/meat-price/`
- Stock density calculator: `/stock-density/`

## Repository layout

- `index.html`: egg calculator entrypoint served at `/`
- `egg-price/index.html`: egg calculator alias entrypoint served at `/egg-price/`
- `meat-price/index.html`, `stock-density/index.html`: per-calculator entrypoints
- `src/app.mjs`: shared UI wiring, form rendering, and output rendering
- `src/calculators.mjs`: calculator defaults, input schema, and formula functions
- `scripts/verify-parity.mjs`: parity check against baseline outputs
- `spec/baseline-outputs.json`: expected outputs for default inputs
- `assets/`: original bundled artifacts kept for reference only

## Run locally

Run from the repository root:

```sh
python3 -m http.server 4173 --directory .
```

Then open:

- http://127.0.0.1:4173/
- http://127.0.0.1:4173/egg-price/
- http://127.0.0.1:4173/meat-price/
- http://127.0.0.1:4173/stock-density/

## Developer workflow

1. Update formulas, defaults, or field definitions in `src/calculators.mjs`.
2. Update labels and rendering logic in `src/app.mjs` and any affected page entrypoint.
3. Run parity verification.
4. If formula output changes are intentional, update `spec/baseline-outputs.json` in the same commit and rerun parity.
5. Run pre-commit checks before committing.

## Verification commands

```sh
node scripts/verify-parity.mjs
```

## Pre-commit setup

Create a virtual environment and install pre-commit:

```sh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install pre-commit
pre-commit install
```

Run all hooks manually:

```sh
pre-commit run --all-files
```
