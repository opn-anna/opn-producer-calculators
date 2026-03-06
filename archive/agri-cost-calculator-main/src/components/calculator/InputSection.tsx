import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface InputDefinitionBase {
  label: string;
  default: number;
  min?: number;
  max?: number;
  step?: number;
  prefix?: string;
  suffix?: string;
}

interface InputSectionProps<T extends Record<string, number>> {
  title: string;
  inputs: Array<{ key: keyof T } & InputDefinitionBase>;
  values: T;
  onUpdate: (key: keyof T, value: number) => void;
  defaultOpen?: boolean;
}

export function InputSection<T extends Record<string, number>>({
  title,
  inputs,
  values,
  onUpdate,
  defaultOpen = true,
}: InputSectionProps<T>) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <Card className="calculator-card">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer group">
          <p className="section-label mb-0">{title}</p>
          <ChevronDown
            className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="space-y-5">
            {inputs.map((input) => (
              <div key={String(input.key)} className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="value-label">{input.label}</label>
                  <div className="flex items-center gap-1 bg-muted rounded-lg px-3 py-1.5">
                    {input.prefix && (
                      <span className="text-sm text-muted-foreground">{input.prefix}</span>
                    )}
                    <Input
                      type="number"
                      value={values[input.key]}
                      onChange={(e) => onUpdate(input.key, parseFloat(e.target.value) || 0)}
                      className="w-20 h-7 text-right border-0 bg-transparent p-0 text-sm font-semibold text-foreground focus-visible:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      step={input.step}
                      min={input.min}
                      max={input.max}
                    />
                    {input.suffix && (
                      <span className="text-sm text-muted-foreground">{input.suffix}</span>
                    )}
                  </div>
                </div>
                <Slider
                  value={[values[input.key] as number]}
                  onValueChange={(v) => onUpdate(input.key, v[0])}
                  min={input.min}
                  max={input.max}
                  step={input.step}
                  className="cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>
                    {input.prefix ?? ''}{input.min ?? ''}{input.suffix ?? ''}
                  </span>
                  <span>
                    {input.prefix ?? ''}{input.max ?? ''}{input.suffix ?? ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
