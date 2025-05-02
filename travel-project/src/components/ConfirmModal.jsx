import React from 'react';
import './ConfirmModal.css';

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-backdrop">
      <div className="confirm-modal">
        <div className="modal-message">{message}</div>
        <div className="modal-actions">
          <button onClick={onConfirm}>예</button>
          <button onClick={onCancel}>아니오</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal; 