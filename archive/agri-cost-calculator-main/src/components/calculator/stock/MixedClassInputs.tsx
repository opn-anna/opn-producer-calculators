import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { AnimalClass, ANIMAL_CLASSES, MixedClassInputs as MixedClassInputsType } from "./stockDensitySchema";

interface MixedClassInputsComponentProps {
  inputs: MixedClassInputsType;
  onUpdateAnimal: (animalClass: AnimalClass, field: "numberOfHead" | "averageWeight", value: number) => void;
  totalWeight: number;
  totalDryMatter: number;
}

export function MixedClassInputsComponent({ 
  inputs, 
  onUpdateAnimal,
  totalWeight,
  totalDryMatter,
}: MixedClassInputsComponentProps) {
  return (
    <Card className="calculator-card">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-4 w-4 text-primary" />
        <p className="section-label mb-0">Mixed Herd</p>
      </div>

      <div className="space-y-4">
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground font-medium px-1">
          <div>Class</div>
          <div className="text-right">Head</div>
          <div className="text-right">Avg. Weight</div>
          <div className="text-right">Total</div>
        </div>

        {/* Animal Rows */}
        {Object.entries(ANIMAL_CLASSES).map(([key, { label, dryMatterPercent }]) => {
          const animalClass = key as AnimalClass;
          const animal = inputs.animals[animalClass];
          const totalClassWeight = animal.numberOfHead * animal.averageWeight;
          
          return (
            <div key={key} className="grid grid-cols-4 gap-2 items-center bg-muted/30 rounded-lg p-2">
              <div>
                <p className="text-sm font-medium text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{(dryMatterPercent * 100).toFixed(1)}% DM</p>
              </div>
              <Input
                type="number"
                value={animal.numberOfHead}
                onChange={(e) => onUpdateAnimal(animalClass, "numberOfHead", parseInt(e.target.value) || 0)}
                className="h-8 text-right bg-background border-border text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                min={0}
                max={500}
              />
              <Input
                type="number"
                value={animal.averageWeight}
                onChange={(e) => onUpdateAnimal(animalClass, "averageWeight", parseInt(e.target.value) || 0)}
                className="h-8 text-right bg-background border-border text-sm [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                min={0}
                max={2000}
              />
              <div className="text-right text-sm font-medium text-foreground">
                {totalClassWeight.toLocaleString()}
              </div>
            </div>
          );
        })}

        {/* Totals */}
        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Total Herd Weight</p>
            <p className="text-xl font-bold text-foreground">
              {totalWeight.toLocaleString()} <span className="text-sm font-normal">lbs</span>
            </p>
          </div>
          <div className="bg-primary/5 rounded-lg p-3 text-center">
            <p className="text-xs text-muted-foreground">Daily DM Need</p>
            <p className="text-xl font-bold text-primary">
              {totalDryMatter.toFixed(0)} <span className="text-sm font-normal">lbs</span>
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
