/**
 * Onboarding Location Screen
 * Collect user's location for local restaurant recommendations
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../App';

type LocationScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingLocation'>;

const LocationScreen: React.FC = () => {
  const navigation = useNavigation<LocationScreenNavigationProp>();
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  const handleGetLocation = async () => {
    setLocationStatus('loading');

    try {
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to find nearby restaurants. Please enable it in your device settings.',
          [{ text: 'OK' }]
        );
        setLocationStatus('error');
        return;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setLocation(currentLocation);
      setLocationStatus('success');
      
      console.log('Location found:', {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude
      });

      // Auto-continue after successful location capture
      setTimeout(() => {
        handleContinue();
      }, 1500);

    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Failed to get your location. Please try again.');
      setLocationStatus('error');
    }
  };

  const handleContinue = () => {
    navigation.navigate('OnboardingDiet');
  };

  const handleSkip = () => {
    navigation.navigate('OnboardingDiet');
  };

  const renderLocationButton = () => {
    switch (locationStatus) {
      case 'loading':
        return (
          <View style={styles.buttonContent}>
            <Ionicons name="reload" size={20} color="#ffffff" style={{ transform: [{ rotate: '45deg' }] }} />
            <Text style={styles.buttonText}>Getting Location...</Text>
          </View>
        );
      case 'success':
        return (
          <View style={styles.buttonContent}>
            <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Location Found!</Text>
          </View>
        );
      default:
        return (
          <View style={styles.buttonContent}>
            <Ionicons name="location" size={20} color="#ffffff" />
            <Text style={styles.buttonText}>Use Current Location</Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1f2937', '#000000', '#000000']}
        style={styles.gradient}
      >
        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              style={[styles.progressFill, { width: '12.5%' }]}
            />
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Icon */}
          <View style={styles.iconContainer}>
            <LinearGradient
              colors={['rgba(59, 130, 246, 0.2)', 'rgba(59, 130, 246, 0.1)']}
              style={styles.iconCircle}
            >
              <Ionicons name="location" size={48} color="#60a5fa" />
            </LinearGradient>
          </View>

          {/* Text */}
          <View style={styles.textContainer}>
            <Text style={styles.title}>What's your location?</Text>
            <Text style={styles.subtitle}>
              This helps us find local ingredients and restaurants for you.
            </Text>
          </View>

          {/* Location Button */}
          <TouchableOpacity
            style={[
              styles.locationButton,
              (locationStatus === 'loading' || locationStatus === 'success') && styles.buttonDisabled
            ]}
            onPress={handleGetLocation}
            disabled={locationStatus === 'loading' || locationStatus === 'success'}
          >
            <LinearGradient
              colors={
                locationStatus === 'success' 
                  ? ['#10b981', '#059669']
                  : ['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']
              }
              style={styles.buttonGradient}
            >
              {renderLocationButton()}
            </LinearGradient>
          </TouchableOpacity>

          {location && (
            <View style={styles.locationInfo}>
              <Text style={styles.locationText}>
                📍 Found your location
              </Text>
              <Text style={styles.coordsText}>
                {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
              </Text>
            </View>
          )}
        </View>

        {/* Footer Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <LinearGradient
              colors={['#3b82f6', '#2563eb']}
              style={styles.buttonGradient}
            >
              <Text style={styles.continueButtonText}>Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  gradient: {
    flex: 1,
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 32,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(59, 130, 246, 0.5)',
  },
  textContainer: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  locationButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 320,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  locationInfo: {
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  locationText: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '500',
  },
  coordsText: {
    fontSize: 12,
    color: '#6ee7b7',
    fontFamily: 'monospace',
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
    gap: 16,
  },
  continueButton: {
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  skipButtonText: {
    fontSize: 16,
    color: '#9ca3af',
    fontWeight: '500',
  },
});

export default LocationScreen;