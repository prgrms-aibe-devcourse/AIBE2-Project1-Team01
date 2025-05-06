import React, { useState } from "react";
import { useNavigate,  useLocation, Navigate } from "react-router-dom";
import axios from "axios";

import DatePickerModal from "../../components/DatePickerModal";
import TransportSelectModal from "../../components/TransportSelectModal";
import { useTravelPlan } from "../../hooks/useTravelPlan";
import TravelPlanList from "../../components/TravelPlanList";

import "./PlanPage.css";

export const PlanPage = () => {
  const navigate = useNavigate();
    const { state } = useLocation();
  
  const [step, setStep] = useState("date"); // 'date' → 'transport' → 'done'
  const [dateRange, setDateRange] = useState(null);
  const [travelRange, setTravelRange] = useState(0);
  const [transportType, setTransportType] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // state 가 없거나 잘못됐을 때도, fileName/locationId 변수는 미리 계산
  const fileName   = state?.jsonIndex   ?? "1";
  const locationId = state?.locationId  ?? "location_001";

  const { planData, locationName, locationDescription, locationImage, tags } = useTravelPlan(
    fileName,
    locationId,
    transportType,
    travelRange
  );

    if (!state) {
      return <Navigate to="/" replace />;
    }

  const handleSave = async () => {
    const saveData = {
      locationId,
      locationName,
      locationDescription,
      locationImage,
      period: dateRange, // ex) "2025.04.25 ~ 2025.05.01"
      tags: tags,
      plan: planData,
    };

    try {
      // 중복 체크
      const res = await axios.get(
        `http://localhost:4000/mytrip?locationId=${locationId}&period=${encodeURIComponent(dateRange)}&plan=${encodeURIComponent(planData)}`
      );

      if (res.data.length > 0) {
        setShowConfirm(true);
        return;
      }

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
