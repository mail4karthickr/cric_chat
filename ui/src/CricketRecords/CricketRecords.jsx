import React from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput } from '../hooks.js';
import {
  container,
  header,
  title,
  subtitle,
  filterSection,
  filterBadge,
  tableContainer,
  table,
  tableHeader,
  tableHeaderCell,
  tableBody,
  tableRow,
  tableCell,
  rankCell,
  playerCell,
  highlightCell,
  emptyState,
  errorState,
  loadingState,
} from './CricketRecords.styles';

console.log('🎯 CricketRecords module loaded');

const CricketRecordsComponent = () => {
  console.log('📊 CricketRecords rendering');
  const toolOutput = useToolOutput();
  console.log('📊 Tool output:', toolOutput);
  
  return <CricketRecords data={toolOutput} />;
};


const CricketRecords = ({ data }) => {
  if (!data) {
    return (
      <div style={container}>
        <div style={loadingState}>
          <div style={{ fontSize: '40px' }}>📊</div>
          <div style={{ marginTop: '16px' }}>Loading cricket records...</div>
        </div>
      </div>
    );
  }

  // Handle the actual API response structure
  const headers = data.headers || [];
  const values = data.values || [];
  const filter = data.filter || {};

  if (values.length === 0) {
    return (
      <div style={container}>
        <div style={header}>
          <div style={title}>📊 Cricket Records</div>
        </div>
        <div style={emptyState}>
          <div style={{ fontSize: '48px', opacity: 0.3 }}>📊</div>
          <div style={{ marginTop: '8px' }}>No records available</div>
        </div>
      </div>
    );
  }

  // Format title based on headers and filter
  const formatTitle = () => {
    const matchType = filter.selectedMatchType?.toUpperCase() || 'CRICKET';
    
    if (headers.includes('HS')) {
      return `${matchType} - Highest Individual Scores`;
    } else if (headers.includes('Wkts') || headers.includes('Wickets')) {
      return `${matchType} - Most Wickets`;
    } else if (headers.includes('Runs')) {
      return `${matchType} - Most Runs`;
    }
    
    return `${matchType} Records`;
  };

  return (
    <div style={container}>
      <div style={header}>
        <div style={title}>
          📊 {formatTitle()}
        </div>
        {filter.selectedMatchType && (
          <div style={subtitle}>
            Top {values.length} records
          </div>
        )}
      </div>

      {/* Active Filters */}
      {filter.selectedMatchType && (
        <div style={filterSection}>
          <div style={filterBadge}>
            {filter.selectedMatchType.toUpperCase()}
          </div>
        </div>
      )}

      {/* Records Table */}
      <div style={tableContainer}>
        <table style={table}>
          <thead style={tableHeader}>
            <tr>
              <th style={{...tableHeaderCell, width: '50px', textAlign: 'center'}}>#</th>
              {headers.map((header, index) => (
                <th key={index} style={tableHeaderCell}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody style={tableBody}>
            {values.map((record, index) => {
              // Handle both array and object with values property
              const recordValues = Array.isArray(record) ? record : (record.values || []);
              const isTop3 = index < 3;
              
              // The API returns: [id, playerName, score, balls, SR, vs]
              // We need to skip the first element (id) and show from playerName onwards
              const displayValues = recordValues.slice(1); // Skip the ID column
              
              return (
                <tr 
                  key={index} 
                  style={{
                    ...tableRow,
                    backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#fafafa' : '#fff'}
                >
                  <td style={{...rankCell(isTop3), textAlign: 'center'}}>
                    {index + 1}
                  </td>
                  {displayValues.map((value, colIndex) => {
                    // First value is player name (Batter)
                    const isPlayerName = colIndex === 0;
                    // Second value is the main stat (HS/score)
                    const isMainStat = colIndex === 1;
                    // Third value is also a stat (Balls)
                    const isStat = colIndex === 2;
                    
                    return (
                      <td 
                        key={colIndex} 
                        style={
                          isPlayerName ? playerCell :
                          (isMainStat || isStat) ? highlightCell :
                          tableCell
                        }
                      >
                        {value || '-'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CricketRecordsComponent;

// Initialize the widget
if (typeof window !== 'undefined') {
  console.log('🎬 CricketRecords initializing...');
  const rootElement = document.getElementById('cricket-records-root');
  
  if (rootElement) {
    console.log('✅ Found cricket-records-root element');
    const root = createRoot(rootElement);
    root.render(<CricketRecordsComponent />);
    console.log('🎨 CricketRecords component rendered');
  } else {
    console.warn('❌ cricket-records-root element not found');
  }
}
