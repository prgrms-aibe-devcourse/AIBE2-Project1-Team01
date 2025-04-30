import React from 'react';
import './ReviewCard.css';

export const BigStar = () => (
  <svg className="star-svg large" viewBox="0 0 24 24">
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

export const EmptyStar = () => (
  <svg className="star-svg large star-outline" viewBox="0 0 24 24">
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
    />
  </svg>
);

export const HalfStar = () => (
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

export const renderStars = (rating) => {
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
}; 