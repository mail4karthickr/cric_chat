import styled from 'styled-components';
import theme from '../theme';

export const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.xl};
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.xlarge};
  color: ${theme.colors.textLight};
  min-height: 80px;
  overflow: visible;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.md};
  padding-bottom: ${theme.spacing.lg};
  text-align: center;
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.xs};
  min-height: 50px;
`;

export const Card = styled.div`
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.large};
  padding: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};
  background: ${theme.gradients.card};
  color: ${theme.colors.textDark};
`;

export const HeaderCard = styled(Card)`
  background: ${theme.gradients.card};
`;

export const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.xxl};

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

export const PlayerImage = styled.img`
  width: 128px;
  height: 128px;
  border-radius: ${theme.borderRadius.round};
  object-fit: cover;
  border: 4px solid ${theme.colors.primary};
  box-shadow: ${theme.shadows.large};
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
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.textDark};

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`;

export const NickName = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.textGray};
  margin-bottom: ${theme.spacing.md};
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};

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
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: ${props => {
    if (props.$variant === 'role') {
      return theme.colors.badgeRole;
    }
    if (props.$variant === 'team') {
      return theme.colors.badgeTeam;
    }
    if (props.$variant === 'format') {
      return theme.colors.badgeFormat;
    }
    return theme.colors.gray100;
  }};
  color: ${props => {
    if (props.$variant === 'role') {
      return theme.colors.primary;
    }
    if (props.$variant === 'team') {
      return theme.colors.primaryDarker;
    }
    return theme.colors.textDark;
  }};
`;

export const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: ${theme.fontWeight.bold};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.textLight};
  text-shadow: ${theme.shadows.textShadow};
`;

export const RankingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const RankingCard = styled.div`
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.medium};
  background-color: ${theme.colors.white};
  box-shadow: ${theme.shadows.medium};
`;

export const RankingTitle = styled.h3`
  font-weight: ${theme.fontWeight.semibold};
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.primary};
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
  margin-left: ${theme.spacing.sm};
  font-size: 0.875rem;
  color: ${props => props.$isNegative ? theme.colors.error : theme.colors.success};
`;

export const PerformanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.xxl};
  margin-bottom: ${theme.spacing.xxl};

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
  border-bottom: 1px solid ${theme.colors.gray200};
`;

export const TableHeaderCell = styled.th`
  text-align: left;
  padding: ${theme.spacing.sm};
  font-weight: ${theme.fontWeight.semibold};
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid ${theme.colors.gray100};
`;

export const TableCell = styled.td`
  padding: ${theme.spacing.sm};
  font-weight: ${props => props.$bold ? theme.fontWeight.semibold : theme.fontWeight.normal};
  color: ${props => props.$muted ? theme.colors.gray600 : theme.colors.textDark};
`;

export const TeamBadge = styled.span`
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: 9999px;
  font-size: 0.875rem;
  background-color: ${theme.colors.gray100};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${theme.colors.gray200};
  }
`;

export const TeamContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.sm};
`;

export const BiographyContent = styled.div`
  max-width: none;
  line-height: 1.75;
  color: ${theme.colors.textDark};

  b {
    font-weight: ${theme.fontWeight.semibold};
  }

  br {
    margin-bottom: ${theme.spacing.sm};
  }

  i {
    font-style: italic;
    color: ${theme.colors.gray500};
  }
`;
