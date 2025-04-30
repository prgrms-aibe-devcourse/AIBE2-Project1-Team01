import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';                      // ← 경로 수정
import ReviewDetailPage from './pages/travel/ReviewDetailPage';
import ReviewEditPage   from './pages/travel/ReviewEditPage';
import { MainPage }     from './pages/MainPage/MainPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/"              element={<MainPage />} />
        <Route path="/review/edit"   element={<ReviewEditPage />} />
        <Route path="/review/detail" element={<ReviewDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
