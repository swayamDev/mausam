import { Button } from "@/components/ui/button";
import { useUnitStore } from "@/store/useUnitStore";

export const UnitToggle = () => {
  const { unit, toggleUnit } = useUnitStore();

  return (
    <Button variant="outline" size="sm" onClick={toggleUnit}>
      {unit === "metric" ? "°C" : "°F"}
    </Button>
  );
};
