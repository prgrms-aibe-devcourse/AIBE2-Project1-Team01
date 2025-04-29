import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import reviewDataJson from '../../data/reviewData.json'; // JSON import
import '../../assets/base.css'; // 스타일 import

function ReviewDetailPage() {
  const navigate = useNavigate();
  const [reviewData, setReviewData] = useState(undefined);

  useEffect(() => {
    setReviewData(reviewDataJson);
  }, []);

  const handleRecommend = () => {
    alert('일정 추천 기능은 준비중입니다!');
  };

  const handleClose = () => {
    navigate(-1);
  };

  if (reviewData === undefined) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      {/* 배경 */}
      <div className="modal-overlay" onClick={handleClose} />

      {/* 모달 */}
      <div className="modal">
        {/* 오른쪽 상단 X버튼 */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'transparent',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#999'
          }}
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
          <p style={{ whiteSpace: 'pre-line' }}>{reviewData.destination.description}</p>
        </div>

        {/* 별점 */}
        <div className="rating-info" style={{ marginTop: '10px', textAlign: 'center' }}>
          <p>⭐ {reviewData.review.rating}점</p>
        </div>

        {/* 일정 추천 받기 버튼 */}
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button
            className="button recommend-button"
            onClick={handleRecommend}
          >
            일정 추천 받기
          </button>
        </div>

      </div>
    </>
  );
}

export default ReviewDetailPage;
