export const container = {
  maxWidth: '500px',
  width: '100%',
  margin: '0 auto',
  padding: '16px',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  backgroundColor: '#ffffff',
};

export const header = {
  marginBottom: '16px',
  borderBottom: '2px solid #667eea',
  paddingBottom: '8px',
};

export const title = {
  fontSize: '1.25rem',
  fontWeight: 700,
  color: '#1e293b',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

export const subtitle = {
  fontSize: '0.75rem',
  color: '#64748b',
  marginTop: '4px',
};

export const rankingsList = {
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  maxHeight: '600px',
  overflowY: 'auto',
};

export const rankingCard = {
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  gap: '16px',
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  transition: 'all 0.2s ease-in-out',
  cursor: 'pointer',
};

export const rankBadge = (isTop3) => ({
  minWidth: '38px',
  height: '38px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 700,
  fontSize: '1rem',
  borderRadius: '50%',
  backgroundColor: isTop3 ? '#667eea' : '#ffffff',
  color: isTop3 ? '#ffffff' : '#1e293b',
  border: isTop3 ? 'none' : '2px solid #e2e8f0',
});

export const playerImageContainer = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  overflow: 'hidden',
  border: '2px solid #e2e8f0',
  flexShrink: 0,
  backgroundColor: '#ffffff',
};

export const playerImage = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
};

export const playerDetails = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  minWidth: 0,
};

export const playerName = {
  fontSize: '0.95rem',
  fontWeight: 600,
  color: '#1e293b',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
};

export const country = {
  fontSize: '0.75rem',
  color: '#64748b',
};

export const ratingContainer = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  gap: '2px',
};

export const rating = {
  fontSize: '1.1rem',
  fontWeight: 700,
  color: '#667eea',
};

export const trendIndicator = (color) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '2px',
  fontSize: '0.7rem',
  fontWeight: 600,
  padding: '2px 6px',
  borderRadius: '10px',
  backgroundColor: color === '#22c55e' ? '#dcfce7' : 
                   color === '#ef4444' ? '#fee2e2' : '#f1f5f9',
  color: color,
});

export const emptyState = {
  textAlign: 'center',
  padding: '32px',
  color: '#64748b',
};

export const errorState = {
  textAlign: 'center',
  padding: '32px',
  color: '#dc2626',
  backgroundColor: '#fee2e2',
  borderRadius: '8px',
};

export const loadingState = {
  textAlign: 'center',
  padding: '32px',
  color: '#64748b',
};
