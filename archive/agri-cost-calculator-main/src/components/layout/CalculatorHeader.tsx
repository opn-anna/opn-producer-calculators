import { Link, useLocation } from "react-router-dom";
import { Egg, Beef, TreePine } from "lucide-react";
import { cn } from "@/lib/utils";

const calculators = [
  {
    path: "/",
    label: "Egg Price",
    icon: Egg,
  },
  {
    path: "/meat-price",
    label: "Meat Price",
    icon: Beef,
  },
  {
    path: "/stock-density",
    label: "Stock Density",
    icon: TreePine,
  },
];

export function CalculatorHeader() {
  const location = useLocation();

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg">
              <TreePine className="h-5 w-5 text-primary" />
            </div>
            <span className="font-semibold text-foreground hidden sm:block">
              Oregon Pasture Network
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {calculators.map((calc) => {
              const isActive = location.pathname === calc.path;
              const Icon = calc.icon;

              return (
                <Link
                  key={calc.path}
                  to={calc.path}
                  aria-label={calc.label}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{calc.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
