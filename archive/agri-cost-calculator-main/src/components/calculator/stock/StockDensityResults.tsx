import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TreePine, Ruler, Scale, MoveHorizontal } from "lucide-react";

interface StockDensityResultsProps {
  forageLbsPerAcre: number;
  dryMatterNeededPerDay: number;
  dryMatterAvailable: number;
  acresNeededPerDay: number;
  squareFeet: number;
  paddockWidth: number;
  paddockSideLength: number;
  stockingDensityPerAcre: number;
  movesPerDay: number;
  paddockSizeWithMoves: number;
  stockingDensityWithMoves: number;
}

export function StockDensityResults({
  forageLbsPerAcre,
  dryMatterNeededPerDay,
  dryMatterAvailable,
  acresNeededPerDay,
  squareFeet,
  paddockWidth,
  paddockSideLength,
  stockingDensityPerAcre,
  movesPerDay,
  paddockSizeWithMoves,
  stockingDensityWithMoves,
}: StockDensityResultsProps) {
  return (
    <div className="space-y-4">
      {/* Primary Result */}
      <Card className="calculator-card bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-1">Daily Paddock Size</p>
          <p className="text-4xl font-bold text-primary">
            {acresNeededPerDay.toFixed(2)} <span className="text-lg font-normal">acres</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            ({squareFeet.toLocaleString(undefined, { maximumFractionDigits: 0 })} sq ft)
          </p>
        </div>
      </Card>

      {/* Forage Info */}
      <Card className="calculator-card">
        <div className="flex items-center gap-2 mb-3">
          <TreePine className="h-4 w-4 text-primary" />
          <p className="section-label mb-0">Forage Analysis</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Forage Available</p>
            <p className="text-lg font-semibold text-foreground">
              {forageLbsPerAcre.toLocaleString()} <span className="text-sm font-normal">lbs/acre</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Dry Matter Available</p>
            <p className="text-lg font-semibold text-foreground">
              {dryMatterAvailable.toLocaleString()} <span className="text-sm font-normal">lbs/acre</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Stock Requirements */}
      <Card className="calculator-card">
        <div className="flex items-center gap-2 mb-3">
          <Scale className="h-4 w-4 text-primary" />
          <p className="section-label mb-0">Herd Requirements</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Daily Dry Matter Need</p>
            <p className="text-lg font-semibold text-foreground">
              {dryMatterNeededPerDay.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal">lbs</span>
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Stocking Density</p>
            <p className="text-lg font-semibold text-foreground">
              {stockingDensityPerAcre.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal">lbs/acre</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Paddock Dimensions */}
      <Card className="calculator-card">
        <div className="flex items-center gap-2 mb-3">
          <Ruler className="h-4 w-4 text-primary" />
          <p className="section-label mb-0">Paddock Dimensions</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-4">
            <div>
              <p className="text-2xl font-bold text-foreground">{paddockSideLength}</p>
              <p className="text-xs text-muted-foreground">ft (set)</p>
            </div>
            <span className="text-muted-foreground">×</span>
            <div>
              <p className="text-2xl font-bold text-primary">{paddockWidth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="text-xs text-muted-foreground">ft (calculated)</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Multi-Move Calculations */}
      {movesPerDay !== 1 && (
        <Card className="calculator-card border-dashed">
          <div className="flex items-center gap-2 mb-3">
            <MoveHorizontal className="h-4 w-4 text-primary" />
            <p className="section-label mb-0">
              {movesPerDay > 1 ? `${movesPerDay}x Moves/Day` : `Move Every ${Math.round(1 / movesPerDay)} Days`}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Paddock Size</p>
              <p className="text-lg font-semibold text-foreground">
                {paddockSizeWithMoves.toFixed(2)} <span className="text-sm font-normal">acres</span>
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Stocking Density</p>
              <p className="text-lg font-semibold text-foreground">
                {stockingDensityWithMoves.toLocaleString(undefined, { maximumFractionDigits: 0 })} <span className="text-sm font-normal">lbs/acre</span>
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
