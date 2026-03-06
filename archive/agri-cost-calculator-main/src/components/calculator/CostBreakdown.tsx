import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface CostBreakdownProps {
  breakdown: {
    brooding: number;
    feed: number;
    infrastructure: number;
    labor: number;
    distribution: number;
    feedPickup: number;
    cartons: number;
    stewHenCredit: number;
  };
}

const COLORS = [
  "hsl(280, 45%, 55%)", // Brooding - purple
  "hsl(158, 35%, 35%)", // Feed - forest green
  "hsl(18, 75%, 55%)",  // Infrastructure - terracotta
  "hsl(42, 85%, 55%)",  // Labor - golden
  "hsl(195, 70%, 45%)", // Distribution - teal blue
  "hsl(150, 25%, 55%)", // Feed Pickup - sage
  "hsl(35, 50%, 50%)",  // Cartons - brown
];

export function CostBreakdown({ breakdown }: CostBreakdownProps) {
  const data = useMemo(() => {
    const items = [
      { name: "Brooding & Chicks", value: breakdown.brooding, color: COLORS[0] },
      { name: "Feed", value: breakdown.feed, color: COLORS[1] },
      { name: "Infrastructure", value: breakdown.infrastructure, color: COLORS[2] },
      { name: "Labor", value: breakdown.labor, color: COLORS[3] },
      { name: "Distribution", value: breakdown.distribution, color: COLORS[4] },
      { name: "Feed Pickup", value: breakdown.feedPickup, color: COLORS[5] },
      { name: "Cartons", value: breakdown.cartons, color: COLORS[6] },
    ].filter(item => item.value > 0);
    
    return items;
  }, [breakdown]);

  const totalCost = useMemo(() => 
    data.reduce((sum, item) => sum + item.value, 0) - breakdown.stewHenCredit,
    [data, breakdown.stewHenCredit]
  );

  return (
    <div className="space-y-4">
      <div className="relative h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`$${value.toFixed(2)}`, '']}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: 'var(--shadow-soft)',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Total Cost</p>
            <p className="text-xl font-bold text-foreground">${totalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs text-muted-foreground truncate">{item.name}</span>
            <span className="text-xs font-medium text-foreground ml-auto">${item.value.toFixed(2)}</span>
          </div>
        ))}
        {breakdown.stewHenCredit > 0 && (
          <div className="flex items-center gap-2 col-span-2 pt-2 border-t border-border mt-1">
            <div className="w-3 h-3 rounded-full bg-primary/30 shrink-0" />
            <span className="text-xs text-muted-foreground">Stew Hen Credit</span>
            <span className="text-xs font-medium text-primary ml-auto">-${breakdown.stewHenCredit.toFixed(2)}</span>
          </div>
        )}
      </div>
    </div>
  );
}
