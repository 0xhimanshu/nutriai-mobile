/**
 * Button - React Native equivalent of web Button component
 * Supports all variants: default, outline, ghost, etc.
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type ButtonVariant = 'default' | 'outline' | 'ghost' | 'destructive' | 'secondary';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  className?: string; // For compatibility
}

export function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  disabled = false, 
  onPress,
  style,
  textStyle 
}: ButtonProps) {
  
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 6, // rounded-md
      alignItems: 'center',
      justifyContent: 'center',
      opacity: disabled ? 0.5 : 1,
    };

    // Size variants
    switch (size) {
      case 'sm':
        Object.assign(baseStyle, { height: 36, paddingHorizontal: 12 }); // h-9 px-3
        break;
      case 'lg':
        Object.assign(baseStyle, { height: 44, paddingHorizontal: 32 }); // h-11 px-8
        break;
      case 'icon':
        Object.assign(baseStyle, { height: 40, width: 40 }); // h-10 w-10
        break;
      default:
        Object.assign(baseStyle, { height: 40, paddingHorizontal: 16 }); // h-10 px-4
    }

    // Variant styles
    switch (variant) {
      case 'outline':
        Object.assign(baseStyle, {
          borderWidth: 1,
          borderColor: '#374151', // border-input
          backgroundColor: 'transparent',
        });
        break;
      case 'ghost':
        Object.assign(baseStyle, {
          backgroundColor: 'transparent',
        });
        break;
      case 'destructive':
        Object.assign(baseStyle, {
          backgroundColor: '#dc2626', // bg-destructive
        });
        break;
      case 'secondary':
        Object.assign(baseStyle, {
          backgroundColor: '#374151', // bg-secondary
        });
        break;
      default: // default variant
        Object.assign(baseStyle, {
          backgroundColor: '#3b82f6', // bg-primary (blue-500)
        });
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontSize: 14, // text-sm
      fontWeight: '500', // font-medium
      textAlign: 'center',
    };

    // Variant text colors
    switch (variant) {
      case 'outline':
      case 'ghost':
        Object.assign(baseTextStyle, { color: '#ffffff' });
        break;
      case 'destructive':
      case 'default':
        Object.assign(baseTextStyle, { color: '#ffffff' });
        break;
      case 'secondary':
        Object.assign(baseTextStyle, { color: '#d1d5db' });
        break;
      default:
        Object.assign(baseTextStyle, { color: '#ffffff' });
    }

    return baseTextStyle;
  };

  // For gradient buttons (like the original blue gradient)
  if (variant === 'default' && !disabled) {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        disabled={disabled}
        style={[style]}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#3b82f6', '#2563eb']} // bg-blue-500 to bg-blue-600
          style={[getButtonStyle(), { overflow: 'hidden' }]}
        >
          <Text style={[getTextStyle(), textStyle]}>
            {children}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  // Regular button variants
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      style={[getButtonStyle(), style]}
      activeOpacity={0.7}
    >
      <Text style={[getTextStyle(), textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

// Export additional button components for compatibility
export const ButtonText = ({ children, style }: { children: React.ReactNode; style?: TextStyle }) => (
  <Text style={style}>{children}</Text>
);

export default Button;