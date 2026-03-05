import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface MeatCostBreakdownProps {
  breakdown: {
    chickPurchase: number;
    brooding: number;
    feed: number;
    infrastructure: number;
    fieldLabor: number;
    processingSentOut: number;
    processingDIY: number;
    feedPickup: number;
  };
  mode: "sentOut" | "diy";
}

const COLORS = {
  chickPurchase: "hsl(158, 35%, 35%)",
  brooding: "hsl(280, 45%, 55%)",
  feed: "hsl(42, 85%, 55%)",
  infrastructure: "hsl(18, 75%, 55%)",
  fieldLabor: "hsl(195, 70%, 45%)",
  processing: "hsl(340, 65%, 50%)",
  feedPickup: "hsl(150, 15%, 65%)",
};

export function MeatCostBreakdown({ breakdown, mode }: MeatCostBreakdownProps) {
  const chartData = useMemo(() => {
    const processingCost = mode === "sentOut" ? breakdown.processingSentOut : breakdown.processingDIY;
    
    return [
      { name: "Chick", value: breakdown.chickPurchase, color: COLORS.chickPurchase },
      { name: "Brooding", value: breakdown.brooding, color: COLORS.brooding },
      { name: "Feed", value: breakdown.feed, color: COLORS.feed },
      { name: "Infrastructure", value: breakdown.infrastructure, color: COLORS.infrastructure },
      { name: "Field Labor", value: breakdown.fieldLabor, color: COLORS.fieldLabor },
      { name: "Processing", value: processingCost, color: COLORS.processing },
      { name: "Feed P/U", value: breakdown.feedPickup, color: COLORS.feedPickup },
    ].filter((item) => item.value > 0);
  }, [breakdown, mode]);

  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  const safeTotal = total > 0 ? total : 1; // Prevent division by zero

  return (
    <div className="space-y-4">
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} layout="vertical" margin={{ left: 0, right: 20 }}>
            <XAxis
              type="number"
              tickFormatter={(value) => `$${value.toFixed(2)}`}
              fontSize={12}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={80}
              fontSize={12}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => [`$${value.toFixed(2)}`, "Cost/Bird"]}
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-muted-foreground">{item.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-foreground font-medium">
                ${item.value.toFixed(2)}
              </span>
              <span className="text-muted-foreground w-12 text-right">
                {((item.value / safeTotal) * 100).toFixed(0)}%
              </span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between text-sm pt-2 border-t border-border font-semibold">
          <span>Total per Bird</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
