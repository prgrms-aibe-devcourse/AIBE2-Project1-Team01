import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReviewCard from '../../components/ReviewCard';
import ReviewDetailModal from './ReviewDetailModal';
import { useReview } from '../../contexts/ReviewContext';
import './ReviewList.css';

function ReviewList() {
  const navigate = useNavigate();
  const { reviews, locations } = useReview();
  const [selectedLocation, setSelectedLocation] = useState('전체');
  
  const filteredReviews = reviews.filter(
    (review) => {
      const hasContent = review && review.content && review.content.trim() !== '';
      const matchesLocation = selectedLocation === '전체' || review.location === selectedLocation;
      return hasContent && matchesLocation;
    }
  );

  // 팝업 상태 및 현재 인덱스
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 카드 클릭 시 팝업 오픈
  const handleCardClick = (idx) => {
    setCurrentIndex(idx);
    setModalOpen(true);
  };

  // 팝업 닫기
  const handleClose = () => setModalOpen(false);

  // 좌우 이동
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex < filteredReviews.length - 1) setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className="review-list-page">
      <div className="review-header">
        <h1 className="reviewPage-title">리뷰</h1>
        <select 
          className="location-filter"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
        >
          {locations.map((location) => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <div className="review-list">
        {filteredReviews.map((review, idx) => (
          <div key={review.id} onClick={() => handleCardClick(idx)}>
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
      <button className="write-btn" onClick={() => navigate('/reviews/new')}>글쓰기</button>
      {modalOpen && (
        <ReviewDetailModal
          review={filteredReviews[currentIndex]}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
          hasPrev={currentIndex > 0}
          hasNext={currentIndex < filteredReviews.length - 1}
        />
      )}
    </div>
  );
}

export default ReviewList; 