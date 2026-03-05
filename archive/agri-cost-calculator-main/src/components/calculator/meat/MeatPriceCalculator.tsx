import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Beef, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InputSection } from "../InputSection";
import { MeatResultDisplay } from "./MeatResultDisplay";
import { MeatCostBreakdown } from "./MeatCostBreakdown";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  type MeatCalculatorInputs,
  MEAT_DEFAULT_INPUTS,
  getMeatInputsByCategory,
  MEAT_CATEGORY_ORDER,
  MEAT_CATEGORY_TITLES,
} from "./meatCalculatorSchema";

export function MeatPriceCalculator() {
  const [inputs, setInputs] = useState<MeatCalculatorInputs>(MEAT_DEFAULT_INPUTS);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [breakdownMode, setBreakdownMode] = useState<"sentOut" | "diy">("sentOut");
  const { trackCalculatorReset, trackBreakdownToggle, trackProcessingModeSwitch } = useAnalytics();

  const inputsByCategory = useMemo(() => getMeatInputsByCategory(), []);

  const updateInput = (key: keyof MeatCalculatorInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const calculations = useMemo(() => {
    // Safe divisors to prevent division by zero
    const safeChicksCount = Math.max(1, inputs.chicksCount);
    const safeMortalityDenominator = Math.max(0.01, 1 - inputs.chickMortalityRate / 100);
    const safeBirdsFinished = Math.max(1, inputs.birdsFinished);
    const safeProcessingBirds = Math.max(1, inputs.processingBirdsProcessed);
    const safeDiyEquipmentLifespan = Math.max(1, inputs.diyEquipmentLifespan);
    const safeDiyBirdsPerYear = Math.max(1, inputs.diyBirdsPerYear);
    const safeDiyBirdsPerDay = Math.max(1, inputs.diyBirdsPerDay);
    const safeAverageWeight = Math.max(0.1, inputs.averageWeight);
    const safeMarginDenominator = Math.max(0.01, 1 - inputs.desiredMargin / 100);
    const safeTractorLifespan = Math.max(1, inputs.tractorLifespanYears);
    const safeBirdsPerTractorPerBatch = Math.max(1, inputs.birdsPerTractorPerBatch);
    const safeBatchesPerYear = Math.max(1, inputs.batchesPerYearPerTractor);

    // Chick cost per bird adjusted for mortality
    const chickCostPerBird =
      inputs.chicksTotalCost / safeChicksCount / safeMortalityDenominator;

    // Brooding costs per bird
    const beddingCost =
      (inputs.beddingCostPerUnit * inputs.beddingUnitsPerBatch) / safeChicksCount;
    const broodingLaborCost =
      (inputs.broodingHoursPerDay * inputs.broodingDays * inputs.laborRate) / safeChicksCount;
    const totalBroodingCost = beddingCost + broodingLaborCost;

    // Feed cost per bird (annual method)
    const feedCostPerBird = inputs.annualFeedCost / safeBirdsFinished;

    // Infrastructure cost per bird
    const annualTractorCost =
      inputs.tractorMaterialsCost / safeTractorLifespan + inputs.annualRepairCost;
    const birdsPerTractorPerYear = safeBirdsPerTractorPerBatch * safeBatchesPerYear;
    const infrastructureCostPerBird = annualTractorCost / birdsPerTractorPerYear;

    // Field labor cost per bird
    const fieldLaborCostPerBird =
      (inputs.daysInField * inputs.fieldHoursPerDay * inputs.laborRate) / safeChicksCount;

    // Processing - Sent Out (per bird)
    const processingTravelLabor = inputs.processingTravelTime * inputs.laborRate;
    const processingTravelMileage = inputs.processingMileage * inputs.irsMileageRate;
    const processingSentOutCostPerBird =
      (inputs.processingTotalCost + processingTravelLabor + processingTravelMileage) /
      safeProcessingBirds;

    // Processing - DIY (per bird)
    const diyEquipmentCostPerBird =
      inputs.diyEquipmentCost / safeDiyEquipmentLifespan / safeDiyBirdsPerYear;
    const diyLaborCostPerBird =
      (inputs.diyCrewSize * inputs.diyHoursPerPerson * inputs.laborRate) / safeDiyBirdsPerDay;
    const diySuppliesCostPerBird =
      inputs.diyPackagingCost +
      inputs.diyLabelCost +
      inputs.diyPropaneCost / safeDiyBirdsPerDay;
    const processingDIYCostPerBird =
      diyEquipmentCostPerBird + diyLaborCostPerBird + diySuppliesCostPerBird;

    // Feed pickup cost per bird
    const feedPickupLaborCost =
      inputs.feedPickupTravelTime * inputs.feedPickupTripsPerBatch * inputs.laborRate;
    const feedPickupMileageCost =
      inputs.feedPickupMiles * inputs.feedPickupTripsPerBatch * inputs.irsMileageRate;
    const feedPickupCostPerBird = (feedPickupLaborCost + feedPickupMileageCost) / safeChicksCount;

    // Total cost per bird
    const baseCostPerBird =
      chickCostPerBird +
      totalBroodingCost +
      feedCostPerBird +
      infrastructureCostPerBird +
      fieldLaborCostPerBird +
      feedPickupCostPerBird;

    const totalCostPerBirdSentOut = baseCostPerBird + processingSentOutCostPerBird;
    const totalCostPerBirdDIY = baseCostPerBird + processingDIYCostPerBird;

    // Cost per pound
    const costPerPoundSentOut = totalCostPerBirdSentOut / safeAverageWeight;
    const costPerPoundDIY = totalCostPerBirdDIY / safeAverageWeight;

    // Price with margin
    const pricePerPoundSentOut = costPerPoundSentOut / safeMarginDenominator;
    const pricePerPoundDIY = costPerPoundDIY / safeMarginDenominator;

    // Cost breakdown for chart
    const costBreakdown = {
      chickPurchase: chickCostPerBird,
      brooding: totalBroodingCost,
      feed: feedCostPerBird,
      infrastructure: infrastructureCostPerBird,
      fieldLabor: fieldLaborCostPerBird,
      processingSentOut: processingSentOutCostPerBird,
      processingDIY: processingDIYCostPerBird,
      feedPickup: feedPickupCostPerBird,
    };

    return {
      pricePerPoundSentOut,
      pricePerPoundDIY,
      costPerPoundSentOut,
      costPerPoundDIY,
      totalCostPerBirdSentOut,
      totalCostPerBirdDIY,
      costBreakdown,
    };
  }, [inputs]);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="text-center py-8 px-4 sm:px-6 lg:px-8 lg:pb-4">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Beef className="h-5 w-5" />
            <span className="text-sm font-medium">Oregon Pasture Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Meat Chicken Price Calculator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Calculate the true cost of production to ensure sustainable pricing for your
            pasture-raised meat chickens
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
                  setInputs(MEAT_DEFAULT_INPUTS);
                  trackCalculatorReset("meat");
                }}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>

            {MEAT_CATEGORY_ORDER.map((category) => (
              <InputSection
                key={category}
                title={MEAT_CATEGORY_TITLES[category]}
                inputs={inputsByCategory[category]}
                values={inputs}
                onUpdate={updateInput}
                defaultOpen={false}
              />
            ))}
          </div>

          {/* Right Column - Results */}
          <div className="lg:overflow-y-auto lg:pl-3 space-y-4 pb-8">
            <MeatResultDisplay
              pricePerPoundSentOut={calculations.pricePerPoundSentOut}
              pricePerPoundDIY={calculations.pricePerPoundDIY}
              costPerPoundSentOut={calculations.costPerPoundSentOut}
              costPerPoundDIY={calculations.costPerPoundDIY}
              margin={inputs.desiredMargin}
              totalCostPerBirdSentOut={calculations.totalCostPerBirdSentOut}
              totalCostPerBirdDIY={calculations.totalCostPerBirdDIY}
              averageWeight={inputs.averageWeight}
            />

            <Card className="calculator-card">
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-0 h-auto hover:bg-transparent"
                onClick={() => {
                  const newState = !showBreakdown;
                  setShowBreakdown(newState);
                  trackBreakdownToggle("meat", newState);
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
                  <Tabs
                    value={breakdownMode}
                    onValueChange={(v) => {
                      const mode = v as "sentOut" | "diy";
                      setBreakdownMode(mode);
                      trackProcessingModeSwitch(mode);
                    }}
                    className="mb-4"
                  >
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="sentOut">Sent Out</TabsTrigger>
                      <TabsTrigger value="diy">DIY</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <MeatCostBreakdown
                    breakdown={calculations.costBreakdown}
                    mode={breakdownMode}
                  />
                </div>
              )}
            </Card>

            <Card className="calculator-card">
              <p className="section-label">Production Summary</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="value-label">Birds Finished (Annual)</span>
                  <span className="value-display">{inputs.birdsFinished}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="value-label">Avg. Dressed Weight</span>
                  <span className="value-display">{inputs.averageWeight} lbs</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="value-label">Total Meat (Annual)</span>
                  <span className="value-display">
                    {(inputs.birdsFinished * inputs.averageWeight).toLocaleString()} lbs
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
