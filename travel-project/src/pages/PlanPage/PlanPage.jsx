import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePickerModal from "../../components/DatePickerModal";
import { useTravelPlan } from "../../hooks/useTravelPlan";
import TravelPlanList from "../../components/TravelPlanList";
import "./PlanPage.css";

export const PlanPage = () => {
  const locationId = "location_001";
  const transportType = "대중교통";
  const travelRange = 3;

  const { planData, locationName } = useTravelPlan(
    locationId,
    transportType,
    travelRange
  );
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleSave = async () => {
    const saveData = {
      locationId,
      locationName,
      transportType,
      travelRange,
      period: "2025.04.25 ~ 2025.05.01",
      plan: planData,
    };
  
    try {
      const response = await axios.post("http://localhost:4000/plans", saveData);
      alert("저장 성공!");
      console.log("저장된 데이터:", response.data);
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="plan-page-container">
      <div className="plan-page-header">
        <div className="plan-title">{locationName}</div>
        <div className="plan-dates">2025.04.25 ~ 2025.05.01</div>
      </div>

      <TravelPlanList planData={planData} />

      <div className="footer">
        <button className="save-button" onClick={handleSave}>저장하기</button>
      </div>
    </div>
  );

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
};
