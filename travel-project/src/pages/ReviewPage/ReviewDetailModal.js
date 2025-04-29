import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BigStar, EmptyStar, HalfStar, renderStars } from '../../components/StarRating';
import './ReviewDetailModal.css';

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