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

// 반 별 아이콘 컴포넌트 (절반만 채워진 별)
export const HalfStar = () => (
  <svg className="star-svg" viewBox="0 0 24 24">
    <defs>
      {/* 별의 왼쪽/오른쪽 색상을 구분하는 그라데이션 정의 */}
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

// 평점에 따라 별점을 렌더링하는 함수
export const renderStars = (rating) => {
  const stars = [];
  // 5개의 별을 순회하면서 평점에 따라 적절한 별 컴포넌트 추가
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      // 해당 인덱스가 평점보다 작거나 같으면 꽉 찬 별
      stars.push(<span key={i}><BigStar /></span>);
    } else if (rating >= i - 0.5) {
      // 평점이 현재 인덱스의 절반 이상이면 반 별
      stars.push(<span key={i}><HalfStar /></span>);
    } else {
      // 그 외의 경우 빈 별
      stars.push(<span key={i}><EmptyStar /></span>);
    }
  }
  return stars;
}; 