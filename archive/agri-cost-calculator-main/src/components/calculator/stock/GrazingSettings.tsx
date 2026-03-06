import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Settings, Ruler } from "lucide-react";

interface GrazingSettingsProps {
  utilizationPercent: number;
  paddockSideLength: number;
  movesPerDay: number;
  onUtilizationChange: (value: number) => void;
  onPaddockSideChange: (value: number) => void;
  onMovesChange: (value: number) => void;
}

export function GrazingSettings({
  utilizationPercent,
  paddockSideLength,
  movesPerDay,
  onUtilizationChange,
  onPaddockSideChange,
  onMovesChange,
}: GrazingSettingsProps) {
  const MOVE_OPTIONS = [
    { value: 1 / 7, label: "Every 7 days" },
    { value: 1 / 6, label: "Every 6 days" },
    { value: 1 / 5, label: "Every 5 days" },
    { value: 1 / 4, label: "Every 4 days" },
    { value: 1 / 3, label: "Every 3 days" },
    { value: 1 / 2, label: "Every other day" },
    { value: 1, label: "1x per day" },
    { value: 2, label: "2x per day" },
    { value: 3, label: "3x per day" },
    { value: 4, label: "4x per day" },
  ];

  const valueToIndex = (v: number) => {
    let closest = 0;
    let minDiff = Math.abs(v - MOVE_OPTIONS[0].value);
    for (let i = 1; i < MOVE_OPTIONS.length; i++) {
      const diff = Math.abs(v - MOVE_OPTIONS[i].value);
      if (diff < minDiff) { minDiff = diff; closest = i; }
    }
    return closest;
  };

  const moveIndex = valueToIndex(movesPerDay);
  const moveLabel = MOVE_OPTIONS[moveIndex].label;

  return (
    <div className="space-y-4">
      {/* Utilization */}
      <Card className="calculator-card">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-4 w-4 text-primary" />
          <p className="section-label mb-0">Grazing Settings</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="value-label">Forage Utilization Goal</label>
              <div className="flex items-center gap-1 bg-muted rounded-lg px-3 py-1.5">
                <Input
                  type="number"
                  value={utilizationPercent}
                  onChange={(e) => onUtilizationChange(parseInt(e.target.value) || 0)}
                  className="w-12 h-7 text-right border-0 bg-transparent p-0 text-sm font-semibold text-foreground focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  step={5}
                  min={20}
                  max={80}
                />
                <span className="text-sm text-muted-foreground">%</span>
              </div>
            </div>
            <Slider
              value={[utilizationPercent]}
              onValueChange={(v) => onUtilizationChange(v[0])}
              min={20}
              max={80}
              step={5}
              className="cursor-pointer"
            />
            <p className="text-xs text-muted-foreground text-center">
              "Eat half, leave half" = 50%
            </p>
          </div>
        </div>
      </Card>

      {/* Paddock Dimensions */}
      <Card className="calculator-card">
        <div className="flex items-center gap-2 mb-4">
          <Ruler className="h-4 w-4 text-primary" />
          <p className="section-label mb-0">Paddock Layout</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="value-label">Paddock Side Length</label>
              <div className="flex items-center gap-1 bg-muted rounded-lg px-3 py-1.5">
              <Input
                  type="number"
                  value={paddockSideLength}
                  onChange={(e) => {
                    const parsed = parseInt(e.target.value) || 0;
                    const clamped = Math.max(10, Math.min(500, parsed));
                    onPaddockSideChange(clamped);
                  }}
                  className="w-16 h-7 text-right border-0 bg-transparent p-0 text-sm font-semibold text-foreground focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  step={1}
                  min={10}
                  max={500}
                />
                <span className="text-sm text-muted-foreground">ft</span>
              </div>
            </div>
            <Slider
              value={[paddockSideLength]}
              onValueChange={(v) => onPaddockSideChange(v[0])}
              min={10}
              max={500}
              step={1}
              className="cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="value-label">Paddock Moves per Day</label>
              <span className="text-sm font-medium text-primary">
                {moveLabel}
              </span>
            </div>
            <Slider
              value={[moveIndex]}
              onValueChange={(v) => onMovesChange(MOVE_OPTIONS[v[0]].value)}
              min={0}
              max={MOVE_OPTIONS.length - 1}
              step={1}
              className="cursor-pointer"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Every 7 days</span>
              <span>4x/day</span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
