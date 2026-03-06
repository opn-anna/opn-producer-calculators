import { Card } from "@/components/ui/card";

interface MeatResultDisplayProps {
  pricePerPoundSentOut: number;
  pricePerPoundDIY: number;
  costPerPoundSentOut: number;
  costPerPoundDIY: number;
  margin: number;
  totalCostPerBirdSentOut: number;
  totalCostPerBirdDIY: number;
  averageWeight: number;
}

export function MeatResultDisplay({
  pricePerPoundSentOut,
  pricePerPoundDIY,
  costPerPoundSentOut,
  costPerPoundDIY,
  margin,
  totalCostPerBirdSentOut,
  totalCostPerBirdDIY,
  averageWeight,
}: MeatResultDisplayProps) {
  return (
    <Card className="calculator-card">
      <p className="section-label">Recommended Price per Pound</p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Sent Out Pricing */}
        <div className="bg-secondary/50 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-muted-foreground mb-1">Sent Out Processing</p>
          <p className="text-3xl sm:text-4xl font-bold text-primary">
            ${pricePerPoundSentOut.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">per pound</p>
        </div>
        
        {/* DIY Pricing */}
        <div className="bg-secondary/50 rounded-xl p-4 text-center">
          <p className="text-xs font-medium text-muted-foreground mb-1">DIY Processing</p>
          <p className="text-3xl sm:text-4xl font-bold text-primary">
            ${pricePerPoundDIY.toFixed(2)}
          </p>
          <p className="text-sm text-muted-foreground mt-1">per pound</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Sent Out</p>
          <div className="flex justify-between items-center">
            <span className="value-label">Cost per Bird</span>
            <span className="value-display">${totalCostPerBirdSentOut.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="value-label">Cost per Pound</span>
            <span className="value-display">${costPerPoundSentOut.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="value-label">Gross Margin per Pound</span>
            <span className="value-display text-primary">
              ${(pricePerPoundSentOut - costPerPoundSentOut).toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">DIY</p>
          <div className="flex justify-between items-center">
            <span className="value-label">Cost per Bird</span>
            <span className="value-display">${totalCostPerBirdDIY.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="value-label">Cost per Pound</span>
            <span className="value-display">${costPerPoundDIY.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="value-label">Gross Margin per Pound</span>
            <span className="value-display text-primary">
              ${(pricePerPoundDIY - costPerPoundDIY).toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border grid grid-cols-2 gap-4 text-center">
        <div>
          <span className="value-label">Gross Margin</span>
          <span className="value-display ml-2">{margin}%</span>
        </div>
        <div>
          <span className="value-label">Avg. Weight</span>
          <span className="value-display ml-2">{averageWeight} lbs</span>
        </div>
      </div>
    </Card>
  );
}
