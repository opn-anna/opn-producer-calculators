import { Card } from "@/components/ui/card";
import { Egg } from "lucide-react";

interface ResultDisplayProps {
  pricePerDozen: number;
  costPerDozen: number;
  profitPerDozen: number;
  margin: number;
  dozenPerHenPerYear: number;
}

export function ResultDisplay({ 
  pricePerDozen, 
  costPerDozen, 
  profitPerDozen,
  margin,
  dozenPerHenPerYear 
}: ResultDisplayProps) {
  return (
    <Card className="result-display border-0">
      <div className="text-center">
        <p className="text-sm font-medium text-muted-foreground mb-1">Recommended Price</p>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-5xl sm:text-6xl font-bold text-foreground tracking-tight">
            ${pricePerDozen.toFixed(2)}
          </span>
        </div>
        <p className="text-muted-foreground">Per Dozen</p>
      </div>
      
      <div className="mt-6 pt-6 border-t border-border/50">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 mb-2">
              <Egg className="h-5 w-5 text-primary" />
            </div>
            <p className="text-lg font-semibold text-foreground">${costPerDozen.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Cost per Dozen</p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/20 mb-2">
              <span className="text-accent font-bold text-sm">{margin}%</span>
            </div>
            <p className="text-lg font-semibold text-foreground">${profitPerDozen.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">Gross Margin per Dozen</p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-2">
              <span className="text-muted-foreground font-bold text-sm">📊</span>
            </div>
            <p className="text-lg font-semibold text-foreground">{dozenPerHenPerYear.toFixed(1)}</p>
            <p className="text-xs text-muted-foreground">Dozen/Hen/Year</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
