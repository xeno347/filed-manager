import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from './Icon';
import {palette} from '../styles/tokens';

type Props = {
  visible: boolean;
  onClose: () => void;
  message?: string;
  subtext?: string;
};

export default function SuccessModal({visible, onClose, message = 'Success', subtext}: Props) {
  return (
    <Modal transparent visible={visible} animationType="none">
      <View style={styles.backdrop}>
        <Animatable.View animation="zoomIn" duration={400} style={styles.card}>
          <View style={styles.iconWrap}>
            <Icon name="check" size={36} color={palette.white} />
          </View>
          <Text style={styles.title}>{message}</Text>
          {subtext ? <Text style={styles.sub}>{subtext}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '80%',
    backgroundColor: palette.white,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 6,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: palette.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {fontSize: 18, fontWeight: '700', color: palette.text, marginBottom: 8},
  sub: {fontSize: 14, color: palette.textLight, textAlign: 'center', marginBottom: 16},
  button: {backgroundColor: palette.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10},
  buttonText: {color: palette.white, fontWeight: '700'},
});
