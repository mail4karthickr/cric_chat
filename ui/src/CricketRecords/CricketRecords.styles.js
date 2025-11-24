// CricketRecords.styles.js - Inline styles for cricket records component

export const container = {
  width: '100%',
  maxWidth: '680px',
  margin: '0 auto',
  padding: '16px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

export const header = {
  marginBottom: '16px',
  borderBottom: '2px solid #1976d2',
  paddingBottom: '12px',
};

export const title = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#1a1a1a',
  marginBottom: '8px',
};

export const subtitle = {
  fontSize: '0.875rem',
  color: '#666',
};

export const filterSection = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '16px',
  padding: '12px',
  backgroundColor: '#f5f5f5',
  borderRadius: '8px',
};

export const filterLabel = {
  fontSize: '0.875rem',
  fontWeight: 600,
  color: '#666',
  marginRight: '8px',
  alignSelf: 'center',
};

export const filterBadge = {
  display: 'inline-block',
  padding: '4px 12px',
  backgroundColor: '#1976d2',
  color: '#fff',
  borderRadius: '16px',
  fontSize: '0.75rem',
  fontWeight: 600,
  textTransform: 'uppercase',
};

export const tableContainer = {
  maxHeight: '500px',
  overflowY: 'auto',
  overflowX: 'auto',
  borderRadius: '8px',
  border: '1px solid #e0e0e0',
};

export const table = {
  width: '100%',
  borderCollapse: 'collapse',
  minWidth: '500px',
};

export const tableHeader = {
  position: 'sticky',
  top: 0,
  zIndex: 10,
  backgroundColor: '#1976d2',
};

export const tableHeaderCell = {
  color: '#fff',
  fontWeight: 700,
  fontSize: '0.875rem',
  padding: '12px',
  textAlign: 'left',
  borderBottom: '2px solid #1565c0',
  whiteSpace: 'nowrap',
};

export const tableBody = {
  backgroundColor: '#fff',
};

export const tableRow = {
  transition: 'background-color 0.2s ease',
  '&:nth-child(odd)': {
    backgroundColor: '#fafafa',
  },
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
};

export const tableCell = {
  padding: '12px',
  fontSize: '0.875rem',
  color: '#1a1a1a',
  borderBottom: '1px solid #e0e0e0',
  whiteSpace: 'nowrap',
};

export const rankCell = (isTop3) => ({
  ...tableCell,
  fontWeight: 700,
  color: isTop3 ? '#1976d2' : '#666',
  fontSize: isTop3 ? '1rem' : '0.875rem',
  width: '40px',
  textAlign: 'center',
});

export const playerCell = {
  ...tableCell,
  fontWeight: 600,
  color: '#1976d2',
};

export const highlightCell = {
  ...tableCell,
  fontWeight: 700,
  color: '#1976d2',
  fontSize: '0.9rem',
};

export const emptyState = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px',
  textAlign: 'center',
  color: '#999',
};

export const errorState = {
  padding: '24px',
  textAlign: 'center',
  color: '#d32f2f',
  backgroundColor: '#ffebee',
  borderRadius: '8px',
};

export const loadingState = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px',
  textAlign: 'center',
  color: '#666',
};
