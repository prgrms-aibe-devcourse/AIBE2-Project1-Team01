import React, { createContext, useContext, useState } from 'react';
import reviewsData from '../reviewData/reviews.json';

// 이미지 import
import jejuImage from '../reviewData/reviewImages/jeju.jpg';
import busanImage from '../reviewData/reviewImages/busan.jpg';
import seoulImage from '../reviewData/reviewImages/seoul.jpg';
import gyeongjuImage from '../reviewData/reviewImages/gyeongju.jpg';
import gangneungImage from '../reviewData/reviewImages/gangneung.jpg';
import jeonjuImage from '../reviewData/reviewImages/jeonju.jpg';

// 이미지 매핑 객체
const imageMap = {
  './reviewImages/jeju.jpg': jejuImage,
  './reviewImages/busan.jpg': busanImage,
  './reviewImages/seoul.jpg': seoulImage,
  './reviewImages/gyeongju.jpg': gyeongjuImage,
  './reviewImages/gangneung.jpg': gangneungImage,
  './reviewImages/jeonju.jpg': jeonjuImage
};

// 이미지 경로를 실제 import된 이미지로 변환
const reviewsWithImages = reviewsData.reviews.map(review => ({
  ...review,
  photo: imageMap[review.photo] || review.photo
}));

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState(reviewsWithImages);

  const handleAddReview = (newReview) => {
    setReviews(prev => [...prev, newReview]);
  };

  const handleUpdateReview = (updatedReview) => {
    setReviews(prev => prev.map(review => 
      review.id === updatedReview.id ? updatedReview : review
    ));
  };

  const handleDeleteReview = (id) => {
    setReviews(prev => prev.filter(review => review.id !== Number(id)));
  };

  return (
    <ReviewContext.Provider value={{ reviews, handleAddReview, handleUpdateReview, handleDeleteReview }}>
      {children}
    </ReviewContext.Provider>
  );
}

export function useReview() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReview must be used within a ReviewProvider');
  }
  return context;
} 