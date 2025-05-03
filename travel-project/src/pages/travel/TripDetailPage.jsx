import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import TripModal from "../../components/TripModal";
import TravelPlanList from "../../components/TravelPlanList";
import "./TripDetailPage.css"; // 외부 스타일시트 import

export const TripDetailPage = () => {
  const location = useLocation();
  const {
    locationName,
    locationDescription,
    locationImage,
    travelPeriod,
    plans,
  } = location.state || {};
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (locationName === undefined) {
    return (
      <div className="trip-detail-wrapper">
        해당 여행 정보를 찾을 수 없습니다.
      </div>
    );
  }

  return (
    <div className="trip-detail-wrapper">
      <div className="trip-header">
        <button
          className="trip-region-button"
          onClick={() => setIsModalOpen(true)}
        >
          {locationName}
        </button>
        <span className="trip-date">{travelPeriod}</span>
      </div>

      <TravelPlanList planData={plans} />

      {isModalOpen && (
        <TripModal
          locationName={locationName}
          locaionDescription={locationDescription}
          locationImage={locationImage}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};
