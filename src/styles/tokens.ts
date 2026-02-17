import {StyleSheet} from 'react-native';

// Adidas-inspired Design System
export const palette = {
  bg: '#FFFFFF',
  bgSecondary: '#F5F5F5',
  card: '#FFFFFF',
  primary: '#000000', // Adidas signature black
  primaryDark: '#2D2D2D',
  accent: '#00A859', // Adidas green
  accentSecondary: '#0066CC', // Adidas blue
  shadow: 'rgba(0,0,0,0.15)',
  text: '#000000',
  textLight: '#767676',
  textLighter: '#AAAAAA',
  white: '#FFFFFF',
  black: '#000000',
  red: '#E32934',
  orange: '#FF6900',
  blue: '#0066CC',
  success: '#00A859',
  border: '#E5E5E5',
};

export const spacing = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Adidas uses bold, impactful typography
export const typography = {
  hero: 36, // Hero headings
  h1: 28, // Large headings
  h2: 22, // Section titles
  h3: 18, // Subsections
  body: 16, // Body text
  small: 14, // Small text
  tiny: 12, // Tiny labels
};

// Adidas favors bold, heavy weights
export const fontWeights = {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  heavy: '800',
  black: '900',
};

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: palette.bg},
  card: {
    backgroundColor: palette.card,
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: palette.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  shadowSmall: {
    shadowColor: palette.shadow,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  shadowMedium: {
    shadowColor: palette.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 4,
  },
});
