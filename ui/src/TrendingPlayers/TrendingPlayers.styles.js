import styled from 'styled-components';
import { colors, gradients, shadows, borderRadius, spacing, fontSize, fontWeight } from '../theme.js';

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: ${spacing.sm};
  padding-bottom: ${spacing.xl};
  background: ${gradients.primary};
  border-radius: ${borderRadius.large};
  box-shadow: ${shadows.xlarge};
  color: ${colors.textLight};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  min-height: 80px;
  overflow: visible;
`;

export const Title = styled.h1`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.bold};
  margin-bottom: ${spacing.xs};
  text-align: left;
  color: ${colors.textLight};
  text-shadow: ${shadows.textShadow};
`;

export const Category = styled.h2`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  text-align: left;
  margin-bottom: ${spacing.md};
  color: ${colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const PlayersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
  
  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing.sm};
  }
`;

export const PlayerCard = styled.div`
  background: ${gradients.card};
  border-radius: ${borderRadius.medium};
  box-shadow: ${shadows.medium};
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${spacing.md};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.large};
  }
`;

export const PlayerImageWrapper = styled.div`
  margin-bottom: ${spacing.sm};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PlayerInfo = styled.div`
  text-align: center;
  width: 100%;
`;

export const PlayerName = styled.h3`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.bold};
  color: ${colors.textDark};
  margin: 0 0 ${spacing.xs} 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.6em;
`;

export const TeamName = styled.div`
  font-size: ${fontSize.xs};
  color: ${colors.textGray};
  font-weight: ${fontWeight.medium};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const TeamFlag = styled.span`
  font-size: ${fontSize.xs};
`;

export const EmptyState = styled.div`
  padding: ${spacing.md};
  padding-bottom: ${spacing.lg};
  text-align: center;
  color: ${colors.textLight};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.medium};
  min-height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
