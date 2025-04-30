import React from 'react';
import './ReviewCard.css';
import { renderStars } from './StarRating';

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="review-photo">
        {review.photo ? (
          <img src={review.photo} alt="여행지 사진" />
        ) : (
          <div className="photo-placeholder">여행지 사진</div>
        )}
      </div>
      <div className="review-info">
        <h3 className="review-title">{review.content}</h3>
        <div className="review-location">{review.location}</div>
        <div className="review-date">{review.date}</div>
        <div className="review-rating">
          {renderStars(review.rating)}
        </div>
      </div>
    </div>
  );
}

export default ReviewCard; 