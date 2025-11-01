import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding: 24px;
  background-color: ${props => props.$isDark ? '#111827' : '#ffffff'};
  color: ${props => props.$isDark ? '#ffffff' : '#111827'};
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  color: #6b7280;
`;

export const Card = styled.div`
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 24px;
  background-color: ${props => props.$isDark ? '#1f2937' : '#ffffff'};
`;

export const HeaderCard = styled(Card)`
  background: ${props => props.$isDark 
    ? '#1f2937' 
    : 'linear-gradient(to right, #eff6ff, #eef2ff)'};
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const PlayerImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #3b82f6;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 160px;
    height: 160px;
  }
`;

export const PlayerInfo = styled.div`
  flex: 1;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const PlayerName = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 8px;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const NickName = styled.p`
  font-size: 1.125rem;
  color: ${props => props.$isDark ? '#9ca3af' : '#4b5563'};
  margin-bottom: 12px;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 16px;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Label = styled.span`
  font-weight: 600;
`;

export const Badge = styled.span`
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: ${props => {
    if (props.$variant === 'role') {
      return props.$isDark ? '#1e3a8a' : '#dbeafe';
    }
    if (props.$variant === 'team') {
      return props.$isDark ? '#14532d' : '#dcfce7';
    }
    if (props.$variant === 'format') {
      return props.$isDark ? '#374151' : '#f3f4f6';
    }
    return props.$isDark ? '#374151' : '#f3f4f6';
  }};
  color: ${props => {
    if (props.$variant === 'role') {
      return props.$isDark ? '#bfdbfe' : '#1e40af';
    }
    if (props.$variant === 'team') {
      return props.$isDark ? '#bbf7d0' : '#15803d';
    }
    return 'inherit';
  }};
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RankingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const RankingCard = styled.div`
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => {
    if (props.$variant === 'batting') {
      return props.$isDark ? '#374151' : '#eff6ff';
    }
    if (props.$variant === 'bowling') {
      return props.$isDark ? '#374151' : '#f0fdf4';
    }
    if (props.$variant === 'allrounder') {
      return props.$isDark ? '#374151' : '#faf5ff';
    }
    return props.$isDark ? '#374151' : '#f3f4f6';
  }};
`;

export const RankingTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 8px;
  color: ${props => {
    if (props.$variant === 'batting') {
      return props.$isDark ? '#93c5fd' : '#2563eb';
    }
    if (props.$variant === 'bowling') {
      return props.$isDark ? '#86efac' : '#16a34a';
    }
    if (props.$variant === 'allrounder') {
      return props.$isDark ? '#d8b4fe' : '#9333ea';
    }
    return 'inherit';
  }};
`;

export const RankingItem = styled.div`
  margin-bottom: 4px;
  font-size: ${props => props.$size === 'small' ? '0.875rem' : '1rem'};
`;

export const RankValue = styled.span`
  margin-left: 8px;
  font-weight: ${props => props.$bold ? 'bold' : '600'};
  font-size: ${props => props.$large ? '1.125rem' : 'inherit'};
`;

export const RankDiff = styled.span`
  margin-left: 8px;
  font-size: 0.875rem;
  color: ${props => props.$isNegative ? '#ef4444' : '#22c55e'};
`;

export const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const TableContainer = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  font-size: 0.875rem;
`;

export const TableHeader = styled.thead`
  border-bottom: 1px solid ${props => props.$isDark ? '#374151' : '#e5e7eb'};
`;

export const TableHeaderCell = styled.th`
  text-align: left;
  padding: 8px;
  font-weight: 600;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${props => props.$isDark ? '#374151' : '#f3f4f6'};
`;

export const TableCell = styled.td`
  padding: 8px;
  font-weight: ${props => props.$bold ? '600' : 'normal'};
  color: ${props => props.$muted ? (props.$isDark ? '#9ca3af' : '#4b5563') : 'inherit'};
`;

export const TeamBadge = styled.span`
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: ${props => props.$isDark ? '#374151' : '#f3f4f6'};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.$isDark ? '#4b5563' : '#e5e7eb'};
  }
`;

export const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const BiographyContent = styled.div`
  max-width: none;
  line-height: 1.75;

  b {
    font-weight: 600;
  }

  br {
    margin-bottom: 8px;
  }

  i {
    font-style: italic;
    color: ${props => props.$isDark ? '#9ca3af' : '#6b7280'};
  }
`;
