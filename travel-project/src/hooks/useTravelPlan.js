import { useState, useEffect } from "react";
import PlanTest from "../data/PlanTest.json";

export const useTravelPlan = (locationId, transportType, travelRange) => {
  const [planData, setPlanData] = useState([]);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    const location = PlanTest.locations.find((loc) => loc.id === locationId);
    if (!location) return;

    setLocationName(location.name);

    const slicedSchedules = location.travel_plan
      ?.find((plan) => plan.transportation === transportType)
      ?.dailySchedules?.slice(0, travelRange);

    if (slicedSchedules) {
      setPlanData(slicedSchedules);
    }
  }, [locationId, transportType, travelRange]);

  return { planData, locationName };
};