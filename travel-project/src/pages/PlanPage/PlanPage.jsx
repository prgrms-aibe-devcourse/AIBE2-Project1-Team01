import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DatePickerModal from "../../components/DatePickerModal";
import TransportSelectModal from "../../components/TransportSelectModal";
import { useTravelPlan } from "../../hooks/useTravelPlan";
import TravelPlanList from "../../components/TravelPlanList";
import "./PlanPage.css";

export const PlanPage = () => {
  const [step, setStep] = useState("date"); // 'date' → 'transport' → 'done'
  const [dateRange, setDateRange] = useState(null);
  const [travelRange, setTravelRange] = useState(0);
  const [transportType, setTransportType] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const locationId = "location_001"; //TODO: 이전 페이지에서 받아오기
  const navigate = useNavigate();

  const { planData, locationName, locationImage, tags } = useTravelPlan(
    locationId,
    transportType,
    travelRange
  );

  const handleSave = async () => {
    const saveData = {
      locationId,
      locationName,
      locationImage,
      period: dateRange, // ex) "2025.04.25 ~ 2025.05.01"
      tags: tags,
      plan: planData,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/mytrip",
        saveData
      );
      setShowConfirm(true);
      console.log("저장된 데이터:", response.data);
    } catch (error) {
      console.error("저장 실패:", error);
      alert("저장 중 오류가 발생했습니다.");
    }
  };

  const handelMoveToMyTrip = () => {
    navigate("/mytrips", { replace: true });
  };

  return (
    <div className="plan-page-container">
      {step === "date" && (
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <DatePickerModal
              onConfirm={({ period, range }) => {
                setDateRange(period);
                setTravelRange(range);
                setStep("transport");
              }}
            />
          </div>
        </div>
      )}

      {step === "transport" && (
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <TransportSelectModal
              onConfirm={(selectedTransport) => {
                setTransportType(selectedTransport);
                setStep("done");
              }}
            />
          </div>
        </div>
      )}

      {step === "done" && (
        <>
          <div className="plan-page-header">
            <div className="plan-title">{locationName}</div>
            <div className="plan-dates">{dateRange}</div>
          </div>

          <TravelPlanList planData={planData} />

          <div className="footer">
            <button className="save-button" onClick={handleSave}>
              저장하기
            </button>
          </div>

          {showConfirm && (
            <div className="modal-overlay">
              <div className="modal-wrapper">
                <p>
                  저장이 완료되었습니다.
                  <br />
                  나의 여행으로 이동하시겠습니까?
                </p>
                <div className="modal-buttons">
                  <button onClick={() => setShowConfirm(false)}>닫기</button>
                  <button onClick={handelMoveToMyTrip}>확인</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
