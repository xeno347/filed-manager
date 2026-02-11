import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {palette, spacing} from '../styles/tokens';

type Props = {
  onLogin: () => void;
};

const {width} = Dimensions.get('window');

export default function LoginScreen({onLogin}: Props) {
  const [username, setUsername] = useState('supervisor@fieldmanager.com');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <LinearGradient colors={[`${palette.primary}22`, '#ECFDF5']} style={styles.bg}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.outer}>
          <View style={styles.card}>
            <View style={styles.iconWrap}>
              <View style={styles.iconCircle}>
                <Text style={styles.iconGlyph}>🌱</Text>
              </View>
            </View>

            <Text style={styles.title}>Field Manager</Text>
            <Text style={styles.subtitle}>Agricultural Supervisor Portal</Text>

            <View style={styles.form}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="supervisor@fieldmanager.com"
                placeholderTextColor="#9CA3AF"
                style={styles.input}
                keyboardType="email-address"
                autoCapitalize="none"
                importantForAutofill="yes"
              />

              <Text style={[styles.label, {marginTop: 8}]}>Password</Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                style={styles.input}
              />

              <TouchableOpacity style={styles.loginBtn} activeOpacity={0.9} onPress={() => onLogin()}>
                <LinearGradient colors={[palette.primary, '#059669']} style={styles.loginGradient}>
                  <Text style={styles.loginText}>Sign In</Text>
                </LinearGradient>
              </TouchableOpacity>

              <View style={styles.demoBox}>
                <Text style={styles.demoText}><Text style={{fontWeight: '700'}}>Demo:</Text> Use any email and password to login</Text>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const cardWidth = Math.min(520, width - 48);

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: '#ECFDF5'},
  bg: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  outer: {width: '100%', alignItems: 'center'},
  card: {
    width: cardWidth,
    backgroundColor: palette.white,
    borderRadius: 18,
    paddingTop: 36,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    alignItems: 'center',
    shadowColor: '#0B1220',
    shadowOffset: {width: 0, height: 18},
    shadowOpacity: 0.06,
    shadowRadius: 30,
    elevation: 8,
  },
  iconWrap: {position: 'absolute', top: -32, left: 0, right: 0, alignItems: 'center'},
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 6,
    borderColor: '#E6FFF2',
    shadowColor: palette.primary,
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  iconGlyph: {fontSize: 28, color: palette.white},
  title: {fontSize: 22, fontWeight: '800', marginTop: 10, color: '#0F172A'},
  subtitle: {fontSize: 13, color: '#6B7280', marginTop: 6, marginBottom: 12},
  form: {width: '100%', marginTop: 8},
  label: {fontSize: 13, fontWeight: '600', color: '#374151', marginBottom: 6},
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E6EEF0',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#FBFDFF',
    color: '#0F172A',
  },
  loginBtn: {marginTop: 16},
  loginGradient: {height: 48, borderRadius: 12, justifyContent: 'center', alignItems: 'center', width: '100%', shadowColor: '#0B1220', shadowOffset: {width: 0, height: 8}, shadowOpacity: 0.12, shadowRadius: 16, elevation: 6},
  loginText: {color: palette.white, fontWeight: '800', fontSize: 16},
  demoBox: {marginTop: 14, backgroundColor: '#F0FFF6', paddingVertical: 10, paddingHorizontal: 14, borderRadius: 10, alignItems: 'center'},
  demoText: {color: '#4B5563', fontSize: 13},
});
