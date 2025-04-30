import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import dummyTripData from '../../data/dummyTripData';
import TripModal from '../../components/TripModal';

export const TripDetailPage = () => {
  const { id } = useParams();
  const trip = dummyTripData.find(item => item.id === Number(id));
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 데이터가 없을 경우
  if (!trip) {
    return <div style={{ padding: '20px' }}>해당 여행 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      {/* 지역명 + 날짜 표시 */}
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            backgroundColor: '#eee',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {trip.regionName}
        </button>
        <span style={{ marginLeft: '12px', color: '#666' }}>
          {trip.travelDate}
        </span>
      </div>

      {/* 여행 일정 등 추가할 공간 */}
      <p>이곳에 상세 일정을 넣을 수 있어요.</p>

      {/* 모달 컴포넌트 */}
      {isModalOpen && (
        <TripModal trip={trip} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};
