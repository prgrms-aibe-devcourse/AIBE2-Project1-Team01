import React, { useState } from 'react';

const TransportSelectModal = ({ onClose }) => {
  const [selected, setSelected] = useState('대중교통');

  return (
    <div>
      <button>×</button>

      <h2>이동 수단을 선택해 주세요</h2>
      <p>여행 시 이용하는 이동수단을 선택해 주세요.</p>

      <div>
        <div
          onClick={() => setSelected('대중교통')}
        >
          <span>🚇</span>
          <span>대중교통</span>
        </div>
        <div
          onClick={() => setSelected('승용차')}
        >
          <span>🚗</span>
          <span>승용차</span>
        </div>
      </div>

      <div>
        <button>일정 생성</button>
      </div>
    </div>
  );
};

export default TransportSelectModal;