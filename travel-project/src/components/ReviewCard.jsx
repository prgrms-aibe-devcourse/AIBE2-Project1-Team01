import React from 'react';
import './ReviewCard.css';
import { renderStars } from './StarRating';

function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <div className="rectangle" />
      
      <div className="review-photo">
        {review.photo ? (
          <img src={review.photo} alt="여행지 사진" />
        ) : (
          <div className="photo-placeholder">여행지 사진</div>
        )}
      </div>
      
      <div className="review-title">{review.content}</div>
      <div className="review-location">{review.location}</div>
      <div className="review-date">
        {review.startDate} ~ {review.endDate}
      </div>
      <div className="review-rating">
        {renderStars(review.rating)}
      </div>
    </div>
  );
}

export default ReviewCard; 