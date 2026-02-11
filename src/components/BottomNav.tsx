import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Icon from './Icon';
import {palette} from '../styles/tokens';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

export default function BottomNav({state, descriptors, navigation}: any) {
  const focusedIndex = state.index;
  const insets = useSafeAreaInsets();
  const paddingBottom = Math.max(10, (insets.bottom || 0) + 10);

  return (
    <View style={[styles.container, {paddingBottom: insets.bottom ? 0 : 8}]} pointerEvents="box-none">
      <View style={[styles.bar, {paddingBottom}]}>
        {state.routes.map((route: any, idx: number) => {
          const focused = focusedIndex === idx;
          const label = route.name;

          // render center Home button specially
          if (label === 'Home') {
            return (
              <View key={label} style={styles.homeSlot}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Home')}
                  activeOpacity={0.92}
                  style={styles.homeOuter}
                >
                  <Animatable.View
                    animation={focused ? 'pulse' : undefined}
                    iterationCount={focused ? 'infinite' : 1}
                    style={styles.homeShadow}
                  >
                    <View style={styles.homeRing}>
                      <LinearGradient colors={[palette.primary, '#059669']} style={styles.homeButton}>
                        <Icon name={'home'} size={28} color={palette.white} />
                      </LinearGradient>
                    </View>
                  </Animatable.View>
                </TouchableOpacity>
                {/* hide label when Home is active to match mock */}
                {!focused && <Text style={[styles.label, {color: focused ? palette.primary : '#9CA3AF'}]}>Home</Text>}
              </View>
            );
          }

          // other tabs
          return (
            <TouchableOpacity
              key={label}
              style={styles.item}
              onPress={() => navigation.navigate(route.name)}
              activeOpacity={0.8}
            >
              <Icon name={mapIconName(label)} size={22} color={focused ? palette.primary : '#9CA3AF'} />
              <Text style={[styles.label, {color: focused ? palette.primary : '#9CA3AF'}]}>{label}</Text>
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
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    width: '100%',
    paddingTop: 8,
    // paddingBottom dynamically applied from insets
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
  item: {
    alignItems: 'center',
    width: (width - 120) / 4,
  },
  label: {
    fontSize: 12,
    marginTop: 6,
    fontWeight: '600',
  },
  homeSlot: {
    alignItems: 'center',
    width: 96,
    marginTop: -30,
  },
  homeOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  homeRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeShadow: {
    width: 72,
    height: 72,
    borderRadius: 36,
    shadowColor: palette.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.18,
    shadowRadius: 16,
    elevation: 10,
  },
  homeButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});