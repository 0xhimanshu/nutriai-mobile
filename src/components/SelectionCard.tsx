/**
 * SelectionCard - React Native equivalent of web SelectionCard
 * Interactive card with icon, label, and selection state
 */

import React from 'react';
import { 
  TouchableOpacity, 
  View, 
  Text, 
  StyleSheet, 
  Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SelectionCardProps {
  label: string;
  icon?: string; // Ionicons name
  isSelected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export function SelectionCard({ 
  label, 
  icon, 
  isSelected, 
  onClick, 
  disabled = false 
}: SelectionCardProps) {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const checkmarkScale = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(checkmarkScale, {
      toValue: isSelected ? 1 : 0,
      useNativeDriver: true,
      tension: 300,
      friction: 20,
    }).start();
  }, [isSelected]);

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (!disabled) {
      onClick();
    }
  };

  return (
    <Animated.View style={[{ transform: [{ scale: scaleValue }] }]}>
      <TouchableOpacity
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={[
          styles.container,
          isSelected ? styles.selected : styles.unselected,
          disabled && styles.disabled
        ]}
        activeOpacity={0.9}
      >
        <View style={styles.content}>
          {/* Icon */}
          {icon && (
            <View style={styles.iconContainer}>
              <Ionicons 
                name={icon as any} 
                size={24} 
                color="#60a5fa" // text-blue-400
              />
            </View>
          )}
          
          {/* Label */}
          <Text style={styles.label}>{label}</Text>
        </View>

        {/* Checkmark (when selected) */}
        {isSelected && (
          <Animated.View 
            style={[
              styles.checkmark,
              { transform: [{ scale: checkmarkScale }] }
            ]}
          >
            <Ionicons 
              name="checkmark-circle" 
              size={24} 
              color="#60a5fa" // text-blue-400
            />
          </Animated.View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    padding: 16, // p-4
    borderRadius: 12, // rounded-xl
    borderWidth: 2,
    marginVertical: 4,
  },
  selected: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)', // bg-blue-500/20
    borderColor: '#3b82f6', // border-blue-500
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 8, // Android shadow
  },
  unselected: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)', // bg-white/5
    borderColor: 'rgba(255, 255, 255, 0.1)', // border-white/10
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // gap-4
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500', // font-medium
    color: '#ffffff',
    flex: 1,
  },
  checkmark: {
    position: 'absolute',
    top: 12, // top-3
    right: 12, // right-3
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SelectionCard;