import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Egg, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { InputSection } from "./InputSection";
import { ResultDisplay } from "./ResultDisplay";
import { CostBreakdown } from "./CostBreakdown";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  type CalculatorInputs,
  DEFAULT_INPUTS,
  getInputsByCategory,
  CATEGORY_ORDER,
  CATEGORY_TITLES,
} from "./calculatorSchema";

export function EggPriceCalculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(DEFAULT_INPUTS);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const { trackCalculatorReset, trackBreakdownToggle } = useAnalytics();

  const inputsByCategory = useMemo(() => getInputsByCategory(), []);

  const updateInput = (key: keyof CalculatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const calculations = useMemo(() => {
    // Chick cost adjusted for mortality
    const safeMortalityDenominator = Math.max(0.01, 1 - inputs.chickMortalityRate / 100);
    const safeChicksCount = Math.max(1, inputs.chicksCount);
    const chickCostPerBird = inputs.chicksCost / safeChicksCount / safeMortalityDenominator;

    // Brooding costs per chick (simplified - removed heat lamp and bedding for egg layers)
    const broodingLaborCost =
      (inputs.broodingHoursPerDay * 126 * inputs.laborRate) / safeChicksCount;
    const starterFeedCostPerChick = 8.51; // From spreadsheet calculation
    const totalBroodingCost = broodingLaborCost + starterFeedCostPerChick;

    // Annual feed cost per bird
    const feedPricePerOunce = inputs.feedPricePerUnit / inputs.feedUnitSize / 16;
    const annualFeedCost = inputs.feedConsumedPerDay * 365 * feedPricePerOunce;

    // Infrastructure cost per bird per year
    const infrastructureCost =
      (inputs.buildingMaterialsCost / inputs.yearsOfLife + inputs.annualRepairs) / inputs.flockSize;

    // Labor cost per bird per year
    const annualLaborCost =
      (inputs.layingLaborHoursPerDay * 365 * inputs.laborRate) / inputs.flockSize;

    // Distribution cost per bird per year
    const mileageCost = inputs.milesPerDelivery * inputs.deliveriesPerYear * inputs.costPerMile;
    const deliveryLaborCost =
      inputs.laborHoursPerDelivery * inputs.deliveriesPerYear * inputs.laborRate;
    const distributionCost = (mileageCost + deliveryLaborCost) / inputs.flockSize;

    // Feed pickup cost per bird per year
    const feedPickupLabor =
      inputs.feedPickupHoursPerTrip * inputs.feedPickupTripsPerYear * inputs.laborRate;
    const feedPickupMileage =
      inputs.feedPickupMileage * inputs.feedPickupTripsPerYear * inputs.costPerMile;
    const feedPickupCost = (feedPickupLabor + feedPickupMileage) / inputs.flockSize;

    // Calculate eggs per year based on years keeping hens
    let totalEggsPerHen = 0;
    for (let year = 1; year <= inputs.yearsToKeepHen; year++) {
      const declineRate = 1 - (year - 1) * 0.2;
      totalEggsPerHen += inputs.layRateYear1 * declineRate;
    }
    const averageDozenPerHenPerYear = totalEggsPerHen / inputs.yearsToKeepHen / 12;

    // Stew hen credit per year
    const stewHenCredit = inputs.stewHenNetValue / inputs.yearsToKeepHen;

    // Total cost per bird per year (with brooding amortized)
    const broodingAmortized = (chickCostPerBird + totalBroodingCost) / inputs.yearsToKeepHen;
    const totalCostPerBirdPerYear =
      broodingAmortized +
      annualFeedCost +
      infrastructureCost +
      annualLaborCost +
      distributionCost +
      feedPickupCost -
      stewHenCredit;

    // Cost per dozen
    const costPerDozen = totalCostPerBirdPerYear / averageDozenPerHenPerYear;

    // Carton cost per dozen
    const cartonCostPerDozen = inputs.eggCartonCost;

    // Total cost per dozen including cartons
    const totalCostPerDozen = costPerDozen + cartonCostPerDozen;

    // Price with margin
    const pricePerDozen = totalCostPerDozen / (1 - inputs.desiredMargin / 100);

    // Cost breakdown for chart
    const costBreakdown = {
      brooding: broodingAmortized / averageDozenPerHenPerYear,
      feed: annualFeedCost / averageDozenPerHenPerYear,
      infrastructure: infrastructureCost / averageDozenPerHenPerYear,
      labor: annualLaborCost / averageDozenPerHenPerYear,
      distribution: distributionCost / averageDozenPerHenPerYear,
      feedPickup: feedPickupCost / averageDozenPerHenPerYear,
      cartons: cartonCostPerDozen,
      stewHenCredit: stewHenCredit / averageDozenPerHenPerYear,
    };

    return {
      pricePerDozen,
      costPerDozen: totalCostPerDozen,
      profitPerDozen: pricePerDozen - totalCostPerDozen,
      averageDozenPerHenPerYear,
      totalEggsPerHen,
      costBreakdown,
    };
  }, [inputs]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center py-8 px-4 sm:px-6 lg:px-8 lg:pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Egg className="h-5 w-5" />
            <span className="text-sm font-medium">Oregon Pasture Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Egg Price Calculator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate the true cost of production to ensure sustainable pricing for your
            pasture-raised eggs
          </p>
        </div>
      </div>

      {/* Two-column split with independent scrolling on desktop */}
      <div className="flex-1 min-h-0 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto h-full grid lg:grid-cols-2 gap-6">
          {/* Left Column - Inputs */}
          <div className="lg:overflow-y-auto lg:pr-3 space-y-4 pb-8">
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setInputs(DEFAULT_INPUTS);
                  trackCalculatorReset("egg");
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>

            {CATEGORY_ORDER.map((category) => (
              <InputSection
                key={category}
                title={CATEGORY_TITLES[category]}
                inputs={inputsByCategory[category]}
                values={inputs}
                onUpdate={updateInput}
                defaultOpen={false}
              />
            ))}
          </div>

          {/* Right Column - Results */}
          <div className="lg:overflow-y-auto lg:pl-3 space-y-4 pb-8">
            <ResultDisplay
              pricePerDozen={calculations.pricePerDozen}
              costPerDozen={calculations.costPerDozen}
              profitPerDozen={calculations.profitPerDozen}
              margin={inputs.desiredMargin}
              dozenPerHenPerYear={calculations.averageDozenPerHenPerYear}
            />

            <Card className="calculator-card">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent"
                onClick={() => {
                  const newState = !showBreakdown;
                  setShowBreakdown(newState);
                  trackBreakdownToggle("egg", newState);
                }}
              >
                <span className="section-label mb-0">Cost Breakdown</span>
                {showBreakdown ? (
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>

              {showBreakdown && (
                <div className="mt-4">
                  <CostBreakdown breakdown={calculations.costBreakdown} />
                </div>
              )}
            </Card>

            <Card className="calculator-card">
              <p className="section-label">Production Summary</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="value-label">Average Dozen per Hen per Year</span>
                  <span className="value-display">
                    {calculations.averageDozenPerHenPerYear.toFixed(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="value-label">
                    Total Eggs per Hen ({inputs.yearsToKeepHen} years)
                  </span>
                  <span className="value-display">{Math.round(calculations.totalEggsPerHen)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="value-label">Annual Revenue per Hen</span>
                  <span className="value-display">
                    $
                    {(
                      calculations.pricePerDozen * calculations.averageDozenPerHenPerYear
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
