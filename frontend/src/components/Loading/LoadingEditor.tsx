import React from 'react';

const Loading: React.FC = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'start', height: '100%' }}>
    <div
      className="spinner"
      style={{
        border: '8px solid #f3f3f3',
        borderRadius: '50%',
        borderTop: '8px solid #3498db',
        width: '40px',
        height: '40px',
        animation: 'spin 1.5s linear infinite',
      }}
    >
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  </div>
);

export default Loading;
