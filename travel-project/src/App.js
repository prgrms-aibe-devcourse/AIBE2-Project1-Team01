import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReviewList from './pages/ReviewPage/ReviewList';
import ReviewWrite from './pages/ReviewPage/ReviewWrite';
import ReviewModify from './pages/ReviewPage/ReviewModify';
import ReviewDetail from './pages/ReviewPage/ReviewDetail';
import reviewsData from './data/reviews.json';

import './App.css';

function App() {
  // 리뷰 목록 상태
  const [reviews, setReviews] = useState([]);
  

  useEffect(() => {
    // JSON 파일에서 데이터 로드
    setReviews(reviewsData.reviews);
  }, []);

  const handleAddReview = (newReview) => {
    setReviews(prevReviews => [...prevReviews, newReview]);
  };

  // 리뷰 수정 함수
  const handleUpdateReview = (updatedReview) => {
    setReviews(prevReviews => prevReviews.map(r => r.id === updatedReview.id ? updatedReview : r));
  };

  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/reviews" />} />
          <Route path="/reviews" element={<ReviewList reviews={reviews} />} />
          <Route path="/reviews/new" element={<ReviewWrite onAddReview={handleAddReview} />} />
          <Route path="/reviews/:id" element={<ReviewDetail reviews={reviews} setReviews={setReviews} />} />
          <Route path="/reviews/:id/edit" element={<ReviewModify reviews={reviews} onUpdateReview={handleUpdateReview} setReviews={setReviews} />} />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
