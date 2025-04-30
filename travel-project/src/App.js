import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';
import { MyTripPage } from './pages/travel/MyTripPage';
import { TripDetailPage } from './pages/travel/TripDetailPage';
import Navbar from './components/Navbar'; // ✅ 추가

function App() {
  return (
    <Router>
      {/* ✅ Navbar 컴포넌트 사용 */}
      <Navbar />

      {/* 페이지 전환 라우팅 */}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/mytrips" element={<MyTripPage />} />
        <Route path="/trip/:id" element={<TripDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
