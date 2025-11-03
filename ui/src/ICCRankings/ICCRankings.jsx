import React from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput } from '../hooks.js';
import PlayerImage from '../common/PlayerImage';
import {
  container,
  header,
  title,
  subtitle,
  rankingsList,
  rankingCard,
  rankBadge,
  playerImageContainer,
  playerDetails,
  playerName,
  country,
  ratingContainer,
  rating,
  trendIndicator,
  emptyState,
  errorState,
  loadingState,
} from './ICCRankings.styles';

console.log('🎯 ICCRankings module loaded');

const ICCRankingsComponent = () => {
  console.log('🏆 ICCRankings rendering');
  const toolOutput = useToolOutput();
  console.log('🏆 Tool output:', toolOutput);
  
  return <ICCRankings data={toolOutput} />;
};

const ICCRankings = ({ data }) => {
  if (!data) {
    return (
      <div style={container}>
        <div style={loadingState}>
          <div style={{ fontSize: '40px' }}>⏳</div>
          <div style={{ marginTop: '16px' }}>Loading rankings...</div>
        </div>
      </div>
    );
  }

  if (data.error) {
    return (
      <div style={container}>
        <div style={errorState}>
          <div style={{ fontWeight: 600, marginBottom: '8px' }}>Error Loading Rankings</div>
          <div>{data.error}</div>
        </div>
      </div>
    );
  }

  const rankings = data.rank || data.rankings || [];

  if (rankings.length === 0) {
    return (
      <div style={container}>
        <div style={header}>
          <div style={title}>
            🏆 ICC Rankings
          </div>
        </div>
        <div style={emptyState}>
          <div style={{ fontSize: '48px', opacity: 0.3 }}>🏆</div>
          <div style={{ marginTop: '8px' }}>No rankings available</div>
        </div>
      </div>
    );
  }

  const getTrendIcon = (trend) => {
    if (!trend || trend === 'Flat') return '−';
    if (trend === 'Up') return '↑';
    if (trend === 'Down') return '↓';
    return '−';
  };

  const getTrendColor = (trend) => {
    if (trend === 'Up') return '#22c55e';
    if (trend === 'Down') return '#ef4444';
    return '#94a3b8';
  };

  return (
    <div style={container}>
      <div style={header}>
        <div style={title}>
          🏆 ICC Test Batting Rankings
        </div>
        {rankings.length > 0 && (
          <div style={subtitle}>
            Top {rankings.length} players • Updated recently
          </div>
        )}
      </div>

      <div style={rankingsList}>
        {rankings.map((player, index) => {
          const isTop3 = parseInt(player.rank) <= 3;
          const trend = player.trend || 'Flat';
          
          return (
            <div key={player.id || index} style={rankingCard}>
              <div style={rankBadge(isTop3)}>
                {player.rank}
              </div>

              <div style={playerImageContainer}>
                <PlayerImage 
                  faceImageId={player.faceImageId} 
                  alt={player.name}
                  size="60px"
                  objectFit="cover"
                  objectPosition="center top"
                />
              </div>

              <div style={playerDetails}>
                <div style={playerName}>{player.name}</div>
                <div style={country}>{player.country || 'International'}</div>
              </div>

              <div style={ratingContainer}>
                <div style={rating}>{player.rating || player.points || 'N/A'}</div>
                {trend !== 'Flat' && (
                  <div style={trendIndicator(getTrendColor(trend))}>
                    {getTrendIcon(trend)}
                    {player.difference ? ` ${Math.abs(player.difference)}` : ''}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ICCRankingsComponent;

// Initialize the widget
if (typeof window !== 'undefined') {
  console.log('🎬 ICCRankings initializing...');
  const rootElement = document.getElementById('icc-rankings-root');
  
  if (rootElement) {
    console.log('✅ Found icc-rankings-root element');
    const root = createRoot(rootElement);
    root.render(<ICCRankingsComponent />);
    console.log('🎨 ICCRankings component rendered');
  } else {
    console.warn('❌ icc-rankings-root element not found');
  }
}
