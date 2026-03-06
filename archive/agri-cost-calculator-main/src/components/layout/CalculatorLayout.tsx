import { ReactNode } from "react";
import { CalculatorHeader } from "./CalculatorHeader";
import { FeedbackButton } from "@/components/FeedbackButton";

interface CalculatorLayoutProps {
  children: ReactNode;
}

export function CalculatorLayout({ children }: CalculatorLayoutProps) {
  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden lg:overflow-hidden overflow-y-auto">
      <CalculatorHeader />
      <main className="flex-1 min-h-0">{children}</main>
      <FeedbackButton />
    </div>
  );
}
