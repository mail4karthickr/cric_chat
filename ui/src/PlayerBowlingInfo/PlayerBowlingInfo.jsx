import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput } from '../hooks.js';
import {
  Container,
  Title,
  PlayerName,
  PlayerLink,
  SeriesSelector,
  SeriesButton,
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  HeaderCell,
  DataRow,
  DataCell,
  EmptyState,
  StatBadge
} from './PlayerBowlingInfo.styles.js';

console.log('🎯 PlayerBowlingInfo module loaded');

const PlayerBowlingInfoComponent = () => {
  console.log('🏏 PlayerBowlingInfo rendering');
  const toolOutput = useToolOutput();
  console.log('📊 Tool output:', toolOutput);
  
  return <PlayerBowlingInfo data={toolOutput} title="Bowling Statistics" />;
};

const PlayerBowlingInfo = ({ data, title = "Bowling Statistics" }) => {
  const [selectedSeries, setSelectedSeries] = useState(0);

  if (!data) {
    return (
      <Container>
        <EmptyState>🥎 Loading Bowling Statistics...</EmptyState>
      </Container>
    );
  }

  const { headers, values, seriesSpinner, appIndex } = data;
  const playerTitle = appIndex?.seoTitle;
  const webURL = appIndex?.webURL;

  if (!headers || !values) {
    return (
      <Container>
        <EmptyState>🥎 Loading Bowling Statistics...</EmptyState>
      </Container>
    );
  }

  // Function to render cell value with special formatting
  const renderCellValue = (value, rowLabel) => {
    // Add badges for 4-wicket and 5-wicket hauls
    if (rowLabel === '4w' || rowLabel === '5w' || rowLabel === '10w') {
      return <StatBadge type={rowLabel}>{value}</StatBadge>;
    }
    return value;
  };

  // Get important stats for highlighting
  const isImportantStat = (label) => {
    const importantStats = ['Wickets', 'Avg', 'Eco', 'SR', 'BBI', 'BBM', '5w'];
    return importantStats.includes(label);
  };

  return (
    <Container style={{
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    }}>
      <Title>🥎 {title}</Title>
      
      {/* Player Information */}
      {playerTitle && <PlayerName>{playerTitle}</PlayerName>}
      {webURL && (
        <PlayerLink href={webURL} target="_blank" rel="noopener noreferrer">
          🔗 {webURL}
        </PlayerLink>
      )}

      {/* Statistics Table */}
      <TableWrapper>
        <Table style={{
          userSelect: 'none',
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none'
        }}>
          <TableHead>
            <tr>
              {headers.map((header, index) => (
                <HeaderCell key={index}>
                  {header === 'ROWHEADER' ? 'Statistic' : header}
                </HeaderCell>
              ))}
            </tr>
          </TableHead>
          <TableBody>
            {values.map((row, rowIndex) => (
              <DataRow key={rowIndex}>
                {row.values.map((cell, cellIndex) => {
                  const isFirstCell = cellIndex === 0;
                  const rowLabel = row.values[0];
                  
                  return (
                    <DataCell 
                      key={cellIndex}
                      style={
                        !isFirstCell && isImportantStat(rowLabel)
                          ? { fontWeight: '600', color: '#667eea' }
                          : {}
                      }
                    >
                      {renderCellValue(cell, rowLabel)}
                    </DataCell>
                  );
                })}
              </DataRow>
            ))}
          </TableBody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default PlayerBowlingInfo;

// Mount the component
console.log('🔍 Looking for mount point...');

// Keep a reference to the root to avoid creating multiple roots
let reactRoot = null;

function mountWidget() {
  const rootElement = document.getElementById('player-bowling-root');
  if (rootElement) {
    console.log('✅ Found mount point #player-bowling-root, rendering...');
    
    // Only create root once, then reuse it
    if (!reactRoot) {
      reactRoot = createRoot(rootElement);
      console.log('🔧 Created new React root');
    }
    
    reactRoot.render(<PlayerBowlingInfoComponent />);
    console.log('🎨 Component rendered successfully');
  } else {
    console.log('⏳ Mount point not found, will retry...');
  }
}

// Try to mount immediately
if (document.readyState === 'loading') {
  console.log('⏳ Document still loading, waiting...');
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  console.log('✅ Document ready, mounting...');
  mountWidget();
}

// Also set up a MutationObserver to catch when the element is added
const observer = new MutationObserver((mutations) => {
  if (document.getElementById('player-bowling-root') && !reactRoot) {
    console.log('🔄 Mount point detected by observer, mounting...');
    mountWidget();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

console.log('👀 MutationObserver set up');
