import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConfirmModal from '../../components/ConfirmModal';
import { renderStars } from '../../components/StarRating';
import { useReview } from '../../contexts/ReviewContext';
import './ReviewDetail.css';

function ReviewDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { reviews, handleDeleteReview } = useReview();
  const review = reviews.find(r => String(r.id) === id);
  const [showModal, setShowModal] = useState(false);

  if (!review) return <div>리뷰를 찾을 수 없습니다.</div>;

  const handleDelete = () => {
    handleDeleteReview(id);
    navigate('/reviews');
  };

  return (
    <div className="review-detail-page">
      <div className="review-photo">
        {review.photo ? (
          <img src={review.photo} alt="여행지 사진" />
        ) : (
          <div className="photo-placeholder">여행지 사진</div>
        )}
      </div>
      <div className="review-rating">
        {renderStars(review.rating)}
      </div>
      <div className="review-content">{review.content}</div>
      <button className="delete-btn" onClick={() => setShowModal(true)}>삭제</button>
      {showModal && (
        <ConfirmModal
          message="정말 삭제하시겠습니까?"
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default ReviewDetail; 