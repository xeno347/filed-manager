import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, StatusBar} from 'react-native';
import Icon from '../components/Icon';
import tokens, {palette, spacing, typography} from '../styles/tokens';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import SuccessModal from '../components/SuccessModal';

export default function HomeScreen() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [startTs, setStartTs] = useState<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const [elapsed, setElapsed] = useState('00:00:00');
  const [showModal, setShowModal] = React.useState(false);

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  useEffect(() => {
    (async () => {
      const val = await AsyncStorage.getItem('farmConnectCheckIn');
      if (val) {
        const parsed = JSON.parse(val);
        setCheckedIn(true);
        setStartTs(parsed.start);
      }
    })();
  }, []);

  useEffect(() => {
    if (startTs) {
      timerRef.current = Date.now();
      const id = setInterval(() => {
        const diff = Date.now() - startTs;
        const h = Math.floor(diff / 3600000)
          .toString()
          .padStart(2, '0');
        const m = Math.floor((diff % 3600000) / 60000)
          .toString()
          .padStart(2, '0');
        const s = Math.floor((diff % 60000) / 1000)
          .toString()
          .padStart(2, '0');
        setElapsed(`${h}:${m}:${s}`);
      }, 1000);
      return () => clearInterval(id);
    }
    return undefined;
  }, [startTs]);

  async function toggleCheck() {
    if (checkedIn) {
      await AsyncStorage.removeItem('farmConnectCheckIn');
      setCheckedIn(false);
      setStartTs(null);
      setElapsed('00:00:00');
    } else {
      const now = Date.now();
      await AsyncStorage.setItem('farmConnectCheckIn', JSON.stringify({start: now}));
      setCheckedIn(true);
      setStartTs(now);
      setShowModal(true);
      setTimeout(() => setShowModal(false), 1800);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={palette.primary} />
      
      {/* Green Header */}
      <LinearGradient colors={[palette.primary, '#059669']} style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <Icon name="activity" size={16} color={palette.white} style={styles.pulseIcon} />
            <Text style={styles.welcomeText}>WELCOME BACK</Text>
          </View>
          <TouchableOpacity style={styles.userIconButton}>
            <Icon name="person" size={24} color={palette.white} />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.nameText}>Rajesh Kumar</Text>
        <Text style={styles.roleText}>Field Manager</Text>

        {/* Today's Date Card */}
        <View style={styles.infoCard}>
          <View style={styles.cardIconContainer}>
            <Icon name="clock" size={20} color={palette.white} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.cardLabel}>Today's Date</Text>
            <Text style={styles.cardValue}>{dateString}</Text>
          </View>
        </View>

        {/* Current Location Card */}
        <View style={styles.locationCard}>
          <View style={styles.locationIconContainer}>
            <Icon name="map-pin" size={18} color={palette.primary} />
          </View>
          <View style={styles.cardContent}>
            <Text style={styles.locationLabel}>Current Location</Text>
            <Text style={styles.locationValue}>Field Office - Sector A</Text>
          </View>
          <View style={styles.locationDot} />
        </View>
      </LinearGradient>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Check In Card */}
        <Animatable.View animation="fadeInUp" duration={600} style={styles.checkInCard}>
          <View style={styles.checkInIconCircle}>
            <Icon name={checkedIn ? "log-out" : "log-in"} size={28} color={palette.white} />
          </View>
          
          <Text style={styles.checkInTitle}>
            {checkedIn ? 'End Your Day' : 'Start Your Day'}
          </Text>
          <Text style={styles.checkInSubtitle}>
            {checkedIn ? `Working time: ${elapsed}` : 'Check in to mark your attendance'}
          </Text>
          
          <TouchableOpacity onPress={toggleCheck} activeOpacity={0.85}>
            <LinearGradient colors={[palette.primary, '#059669']} style={styles.checkInButton}>
              <Icon name={checkedIn ? "log-out" : "log-in"} size={18} color={palette.white} />
              <Text style={styles.checkInButtonText}>
                {checkedIn ? 'Check Out Now' : 'Check In Now'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      <SuccessModal visible={showModal} onClose={() => setShowModal(false)} message="Checked In" subtext={`Time: ${new Date().toLocaleTimeString()}`} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  header: {
    backgroundColor: palette.primary,
    paddingTop: 50,
    paddingBottom: 24,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pulseIcon: {
    marginRight: 8,
  },
  welcomeText: {
    fontSize: 11,
    fontWeight: '600',
    color: palette.white,
    letterSpacing: 0.5,
  },
  userIconButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 28,
    fontWeight: '700',
    color: palette.white,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 15,
    color: palette.white,
    opacity: 0.95,
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIconContainer: {
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: {
    flex: 1,
  },
  cardLabel: {
    fontSize: 12,
    color: palette.white,
    opacity: 0.9,
    marginBottom: 2,
  },
  cardValue: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.white,
  },
  locationCard: {
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIconContainer: {
    marginRight: 12,
  },
  locationLabel: {
    fontSize: 12,
    color: palette.textLight,
    marginBottom: 2,
  },
  locationValue: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.text,
  },
  locationDot: {
    width: 8,
    height: 8,
    backgroundColor: palette.primary,
    borderRadius: 4,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  checkInCard: {
    backgroundColor: palette.white,
    borderRadius: 24,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 3,
  },
  checkInIconCircle: {
    width: 72,
    height: 72,
    backgroundColor: palette.primary,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 28,
  },
  checkInTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 8,
  },
  checkInSubtitle: {
    fontSize: 15,
    color: palette.textLight,
    marginBottom: 32,
    textAlign: 'center',
  },
  checkInButton: {
    backgroundColor: palette.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkInButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.white,
    marginLeft: 8,
  },
});
