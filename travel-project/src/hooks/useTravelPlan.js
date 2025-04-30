import { useState, useEffect } from "react";
import PlanTest from "../data/PlanTest.json";

export const useTravelPlan = (locationId, transportType, travelRange) => {
  const [planData, setPlanData] = useState([]);
  const [locationName, setLocationName] = useState("");

  useEffect(() => {
    // 전체 여행지 리스트 중에서 해당 ID에 맞는 여행지 데이터 찾기
    const location = PlanTest.locations.find((loc) => loc.id === locationId);
    if (!location) return;

    // 여행지 이름을 상태로 저장
    setLocationName(location.name);

    // 해당 교통수단에 맞는 travel_plan을 찾고, 그 안의 일정을 travelRange만큼 자르기
    const slicedSchedules = location.travel_plan
      ?.find((plan) => plan.transportation === transportType)
      ?.dailySchedules?.slice(0, travelRange);

    // 잘라낸 일정이 있다면 상태로 저장
    if (slicedSchedules) {
      setPlanData(slicedSchedules);
    }
  }, [locationId, transportType, travelRange]);

  return { planData, locationName };
};