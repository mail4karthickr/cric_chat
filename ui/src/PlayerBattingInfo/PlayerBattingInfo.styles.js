import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  
  * {
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
  }
`;

export const Title = styled.h2`
  color: #ffffff;
  margin: 0 0 20px 0;
  font-size: 28px;
  font-weight: 700;
  text-align: left;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding-left: 24px;
  margin-left: 0;
`;

export const SeriesSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const SeriesButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.active ? '#667eea' : '#ffffff'};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.active ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #764ba2;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-touch-callout: none;
  
  * {
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
  }
`;

export const TableHead = styled.thead`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const HeaderCell = styled.th`
  padding: 16px 12px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  
  &:first-child {
    padding-left: 24px;
    position: sticky;
    text-align: left;
    z-index: 11;
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  tr:hover {
    background-color: #e3e7f3;
    transition: background-color 0.2s ease;
  }
`;

export const DataRow = styled.tr`
  transition: all 0.2s ease;
`;

export const DataCell = styled.td`
  padding: 14px 12px;
  font-size: 14px;
  color: #333333;
  border-bottom: 1px solid #e0e0e0;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  
  &:first-child {
    font-weight: 600;
    color: #667eea;
    padding-left: 24px;
    position: sticky;
    left: 0;
    background: inherit;
    z-index: 1;
  }
  
  &:not(:first-child) {
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
`;

export const HighlightCell = styled(DataCell)`
  font-weight: 700;
  color: ${props => {
    const value = parseFloat(props.children);
    if (props.children === 'Runs' || props.children === 'Average' || props.children === 'SR') return '#667eea';
    if (!isNaN(value) && value > 100) return '#28a745';
    return '#333333';
  }};
`;

export const EmptyState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
`;

export const LoadingState = styled.div`
  padding: 60px 20px;
  text-align: center;
  color: #ffffff;
  font-size: 18px;
  
  &::after {
    content: '...';
    animation: dots 1.5s steps(4, end) infinite;
  }
  
  @keyframes dots {
    0%, 20% { content: '.'; }
    40% { content: '..'; }
    60%, 100% { content: '...'; }
  }
`;

export const StatBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background: ${props => {
    const value = parseFloat(props.children);
    if (props.type === '100s' && value > 0) return '#ffd700';
    if (props.type === '50s' && value > 0) return '#c0c0c0';
    return 'transparent';
  }};
  border-radius: 4px;
  font-weight: 700;
  color: ${props => {
    const value = parseFloat(props.children);
    if ((props.type === '100s' || props.type === '50s') && value > 0) return '#333';
    return 'inherit';
  }};
`;
