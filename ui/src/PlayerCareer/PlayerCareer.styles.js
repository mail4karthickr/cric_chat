import styled from 'styled-components';
import { colors, gradients, shadows, borderRadius, spacing, fontSize, fontWeight } from '../theme.js';

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: ${spacing.sm};
  padding-bottom: ${spacing.xl};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: ${gradients.primary};
  border-radius: ${borderRadius.large};
  box-shadow: ${shadows.xlarge};
  color: ${colors.textLight};
  min-height: 80px;
  overflow: visible;
`;

export const Title = styled.h1`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.bold};
  margin-bottom: ${spacing.sm};
  text-align: left;
  color: ${colors.textLight};
  text-shadow: ${shadows.textShadow};
`;

export const PlayerName = styled.h2`
  font-size: ${fontSize.md};
  font-weight: ${fontWeight.semibold};
  text-align: left;
  margin-bottom: ${spacing.xs};
  color: ${colors.textMuted};
`;

export const PlayerLink = styled.a`
  display: block;
  text-align: left;
  color: ${colors.textMuted};
  text-decoration: none;
  font-size: ${fontSize.xs};
  margin-bottom: ${spacing.lg};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${colors.textLight};
    text-decoration: underline;
  }
`;

export const CareerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${spacing.md};
  margin-top: ${spacing.md};
`;

export const FormatCard = styled.div`
  background: ${gradients.card};
  border-radius: ${borderRadius.medium};
  box-shadow: ${shadows.medium};
  padding: ${spacing.md};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.large};
  }
`;

export const FormatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing.sm};
  margin-bottom: ${spacing.md};
  padding-bottom: ${spacing.sm};
  border-bottom: 2px solid ${colors.gray200};
`;

export const FormatIcon = styled.div`
  font-size: ${fontSize.xl};
`;

export const FormatName = styled.h3`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.bold};
  color: ${colors.textDark};
  text-transform: uppercase;
  margin: 0;
`;

export const CareerInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.sm};
`;

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing.xs};
`;

export const InfoLabel = styled.div`
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  color: ${colors.textGray};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const InfoValue = styled.div`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.medium};
  color: ${colors.textDark};
  line-height: 1.4;
`;

export const NotPlayedBadge = styled.div`
  display: inline-block;
  background: ${colors.gray200};
  color: ${colors.textGray};
  padding: ${spacing.xs} ${spacing.sm};
  border-radius: ${borderRadius.small};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  font-style: italic;
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
