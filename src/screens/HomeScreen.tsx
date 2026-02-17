import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from '../context/ThemeContext';

export default function HomeScreen() {
  const {colors} = useTheme();
  return (
    <View style={[styles.container, {backgroundColor: colors.bg}]}> 
      <Text style={[styles.title, {color: colors.primary}]}>Home Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  title: {fontSize: 28, fontWeight: '800'},
});
