# Theme Usage Guide

## Overview

The centralized theme system allows all components to share the same color palette, spacing, typography, and styling constants. This ensures visual consistency across the entire Cricket Chat UI.

## Theme File Location

```
ui/src/theme.js
```

## How to Use the Theme

### 1. Import the Theme

In any styled component file, import the theme:

```javascript
import styled from 'styled-components';
import theme from '../theme';
```

### 2. Use Theme Variables

Instead of hardcoding values, reference the theme:

#### Before (Hardcoded):
```javascript
export const Container = styled.div`
  padding: 24px;
  background: linear-gradient(135deg, #006385 0%, #0082AB 100%);
  border-radius: 16px;
  color: #ffffff;
`;
```

#### After (Using Theme):
```javascript
export const Container = styled.div`
  padding: ${theme.spacing.xxl};
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.large};
  color: ${theme.colors.textLight};
`;
```

## Available Theme Properties

### Colors

```javascript
theme.colors.primary          // #006385 - Main brand color
theme.colors.primaryLight     // #0082AB - Lighter brand color
theme.colors.primaryDark      // #004D66 - Darker brand color
theme.colors.white            // #ffffff
theme.colors.textDark         // #111827 - Dark text on light backgrounds
theme.colors.textLight        // #ffffff - Light text on dark backgrounds
theme.colors.textGray         // #6B7280 - Muted text
theme.colors.success          // #10B981
theme.colors.warning          // #F59E0B
theme.colors.error            // #EF4444
```

### Gradients

```javascript
theme.gradients.primary       // Primary cyan/teal gradient
theme.gradients.overlay       // Subtle white overlay
```

### Shadows

```javascript
theme.shadows.small           // 0 2px 4px rgba(0, 0, 0, 0.1)
theme.shadows.medium          // 0 4px 6px rgba(0, 0, 0, 0.1)
theme.shadows.large           // 0 10px 15px -3px rgba(0, 0, 0, 0.1)
theme.shadows.xlarge          // 0 10px 40px rgba(0, 0, 0, 0.2)
theme.shadows.textShadow      // 0 2px 4px rgba(0, 0, 0, 0.2)
```

### Border Radius

```javascript
theme.borderRadius.small      // 8px
theme.borderRadius.medium     // 12px
theme.borderRadius.large      // 16px
theme.borderRadius.round      // 50% (for circular elements)
```

### Spacing

```javascript
theme.spacing.xs              // 4px
theme.spacing.sm              // 8px
theme.spacing.md              // 12px
theme.spacing.lg              // 16px
theme.spacing.xl              // 20px
theme.spacing.xxl             // 24px
```

### Font Sizes

```javascript
theme.fontSize.xs             // 12px
theme.fontSize.sm             // 14px
theme.fontSize.md             // 16px
theme.fontSize.lg             // 20px
theme.fontSize.xl             // 24px
theme.fontSize.xxl            // 28px
theme.fontSize.xxxl           // 32px
```

### Font Weights

```javascript
theme.fontWeight.normal       // 400
theme.fontWeight.medium       // 500
theme.fontWeight.semibold     // 600
theme.fontWeight.bold         // 700
```

## Common Style Patterns

### Container Pattern
For main component containers:

```javascript
export const Container = styled.div`
  margin: 0 auto;
  padding: ${theme.spacing.xl};
  background: ${theme.gradients.primary};
  border-radius: ${theme.borderRadius.large};
  box-shadow: ${theme.shadows.xlarge};
  color: ${theme.colors.textLight};
`;
```

### Card Pattern
For white content cards:

```javascript
export const Card = styled.div`
  border-radius: ${theme.borderRadius.medium};
  box-shadow: ${theme.shadows.large};
  padding: ${theme.spacing.xxl};
  background-color: ${theme.colors.white};
  color: ${theme.colors.textDark};
`;
```

### Loading State Pattern
For loading/empty states:

```javascript
export const EmptyState = styled.div`
  padding: ${theme.spacing.md};
  text-align: center;
  color: ${theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
`;
```

### Button Pattern
For interactive buttons:

```javascript
export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: ${theme.borderRadius.small};
  background: ${props => props.active ? theme.colors.white : theme.colors.overlayMedium};
  color: ${props => props.active ? theme.colors.primary : theme.colors.textLight};
  font-size: ${theme.fontSize.sm};
  font-weight: ${theme.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.3s ease;
`;
```

## Migration Checklist

When updating an existing component to use the theme:

- [ ] Import theme: `import theme from '../theme';`
- [ ] Replace hardcoded colors with `theme.colors.*`
- [ ] Replace hardcoded gradients with `theme.gradients.*`
- [ ] Replace hardcoded spacing (px values) with `theme.spacing.*`
- [ ] Replace hardcoded font sizes with `theme.fontSize.*`
- [ ] Replace hardcoded font weights with `theme.fontWeight.*`
- [ ] Replace hardcoded border radius with `theme.borderRadius.*`
- [ ] Replace hardcoded shadows with `theme.shadows.*`

## Benefits

✅ **Consistency** - All components use the same design system
✅ **Maintainability** - Change colors/spacing in one place
✅ **Scalability** - Easy to add new components with the same theme
✅ **Dark Mode Ready** - Easy to add theme variants in the future
✅ **Professional** - Unified brand identity across the app

## Example: Complete Component Migration

See `/ui/src/PlayerInfo/PlayerInfo.styles.js` for a complete example of a component using the centralized theme.

## Future Enhancements

- Theme variants (dark mode, high contrast)
- Responsive breakpoints
- Animation durations
- Z-index scale
