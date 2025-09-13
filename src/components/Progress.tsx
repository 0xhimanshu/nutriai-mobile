/**
 * Progress - React Native equivalent of web Progress component
 * Animated progress bar with customizable colors and animations
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProgressProps {
  value: number; // 0-100
  className?: string; // For compatibility
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
  animated?: boolean;
  animationDuration?: number;
}

export function Progress({ 
  value = 0, 
  height = 16, // h-4 (4 * 4px = 16px)
  backgroundColor = 'rgba(255, 255, 255, 0.1)', // bg-secondary equivalent
  progressColor = '#3b82f6', // bg-primary (blue-500)
  animated = true,
  animationDuration = 500
}: ProgressProps) {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const clampedValue = Math.max(0, Math.min(100, value));

  useEffect(() => {
    if (animated) {
      Animated.timing(progressAnimation, {
        toValue: clampedValue,
        duration: animationDuration,
        useNativeDriver: false, // Can't use native driver for width
      }).start();
    } else {
      progressAnimation.setValue(clampedValue);
    }
  }, [clampedValue, animated, animationDuration]);

  const progressWidth = progressAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={[styles.container, { height, backgroundColor }]}>
      <Animated.View 
        style={[
          styles.progress,
          { 
            width: progressWidth,
            backgroundColor: progressColor,
          }
        ]}
      />
    </View>
  );
}

// Special blue gradient version (like in onboarding)
export function BlueProgress({ value, height = 6 }: { value: number; height?: number }) {
  return (
    <View style={[styles.container, { height, backgroundColor: 'rgba(255, 255, 255, 0.1)' }]}>
      <LinearGradient
        colors={['#3b82f6', '#2563eb']} // Blue gradient
        style={[styles.progress, { width: `${Math.max(0, Math.min(100, value))}%` }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8, // rounded-full (but less rounded for better mobile UX)
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 8,
  },
});

export default Progress;