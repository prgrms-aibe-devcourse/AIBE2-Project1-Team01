import React, { useState } from 'react';
import './TransportSelectModal.css';

const TransportSelectModal = ({ onClose }) => {
  const [selected, setSelected] = useState('대중교통');

  return (
    <div className="transport-modal">
      <button className="close-button" onClick={onClose}>×</button>

      <h2 className="modal-title">이동 수단을 선택해 주세요</h2>
      <p className="modal-subtitle">여행 시 이용하는 이동수단을 선택해 주세요.</p>

      <div className="transport-options">
        <div
          className={`transport-card ${selected === '대중교통' ? 'selected' : ''}`}
          onClick={() => setSelected('대중교통')}
        >
          <span>🚇</span>
          <span>대중교통</span>
        </div>
        <div
          className={`transport-card ${selected === '승용차' ? 'selected' : ''}`}
          onClick={() => setSelected('승용차')}
        >
          <span>🚗</span>
          <span>승용차</span>
        </div>
      </div>

      <div className="footer">
        <button className="confirm-button">일정 생성</button>
      </div>
    </div>
  );
};

export default TransportSelectModal;