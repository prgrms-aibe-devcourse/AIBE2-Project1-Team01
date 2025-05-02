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

      // 여행지 이름을 상태로 저장
      setLocationName(location.name);
      setLocationDescription(location.locationDescription);
      setLocationImage(location.images[0]);
      setTags(location.tags);

      // 해당 교통수단에 맞는 travel_plan을 찾고, 그 안의 일정을 travelRange만큼 자르기
      const slicedSchedules = location.travel_plan
        ?.find((plan) => plan.transportation === transportType)
        ?.dailySchedules?.slice(0, travelRange);

      // 잘라낸 일정이 있다면 상태로 저장
      if (slicedSchedules) {
        setPlanData(slicedSchedules);
      }
    } catch (error) {
      console.error("JSON 파일 로딩 실패:", error);
    }
  }, [fileName, locationId, transportType, travelRange]);

  return { planData, locationName, locationDescription, locationImage, tags };
};
