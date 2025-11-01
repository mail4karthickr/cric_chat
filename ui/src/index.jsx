import React from 'react';
import ReactDOM from 'react-dom/client';
import PlayerInfoComponent from './PlayerInfo/PlayerInfo.jsx';

console.log('🚀 [index.jsx] Module loading...');

// Export for module usage
export { PlayerInfoComponent };

// Auto-initialize if root element exists
if (typeof document !== 'undefined') {
  console.log('📄 [index.jsx] Document is available, checking for root element...');
  const rootElement = document.getElementById('root');
  if (rootElement) {
    console.log('✅ [index.jsx] Root element found, initializing React...');
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(PlayerInfoComponent));
    console.log('🎨 [index.jsx] PlayerInfoComponent rendered successfully');
  } else {
    console.warn('⚠️ [index.jsx] Root element not found in document');
  }
} else {
  console.log('📦 [index.jsx] Running in non-browser environment (module export only)');
}

// Also expose React and ReactDOM for any additional usage
export { React, ReactDOM };
