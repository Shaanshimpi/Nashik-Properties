
// src/components/common/Loading/Skeleton.jsx
import React from 'react';
import './Loading.css';

const Skeleton = ({ 
  width = '100%', 
  height = '20px', 
  borderRadius = '4px',
  className = '',
  count = 1
}) => {
  const skeletons = Array(count).fill(0);
  
  return (
    <>
      {skeletons.map((_, index) => (
        <div 
          key={index}
          className={`skeleton ${className}`}
          style={{ 
            width, 
            height, 
            borderRadius,
            marginBottom: count > 1 && index < count - 1 ? '8px' : '0'
          }}
        />
      ))}
    </>
  );
};

export default Skeleton;
