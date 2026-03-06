import { CalculatorLayout } from "@/components/layout/CalculatorLayout";
import { StockDensityCalculator as StockDensityCalculatorComponent } from "@/components/calculator/stock/StockDensityCalculator";
import { TreePine } from "lucide-react";

export default function StockDensityCalculator() {
  return (
    <CalculatorLayout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="text-center py-8 px-4 sm:px-6 lg:px-8 lg:pb-4">
          <div className="max-w-6xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
              <TreePine className="h-5 w-5" />
              <span className="text-sm font-medium">Oregon Pasture Network</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Stock Density Calculator
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Calculate optimal stocking density for your pasture management. Measure forage height, enter your herd details, and get paddock sizing recommendations.
            </p>
          </div>
        </div>

        {/* Calculator with independent scrolling */}
        <div className="flex-1 min-h-0 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto h-full">
            <StockDensityCalculatorComponent />
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
