import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ReviewList from './pages/ReviewPage/ReviewList';
import ReviewWrite from './pages/ReviewPage/ReviewWrite';
import ReviewModify from './pages/ReviewPage/ReviewModify';
import ReviewDetail from './pages/ReviewPage/ReviewDetail';
import { ReviewProvider } from './contexts/ReviewContext';

function App() {
  return (
    <ReviewProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/reviews" />} /> // 기본으로 mainPage로 가도록 수정 필요
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/reviews/new" element={<ReviewWrite />} />
            <Route path="/reviews/:id" element={<ReviewDetail />} />
            <Route path="/reviews/:id/edit" element={<ReviewModify />} />
          </Routes>
        </div>
      </Router>
    </ReviewProvider>
  );
}

export default App;