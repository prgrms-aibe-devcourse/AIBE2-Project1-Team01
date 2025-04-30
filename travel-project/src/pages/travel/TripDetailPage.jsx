import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import dummyTripData from '../../data/dummyTripData';
import TripModal from '../../components/TripModal';
import './TripDetailPage.css'; // 외부 스타일시트 import

export const TripDetailPage = () => {
  const { id } = useParams();
  const trip = dummyTripData.find(item => item.id === Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!trip) {
    return <div className="trip-detail-wrapper">해당 여행 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="trip-detail-wrapper">
      <div className="trip-header">
        <button className="trip-region-button" onClick={() => setIsModalOpen(true)}>
          {trip.regionName}
        </button>
        <span className="trip-date">{trip.travelDate}</span>
      </div>

      <p>이곳에 상세 일정을 넣을 수 있어요.</p>

      {isModalOpen && (
        <TripModal trip={trip} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};