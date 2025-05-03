import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { MyTripPage } from './pages/travel/MyTripPage';
import { TripDetailPage } from './pages/travel/TripDetailPage';
import PlanPage from './pages/PlanPage/PlanPage';    // ← 추가
import Navbar from './category/Navbar';
import Footer from './category/Footer';
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
            <Route path="/" element={<MainPage />} />
            <Route path="/plan" element={<PlanPage />} />          {/* ← 이 라우트가 필요합니다 */}
            <Route path="/mytrips" element={<MyTripPage />} />
            <Route path="/trip/:id" element={<TripDetailPage />} />
            <Route path="/reviews" element={<ReviewList />} />
            <Route path="/reviews/new" element={<ReviewWrite />} />
            <Route path="/reviews/:id" element={<ReviewDetail />} />
            <Route path="/reviews/:id/edit" element={<ReviewModify />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </ReviewProvider>
  );
}

export default App;