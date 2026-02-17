import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from './Icon';
import {spacing} from '../styles/tokens';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../context/ThemeContext';

const {width} = Dimensions.get('window');

export default function BottomNav({state, descriptors, navigation}: any) {
  const focusedIndex = state.index;
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(spacing.sm, (insets.bottom || 0) + spacing.sm);
  const {colors, isDark} = useTheme();

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom ? 0 : spacing.sm}]} pointerEvents="box-none">
      <View style={[styles.bar, {paddingBottom, backgroundColor: colors.card, borderTopColor: colors.border}]}> 
        {state.routes.map((route: any, idx: number) => {
          const focused = focusedIndex === idx;
          const label = route.name;

          // render center Home button specially
          if (label === 'Home') {
            return (
              <View key={label} style={styles.homeSlot}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Home')}
                  activeOpacity={0.85}
                  style={styles.homeOuter}
                >
                  <Animatable.View
                    animation={focused ? 'pulse' : undefined}
                    iterationCount={focused ? 'infinite' : 1}
                    duration={1500}
                    style={[styles.homeShadow, {shadowColor: colors.primary}]}
                  >
                    <LinearGradient 
                      colors={[colors.primary, colors.accent]} 
                      style={styles.homeButton}
                    >
                      <Icon name={'home'} size={28} color={colors.white} />
                    </LinearGradient>
                  </Animatable.View>
                </TouchableOpacity>
              </View>
            );
          }

          // other tabs
          return (
            <TouchableOpacity
              key={label}
              style={styles.item}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.7}
            >
              <Animatable.View
                animation={focused ? 'bounceIn' : 'fadeOut'}
                duration={300}
                style={[styles.iconContainer, focused && {backgroundColor: isDark ? colors.accentSecondary + '22' : '#F0FDF4'}]}
              >
                <Icon 
                  name={mapIconName(label)} 
                  size={24} 
                  color={focused ? colors.primary : colors.textTertiary} 
                />
              </Animatable.View>
              <Text style={[styles.label, {color: focused ? colors.primary : colors.textTertiary}]}> 
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function mapIconName(routeName: string) {
  switch (routeName) {
    case 'Tasks':
      return 'check-square';
    case 'Harvest':
      return 'wheat';
    case 'Request':
      return 'file-text';
    case 'Profile':
      return 'user';
    default:
      return 'circle';
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    zIndex: 50,
  },
  bar: {
    flexDirection: 'row',
    // backgroundColor and borderTopColor are set dynamically
    borderTopWidth: 1,
    width: '100%',
    paddingTop: spacing.md,
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  },
  item: {
    alignItems: 'center',
    width: (width - 120) / 4,
    paddingVertical: spacing.sm,
  },
  iconContainer: {
    padding: spacing.sm,
    borderRadius: 12,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: 11,
    marginTop: spacing.xs,
    fontWeight: '600',
    textAlign: 'center',
  },
  // Home Button
  homeSlot: {
    alignItems: 'center',
    width: 100,
    marginTop: -32,
  },
  homeOuter: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  homeShadow: {
    width: 72,
    height: 72,
    borderRadius: 36,
    // shadowColor is set dynamically
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
  },
  homeButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
});