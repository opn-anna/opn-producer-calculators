import { useCallback } from "react";
import { posthog, isConfigured } from "@/lib/posthog";

type CalculatorType = "egg" | "meat" | "stock_density";
type BreakdownMode = "sentOut" | "diy";
type StockDensityMode = "single" | "mixed";

export function useAnalytics() {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, unknown>) => {
    if (isConfigured) {
      posthog.capture(eventName, properties);
    }
  }, []);

  const trackCalculatorReset = useCallback((calculatorType: CalculatorType) => {
    trackEvent("calculator_reset", {
      calculator_type: calculatorType,
    });
  }, [trackEvent]);

  const trackBreakdownToggle = useCallback((calculatorType: CalculatorType, isOpen: boolean) => {
    trackEvent("breakdown_toggled", {
      calculator_type: calculatorType,
      is_open: isOpen,
    });
  }, [trackEvent]);

  const trackProcessingModeSwitch = useCallback((mode: BreakdownMode) => {
    trackEvent("processing_mode_switched", {
      mode,
    });
  }, [trackEvent]);

  const trackStockDensityModeChange = useCallback((mode: StockDensityMode) => {
    trackEvent("stock_density_mode_changed", {
      mode,
    });
  }, [trackEvent]);

  const trackGrazingSettingsUpdate = useCallback((field: string, value: number) => {
    trackEvent("grazing_settings_updated", {
      field,
      value,
    });
  }, [trackEvent]);

  return {
    trackEvent,
    trackCalculatorReset,
    trackBreakdownToggle,
    trackProcessingModeSwitch,
    trackStockDensityModeChange,
    trackGrazingSettingsUpdate,
  };
}
