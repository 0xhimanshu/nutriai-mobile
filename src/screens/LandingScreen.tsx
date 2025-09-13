/**
 * Landing Screen - NutriAI Welcome Page  
 * Exact port of the original Next.js landing page
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../App';
import { MobileFrame } from '../components/MobileFrame';
import { Button } from '../components/Button';

type LandingScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Landing'>;

const LandingScreen: React.FC = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('SignIn');
  };

  return (
    <MobileFrame>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      <LinearGradient
        colors={['rgba(30, 58, 138, 0.3)', '#000000', '#000000']} // from-blue-900/30 via-black to-black
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="nutrition" size={20} color="#60a5fa" />
            <Text style={styles.logoText}>NutriAI</Text>
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          <View style={styles.heroSection}>
            <Text style={styles.title}>Welcome to NutriAI</Text>
            <Text style={styles.subtitle}>
              Your personal AI-powered nutrition assistant. Let's start your journey to a healthier you.
            </Text>
          </View>
        </View>

        {/* Get Started Button */}
        <View style={styles.footer}>
          <Button 
            variant="default" 
            size="lg" 
            onPress={handleGetStarted}
            style={styles.getStartedButton}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </View>
          </Button>
        </View>
      </LinearGradient>
    </MobileFrame>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 32,
    paddingTop: 20,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginTop: -64, // -mt-16 equivalent
  },
  heroSection: {
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontSize: 48, // text-5xl
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 56,
    letterSpacing: -1, // tracking-tight
  },
  subtitle: {
    fontSize: 18, // text-lg
    color: '#d1d5db', // text-gray-300
    textAlign: 'center',
    lineHeight: 28,
    maxWidth: 320, // max-w-xs
  },
  footer: {
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  getStartedButton: {
    borderRadius: 25, // rounded-full
    overflow: 'hidden',
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    width: '100%',
    maxWidth: 320, // max-w-sm
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    fontSize: 18, // text-lg
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default LandingScreen;