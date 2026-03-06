import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { RotateCcw, Beef, Users } from "lucide-react";
import { ForageInputs } from "./ForageInputs";
import { SingleClassInputsComponent } from "./SingleClassInputs";
import { MixedClassInputsComponent } from "./MixedClassInputs";
import { GrazingSettings } from "./GrazingSettings";
import { StockDensityResults } from "./StockDensityResults";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  CalculatorMode,
  SingleClassInputs,
  MixedClassInputs,
  AnimalClass,
  ForageDensity,
  DEFAULT_SINGLE_CLASS_INPUTS,
  DEFAULT_MIXED_CLASS_INPUTS,
  calculateForageLbsPerAcre,
  calculateSingleClassResults,
  calculateMixedClassResults,
} from "./stockDensitySchema";

export function StockDensityCalculator() {
  const [mode, setMode] = useState<CalculatorMode>("single");
  const [singleInputs, setSingleInputs] = useState<SingleClassInputs>(DEFAULT_SINGLE_CLASS_INPUTS);
  const [mixedInputs, setMixedInputs] = useState<MixedClassInputs>(DEFAULT_MIXED_CLASS_INPUTS);
  const { trackCalculatorReset, trackStockDensityModeChange } = useAnalytics();

  const updateSingleInput = <K extends keyof SingleClassInputs>(key: K, value: SingleClassInputs[K]) => {
    setSingleInputs((prev) => ({ ...prev, [key]: value }));
  };

  const updateMixedAnimal = (animalClass: AnimalClass, field: "numberOfHead" | "averageWeight", value: number) => {
    setMixedInputs((prev) => ({
      ...prev,
      animals: {
        ...prev.animals,
        [animalClass]: {
          ...prev.animals[animalClass],
          [field]: value,
        },
      },
    }));
  };

  const updateMixedInput = <K extends keyof MixedClassInputs>(key: K, value: MixedClassInputs[K]) => {
    setMixedInputs((prev) => ({ ...prev, [key]: value }));
  };

  const resetToDefaults = () => {
    if (mode === "single") {
      setSingleInputs(DEFAULT_SINGLE_CLASS_INPUTS);
    } else {
      setMixedInputs(DEFAULT_MIXED_CLASS_INPUTS);
    }
    trackCalculatorReset("stock_density");
  };

  const singleResults = useMemo(() => calculateSingleClassResults(singleInputs), [singleInputs]);
  const mixedResults = useMemo(() => calculateMixedClassResults(mixedInputs), [mixedInputs]);

  const currentForageLbs = mode === "single" 
    ? calculateForageLbsPerAcre(singleInputs.forageHeight, singleInputs.forageDensity)
    : calculateForageLbsPerAcre(mixedInputs.forageHeight, mixedInputs.forageDensity);

  return (
    <Tabs value={mode} onValueChange={(v) => {
      const newMode = v as CalculatorMode;
      setMode(newMode);
      trackStockDensityModeChange(newMode);
    }} className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <TabsList className="grid grid-cols-2 w-auto">
          <TabsTrigger value="single" className="flex items-center gap-2 px-4">
            <Beef className="h-4 w-4" />
            <span className="hidden sm:inline">Single Class</span>
          </TabsTrigger>
          <TabsTrigger value="mixed" className="flex items-center gap-2 px-4">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Mixed Herd</span>
          </TabsTrigger>
        </TabsList>
        <Button variant="outline" size="sm" onClick={resetToDefaults}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Inputs */}
        <div className="lg:col-span-2 lg:overflow-y-auto lg:pr-3 space-y-4 pb-8">
          <TabsContent value="single" className="mt-0 space-y-4">
            <ForageInputs
              forageHeight={singleInputs.forageHeight}
              forageDensity={singleInputs.forageDensity}
              forageLbsPerAcre={currentForageLbs}
              onHeightChange={(v) => updateSingleInput("forageHeight", v)}
              onDensityChange={(v) => updateSingleInput("forageDensity", v)}
            />
            <SingleClassInputsComponent
              inputs={singleInputs}
              onUpdate={updateSingleInput}
            />
            <GrazingSettings
              utilizationPercent={singleInputs.utilizationPercent}
              paddockSideLength={singleInputs.paddockSideLength}
              movesPerDay={singleInputs.movesPerDay}
              onUtilizationChange={(v) => updateSingleInput("utilizationPercent", v)}
              onPaddockSideChange={(v) => updateSingleInput("paddockSideLength", v)}
              onMovesChange={(v) => updateSingleInput("movesPerDay", v)}
            />
          </TabsContent>

          <TabsContent value="mixed" className="mt-0 space-y-4">
            <ForageInputs
              forageHeight={mixedInputs.forageHeight}
              forageDensity={mixedInputs.forageDensity}
              forageLbsPerAcre={currentForageLbs}
              onHeightChange={(v) => updateMixedInput("forageHeight", v)}
              onDensityChange={(v) => updateMixedInput("forageDensity", v as ForageDensity)}
            />
            <MixedClassInputsComponent
              inputs={mixedInputs}
              onUpdateAnimal={updateMixedAnimal}
              totalWeight={mixedResults.totalAnimalWeight}
              totalDryMatter={mixedResults.totalDryMatterNeeded}
            />
            <GrazingSettings
              utilizationPercent={mixedInputs.utilizationPercent}
              paddockSideLength={mixedInputs.paddockSideLength}
              movesPerDay={mixedInputs.movesPerDay}
              onUtilizationChange={(v) => updateMixedInput("utilizationPercent", v)}
              onPaddockSideChange={(v) => updateMixedInput("paddockSideLength", v)}
              onMovesChange={(v) => updateMixedInput("movesPerDay", v)}
            />
          </TabsContent>
        </div>

        {/* Right Column - Results */}
        <div className="lg:overflow-y-auto lg:pl-3 pb-8">
          {mode === "single" ? (
            <StockDensityResults
              forageLbsPerAcre={singleResults.forageLbsPerAcre}
              dryMatterNeededPerDay={singleResults.dryMatterNeededPerDay}
              dryMatterAvailable={singleResults.dryMatterAvailable}
              acresNeededPerDay={singleResults.acresNeededPerDay}
              squareFeet={singleResults.squareFeet}
              paddockWidth={singleResults.paddockWidth}
              paddockSideLength={singleInputs.paddockSideLength}
              stockingDensityPerAcre={singleResults.stockingDensityPerAcre}
              movesPerDay={singleInputs.movesPerDay}
              paddockSizeWithMoves={singleResults.paddockSizeWithMoves}
              stockingDensityWithMoves={singleResults.stockingDensityWithMoves}
            />
          ) : (
            <StockDensityResults
              forageLbsPerAcre={mixedResults.forageLbsPerAcre}
              dryMatterNeededPerDay={mixedResults.totalDryMatterNeeded}
              dryMatterAvailable={mixedResults.dryMatterAvailable}
              acresNeededPerDay={mixedResults.acresNeededPerDay}
              squareFeet={mixedResults.squareFeet}
              paddockWidth={mixedResults.paddockWidth}
              paddockSideLength={mixedInputs.paddockSideLength}
              stockingDensityPerAcre={mixedResults.stockingDensityPerAcre}
              movesPerDay={mixedInputs.movesPerDay}
              paddockSizeWithMoves={mixedResults.paddockSizeWithMoves}
              stockingDensityWithMoves={mixedResults.stockingDensityWithMoves}
            />
          )}
        </div>
      </div>
    </Tabs>
  );
}
