import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewDetailModal.css';

const BigStar = () => (
  <svg className="star-svg large" viewBox="0 0 24 24">
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const EmptyStar = () => (
  <svg className="star-svg large star-outline" viewBox="0 0 24 24">
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
    />
  </svg>
);
const HalfStar = () => (
  <svg className="star-svg large" viewBox="0 0 24 24">
    <defs>
      <linearGradient id="half-gradient" x1="0" x2="1" y1="0" y2="0">
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="50%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="url(#half-gradient)"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      className="star-outline"
    />
  </svg>
);

function renderStars(rating) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<span key={i}><BigStar /></span>);
    } else if (rating >= i - 0.5) {
      stars.push(<span key={i}><HalfStar /></span>);
    } else {
      stars.push(<span key={i}><EmptyStar /></span>);
    }
  }
  return stars;
}

const ReviewDetailModal = ({ review, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const navigate = useNavigate();
  return (
    <div className="review-detail-modal-overlay" onClick={onClose}>
      <div className="review-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="modal-photo">
          {review.photo ? (
            <img src={review.photo} alt="리뷰 사진" />
          ) : (
            <div className="photo-placeholder">사진 없음</div>
          )}
        </div>
        <div className="modal-content">
          <div className="modal-rating">{renderStars(review.rating)}</div>
          <div className="modal-location">{review.location}</div>
          <div className="modal-date">{review.date}</div>
          <div className="modal-text">{review.content}</div>
        </div>
        {hasPrev && <button className="arrow-btn left" onClick={onPrev}>&lt;</button>}
        {hasNext && <button className="arrow-btn right" onClick={onNext}>&gt;</button>}
        <button className="modify-btn" onClick={() => navigate(`/reviews/${review.id}/edit`)}>수정하기</button>
      </div>
    </div>
  );
};

export default ReviewDetailModal; 