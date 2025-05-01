import React, { createContext, useState, useContext, useEffect } from 'react';
import reviewsData from '../data/reviews.json';

const ReviewContext = createContext();

export function ReviewProvider({ children }) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // JSON 파일에서 데이터 로드
    setReviews(reviewsData.reviews);
  }, []);

  const handleAddReview = (newReview) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  const handleUpdateReview = (updatedReview) => {
    setReviews(prevReviews => 
      prevReviews.map(r => r.id === updatedReview.id ? updatedReview : r)
    );
  };

  const handleDeleteReview = (reviewId) => {
    setReviews(prevReviews => 
      prevReviews.filter(r => String(r.id) !== String(reviewId))
    );
  };

  const value = {
    reviews,
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview
  };

  return (
    <ReviewContext.Provider value={value}>
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