import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { MainPage } from './pages/MainPage/MainPage.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* 다른 경로들은 여기에 추가하세요 */}
          <Route path="/region/:regionId" element={<div>지역 상세 페이지 (개발 중)</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;