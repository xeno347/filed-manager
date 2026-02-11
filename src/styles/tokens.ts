import {StyleSheet} from 'react-native';

export const palette = {
  bg: '#F3F4F6',
  card: '#FFFFFF',
  primary: '#10B981', // Farm Connect primary green (green-600)
  primaryDark: '#059669',
  muted: '#6B7280',
  mutedLight: '#E5E7EB',
  accent: '#10B981',
  shadow: 'rgba(2,6,23,0.06)',
  text: '#111827',
  textLight: '#6B7280',
  white: '#FFFFFF',
  red: '#EF4444',
  orange: '#F59E0B',
  blue: '#3B82F6',
};

export const spacing = {
  xs: 6,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
};

export const typography = {
  h1: 26,
  h2: 18,
  body: 15,
  small: 13,
};

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: palette.bg},
  card: {
    backgroundColor: palette.card,
    borderRadius: 16,
    padding: spacing.md,
    shadowColor: palette.shadow,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },
});
