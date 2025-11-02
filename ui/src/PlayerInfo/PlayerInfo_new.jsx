import React from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput } from '../hooks';
import PlayerImage from './PlayerImage';
import {
  Container,
  LoadingContainer,
  Card,
  HeaderCard,
  HeaderContent,
  PlayerInfo as PlayerInfoStyled,
  PlayerName as PlayerNameStyled,
  NickName,
  InfoGrid,
  InfoRow,
  Label,
  Badge,
  SectionTitle,
  RankingsGrid,
  RankingCard,
  RankingTitle,
  RankingItem,
  RankValue,
  RankDiff,
  PerformanceGrid,
  TableContainer,
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  TeamBadge,
  TeamContainer,
  BiographyContent,
} from './PlayerInfo.styles';

console.log('🎯 PlayerInfo module loaded');

const PlayerInfoComponent = () => {
  console.log('🏏 PlayerInfo rendering');
  
  const toolOutput = useToolOutput();
  
  console.log('📊 Tool output:', toolOutput);
  
  // If no data yet, show loading state
  if (!toolOutput) {
    return (
      <Container>
        <LoadingContainer>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏏</div>
          <div style={{ fontSize: '18px' }}>Loading player information...</div>
        </LoadingContainer>
      </Container>
    );
  }
  
  const {
    name,
    nickName,
    image,
    faceImageId,
    DoB,
    birthPlace,
    intlTeam,
    role,
    bat,
    bowl,
    bio,
    rankings,
    recentBatting,
    recentBowling,
    teamNameIds,
  } = toolOutput;
  
  return (
    <Container>
      {/* Header Card with Player Image */}
      <HeaderCard>
        <HeaderContent>
          <PlayerImage
            faceImageId={faceImageId}
            fallbackUrl={image}
            alt={name}
            style={{
              width: '128px',
              height: '128px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid #006385',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              flexShrink: 0,
            }}
          />
          <PlayerInfoStyled>
            <PlayerNameStyled>🏏 {name}</PlayerNameStyled>
            {nickName && nickName !== name && (
              <NickName>"{nickName}"</NickName>
            )}
            <InfoGrid>
              {role && (
                <InfoRow>
                  <Label>Role:</Label> <Badge $variant="role">{role}</Badge>
                </InfoRow>
              )}
              {intlTeam && (
                <InfoRow>
                  <Label>Team:</Label> <Badge $variant="team">{intlTeam}</Badge>
                </InfoRow>
              )}
              {DoB && (
                <InfoRow>
                  <Label>Born:</Label> <span>{DoB}</span>
                </InfoRow>
              )}
              {birthPlace && (
                <InfoRow>
                  <Label>Birthplace:</Label> <span>{birthPlace}</span>
                </InfoRow>
              )}
              {bat && (
                <InfoRow>
                  <Label>Batting:</Label> <span>{bat}</span>
                </InfoRow>
              )}
              {bowl && (
                <InfoRow>
                  <Label>Bowling:</Label> <span>{bowl}</span>
                </InfoRow>
              )}
            </InfoGrid>
          </PlayerInfoStyled>
        </HeaderContent>
      </HeaderCard>

      {/* Rankings Section */}
      {rankings && (rankings.bat || rankings.bowl || rankings.all) && (
        <>
          <SectionTitle>🏆 Rankings</SectionTitle>
          <RankingsGrid>
            {rankings.bat && Object.keys(rankings.bat).length > 0 && (
              <RankingCard $variant="batting">
                <RankingTitle $variant="batting">Batting</RankingTitle>
                {rankings.bat.odiRank && (
                  <RankingItem>
                    <strong>ODI:</strong>
                    <RankValue $bold $large>#{rankings.bat.odiRank}</RankValue>
                    {rankings.bat.odiDiffRank && (
                      <RankDiff $isNegative={rankings.bat.odiDiffRank.startsWith('-')}>
                        ({rankings.bat.odiDiffRank})
                      </RankDiff>
                    )}
                  </RankingItem>
                )}
                {rankings.bat.testBestRank && (
                  <RankingItem $size="small">
                    Test Best: #{rankings.bat.testBestRank}
                  </RankingItem>
                )}
              </RankingCard>
            )}
            
            {rankings.bowl && Object.keys(rankings.bowl).length > 0 && (
              <RankingCard $variant="bowling">
                <RankingTitle $variant="bowling">Bowling</RankingTitle>
                {rankings.bowl.odiRank && (
                  <RankingItem>
                    <strong>ODI:</strong>
                    <RankValue $bold $large>#{rankings.bowl.odiRank}</RankValue>
                    {rankings.bowl.odiDiffRank && (
                      <RankDiff $isNegative={rankings.bowl.odiDiffRank.startsWith('-')}>
                        ({rankings.bowl.odiDiffRank})
                      </RankDiff>
                    )}
                  </RankingItem>
                )}
                {rankings.bowl.testBestRank && (
                  <RankingItem $size="small">
                    Test Best: #{rankings.bowl.testBestRank}
                  </RankingItem>
                )}
              </RankingCard>
            )}
            
            {rankings.all && Object.keys(rankings.all).length > 0 && (
              <RankingCard $variant="allrounder">
                <RankingTitle $variant="allrounder">All-rounder</RankingTitle>
                {rankings.all.odiRank && (
                  <RankingItem>
                    <strong>ODI:</strong>
                    <RankValue $bold $large>#{rankings.all.odiRank}</RankValue>
                    {rankings.all.odiDiffRank && (
                      <RankDiff $isNegative={rankings.all.odiDiffRank.startsWith('-')}>
                        ({rankings.all.odiDiffRank})
                      </RankDiff>
                    )}
                  </RankingItem>
                )}
                {rankings.all.testBestRank && (
                  <RankingItem $size="small">
                    Test Best: #{rankings.all.testBestRank}
                  </RankingItem>
                )}
              </RankingCard>
            )}
          </RankingsGrid>
        </>
      )}

      {/* Recent Performance */}
      {(recentBatting || recentBowling) && (
        <>
          <SectionTitle>📊 Recent Performance</SectionTitle>
          <PerformanceGrid>
            {/* Recent Batting */}
            {recentBatting && recentBatting.rows && recentBatting.rows.length > 0 && (
              <Card>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#006385' }}>
                  🏏 Recent Batting
                </h3>
                <TableContainer>
                  <Table>
                    <TableHeader>
                      <tr>
                        {recentBatting.headers.map((header, idx) => (
                          <TableHeaderCell key={idx}>{header}</TableHeaderCell>
                        ))}
                      </tr>
                    </TableHeader>
                    <TableBody>
                      {recentBatting.rows.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{row.values[1]}</TableCell>
                          <TableCell $bold>{row.values[2]}</TableCell>
                          <TableCell>
                            <Badge $variant="format">{row.values[3]}</Badge>
                          </TableCell>
                          <TableCell $muted>{row.values[4]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            )}

            {/* Recent Bowling */}
            {recentBowling && recentBowling.rows && recentBowling.rows.length > 0 && (
              <Card>
                <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', color: '#006385' }}>
                  🎳 Recent Bowling
                </h3>
                <TableContainer>
                  <Table>
                    <TableHeader>
                      <tr>
                        {recentBowling.headers.map((header, idx) => (
                          <TableHeaderCell key={idx}>{header}</TableHeaderCell>
                        ))}
                      </tr>
                    </TableHeader>
                    <TableBody>
                      {recentBowling.rows.map((row, idx) => (
                        <TableRow key={idx}>
                          <TableCell>{row.values[1]}</TableCell>
                          <TableCell $bold>{row.values[2]}</TableCell>
                          <TableCell>
                            <Badge $variant="format">{row.values[3]}</Badge>
                          </TableCell>
                          <TableCell $muted>{row.values[4]}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            )}
          </PerformanceGrid>
        </>
      )}

      {/* Teams */}
      {teamNameIds && teamNameIds.length > 0 && (
        <>
          <SectionTitle>🏟️ Teams</SectionTitle>
          <Card>
            <TeamContainer>
              {teamNameIds.slice(0, 10).map((team) => (
                <TeamBadge key={team.teamId}>
                  {team.teamName}
                </TeamBadge>
              ))}
              {teamNameIds.length > 10 && (
                <span style={{ color: '#6b7280', padding: '6px 12px', fontSize: '13px' }}>
                  +{teamNameIds.length - 10} more
                </span>
              )}
            </TeamContainer>
          </Card>
        </>
      )}

      {/* Biography */}
      {bio && (
        <>
          <SectionTitle>📖 Biography</SectionTitle>
          <Card>
            <BiographyContent dangerouslySetInnerHTML={{ __html: bio }} />
          </Card>
        </>
      )}
    </Container>
  );
};

export default PlayerInfoComponent;

// Mount the component
console.log('🔍 Looking for mount point...');

// Keep a reference to the root to avoid creating multiple roots
let reactRoot = null;

function mountWidget() {
  // Try multiple mount points for flexibility
  const mountPoints = ['component-root', 'player-info-root'];
  let rootElement = null;
  
  for (const id of mountPoints) {
    rootElement = document.getElementById(id);
    if (rootElement) {
      console.log(`✅ Found mount point #${id}, rendering...`);
      
      // Only create root once, then reuse it
      if (!reactRoot) {
        reactRoot = createRoot(rootElement);
        console.log('🔧 Created new React root');
      }
      
      reactRoot.render(<PlayerInfoComponent />);
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
