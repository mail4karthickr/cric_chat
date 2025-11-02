import React from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput } from '../hooks.js';
import NewsImage from './NewsImage.jsx';
import {
  Container,
  Title,
  PlayerName,
  PlayerLink,
  NewsGrid,
  NewsCard,
  NewsContent,
  NewsHeader,
  NewsType,
  NewsDate,
  NewsHeadline,
  NewsIntro,
  NewsFooter,
  NewsContext,
  NewsSource,
  EmptyState,
  LastUpdated,
  AdPlaceholder
} from './PlayerNews.styles.js';

console.log('📰 PlayerNews module loaded');

const PlayerNewsComponent = () => {
  console.log('📰 PlayerNews rendering');
  const toolOutput = useToolOutput();
  console.log('📊 Tool output:', toolOutput);
  
  return <PlayerNews data={toolOutput} title="Latest News & Updates" />;
};

const PlayerNews = ({ data, title = "Latest News & Updates" }) => {
  if (!data) {
    return (
      <Container>
        <EmptyState>📰 Loading News...</EmptyState>
      </Container>
    );
  }

  const { storyList, lastUpdatedTime, appIndex } = data;
  const playerTitle = appIndex?.seoTitle;
  const webURL = appIndex?.webURL;

  if (!storyList || storyList.length === 0) {
    return (
      <Container>
        <Title>📰 {title}</Title>
        {playerTitle && <PlayerName>{playerTitle}</PlayerName>}
        <EmptyState>No news available at the moment</EmptyState>
      </Container>
    );
  }

  // Function to format timestamp to readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    const date = new Date(parseInt(timestamp));
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else if (diffInDays < 7) {
      return `${diffInDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    }
  };

  // Function to get icon for story type
  const getStoryTypeIcon = (storyType) => {
    const icons = {
      'News': '📰',
      'Match Features': '🏆',
      'Features': '📝',
      'Reports': '📊',
      'Interviews': '🎤',
      'Analysis': '🔍',
      'Opinion': '💭'
    };
    return icons[storyType] || '📰';
  };

  return (
    <Container style={{
      userSelect: 'none',
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      msUserSelect: 'none'
    }}>
      <Title>📰 {title}</Title>
      
      {/* Player Information */}
      {playerTitle && <PlayerName>{playerTitle}</PlayerName>}
      {webURL && (
        <PlayerLink href={webURL} target="_blank" rel="noopener noreferrer">
          🔗 View on Cricbuzz
        </PlayerLink>
      )}

      {/* News Grid */}
      <NewsGrid>
        {storyList.map((item, index) => {
          // Skip Ad items - don't render them
          if (item.ad) {
            return null;
          }

          // Handle Story items
          if (item.story) {
            const story = item.story;
            return (
              <NewsCard key={story.id || index}>
                {/* Cover Image */}
                {story.coverImage && (
                  <NewsImage 
                    imageId={story.coverImage.id || story.imageId}
                    caption={story.coverImage.caption}
                    source={story.coverImage.source}
                    alt={story.hline}
                  />
                )}
                
                <NewsContent>
                  {/* Header with Story Type and Date */}
                  <NewsHeader>
                    <NewsType>
                      {getStoryTypeIcon(story.storyType)} {story.storyType}
                    </NewsType>
                    <NewsDate>
                      🕒 {formatDate(story.pubTime)}
                    </NewsDate>
                  </NewsHeader>

                  {/* Headline */}
                  <NewsHeadline>{story.hline}</NewsHeadline>

                  {/* Intro/Summary */}
                  {story.intro && (
                    <NewsIntro>{story.intro}</NewsIntro>
                  )}

                  {/* Footer with Context and Source */}
                  <NewsFooter>
                    {story.context && (
                      <NewsContext>
                        🏏 {story.context}
                      </NewsContext>
                    )}
                    {story.source && (
                      <NewsSource>
                        {story.source}
                      </NewsSource>
                    )}
                  </NewsFooter>
                </NewsContent>
              </NewsCard>
            );
          }

          return null;
        })}
      </NewsGrid>

      {/* Last Updated Time */}
      {lastUpdatedTime && (
        <LastUpdated>
          Last updated: {new Date(parseInt(lastUpdatedTime)).toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </LastUpdated>
      )}
    </Container>
  );
};

// Initialize the component
try {
  console.log('🚀 Initializing PlayerNews component...');
  const container = document.getElementById('player-news-root');
  if (!container) {
    throw new Error('Could not find player-news-root element');
  }
  
  console.log('📍 Found container:', container);
  const root = createRoot(container);
  console.log('🌱 Created React root');
  
  root.render(<PlayerNewsComponent />);
  console.log('✅ PlayerNews component rendered successfully');
} catch (error) {
  console.error('❌ Error initializing PlayerNews:', error);
}

export default PlayerNews;
