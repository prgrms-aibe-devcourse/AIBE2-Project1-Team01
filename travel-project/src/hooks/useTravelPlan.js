import { useState, useEffect } from "react";

// 전체 regions 폴더를 context로 읽어오기
const jsonModules = require.context("../data/regions", false, /\.json$/);

export const useTravelPlan = (
  fileName,
  locationId,
  transportType,
  travelRange
) => {
  const [planData, setPlanData] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [locationImage, setLocationImage] = useState("");
  const [tags, setTags] = useState([]);

  useEffect(() => {
    try {
      // 파일명으로 해당 JSON 모듈 동적 로딩
      const data = jsonModules(`./${fileName}.json`);

      // 전체 여행지 리스트 중에서 해당 ID에 맞는 여행지 데이터 찾기
      const location = data.locations.find((loc) => loc.id === locationId);
      if (!location) return;

      // 여행지 기본 정보
      setLocationName(location.name);
      setLocationDescription(location.description);
      setLocationImage(location.images[0]);
      setTags(location.tags);

      // transportType에 맞는 travel_plan 찾기, 없으면 첫 항목 사용
      const planEntry =
        location.travel_plan.find((plan) => plan.transportation === transportType) ||
        location.travel_plan[0];

      // travelRange가 0이거나 음수면 전체 일정, 아니면 slice
      const schedules =
        travelRange > 0
          ? planEntry.dailySchedules.slice(0, travelRange)
          : planEntry.dailySchedules;

      setPlanData(schedules);
    } catch (error) {
      console.error("JSON 파일 로딩 실패:", error);
    }
  }, [fileName, locationId, transportType, travelRange]);

  return { planData, locationName, locationDescription, locationImage, tags };
};