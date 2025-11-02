import styled from 'styled-components';
import { colors, gradients, shadows, borderRadius, spacing, fontSize, fontWeight } from '../theme.js';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing.xl};
  background: ${gradients.primary};
  border-radius: ${borderRadius.large};
  box-shadow: ${shadows.xlarge};
  color: ${colors.textLight};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
`;

export const Title = styled.h1`
  font-size: ${fontSize.xxxl};
  font-weight: ${fontWeight.bold};
  margin-bottom: ${spacing.md};
  text-align: left;
  color: ${colors.textLight};
  text-shadow: ${shadows.textShadow};
`;

export const PlayerName = styled.h2`
  font-size: ${fontSize.xl};
  font-weight: ${fontWeight.semibold};
  text-align: left;
  margin-bottom: ${spacing.sm};
  color: ${colors.textMuted};
`;

export const PlayerLink = styled.a`
  display: block;
  text-align: left;
  color: ${colors.textMuted};
  text-decoration: none;
  font-size: ${fontSize.sm};
  margin-bottom: ${spacing.xxl};
  transition: all 0.3s ease;
  
  &:hover {
    color: ${colors.textLight};
    text-decoration: underline;
  }
`;

export const NewsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${spacing.xxl};
  margin-top: ${spacing.xxl};
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: ${spacing.lg};
  }
`;

export const NewsCard = styled.div`
  background: ${colors.white};
  border-radius: ${borderRadius.medium};
  box-shadow: ${shadows.large};
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${shadows.xlarge};
  }
`;

export const NewsContent = styled.div`
  padding: ${spacing.lg};
`;

export const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing.md};
  gap: ${spacing.sm};
  flex-wrap: wrap;
`;

export const NewsType = styled.span`
  background: ${colors.primary};
  color: ${colors.textLight};
  padding: 4px 12px;
  border-radius: 12px;
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.semibold};
  text-transform: uppercase;
`;

export const NewsDate = styled.span`
  color: ${colors.textGray};
  font-size: ${fontSize.xs};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const NewsHeadline = styled.h3`
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.bold};
  color: ${colors.textDark};
  margin-bottom: ${spacing.md};
  line-height: 1.4;
  text-align: left;
  
  &:hover {
    color: ${colors.primary};
  }
`;

export const NewsIntro = styled.p`
  font-size: ${fontSize.sm};
  color: ${colors.textGray};
  line-height: 1.6;
  margin-bottom: ${spacing.md};
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const NewsFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${spacing.md};
  border-top: 1px solid ${colors.gray200};
  flex-wrap: wrap;
  gap: ${spacing.sm};
`;

export const NewsContext = styled.span`
  font-size: ${fontSize.xs};
  color: ${colors.textGray};
  font-weight: ${fontWeight.medium};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const NewsSource = styled.span`
  font-size: ${fontSize.xs};
  color: ${colors.primary};
  font-weight: ${fontWeight.semibold};
`;

export const EmptyState = styled.div`
  padding: ${spacing.xxl};
  text-align: center;
  color: ${colors.textLight};
  font-size: ${fontSize.lg};
  font-weight: ${fontWeight.medium};
`;

export const LastUpdated = styled.div`
  text-align: center;
  margin-top: ${spacing.xxl};
  padding-top: ${spacing.lg};
  border-top: 1px solid ${colors.overlayMedium};
  color: ${colors.textMuted};
  font-size: ${fontSize.sm};
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
