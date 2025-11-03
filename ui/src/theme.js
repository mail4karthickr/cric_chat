/**
 * Centralized Theme Configuration for Cricket Chat UI
 * 
 * This file contains all shared colors, gradients, and styling constants
 * to ensure consistency across all components (Player Info, Batting Info, Bowling Info, etc.)
 */

export const colors = {
  // Primary Colors - Cyan/Teal Theme
  primary: '#006385',
  primaryLight: '#0082AB',
  primaryDark: '#004D66',
  primaryDarker: '#005571',
  
  // Background Colors
  white: '#ffffff',
  black: '#000000',
  gray50: '#f9fafb',
  gray100: '#f3f4f6',
  gray200: '#e5e7eb',
  gray300: '#d1d5db',
  gray400: '#9ca3af',
  gray500: '#6b7280',
  gray600: '#4b5563',
  gray700: '#374151',
  gray800: '#1f2937',
  gray900: '#111827',
  
  // Text Colors
  textDark: '#111827',
  textLight: '#ffffff',
  textGray: '#6B7280',
  textMuted: 'rgba(255, 255, 255, 0.9)',
  
  // Status Colors
  success: '#22c55e',
  successDark: '#16a34a',
  warning: '#F59E0B',
  error: '#ef4444',
  errorDark: '#dc2626',
  info: '#3B82F6',
  
  // Badge/Highlight Colors (Cyan/Teal variants)
  badgeRole: '#d1eef7',
  badgeTeam: '#c3e9f5',
  badgeFormat: '#e6f4f9',
  
  // Overlay Colors
  overlayLight: 'rgba(255, 255, 255, 0.1)',
  overlayMedium: 'rgba(255, 255, 255, 0.2)',
  overlayDark: 'rgba(0, 0, 0, 0.1)',
  overlayDarker: 'rgba(0, 0, 0, 0.2)',
};

export const gradients = {
  // Primary Gradient (used in all containers)
  primary: 'linear-gradient(135deg, #006385 0%, #0082AB 100%)',
  
  // Subtle gradients for cards/overlays
  overlay: 'linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  
  // Card background gradient (subtle gray)
  card: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
};

export const shadows = {
  small: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
  large: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  xlarge: '0 10px 40px rgba(0, 0, 0, 0.2)',
  
  // Text shadows
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
};

export const borderRadius = {
  small: '8px',
  medium: '12px',
  large: '16px',
  round: '50%',
};

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  xxl: '24px',
};

export const fontSize = {
  xs: '12px',
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '28px',
  xxxl: '32px',
};

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
};

// Common styled components properties
export const commonStyles = {
  // Container styles (used by all main containers)
  container: `
    margin: 0 auto;
    padding: ${spacing.xl};
    background: ${gradients.primary};
    border-radius: ${borderRadius.large};
    box-shadow: ${shadows.xlarge};
    color: ${colors.textLight};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  `,
  
  // Card styles (used for white content cards)
  card: `
    border-radius: ${borderRadius.medium};
    box-shadow: ${shadows.large};
    padding: ${spacing.xxl};
    background-color: ${colors.white};
    color: ${colors.textDark};
  `,
  
  // Loading/Empty state styles
  loadingState: `
    padding: ${spacing.md};
    text-align: center;
    color: ${colors.textLight};
    font-size: ${fontSize.sm};
  `,
  
  // Button styles
  button: `
    padding: 10px 20px;
    border: none;
    border-radius: ${borderRadius.small};
    font-size: ${fontSize.sm};
    font-weight: ${fontWeight.semibold};
    cursor: pointer;
    transition: all 0.3s ease;
  `,
  
  // Active button
  buttonActive: `
    background: ${colors.white};
    color: ${colors.primary};
  `,
  
  // Inactive button
  buttonInactive: `
    background: ${colors.overlayMedium};
    color: ${colors.textLight};
  `,
};

// Export everything as a default theme object as well
const theme = {
  colors,
  gradients,
  shadows,
  borderRadius,
  spacing,
  fontSize,
  fontWeight,
  commonStyles,
};

export default theme;
