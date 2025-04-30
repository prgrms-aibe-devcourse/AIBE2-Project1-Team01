import React from 'react';
import '../../assets/base.css';

function ReviewDetailPage({ reviewData, onClose }) {
  if (!reviewData) return null;

  const handleRecommend = () => {
    alert('일정 추천 기능은 준비중입니다!');
  };

  return (
    <>
      {/* 모달 뒷배경 */}
      <div className="modal-overlay" onClick={onClose} />

      {/* 모달 내용 */}
      <div className="modal">
        {/* 닫기 버튼 */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* 여행지 사진 */}
        <img
          src={reviewData.destination.photoUrl}
          alt="여행지 사진"
          style={{
            borderRadius: '10px',
            width: '100%',
            marginBottom: '10px',
            objectFit: 'contain',
            maxHeight: '250px'
          }}
        />

        {/* 여행지 정보 */}
        <div className="destination-info" style={{ textAlign: 'left' }}>
          <h2>{reviewData.destination.name}</h2>
          <p style={{ whiteSpace: 'pre-line' }}>
            {reviewData.destination.description}
          </p>
        </div>

        {/* 별점 */}
        {reviewData.review && (
          <div className="rating-info" style={{ textAlign: 'center', marginTop: '10px' }}>
            <p>⭐ {reviewData.review.rating}점</p>
          </div>
        )}

        {/* 일정 추천 버튼 */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button className="button recommend-button" onClick={handleRecommend}>
            일정 추천 받기
          </button>
        </div>
      </div>
    </>
  );
}

export default ReviewDetailPage;