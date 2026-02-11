import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, StatusBar} from 'react-native';
import tokens, {spacing, typography, palette} from '../styles/tokens';
import {mockProfile} from '../data/mockData';
import Icon from '../components/Icon';

export default function ProfileScreen() {
  const [currentTime, setCurrentTime] = useState('');
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={palette.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Icon name="profile" size={32} color={palette.primary} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{mockProfile.name}</Text>
            <Text style={styles.profileRole}>{mockProfile.role}</Text>
            <Text style={styles.profileId}>ID: {mockProfile.employeeId}</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.contactInfo}>
          <View style={styles.contactItem}>
            <Icon name="phone" size={16} color={palette.white} />
            <Text style={styles.contactText}>{mockProfile.phone}</Text>
          </View>
          <View style={styles.contactItem}>
            <Icon name="email" size={16} color={palette.white} />
            <Text style={styles.contactText}>{mockProfile.email}</Text>
          </View>
        </View>
      </View>

      {/* Attendance Section */}
      <View style={styles.attendanceSection}>
        <View style={styles.attendanceHeader}>
          <Text style={styles.sectionTitle}>Today's Attendance</Text>
          <View style={styles.attendanceIcon}>
            <Icon name="clock" size={16} color={palette.primary} />
          </View>
        </View>

        <View style={styles.timeDisplay}>
          <Text style={styles.currentTime}>{currentTime}</Text>
          <Text style={styles.currentDate}>{dateString}</Text>
        </View>

        <View style={styles.attendanceButtons}>
          <TouchableOpacity 
            style={[styles.attendanceButton, styles.checkInButton]}
            onPress={() => setIsCheckedIn(!isCheckedIn)}
          >
            <Text style={styles.checkInButtonText}>Check In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.attendanceButton, styles.checkOutButton]}>
            <Text style={styles.checkOutButtonText}>Check Out</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Assigned Fields */}
      <View style={styles.fieldsSection}>
        <View style={styles.sectionHeader}>
          <Icon name="location" size={20} color={palette.primary} />
          <Text style={styles.sectionTitle}>Assigned Fields</Text>
        </View>
        <View style={styles.fieldTags}>
          <View style={styles.fieldTag}>
            <Text style={styles.fieldTagText}>Field A</Text>
          </View>
          <View style={styles.fieldTag}>
            <Text style={styles.fieldTagText}>Field B</Text>
          </View>
          <View style={styles.fieldTag}>
            <Text style={styles.fieldTagText}>Field C</Text>
          </View>
        </View>
      </View>

      {/* Reporting Officer */}
      <View style={styles.reportingSection}>
        <View style={styles.sectionHeader}>
          <Icon name="profile" size={20} color={palette.primary} />
          <Text style={styles.sectionTitle}>Reporting Officer</Text>
        </View>
        <View style={styles.reportingInfo}>
          <Text style={styles.reportingLabel}>Name</Text>
          <Text style={styles.reportingName}>Dr. Amit Patel</Text>
          <Text style={styles.reportingLabel}>Designation</Text>
          <Text style={styles.reportingDesignation}>Regional Manager</Text>
        </View>
      </View>
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
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: palette.white,
    marginBottom: 24,
  },
  profileCard: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    backgroundColor: palette.white,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: palette.white,
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: palette.white,
    opacity: 0.8,
    marginBottom: 4,
  },
  profileId: {
    fontSize: 12,
    color: palette.white,
    opacity: 0.7,
  },
  contactInfo: {
    marginTop: 8,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: palette.white,
    opacity: 0.9,
  },
  attendanceSection: {
    backgroundColor: palette.white,
    margin: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: palette.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  attendanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.text,
  },
  attendanceIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#F0FDF4',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeDisplay: {
    alignItems: 'center',
    marginBottom: 20,
  },
  currentTime: {
    fontSize: 32,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 4,
  },
  currentDate: {
    fontSize: 14,
    color: palette.textLight,
  },
  attendanceButtons: {
    flexDirection: 'row',
    marginTop: 12,
  },
  attendanceButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 12,
  },
  checkInButton: {
    backgroundColor: palette.primary,
  },
  checkOutButton: {
    backgroundColor: palette.mutedLight,
  },
  checkInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.white,
  },
  checkOutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.textLight,
  },
  fieldsSection: {
    backgroundColor: palette.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: palette.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  fieldTags: {
    flexDirection: 'row',
    marginTop: 8,
  },
  fieldTag: {
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: palette.primary,
    marginRight: 12,
  },
  fieldTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.primary,
  },
  reportingSection: {
    backgroundColor: palette.white,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: palette.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  reportingInfo: {
    marginTop: 8,
  },
  reportingLabel: {
    fontSize: 12,
    color: palette.textLight,
    fontWeight: '500',
  },
  reportingName: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.text,
    marginBottom: 8,
  },
  reportingDesignation: {
    fontSize: 14,
    color: palette.textLight,
  },
  // Legacy styles
  name: {fontSize: typography.h2, fontWeight: '700'},
  detail: {fontSize: typography.body, color: '#666', marginTop: 6},
});
