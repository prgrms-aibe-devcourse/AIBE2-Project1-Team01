import React, { useState, useEffect } from "react";
import DatePickerModal from "../../components/DatePickerModal";
import PlanTest from "../../data/PlanTest.json";
import "./PlanPage.css";

export const PlanPage = () => {
  const [planData, setPlanData] = useState([]);
  const [locationName, setLocationName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);

  useEffect(() => {
    // 여행지 ID, 교통 수단 종류, 여행 일수 설정 (현재 고정값으로 사용 중)
    const locationId = "location_001";
    const transportType = "대중교통";
    const travelRange = 10;

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
  }, []);

  return (
    <div className="plan-page-container">
      <div className="plan-page-header">
        <div className="plan-title">{locationName}</div>
        {/* TODO: DatePickerModal 선택한 일정 표시 */}
        <div className="plan-dates">2025.04.25 ~ 2025.05.01</div>
      </div>

      <div className="day-scroll-wrapper">
        <div className="day-grid-horizontal">
          {planData.map((dayItem) => (
            <div key={dayItem.day} className="day-card">
              <h2>
                {dayItem.day}: {dayItem.theme}
              </h2>

              {dayItem.plans.map((plan, idx) => (
                <div key={idx} className="plan-block">
                  <div className="plan-place">
                    <span className="location-icon">📍</span>
                    <span className="place-name">
                      {plan.place}{" "}
                      <span className="time-label">({plan.time})</span>
                    </span>
                  </div>

                  {plan.activities.length > 0 && (
                    <ul className="activity-list">
                      {plan.activities.map((activity, i) => (
                        <li key={i} className="activity-item">
                          {activity}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="footer">
        <button className="save-button">저장하기</button>
      </div>
    </div>

    //TODO: modal 순서대로 나타나게 수정
    // <div>
    //     {isModalOpen && (
    //         <div className="modal-overlay">
    //             <div className="modal-wrapper">
    //                 <DatePickerModal  />
    //             </div>
    //         </div>
    //     )}
    // </div>
  );
};
