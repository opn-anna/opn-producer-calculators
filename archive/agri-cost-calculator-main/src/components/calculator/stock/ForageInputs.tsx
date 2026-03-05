import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TreePine } from "lucide-react";
import { ForageDensity, FORAGE_DENSITY_OPTIONS } from "./stockDensitySchema";

interface ForageInputsProps {
  forageHeight: number;
  forageDensity: ForageDensity;
  forageLbsPerAcre: number;
  onHeightChange: (value: number) => void;
  onDensityChange: (value: ForageDensity) => void;
}

export function ForageInputs({
  forageHeight,
  forageDensity,
  forageLbsPerAcre,
  onHeightChange,
  onDensityChange,
}: ForageInputsProps) {
  return (
    <Card className="calculator-card">
      <div className="flex items-center gap-2 mb-4">
        <TreePine className="h-4 w-4 text-primary" />
        <p className="section-label mb-0">Forage Calculator</p>
      </div>

      <div className="space-y-5">
        {/* Height input */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="value-label">Average Forage Height</label>
            <div className="flex items-center gap-1 bg-muted rounded-lg px-3 py-1.5">
              <Input
                type="number"
                value={forageHeight}
                onChange={(e) => onHeightChange(parseFloat(e.target.value) || 0)}
                className="w-16 h-7 text-right border-0 bg-transparent p-0 text-sm font-semibold text-foreground focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                step={1}
                min={1}
                max={36}
              />
              <span className="text-sm text-muted-foreground">inches</span>
            </div>
          </div>
          <Slider
            value={[forageHeight]}
            onValueChange={(v) => onHeightChange(v[0])}
            min={1}
            max={36}
            step={1}
            className="cursor-pointer"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1"</span>
            <span>36"</span>
          </div>
        </div>

        {/* Density selector */}
        <div className="space-y-2">
          <label className="value-label">Ground Coverage Density</label>
          <Select
            value={String(forageDensity)}
            onValueChange={(v) => onDensityChange(Number(v) as ForageDensity)}
          >
            <SelectTrigger className="bg-muted border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(FORAGE_DENSITY_OPTIONS).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Result */}
        <div className="bg-primary/5 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Forage Available</p>
          <p className="text-xl font-bold text-primary">
            {forageLbsPerAcre.toLocaleString()} <span className="text-sm font-normal">lbs/acre</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
