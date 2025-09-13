/**
 * MobileFrame - React Native equivalent of web MobileFrame
 * Provides iPhone-style container with notch simulation
 */

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface MobileFrameProps {
  children: React.ReactNode;
  style?: any;
}

export function MobileFrame({ children, style }: MobileFrameProps) {
  return (
    <SafeAreaView style={[styles.container, style]}>
      {/* iPhone notch simulation */}
      <View style={styles.notch} />
      
      {/* Main content area */}
      <View style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // bg-black
  },
  notch: {
    position: 'absolute',
    top: 0,
    left: '50%',
    marginLeft: -80, // -translate-x-1/2 w-40
    width: 160, // w-40 (40 * 4px = 160px)
    height: 32, // h-8 (8 * 4px = 32px)
    backgroundColor: '#111827', // bg-gray-900
    borderBottomLeftRadius: 16, // rounded-b-2xl
    borderBottomRightRadius: 16,
    zIndex: 10,
  },
  content: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});

export default MobileFrame;