import styled from 'styled-components';
import theme from '../theme';

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: ${theme.spacing.sm};
  padding-bottom: ${theme.spacing.xl};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.xlarge};
  min-height: 80px;
  overflow: visible;
  
  * {
    user-select: none !important;
    -webkit-user-select: none !important;
    -moz-user-select: none !important;
    -ms-user-select: none !important;
  }
`;

export const Title = styled.h2`
  color: ${theme.colors.textLight};
  margin: 0 0 ${theme.spacing.xl} 0;
  font-size: ${theme.fontSize.xxl};
  font-weight: ${theme.fontWeight.bold};
  text-align: left;
  text-shadow: ${theme.shadows.textShadow};
  padding-left: ${theme.spacing.xxl};
  margin-left: 0;
`;

export const PlayerName = styled.h3`
  color: ${theme.colors.textLight};
  margin: 0 0 ${theme.spacing.sm} 0;
  font-size: ${theme.fontSize.lg};
  font-weight: ${theme.fontWeight.semibold};
  text-align: left;
  padding-left: ${theme.spacing.xxl};
  text-shadow: ${theme.shadows.textShadow};
`;

export const PlayerLink = styled.a`
  color: ${theme.colors.textLight};
  margin: 0 0 ${theme.spacing.lg} 0;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.normal};
  text-align: left;
  padding-left: ${theme.spacing.xxl};
  display: block;
  text-decoration: none;
  opacity: 0.9;
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`;

export const SeriesSelector = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  justify-content: center;
`;

export const SeriesButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: ${theme.borderRadius.small};
  background: ${props => props.active ? theme.colors.white : theme.colors.overlayMedium};
  color: ${props => props.active ? theme.colors.primary : theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: ${props => props.active ? theme.colors.white : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const TableWrapper = styled.div`
  overflow-x: auto;
  background: ${theme.gradients.card};
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.large};
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    height: 8px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${theme.colors.primary};
    border-radius: 4px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: ${theme.colors.primaryLight};
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
  background: ${theme.gradients.primary};
  position: sticky;
  top: 0;
  z-index: 10;
`;

export const HeaderCell = styled.th`
  padding: ${theme.spacing.md} ${theme.spacing.xs};
  text-align: center;
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.bold};
  color: ${theme.colors.textLight};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-bottom: 2px solid ${theme.colors.overlayMedium};
  white-space: nowrap;
  
  &:first-child {
    text-align: left;
    padding-left: ${theme.spacing.xl};
    min-width: 120px;
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f8f9fa;
  }
  
  tr:hover {
    background-color: #e6f4f9;
    transition: background-color 0.2s ease;
  }
`;

export const DataRow = styled.tr`
  border-bottom: 1px solid #e9ecef;
  
  &:last-child {
    border-bottom: none;
  }
`;

export const DataCell = styled.td`
  padding: ${theme.spacing.md} ${theme.spacing.xs};
  text-align: center;
  font-size: ${theme.fontSize.sm};
  color: #495057;
  
  &:first-child {
    text-align: left;
    padding-left: ${theme.spacing.xl};
    font-weight: ${theme.fontWeight.semibold};
    color: #212529;
  }
`;

export const EmptyState = styled.div`
  padding: ${theme.spacing.md};
  text-align: center;
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.medium};
`;

export const StatBadge = styled.span`
  display: inline-block;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.medium};
  font-weight: ${theme.fontWeight.bold};
  font-size: 13px;
  background: ${props => {
    if (props.type === '5w' || props.type === '10w') return 'linear-gradient(135deg, #006385 0%, #004A63 100%)';
    if (props.type === '4w') return 'linear-gradient(135deg, #0082AB 0%, #006385 100%)';
    return 'linear-gradient(135deg, #00A1D1 0%, #0082AB 100%)';
  }};
  color: ${theme.colors.textLight};
  box-shadow: 0 2px 8px ${theme.colors.overlayDarker};
  text-shadow: 0 1px 2px ${theme.colors.overlayLight};
`;

export const LoadingSpinner = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const ErrorMessage = styled.div`
  padding: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  backdrop-filter: blur(10px);
`;
