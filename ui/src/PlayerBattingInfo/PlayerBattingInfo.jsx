import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput } from '../hooks.js';
import {
  Container,
  Title,
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
} from './PlayerBattingInfo.styles.js';

console.log('🎯 PlayerBattingInfo module loaded');

const PlayerBattingInfoComponent = () => {
  console.log('🏏 PlayerBattingInfo rendering');
  const toolOutput = useToolOutput();
  console.log('📊 Tool output:', toolOutput);
  
  return <PlayerBattingInfo data={toolOutput} title="Batting Statistics" />;
};

const PlayerBattingInfo = ({ data, title = "Batting Statistics" }) => {
  const [selectedSeries, setSelectedSeries] = useState(0);

  if (!data) {
    return (
      <Container>
        <EmptyState>No batting statistics available</EmptyState>
      </Container>
    );
  }

  const { headers, values, seriesSpinner } = data;

  if (!headers || !values) {
    return (
      <Container>
        <EmptyState>Invalid data format</EmptyState>
      </Container>
    );
  }

  // Function to render cell value with special formatting
  const renderCellValue = (value, rowLabel) => {
    // Add badges for centuries and half-centuries
    if (rowLabel === '100s' || rowLabel === '50s') {
      return <StatBadge type={rowLabel}>{value}</StatBadge>;
    }
    return value;
  };

  // Get important stats for highlighting
  const isImportantStat = (label) => {
    const importantStats = ['Runs', 'Average', 'SR', 'Highest', '100s', '50s'];
    return importantStats.includes(label);
  };

  return (
    <Container style={{
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    }}>
      <Title>🏏 {title}</Title>

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

export default PlayerBattingInfo;

// Mount the component
console.log('🔍 Looking for mount point...');

function mountWidget() {
  // Try multiple mount points for flexibility
  const mountPoints = ['component-root', 'player-info-root'];
  let root = null;
  
  for (const id of mountPoints) {
    root = document.getElementById(id);
    if (root) {
      console.log(`✅ Found mount point #${id}, rendering...`);
      createRoot(root).render(<PlayerBattingInfoComponent />);
      console.log('🎉 Component mounted!');
      return;
    }
  }
  
  console.error('❌ No mount point found! Looking for:', mountPoints.join(', '));
}

// Mount when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountWidget);
} else {
  mountWidget();
}
