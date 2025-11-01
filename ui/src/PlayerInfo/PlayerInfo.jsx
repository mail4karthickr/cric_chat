import React from 'react';
import { createRoot } from 'react-dom/client';

console.log('🎯 [PlayerInfo] Component module loaded');

const PlayerInfoComponent = () => {
  console.log('🏏 [PlayerInfo] Component rendering');
  
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f0f8ff',
      border: '3px solid #4CAF50',
      borderRadius: '10px',
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '20px auto'
    }}>
      <h1 style={{
        color: '#2c3e50',
        textAlign: 'center',
        fontSize: '32px',
        marginBottom: '20px'
      }}>
        Cricket Chat Widget Test
      </h1>
      
      <div style={{
        backgroundColor: '#ffffff',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '15px'
      }}>
        <h2 style={{ color: '#27ae60', fontSize: '24px' }}>Widget is Working!</h2>
        <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
          If you can see this message, the widget rendering system is working correctly.
        </p>
      </div>
      
      <div style={{
        backgroundColor: '#fff3cd',
        padding: '15px',
        borderRadius: '5px',
        border: '1px solid #ffc107'
      }}>
        <h3 style={{ color: '#856404', margin: '0 0 10px 0' }}>Test Information:</h3>
        <ul style={{ margin: 0, paddingLeft: '20px' }}>
          <li>Component: PlayerInfo (Test Mode)</li>
          <li>React: Rendering Successfully</li>
          <li>Status: ACTIVE</li>
          <li>Timestamp: {new Date().toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
};

function mountWidget() {
  console.log('Attempting to mount widget...');
  const root = document.getElementById("player-info-root");
  if (root) {
    console.log('Found mount point, rendering...');
    createRoot(root).render(<PlayerInfoComponent />);
    console.log('Component rendered!');
  } else {
    console.error('Mount point not found!');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  mountWidget();
}

export default PlayerInfoComponent;
