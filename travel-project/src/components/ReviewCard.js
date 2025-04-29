import React from 'react';
import './ReviewCard.css';

const BigStar = () => (
  <svg className="star-svg" width="25" height="25" viewBox="0 0 24 24" style={{display:'inline-block', verticalAlign:'middle'}}>
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const EmptyStar = () => (
  <svg className="star-svg" width="25" height="25" viewBox="0 0 24 24" style={{display:'inline-block', verticalAlign:'middle'}}>
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const HalfStar = () => (
  <svg className="star-svg" width="25" height="25" viewBox="0 0 24 24" style={{display:'inline-block', verticalAlign:'middle'}}>
    <defs>
      <linearGradient id="half-grad-card">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="white" stopOpacity="0" />
      </linearGradient>
    </defs>
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="url(#half-grad-card)"
      stroke="currentColor"
      strokeWidth="1.5"
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