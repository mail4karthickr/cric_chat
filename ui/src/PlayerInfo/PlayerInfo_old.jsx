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
  PlayerInfo,
  PlayerName,
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
            }}
          />
          <PlayerInfo>
            <PlayerName>🏏 {name}</PlayerName>
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
          </PlayerInfo>
        </HeaderContent>
      </HeaderCard>

      {/* Rankings Section */}
      {rankings && (rankings.bat || rankings.bowl || rankings.all) && (
        <>
          <SectionTitle>🏆 Rankings</SectionTitle>
          <RankingsGrid>
                  </div>
                )}
                {rankings.bat.odiBestRank && (
                  <div style={{ fontSize: '13px', color: colors.textSecondary }}>
                    ODI Best: #{rankings.bat.odiBestRank}
                  </div>
                )}
                {rankings.bat.t20BestRank && (
                  <div style={{ fontSize: '13px', color: colors.textSecondary }}>
                    T20 Best: #{rankings.bat.t20BestRank}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Performances */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
        {/* Recent Batting */}
        {recentBatting && recentBatting.rows && recentBatting.rows.length > 0 && (
          <div style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '20px',
          }}>
            <h2 style={{
              margin: '0 0 16px 0',
              fontSize: '20px',
              color: colors.text,
              fontWeight: 600,
            }}>
              📊 Recent Batting
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
              }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                    {recentBatting.headers.map((header, idx) => (
                      <th key={idx} style={{
                        padding: '12px 8px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: colors.textSecondary,
                      }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBatting.rows.map((row, idx) => (
                    <tr key={idx} style={{
                      borderBottom: `1px solid ${colors.border}`,
                    }}>
                      <td style={{ padding: '12px 8px' }}>{row.values[1]}</td>
                      <td style={{ padding: '12px 8px', fontWeight: 600 }}>{row.values[2]}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          background: colors.accentLight,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}>
                          {row.values[3]}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', color: colors.textSecondary }}>
                        {row.values[4]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Bowling */}
        {recentBowling && recentBowling.rows && recentBowling.rows.length > 0 && (
          <div style={{
            background: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: '12px',
            padding: '20px',
          }}>
            <h2 style={{
              margin: '0 0 16px 0',
              fontSize: '20px',
              color: colors.text,
              fontWeight: 600,
            }}>
              🎳 Recent Bowling
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '14px',
              }}>
                <thead>
                  <tr style={{ borderBottom: `2px solid ${colors.border}` }}>
                    {recentBowling.headers.map((header, idx) => (
                      <th key={idx} style={{
                        padding: '12px 8px',
                        textAlign: 'left',
                        fontWeight: 600,
                        color: colors.textSecondary,
                      }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentBowling.rows.map((row, idx) => (
                    <tr key={idx} style={{
                      borderBottom: `1px solid ${colors.border}`,
                    }}>
                      <td style={{ padding: '12px 8px' }}>{row.values[1]}</td>
                      <td style={{ padding: '12px 8px', fontWeight: 600 }}>{row.values[2]}</td>
                      <td style={{ padding: '12px 8px' }}>
                        <span style={{
                          background: colors.accentLight,
                          padding: '4px 8px',
                          borderRadius: '4px',
                          fontSize: '12px',
                        }}>
                          {row.values[3]}
                        </span>
                      </td>
                      <td style={{ padding: '12px 8px', color: colors.textSecondary }}>
                        {row.values[4]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Teams */}
      {teamNameIds && teamNameIds.length > 0 && (
        <div style={{
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginTop: '16px',
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            fontSize: '20px',
            color: colors.text,
            fontWeight: 600,
          }}>
            🏟️ Teams
          </h2>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}>
            {teamNameIds.slice(0, 10).map((team) => (
              <span key={team.teamId} style={{
                background: colors.accentLight,
                color: isDark ? colors.text : colors.accent,
                padding: '6px 12px',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: 500,
              }}>
                {team.teamName}
              </span>
            ))}
            {teamNameIds.length > 10 && (
              <span style={{
                color: colors.textSecondary,
                padding: '6px 12px',
                fontSize: '13px',
              }}>
                +{teamNameIds.length - 10} more
              </span>
            )}
          </div>
        </div>
      )}

      {/* Biography */}
      {bio && (
        <div style={{
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginTop: '16px',
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            fontSize: '20px',
            color: colors.text,
            fontWeight: 600,
          }}>
            📖 Biography
          </h2>
          <div 
            style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: colors.text,
            }}
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        </div>
      )}
    </div>
  );
};

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
