/**
 * Goals Screen - Exact port of original onboarding/goals/page.tsx
 * User selects primary health goal with interactive cards
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../App';
import { MobileFrame } from '../../components/MobileFrame';
import { Button } from '../../components/Button';
import { useUser } from '../../context/UserContext';
import { Progress } from '../../components/Progress';
import { SelectionCard } from '../../components/SelectionCard';

type GoalsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingGoals'>;

// Goal options matching original exactly
const goalOptions = [
  { id: 'lose-weight', label: 'Lose Weight', icon: 'fitness-outline' }, // Target icon equivalent
  { id: 'gain-muscle', label: 'Gain Muscle', icon: 'flash-outline' }, // Zap icon equivalent  
  { id: 'improve-health', label: 'Improve Health', icon: 'heart-outline' }, // HeartPulse equivalent
  { id: 'eat-smarter', label: 'Eat Smarter', icon: 'bulb-outline' }, // BrainCircuit equivalent
];

const GoalsScreen: React.FC = () => {
  const navigation = useNavigation<GoalsScreenNavigationProp>();
  const { userData, updateUserData } = useUser();
  const [selectedGoal, setSelectedGoal] = useState<string | null>(userData.primaryGoal || null);

  const handleContinue = () => {
    // Business logic: Goal selection is required to continue
    if (!selectedGoal) {
      Alert.alert(
        'Goal Required',
        'Please select your primary health goal to personalize your meal recommendations.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Validate goal selection
    const validGoals = goalOptions.map(g => g.id);
    if (!validGoals.includes(selectedGoal)) {
      Alert.alert(
        'Invalid Selection',
        'Please select a valid goal option.',
        [{ text: 'OK' }]
      );
      return;
    }

    // Save goal to global context
    updateUserData({
      primaryGoal: selectedGoal
    });
    
    console.log('Goal saved:', selectedGoal);
    
    // Show confirmation and navigate
    Alert.alert(
      'Goal Set!',
      `Great choice! We'll help you ${selectedGoal.replace('-', ' ')} with personalized meal plans.`,
      [{ 
        text: 'Continue', 
        onPress: () => navigation.navigate('OnboardingTimings')
      }]
    );
  };

  return (
    <MobileFrame>
      <LinearGradient
        colors={['#1f2937', '#000000', '#000000']} // from-gray-900 via-black to-black
        style={styles.gradient}
      >
        {/* Progress Bar - 62.5% (5th step of 8) */}
        <View style={styles.progressContainer}>
          <Progress value={62.5} height={6} animated={true} />
        </View>

        {/* Header Text */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>What's your primary goal?</Text>
          <Text style={styles.subtitle}>
            This helps us create a plan that works for you.
          </Text>
        </View>

        {/* Goal Selection Cards */}
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {goalOptions.map((option, index) => (
              <View key={option.id} style={styles.cardWrapper}>
                <SelectionCard
                  label={option.label}
                  icon={option.icon}
                  isSelected={selectedGoal === option.id}
                  onClick={() => setSelectedGoal(option.id)}
                />
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Continue Button */}
        <View style={styles.footer}>
          <Button 
            variant="default" 
            size="lg" 
            onPress={handleContinue}
            disabled={!selectedGoal}
            style={[
              styles.continueButton,
              !selectedGoal && styles.buttonDisabled
            ]}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Continue</Text>
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
  progressContainer: {
    paddingHorizontal: 24, // p-6
    paddingTop: 16,
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 32, // mt-8
    paddingBottom: 24, // mb-6
    alignItems: 'center',
  },
  title: {
    fontSize: 32, // text-3xl
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8, // mb-2
  },
  subtitle: {
    fontSize: 16,
    color: '#d1d5db', // text-gray-300
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 288, // max-w-xs (72 * 4 = 288px)
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  cardsContainer: {
    gap: 12, // space-y-3 equivalent
    paddingBottom: 24,
  },
  cardWrapper: {
    marginBottom: 12, // For gap between cards
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16, // mt-6
  },
  continueButton: {
    borderRadius: 25, // rounded-full
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 4, // Adjust for button size
  },
  buttonText: {
    fontSize: 18, // text-lg  
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default GoalsScreen;