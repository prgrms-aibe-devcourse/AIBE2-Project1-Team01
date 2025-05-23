import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { renderStars } from '../../components/StarRating';
import './ReviewDetailModal.css';

// 이미지 비율에 따라 object-fit을 동적으로 적용하는 컴포넌트
function ModalPhoto({ src, alt }) {
  const [fit, setFit] = useState('cover');
  const handleImgLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (naturalHeight > naturalWidth) {
      setFit('contain');
    } else {
      setFit('cover');
    }
  };
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '8px',
        objectFit: fit,
        background: '#eee',
      }}
      onLoad={handleImgLoad}
    />
  );
}

const ReviewDetailModal = ({ review, onClose, onPrev, onNext, hasPrev, hasNext }) => {
  const navigate = useNavigate();
  return (
    <div className="review-detail-modal-overlay" onClick={onClose}>
      <div className="review-detail-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <div className="modal-photo">
          {review.photo ? (
            <ModalPhoto src={review.photo} alt="리뷰 사진" />
          ) : (
            <div className="photo-placeholder">사진 없음</div>
          )}
        </div>
        <div className="review-modal-content">
          <div className="review-modal-header">
            <div className="modal-rating">{renderStars(review.rating)}</div>
            <div className="modal-location">{review.location}</div>
            <div className="modal-date">{review.startDate} ~ {review.endDate}</div>
          </div>
          <div className="modal-text-container">
            <div className="modal-text">{review.content}</div>
          </div>
        </div>
        {hasPrev && <button className="arrow-btn left" onClick={onPrev}>&lt;</button>}
        {hasNext && <button className="arrow-btn right" onClick={onNext}>&gt;</button>}
        <button className="modify-btn" onClick={() => navigate(`/reviews/${review.id}/edit`)}>수정 및 삭제하기</button>
      </div>
    </div>
  );
};

export default ReviewDetailModal; 