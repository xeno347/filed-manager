import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {Appearance} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  isDark: boolean;
  theme: ThemeMode;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const lightColors = {
  // Nike-style Light Theme
  bg: '#FFFFFF',
  bgSecondary: '#F8FAFC',
  card: '#FFFFFF',
  cardElevated: '#F3F4F6',
  primary: '#10B981', // Nike green
  primaryDark: '#059669',
  accent: '#2563EB', // Nike blue
  accentSecondary: '#F59E42', // Nike orange
  shadow: 'rgba(16,185,129,0.10)',
  text: '#000000',
  textSecondary: '#727272',
  textTertiary: '#BDBDBD',
  white: '#FFFFFF',
  black: '#000000',
  border: '#E5E7EB',
  borderLight: '#F3F4F6',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E42',
  info: '#2563EB',
  
  // Badge backgrounds
  successBg: '#DCFCE7',
  errorBg: '#FEE2E2',
  warningBg: '#FEF3C7',
  infoBg: '#E0F2FE',
  
  // Semantic colors
  pending: '#F59E42',
  approved: '#10B981',
  rejected: '#EF4444',
  inProgress: '#2563EB',
  completed: '#10B981',
  
  // Priority colors
  high: '#EF4444',
  medium: '#F59E42',
  low: '#10B981',
};

const darkColors = {
  // Nike-style Dark Theme
  bg: '#18181B',
  bgSecondary: '#232326',
  card: '#232326',
  cardElevated: '#2A2A2E',
  primary: '#10B981',
  primaryDark: '#059669',
  accent: '#2563EB',
  accentSecondary: '#F59E42',
  shadow: 'rgba(16,185,129,0.20)',
  text: '#FFFFFF',
  textSecondary: '#BDBDBD',
  textTertiary: '#727272',
  white: '#FFFFFF',
  black: '#000000',
  border: '#232326',
  borderLight: '#18181B',
  
  // Status colors
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E42',
  info: '#2563EB',
  
  // Badge backgrounds
  successBg: '#134E3A',
  errorBg: '#7F1D1D',
  warningBg: '#78350F',
  infoBg: '#1E3A8A',
  
  // Semantic colors
  pending: '#F59E42',
  approved: '#10B981',
  rejected: '#EF4444',
  inProgress: '#2563EB',
  completed: '#10B981',
  
  // Priority colors
  high: '#EF4444',
  medium: '#F59E42',
  low: '#10B981',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = '@app_theme_mode';

export function ThemeProvider({children}: {children: ReactNode}) {
  const [theme, setTheme] = useState<ThemeMode>('light');

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme === 'light' || savedTheme === 'dark') {
        setTheme(savedTheme);
      } else {
        const systemTheme = Appearance.getColorScheme();
        setTheme(systemTheme === 'dark' ? 'dark' : 'light');
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const colors = theme === 'dark' ? darkColors : lightColors;
  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{isDark, theme, toggleTheme, colors}}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
