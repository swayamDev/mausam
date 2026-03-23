import { Button } from "@/components/ui/button";
import { useUnitStore } from "@/store/useUnitStore";

export const UnitToggle = () => {
  const { unit, toggleUnit } = useUnitStore();

  const isMetric = unit === "metric";

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleUnit}
      aria-label={isMetric ? "Switch to Fahrenheit (°F)" : "Switch to Celsius (°C)"}
      title={isMetric ? "Switch to Fahrenheit" : "Switch to Celsius"}
    >
      <span aria-hidden="true">{isMetric ? "°C" : "°F"}</span>
    </Button>
  );
};
