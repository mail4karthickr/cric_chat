import React from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput } from '../hooks.js';
import PlayerImage from '../common/PlayerImage.jsx';
import {
  Container,
  Title,
  Category,
  PlayersGrid,
  PlayerCard,
  PlayerImageWrapper,
  PlayerInfo,
  PlayerName,
  TeamName,
  TeamFlag,
  EmptyState
} from './TrendingPlayers.styles.js';

console.log('🔥 TrendingPlayers module loaded');

const TrendingPlayersComponent = () => {
  console.log('🔥 TrendingPlayers rendering');
  const toolOutput = useToolOutput();
  console.log('📊 Tool output:', toolOutput);
  
  return <TrendingPlayers data={toolOutput} title="Trending Players" />;
};

const TrendingPlayers = ({ data, title = "Trending Players" }) => {
  if (!data) {
    return (
      <Container>
        <EmptyState>🔥 Loading Trending Players...</EmptyState>
      </Container>
    );
  }

  const { player, category } = data;

  if (!player || player.length === 0) {
    return (
      <Container>
        <Title>🔥 {title}</Title>
        {category && <Category>{category}</Category>}
        <EmptyState>No trending players available at the moment</EmptyState>
      </Container>
    );
  }

  // Function to get country flag emoji
  const getCountryFlag = (teamName) => {
    const flags = {
      'India': '🇮🇳',
      'Australia': '🇦🇺',
      'England': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
      'South Africa': '🇿🇦',
      'Pakistan': '🇵🇰',
      'New Zealand': '🇳🇿',
      'West Indies': '🏴‍☠️',
      'Sri Lanka': '🇱🇰',
      'Bangladesh': '🇧🇩',
      'Afghanistan': '🇦🇫',
      'Zimbabwe': '🇿🇼',
      'Ireland': '🇮🇪',
      'Netherlands': '🇳🇱',
      'Scotland': '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
      'UAE': '🇦🇪',
      'Oman': '🇴🇲',
      'Nepal': '🇳🇵',
      'USA': '🇺🇸',
      'Canada': '🇨🇦',
      'Kenya': '🇰🇪',
      'Namibia': '🇳🇦',
      'Papua New Guinea': '🇵🇬',
      'Cayman Islands': '🇰🇾'
    };
    return flags[teamName] || '🏏';
  };

  return (
    <Container style={{
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    }}>
      <Title>🔥 {title}</Title>
      {category && <Category>{category}</Category>}

      <PlayersGrid>
        {player.map((p, index) => (
          <PlayerCard key={p.id || index}>
            <PlayerImageWrapper>
              <PlayerImage 
                faceImageId={p.faceImageId}
                alt={p.name}
                size="small"
                rounded={true}
              />
            </PlayerImageWrapper>
            
            <PlayerInfo>
              <PlayerName>{p.name}</PlayerName>
              <TeamName>
                <TeamFlag>{getCountryFlag(p.teamName)}</TeamFlag>
                {p.teamName}
              </TeamName>
            </PlayerInfo>
          </PlayerCard>
        ))}
      </PlayersGrid>
    </Container>
  );
};

// Initialize the component
try {
  console.log('🚀 Initializing TrendingPlayers component...');
  const container = document.getElementById('trending-players-root');
  if (!container) {
    throw new Error('Could not find trending-players-root element');
  }
  
  console.log('📍 Found container:', container);
  const root = createRoot(container);
  console.log('🌱 Created React root');
  
  root.render(<TrendingPlayersComponent />);
  console.log('✅ TrendingPlayers component rendered successfully');
} catch (error) {
  console.error('❌ Error initializing TrendingPlayers:', error);
}

export default TrendingPlayers;
