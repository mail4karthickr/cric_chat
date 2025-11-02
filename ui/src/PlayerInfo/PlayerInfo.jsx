import React from 'react';
import { createRoot } from 'react-dom/client';
import { useToolOutput, useTheme } from '../hooks';
import PlayerImage from './PlayerImage';

console.log('🎯 PlayerInfo module loaded');

const PlayerInfoComponent = () => {
  console.log('🏏 PlayerInfo rendering');
  
  const toolOutput = useToolOutput();
  const theme = useTheme();
  const isDark = theme === 'dark';
  
  console.log('📊 Tool output:', toolOutput);
  console.log('🎨 Theme:', theme);
  
  // Colors based on theme
  const colors = {
    background: isDark ? '#1a1a1a' : '#f8f9fa',
    cardBg: isDark ? '#2d2d2d' : '#ffffff',
    headerBg: isDark ? '#1e3a1e' : '#e8f5e9',
    text: isDark ? '#ffffff' : '#000000',
    textSecondary: isDark ? '#a0a0a0' : '#6e6e6e',
    border: isDark ? '#3d3d3d' : '#e0e0e0',
    accent: '#4CAF50',
    accentLight: isDark ? '#2d5f2d' : '#c8e6c9',
  };
  
  // If no data yet, show loading state
  if (!toolOutput) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: colors.textSecondary,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏏</div>
        <div style={{ fontSize: '18px' }}>Loading player information...</div>
      </div>
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
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      background: colors.background,
      color: colors.text,
      padding: '16px',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      {/* Header Card with Player Image */}
      <div style={{
        background: colors.cardBg,
        border: `1px solid ${colors.border}`,
        borderRadius: '12px',
        padding: '24px',
        marginBottom: '16px',
        display: 'flex',
        gap: '24px',
        alignItems: 'start',
      }}>
        <PlayerImage
          faceImageId={faceImageId}
          fallbackUrl={image}
          alt={name}
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '8px',
            objectFit: 'cover',
            border: `3px solid ${colors.accent}`,
          }}
        />
        <div style={{ flex: 1 }}>
          <h1 style={{
            margin: '0 0 8px 0',
            fontSize: '32px',
            color: colors.accent,
            fontWeight: 700,
          }}>
            🏏 {name}
          </h1>
          {nickName && nickName !== name && (
            <div style={{
              fontSize: '14px',
              color: colors.textSecondary,
              marginBottom: '12px',
            }}>
              "{nickName}"
            </div>
          )}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            fontSize: '14px',
          }}>
            {role && (
              <div>
                <strong style={{ color: colors.accent }}>Role:</strong> {role}
              </div>
            )}
            {intlTeam && (
              <div>
                <strong style={{ color: colors.accent }}>Team:</strong> {intlTeam}
              </div>
            )}
            {DoB && (
              <div>
                <strong style={{ color: colors.accent }}>Born:</strong> {DoB}
              </div>
            )}
            {birthPlace && (
              <div>
                <strong style={{ color: colors.accent }}>Birthplace:</strong> {birthPlace}
              </div>
            )}
            {bat && (
              <div>
                <strong style={{ color: colors.accent }}>Batting:</strong> {bat}
              </div>
            )}
            {bowl && (
              <div>
                <strong style={{ color: colors.accent }}>Bowling:</strong> {bowl}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rankings Section */}
      {rankings && (rankings.bat || rankings.bowl || rankings.all) && (
        <div style={{
          background: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px',
        }}>
          <h2 style={{
            margin: '0 0 16px 0',
            fontSize: '20px',
            color: colors.text,
            fontWeight: 600,
          }}>
            🏆 Rankings
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}>
            {rankings.bat && Object.keys(rankings.bat).length > 0 && (
              <div style={{
                background: colors.accentLight,
                padding: '16px',
                borderRadius: '8px',
              }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', color: colors.accent }}>
                  Batting
                </h3>
                {rankings.bat.odiRank && (
                  <div style={{ marginBottom: '8px' }}>
                    <strong>ODI:</strong> #{rankings.bat.odiRank}
                    {rankings.bat.odiDiffRank && (
                      <span style={{ 
                        marginLeft: '8px',
                        color: rankings.bat.odiDiffRank.startsWith('-') ? '#f44336' : '#4CAF50',
                        fontSize: '12px',
                      }}>
                        ({rankings.bat.odiDiffRank})
                      </span>
                    )}
                  </div>
                )}
                {rankings.bat.testBestRank && (
                  <div style={{ fontSize: '13px', color: colors.textSecondary }}>
                    Test Best: #{rankings.bat.testBestRank}
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

function mountWidget() {
  // Try multiple mount points for flexibility
  const mountPoints = ['component-root', 'player-info-root'];
  let root = null;
  
  for (const id of mountPoints) {
    root = document.getElementById(id);
    if (root) {
      console.log(`✅ Found mount point #${id}, rendering...`);
      createRoot(root).render(<PlayerInfoComponent />);
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
