import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Beef } from "lucide-react";
import { AnimalClass, ANIMAL_CLASSES, SingleClassInputs as SingleClassInputsType } from "./stockDensitySchema";

interface SingleClassInputsComponentProps {
  inputs: SingleClassInputsType;
  onUpdate: <K extends keyof SingleClassInputsType>(key: K, value: SingleClassInputsType[K]) => void;
}

export function SingleClassInputsComponent({ inputs, onUpdate }: SingleClassInputsComponentProps) {
  return (
    <Card className="calculator-card">
      <div className="flex items-center gap-2 mb-4">
        <Beef className="h-4 w-4 text-primary" />
        <p className="section-label mb-0">Stock Density</p>
      </div>

      <div className="space-y-5">
        {/* Animal Class */}
        <div className="space-y-2">
          <label className="value-label">Animal Class</label>
          <Select
            value={inputs.animalClass}
            onValueChange={(v) => onUpdate("animalClass", v as AnimalClass)}
          >
            <SelectTrigger className="bg-muted border-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(ANIMAL_CLASSES).map(([key, { label, dryMatterPercent }]) => (
                <SelectItem key={key} value={key}>
                  {label} ({(dryMatterPercent * 100).toFixed(1)}% DM)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Number of Head */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="value-label">Number of Head</label>
            <div className="flex items-center gap-1 bg-muted rounded-lg px-3 py-1.5">
              <Input
                type="number"
                value={inputs.numberOfHead}
                onChange={(e) => {
                  const parsed = parseInt(e.target.value) || 0;
                  const clamped = Math.max(1, Math.min(500, parsed));
                  onUpdate("numberOfHead", clamped);
                }}
                className="w-16 h-7 text-right border-0 bg-transparent p-0 text-sm font-semibold text-foreground focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                step={1}
                min={1}
                max={500}
              />
              <span className="text-sm text-muted-foreground">head</span>
            </div>
          </div>
          <Slider
            value={[inputs.numberOfHead]}
            onValueChange={(v) => onUpdate("numberOfHead", v[0])}
            min={1}
            max={500}
            step={1}
            className="cursor-pointer"
          />
        </div>

        {/* Average Weight */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="value-label">Average Weight</label>
            <div className="flex items-center gap-1 bg-muted rounded-lg px-3 py-1.5">
              <Input
                type="number"
                value={inputs.averageWeight}
                onChange={(e) => {
                  const parsed = parseInt(e.target.value) || 0;
                  const clamped = Math.max(50, Math.min(2000, parsed));
                  onUpdate("averageWeight", clamped);
                }}
                className="w-20 h-7 text-right border-0 bg-transparent p-0 text-sm font-semibold text-foreground focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                step={50}
                min={50}
                max={2000}
              />
              <span className="text-sm text-muted-foreground">lbs</span>
            </div>
          </div>
          <Slider
            value={[inputs.averageWeight]}
            onValueChange={(v) => onUpdate("averageWeight", v[0])}
            min={50}
            max={2000}
            step={50}
            className="cursor-pointer"
          />
        </div>

        {/* Total Weight Display */}
        <div className="bg-muted/50 rounded-lg p-3 text-center">
          <p className="text-xs text-muted-foreground">Total Herd Weight</p>
          <p className="text-xl font-bold text-foreground">
            {(inputs.numberOfHead * inputs.averageWeight).toLocaleString()} <span className="text-sm font-normal">lbs</span>
          </p>
        </div>
      </div>
    </Card>
  );
}
