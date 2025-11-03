import React from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput } from '../hooks.js';
import {
  Container,
  Title,
  PlayerName,
  PlayerLink,
  CareerGrid,
  FormatCard,
  FormatHeader,
  FormatIcon,
  FormatName,
  CareerInfo,
  InfoRow,
  InfoLabel,
  InfoValue,
  NotPlayedBadge,
  EmptyState
} from './PlayerCareer.styles.js';

console.log('🏏 PlayerCareer module loaded');

const PlayerCareerComponent = () => {
  console.log('🏏 PlayerCareer rendering');
  const toolOutput = useToolOutput();
  console.log('📊 Tool output:', toolOutput);
  
  return <PlayerCareer data={toolOutput} title="Career Information" />;
};

const PlayerCareer = ({ data, title = "Career Information" }) => {
  if (!data) {
    return (
      <Container>
        <EmptyState>🏏 Loading Career Information...</EmptyState>
      </Container>
    );
  }

  const { values, appIndex } = data;
  const playerTitle = appIndex?.seoTitle;
  const webURL = appIndex?.webURL;

  if (!values || values.length === 0) {
    return (
      <Container>
        <Title>🏏 {title}</Title>
        {playerTitle && <PlayerName>{playerTitle}</PlayerName>}
        <EmptyState>No career information available</EmptyState>
      </Container>
    );
  }

  // Function to get format icon
  const getFormatIcon = (formatName) => {
    const icons = {
      'test': '🏏',
      'odi': '🌟',
      't20': '⚡',
      'ipl': '🏆',
      't20i': '⚡',
      'cl': '🎯',
      'firstclass': '📘',
      'lista': '📗',
      't20s': '📙'
    };
    return icons[formatName.toLowerCase()] || '🏏';
  };

  // Function to get format display name
  const getFormatDisplayName = (formatName) => {
    const names = {
      'test': 'Test',
      'odi': 'ODI',
      't20': 'T20I',
      'ipl': 'IPL',
      't20i': 'T20I',
      'cl': 'Champions League',
      'firstclass': 'First Class',
      'lista': 'List A',
      't20s': 'T20s'
    };
    return names[formatName.toLowerCase()] || formatName.toUpperCase();
  };

  // Check if format was not played
  const isNotPlayed = (format) => {
    return format.debut === 'Not played' || format.lastPlayed === 'Not played';
  };

  return (
    <Container style={{
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    }}>
      <Title>🏏 {title}</Title>
      
      {/* Player Information */}
      {playerTitle && <PlayerName>{playerTitle}</PlayerName>}
      {webURL && (
        <PlayerLink href={webURL} target="_blank" rel="noopener noreferrer">
          🔗 View on Cricbuzz
        </PlayerLink>
      )}

      {/* Career Grid */}
      <CareerGrid>
        {values.map((format, index) => (
          <FormatCard key={index}>
            <FormatHeader>
              <FormatIcon>{getFormatIcon(format.name)}</FormatIcon>
              <FormatName>{getFormatDisplayName(format.name)}</FormatName>
            </FormatHeader>
            
            {isNotPlayed(format) ? (
              <NotPlayedBadge>Not Played</NotPlayedBadge>
            ) : (
              <CareerInfo>
                <InfoRow>
                  <InfoLabel>🎬 Debut</InfoLabel>
                  <InfoValue>{format.debut}</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>🏁 Last Played</InfoLabel>
                  <InfoValue>{format.lastPlayed}</InfoValue>
                </InfoRow>
              </CareerInfo>
            )}
          </FormatCard>
        ))}
      </CareerGrid>
    </Container>
  );
};

// Initialize the component
try {
  console.log('🚀 Initializing PlayerCareer component...');
  const container = document.getElementById('player-career-root');
  if (!container) {
    throw new Error('Could not find player-career-root element');
  }
  
  console.log('📍 Found container:', container);
  const root = createRoot(container);
  console.log('🌱 Created React root');
  
  root.render(<PlayerCareerComponent />);
  console.log('✅ PlayerCareer component rendered successfully');
} catch (error) {
  console.error('❌ Error initializing PlayerCareer:', error);
}

export default PlayerCareer;
