import React from 'react';
import './ReviewCard.css';

const BigStar = () => (
  <svg className="star-svg" width="25" height="25" viewBox="0 0 24 24">
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

const EmptyStar = () => (
  <svg className="star-svg star-outline" width="25" height="25" viewBox="0 0 24 24">
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
    />
  </svg>
);

const HalfStar = () => (
  <svg className="star-svg" width="25" height="25" viewBox="0 0 24 24">
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