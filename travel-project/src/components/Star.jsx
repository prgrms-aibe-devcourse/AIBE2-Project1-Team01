import React from 'react';

export const Star = ({ className, color }) => {
  return (
    <div className={className} style={{ color: color }}>
      ★
    </div>
  );
};