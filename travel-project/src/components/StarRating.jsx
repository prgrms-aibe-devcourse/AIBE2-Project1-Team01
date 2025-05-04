import React from 'react';
import './ReviewCard.css';

// 꽉 찬 별 아이콘 컴포넌트
export const BigStar = () => (
  <svg className="star-svg" viewBox="0 0 24 24">
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);

// 빈 별 아이콘 컴포넌트
export const EmptyStar = () => (
  <svg className="star-svg star-outline" viewBox="0 0 24 24">
    <polygon
      points="12,2 15,9 22,9 17,14 18,21 12,17 6,21 7,14 2,9 9,9"
    />
  </svg>
);

// 평점에 따라 별점을 렌더링하는 함수
export const renderStars = (rating) => {
  const stars = [];
  // 5개의 별을 순회하면서 평점에 따라 적절한 별 컴포넌트 추가
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // 해당 인덱스가 평점보다 작거나 같으면 꽉 찬 별
      stars.push(<span key={i}><BigStar /></span>);
    } else {
      // 그 외의 경우 빈 별
      stars.push(<span key={i}><EmptyStar /></span>);
    }
  }
  return stars;
}; 