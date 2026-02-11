import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView, StatusBar, TextInput} from 'react-native';
import tokens, {spacing, typography, palette} from '../styles/tokens';
import {mockRequests} from '../data/mockData';
import Icon from '../components/Icon';

export default function RequestScreen() {
  const [selectedTab, setSelectedTab] = useState('My Requests');
  const [showForm, setShowForm] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState('Medium');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Approved': return palette.primary;
      case 'Pending': return palette.orange;
      case 'Rejected': return palette.red;
      default: return palette.textLight;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return palette.textLight;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Equipment': return 'truck';
      case 'Maintenance': return 'settings';
      case 'Labor': return 'profile';
      case 'Transport': return 'truck';
      case 'Supplies': return 'harvest';
      default: return 'menu';
    }
  };

  if (showForm) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={palette.primary} />
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Request Management</Text>
          
          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={styles.tab}
              onPress={() => setShowForm(false)}
            >
              <Text style={styles.tabText}>My Requests</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>Make Request</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Form */}
        <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Request Title *</Text>
            <TextInput 
              style={styles.textInput}
              placeholder="Brief title for your request"
              placeholderTextColor={palette.textLight}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Category *</Text>
            <TextInput 
              style={styles.textInput}
              placeholder=""
              placeholderTextColor={palette.textLight}
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Priority Level *</Text>
            <View style={styles.priorityContainer}>
              {['Low', 'Medium', 'High'].map((priority) => (
                <TouchableOpacity
                  key={priority}
                  style={[
                    styles.priorityButton,
                    selectedPriority === priority && styles.activePriorityButton
                  ]}
                  onPress={() => setSelectedPriority(priority)}
                >
                  <Text style={[
                    styles.priorityText,
                    selectedPriority === priority && styles.activePriorityText
                  ]}>
                    {priority}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Description *</Text>
            <TextInput 
              style={[styles.textInput, styles.textArea]}
              placeholder="Provide detailed information about your request"
              placeholderTextColor={palette.textLight}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.formField}>
            <Text style={styles.fieldLabel}>Related Field (Optional)</Text>
            <TextInput 
              style={styles.textInput}
              placeholder=""
              placeholderTextColor={palette.textLight}
            />
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={palette.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Request Management</Text>
        
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Text style={[styles.tabText, styles.activeTabText]}>My Requests</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.tab}
            onPress={() => setShowForm(true)}
          >
            <Text style={styles.tabText}>Make Request</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Requests List */}
      <ScrollView style={styles.requestsList} showsVerticalScrollIndicator={false}>
        {mockRequests.map((request) => (
          <View key={request.id} style={styles.requestCard}>
            <View style={styles.requestHeader}>
              <View style={styles.requestHeaderLeft}>
                <View style={styles.iconContainer}>
                  <Icon name={getTypeIcon(request.type)} size={20} color={palette.orange} />
                </View>
                <View style={styles.requestInfo}>
                  <Text style={styles.requestTitle}>{request.subject}</Text>
                  <TouchableOpacity>
                    <Icon name="menu" size={20} color={palette.textLight} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.requestMeta}>
              <Text style={styles.requestType}>{request.type}</Text>
              <View style={styles.priorityBadge}>
                <Text style={[styles.priorityBadgeText, {color: getPriorityColor(request.priority)}]}>
                  {request.priority} Priority
                </Text>
              </View>
            </View>

            <Text style={styles.requestTimestamp}>Submitted: {request.timestamp}</Text>

            <View style={styles.requestFooter}>
              <View style={[styles.statusBadge, {backgroundColor: getStatusColor(request.status) + '20'}]}>
                <Text style={[styles.statusText, {color: getStatusColor(request.status)}]}>
                  {request.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
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
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  activeTab: {
    backgroundColor: palette.white,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.white,
  },
  activeTabText: {
    color: palette.primary,
  },
  // Form Styles
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formField: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.text,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: palette.white,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: palette.text,
    borderWidth: 1,
    borderColor: palette.mutedLight,
  },
  textArea: {
    height: 120,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  priorityButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: palette.mutedLight,
    alignItems: 'center',
  },
  activePriorityButton: {
    backgroundColor: palette.primary,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.textLight,
  },
  activePriorityText: {
    color: palette.white,
  },
  submitButton: {
    backgroundColor: palette.primary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.white,
  },
  // Requests List Styles
  requestsList: {
    flex: 1,
    padding: 20,
  },
  requestCard: {
    backgroundColor: palette.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: palette.shadow,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  requestHeaderLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#FEF3C7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.text,
    flex: 1,
  },
  requestMeta: {
    marginBottom: 8,
  },
  requestType: {
    fontSize: 14,
    color: palette.textLight,
    marginBottom: 4,
  },
  priorityBadge: {
    alignSelf: 'flex-start',
  },
  priorityBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  requestTimestamp: {
    fontSize: 12,
    color: palette.textLight,
    marginBottom: 16,
  },
  requestFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  // Legacy styles
  title: {fontSize: typography.h2, fontWeight: '600'},
  subtitle: {fontSize: typography.body, color: '#666', marginTop: 6},
});
