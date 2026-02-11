import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Platform, Alert, ScrollView, StatusBar} from 'react-native';
import tokens, {spacing, typography, palette} from '../styles/tokens';
import Icon from '../components/Icon';
import {mockHarvestOrders} from '../data/mockHarvestData';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

let CameraKitCamera: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, global-require
  CameraKitCamera = require('react-native-camera-kit').CameraKitCamera;
} catch (e) {
  CameraKitCamera = null;
}

export default function HarvestScreen() {
  const [scanning, setScanning] = useState(false);
  const [lastScan, setLastScan] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    // placeholder if real camera initialisation needed
  }, []);

  async function ensureCameraPermission(): Promise<boolean> {
    try {
      const permission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });
      if (!permission) return false;
      const res = await request(permission);
      return res === RESULTS.GRANTED || res === RESULTS.LIMITED;
    } catch (err) {
      return false;
    }
  }

  async function startScan() {
    if (CameraKitCamera) {
      const ok = await ensureCameraPermission();
      if (!ok) {
        Alert.alert('Camera permission', 'Camera permission is required to scan orders.');
        return;
      }
      setScanning(true);
      return;
    }
    // fallback to simulated scan picker UI
    setScanning(true);
  }

  function onSimulateScan(orderId: string) {
    setLastScan(`Scanned order: ${orderId}`);
    setScanning(false);
  }

  const getStatusCounts = () => {
    const scheduled = mockHarvestOrders.filter(o => o.status === 'Scheduled').length;
    const inProgress = mockHarvestOrders.filter(o => o.status === 'In Progress').length;
    const completed = mockHarvestOrders.filter(o => o.status === 'Completed').length;
    const total = mockHarvestOrders.length;
    return { scheduled, inProgress, completed, total };
  };

  const getFilteredOrders = () => {
    if (selectedFilter === 'All') return mockHarvestOrders;
    return mockHarvestOrders.filter(order => order.status === selectedFilter);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return palette.blue;
      case 'Completed': return palette.primary;
      case 'Scheduled': return palette.orange;
      case 'Loading': return '#8B5CF6';
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

  const counts = getStatusCounts();
  const filteredOrders = getFilteredOrders();

  if (scanning) {
    return (
      <View style={styles.scanContainer}>
        <StatusBar barStyle="light-content" backgroundColor="#000" />
        <View style={styles.scanHeader}>
          <TouchableOpacity onPress={() => setScanning(false)} style={styles.backButton}>
            <Icon name="arrow-left" size={24} color={palette.white} />
          </TouchableOpacity>
          <View style={styles.scanBanner}>
            <Text style={styles.scanBannerTitle}>Scanning QR for:</Text>
            <Text style={styles.scanBannerOrder}>Harvest Order</Text>
          </View>
        </View>
        
        {CameraKitCamera ? (
          <View style={styles.cameraPlaceholder}>
            <Text style={{color: '#fff', textAlign: 'center', paddingTop: 140}}>Camera preview (placeholder)</Text>
          </View>
        ) : (
          <View style={styles.simulateContainer}>
            <View style={styles.scanFrame}>
              <Animatable.View animation="slideInDown" iterationCount={1} style={styles.scanLine} />
              <Text style={styles.scanFrameText}>Align QR code within the frame</Text>
            </View>
            <Text style={styles.simulateText}>Simulate scanning by selecting an order:</Text>
            {mockHarvestOrders.slice(0, 4).map((o) => (
              <TouchableOpacity 
                key={o.id} 
                style={styles.simulateButton} 
                onPress={() => {
                  onSimulateScan(o.id);
                }}
              >
                <Text style={styles.simulateButtonText}>{o.orderNumber}</Text>
                <Icon name="qr-code" size={20} color={palette.primary} />
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={palette.primary} />
      
      {/* Header */}
      <LinearGradient colors={[palette.primary, '#059669']} style={styles.header}>
        <View style={styles.headerTop}>
          <Icon name="harvest" size={24} color={palette.white} />
          <Text style={styles.headerTitle}>Harvest Orders</Text>
        </View>
        <Text style={styles.headerSubtitle}>Manage harvest operations</Text>
      </LinearGradient>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {['All', 'Scheduled', 'In Progress', 'Completed'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterTab, selectedFilter === filter && styles.activeFilterTab]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Orders List */}
      <ScrollView style={styles.ordersList} showsVerticalScrollIndicator={false}>
        {filteredOrders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <View style={styles.orderHeaderLeft}>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                <View style={[styles.statusBadge, {backgroundColor: getStatusColor(order.status) + '20'}]}>
                  <Text style={[styles.statusText, {color: getStatusColor(order.status)}]}>
                    {order.status}
                  </Text>
                </View>
              </View>
              <View style={styles.priorityBadge}>
                <Text style={[styles.priorityText, {color: getPriorityColor(order.priority)}]}>
                  {order.priority}
                </Text>
              </View>
            </View>

            <View style={styles.cropInfo}>
              <Icon name="harvest" size={16} color={palette.primary} />
              <Text style={styles.cropText}>{order.crop} • {order.field}</Text>
            </View>

            <View style={styles.dateInfo}>
              <Icon name="calendar" size={16} color={palette.textLight} />
              <Text style={styles.dateText}>{order.harvestDate}</Text>
            </View>

            {/* Progress removed - focusing on trip/card/car status */}

            <View style={styles.orderFooter}>
              <View style={styles.orderDetails}>
                <View style={styles.detailItem}>
                  <Icon name="location" size={12} color={palette.textLight} />
                  <Text style={styles.detailLabel}>Trip No.</Text>
                </View>
                <Text style={styles.detailValue}>{order.tripNumber}</Text>
              </View>
              
              <View style={styles.orderDetails}>
                <View style={styles.detailItem}>
                  <Icon name="card" size={12} color={palette.textLight} />
                  <Text style={styles.detailLabel}>Card No.</Text>
                </View>
                <Text style={styles.detailValue}>{order.harvestCardNumber}</Text>
              </View>
              
              <View style={styles.orderDetails}>
                <View style={styles.detailItem}>
                  <Icon name="truck" size={12} color={palette.textLight} />
                  <Text style={styles.detailLabel}>Car Status</Text>
                </View>
                <View style={[styles.carStatusBadge, {backgroundColor: getStatusColor(order.harvestCarStatus) + '20'}]}>
                  <Text style={[styles.carStatusText, {color: getStatusColor(order.harvestCarStatus)}]}>
                    {order.harvestCarStatus}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.actionButtons}>
              <Animatable.View animation="fadeInUp" duration={400} style={{flex: 1, marginRight: 12}}>
                <TouchableOpacity style={styles.detailsButton}>
                  <Icon name="more-horizontal" size={16} color={palette.textLight} />
                  <Text style={styles.detailsButtonText}>More Details</Text>
                </TouchableOpacity>
              </Animatable.View>
              <Animatable.View animation="pulse" iterationCount={1} style={{flex: 1}}>
                <TouchableOpacity style={styles.scanButton} onPress={startScan}>
                  <Icon name="qr-code" size={16} color={palette.white} />
                  <Text style={styles.scanButtonText}>Scan QR</Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          </View>
        ))}
      </ScrollView>

      {lastScan && (
        <View style={styles.lastScanContainer}>
          <Text style={styles.lastScanText}>{lastScan}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  // Scan Screen Styles
  scanContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  scanHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
  },
  scanTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: palette.white,
  },
  scanBanner: {
    flex: 1,
    alignItems: 'center',
  },
  scanBannerTitle: {
    fontSize: 14,
    color: palette.white,
    opacity: 0.8,
  },
  scanBannerOrder: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.white,
  },
  simulateContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  scanFrame: {
    height: 300,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 32,
  },
  scanLine: {
    position: 'absolute',
    height: 2,
    width: '100%',
    backgroundColor: palette.primary,
    top: 0,
  },
  scanFrameText: {
    position: 'absolute',
    bottom: 8,
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  simulateText: {
    fontSize: 16,
    color: palette.white,
    textAlign: 'center',
    marginBottom: 32,
  },
  simulateButton: {
    backgroundColor: palette.white,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  simulateButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.text,
  },
  // Main Screen Styles
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
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: palette.white,
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 14,
    color: palette.white,
    opacity: 0.8,
    marginBottom: 24,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: palette.mutedLight,
    marginRight: 8,
  },
  activeFilterTab: {
    backgroundColor: palette.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.textLight,
  },
  activeFilterText: {
    color: palette.white,
  },
  ordersList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  orderCard: {
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
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderHeaderLeft: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.text,
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityBadge: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  cropInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cropText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.text,
    marginLeft: 6,
  },
  dateInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateText: {
    fontSize: 14,
    color: palette.textLight,
    marginLeft: 6,
  },
  orderFooter: {
    marginBottom: 16,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    color: palette.textLight,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.text,
  },
  carStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  carStatusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  detailsButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: palette.bg,
    marginRight: 12,
  },
  detailsButtonText: {
    fontSize: 14,
    color: palette.textLight,
    marginLeft: 6,
  },
  scanButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: palette.primary,
  },
  scanButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.white,
    marginLeft: 6,
  },
  lastScanContainer: {
    backgroundColor: palette.primary,
    padding: 16,
    margin: 20,
    borderRadius: 12,
  },
  lastScanText: {
    fontSize: 14,
    color: palette.white,
    textAlign: 'center',
  },
  // Legacy styles
  title: {fontSize: typography.h2, fontWeight: '700'},
  subtitle: {fontSize: typography.body, color: palette.muted, marginTop: 6},
  orderTitle: {fontSize: typography.body, fontWeight: '600'},
  cardTitle: {fontSize: typography.h2, fontWeight: '700'},
  cardBody: {fontSize: typography.body, color: palette.muted, marginTop: 6},
  scanBtn: {marginTop: spacing.md, backgroundColor: palette.primary, paddingVertical: 12, paddingHorizontal: 14, borderRadius: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  scanLabel: {color: '#fff', marginLeft: 8, fontWeight: '700'},
  cameraPlaceholder: {height: 300, backgroundColor: '#000', borderRadius: 12, overflow: 'hidden', marginTop: spacing.md},
});
