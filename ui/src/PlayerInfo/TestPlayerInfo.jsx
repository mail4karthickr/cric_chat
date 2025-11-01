import React from 'react';
import { createRoot } from 'react-dom/client';

const TestPlayerInfo = () => {
  return (
    <p>Player Info comp</p>
  );
};

// Mount the component
const root = document.getElementById("player-info-root");
if (root) {
  createRoot(root).render(<TestPlayerInfo />);
}

export default TestPlayerInfo;
