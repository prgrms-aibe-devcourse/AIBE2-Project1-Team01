// src/pages/PlanPage/PlanPage.jsx
import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import axios from "axios";

import DatePickerModal from "../../components/DatePickerModal";
import TransportSelectModal from "../../components/TransportSelectModal";
import { useTravelPlan } from "../../hooks/useTravelPlan";
import TravelPlanList from "../../components/TravelPlanList";

import "./PlanPage.css";

const PlanPage = () => {
  // ← ① 모든 훅을 최상단에!
  const navigate = useNavigate();
  const { state } = useLocation();

  const [step, setStep]               = useState("date");
  const [dateRange, setDateRange]     = useState("");
  const [travelRange, setTravelRange] = useState(0);
  const [transportType, setTransportType] = useState("");
  const [showConfirm, setShowConfirm]     = useState(false);

  // state 가 없거나 잘못됐을 때도, fileName/locationId 변수는 미리 계산
  const fileName   = state?.jsonIndex   ?? "1";
  const locationId = state?.locationId  ?? "location_001";

  // ← ② useTravelPlan 도 조건문 없이 최상단에서!
  const { planData, locationName, locationDescription, locationImage, tags } =
    useTravelPlan(fileName, locationId, transportType, travelRange);

  // ← 이제 훅 호출 이후에 조건부 early return
  if (!state) {
    return <Navigate to="/" replace />;
  }

  // 저장 & 이동 로직
  const handleSave = async () => {
    const payload = {
      locationId,
      locationName,
      locationDescription,
      locationImage,
      period: dateRange,
      tags,
      plan: planData,
    };
    try {
      const res = await axios.get(
        `http://localhost:4000/mytrip?locationId=${locationId}&period=${encodeURIComponent(
          dateRange
        )}`
      );
      if (res.data.length > 0) {
        setShowConfirm(true);
        return;
      }
      await axios.post("http://localhost:4000/mytrip", payload);
      setShowConfirm(true);
    } catch {
      alert("저장 중 오류가 발생했습니다.");
    }
  };
  const goMyTrips = () => navigate("/mytrips", { replace: true });

  return (
    <div className="plan-page-container">
      {/* 1. 날짜 선택 단계 */}
      {step === "date" && (
        <div className="date-step-container">
          <div className="calendar-wrapper">
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

      {/* 2. 교통수단 선택 단계 */}
      {step === "transport" && (
        <div className="modal-overlay">
          <div className="modal-wrapper">
            <TransportSelectModal
              onConfirm={(sel) => {
                setTransportType(sel);
                setStep("done");
              }}
              onClose={() => setStep("date")}
            />
          </div>
        </div>
      )}

      {/* 3. 일정표 & 저장 단계 */}
      {step === "done" && (
        <>
          <header className="plan-page-header">
            <h1 className="plan-title">{locationName}</h1>
            <p className="plan-dates">{dateRange}</p>
          </header>

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
                  저장이 완료되었습니다.<br />
                  “나의 여행” 페이지로 이동할까요?
                </p>
                <div className="modal-buttons">
                  <button onClick={() => setShowConfirm(false)}>닫기</button>
                  <button onClick={goMyTrips}>확인</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PlanPage;