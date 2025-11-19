import styled from 'styled-components';
import { colors, gradients, shadows, borderRadius, spacing, fontSize, fontWeight } from '../theme.js';

export const Container = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: ${spacing.md};
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

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing.sm};
  margin-top: ${spacing.md};
  margin-bottom: ${spacing.md};
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: ${spacing.sm};
  }
`;

export const NewsCard = styled.div`
  background: ${gradients.card};
  border-radius: ${borderRadius.medium};
  box-shadow: ${shadows.medium};
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${shadows.large};
  }
`;

export const NewsContent = styled.div`
  padding: ${spacing.sm};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.sm};
  gap: ${spacing.xs};
  flex-wrap: wrap;
`;

export const NewsType = styled.span`
  background: ${colors.primary};
  color: ${colors.textLight};
  padding: 2px 8px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: ${fontWeight.semibold};
  text-transform: uppercase;
`;

export const NewsDate = styled.span`
  color: ${colors.textGray};
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const NewsHeadline = styled.h3`
  font-size: ${fontSize.sm};
  font-weight: ${fontWeight.bold};
  color: ${colors.textDark};
  margin-bottom: ${spacing.sm};
  line-height: 1.3;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  
  &:hover {
    color: ${colors.primary};
  }
`;

export const NewsIntro = styled.p`
  font-size: ${fontSize.xs};
  color: ${colors.textGray};
  line-height: 1.5;
  margin-bottom: ${spacing.sm};
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const NewsFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${spacing.sm};
  border-top: 1px solid ${colors.gray200};
  flex-wrap: wrap;
  gap: ${spacing.xs};
`;

export const NewsContext = styled.span`
  font-size: 10px;
  color: ${colors.textGray};
  font-weight: ${fontWeight.medium};
  display: flex;
  align-items: center;
  gap: 2px;
`;

export const NewsSource = styled.span`
  font-size: 10px;
  color: ${colors.primary};
  font-weight: ${fontWeight.semibold};
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

export const LastUpdated = styled.div`
  text-align: center;
  margin-top: ${spacing.lg};
  padding-top: ${spacing.md};
  border-top: 1px solid ${colors.overlayMedium};
  color: ${colors.textMuted};
  font-size: 10px;
`;

export const AdPlaceholder = styled.div`
  background: ${colors.overlayLight};
  border: 2px dashed ${colors.overlayMedium};
  border-radius: ${borderRadius.medium};
  padding: ${spacing.xxl};
  text-align: center;
  color: ${colors.textMuted};
  font-size: ${fontSize.sm};
  font-style: italic;
`;
