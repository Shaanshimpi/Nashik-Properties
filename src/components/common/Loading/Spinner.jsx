// src/components/common/Loading/Spinner.jsx
import React from 'react';
import './Loading.css';

const Spinner = ({ size = 'md', className = '' }) => {
  return (
    <div className={`spinner spinner--${size} ${className}`}>
      <div className="spinner__circle"></div>
    </div>
  );
};

export default Spinner;
