import React, {useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ScrollView, StatusBar} from 'react-native';
import tokens, {spacing, typography, palette} from '../styles/tokens';
import {mockTasks} from '../data/mockData';
import Icon from '../components/Icon';

export default function TasksScreen() {
  const [selectedTab, setSelectedTab] = useState('Tasks');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return '#EF4444';
      case 'Medium': return '#F59E0B';
      case 'Low': return '#10B981';
      default: return palette.textLight;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return palette.blue;
      case 'Completed': return palette.primary;
      case 'Pending': return palette.orange;
      default: return palette.textLight;
    }
  };

  const getProgress = (status: string) => {
    switch (status) {
      case 'Completed': return 100;
      case 'In Progress': return 60;
      case 'Pending': return 0;
      default: return 0;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={palette.primary} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Task Management</Text>
        
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          {['Tasks', 'Contract Farming', 'Vehicles'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, selectedTab === tab && styles.activeTab]}
              onPress={() => setSelectedTab(tab)}
            >
              <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Task List */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockTasks.map((task) => (
          <View key={task.id} style={styles.taskCard}>
            <View style={styles.taskHeader}>
              <View style={styles.taskTitleContainer}>
                <Text style={styles.taskTitle}>{task.title}</Text>
                <TouchableOpacity>
                  <Icon name="menu" size={20} color={palette.textLight} />
                </TouchableOpacity>
              </View>
              <View style={styles.priorityBadge}>
                <Text style={[styles.priorityText, {color: getPriorityColor(task.priority)}]}>
                  {task.priority}
                </Text>
              </View>
            </View>

            <Text style={styles.taskDescription}>{task.description}</Text>

            <View style={styles.statusContainer}>
              <View style={[styles.statusBadge, {backgroundColor: getStatusColor(task.status) + '20'}]}>
                <Text style={[styles.statusText, {color: getStatusColor(task.status)}]}>
                  {task.status}
                </Text>
              </View>
              <View style={styles.progressContainer}>
                <Text style={styles.progressLabel}>Progress</Text>
                <Text style={styles.progressPercent}>{getProgress(task.status)}%</Text>
              </View>
            </View>

            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  {
                    width: `${getProgress(task.status)}%`,
                    backgroundColor: getStatusColor(task.status)
                  }
                ]} 
              />
            </View>

            <View style={styles.taskFooter}>
              <View style={styles.taskMeta}>
                <View style={styles.metaItem}>
                  <Icon name="location" size={16} color={palette.textLight} />
                  <Text style={styles.metaText}>Field: {task.field}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="calendar" size={16} color={palette.textLight} />
                  <Text style={styles.metaText}>Due: {task.dueDate}</Text>
                </View>
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
    marginRight: 8,
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
  content: {
    flex: 1,
    padding: 20,
  },
  taskCard: {
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
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskTitleContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: palette.text,
    flex: 1,
  },
  priorityBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  taskDescription: {
    fontSize: 14,
    color: palette.textLight,
    marginBottom: 16,
    lineHeight: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    alignItems: 'flex-end',
  },
  progressLabel: {
    fontSize: 12,
    color: palette.textLight,
  },
  progressPercent: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.text,
  },
  progressBar: {
    height: 6,
    backgroundColor: palette.mutedLight,
    borderRadius: 3,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  taskFooter: {
    marginTop: 8,
  },
  taskMeta: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  metaText: {
    fontSize: 12,
    color: palette.textLight,
  },
  row: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  title: {fontSize: typography.h2, fontWeight: '600'},
  subtitle: {fontSize: typography.body, color: '#666', marginTop: 6},
  action: {padding: 6},
});
