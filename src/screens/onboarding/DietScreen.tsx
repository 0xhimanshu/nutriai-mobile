/**
 * Diet Screen - Exact port of original onboarding/diet/page.tsx
 * Multi-selection diet preferences with SelectionCard components
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../../App';
import { MobileFrame } from '../../components/MobileFrame';
import { Button } from '../../components/Button';
import { Progress } from '../../components/Progress';
import { SelectionCard } from '../../components/SelectionCard';

type DietScreenNavigationProp = StackNavigationProp<RootStackParamList, 'OnboardingDiet'>;

// Diet options matching original exactly
const dietOptions = [
  'No specific diet', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Pescatarian', 
  'Gluten-Free', 'Low-Carb', 'Mediterranean', 'Flexitarian', 'Dairy-Free'
];

const DietScreen: React.FC = () => {
  const navigation = useNavigation<DietScreenNavigationProp>();
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);

  const toggleDiet = (diet: string) => {
    setSelectedDiets(prev => 
      prev.includes(diet) ? prev.filter(d => d !== diet) : [...prev, diet]
    );
  };

  const handleContinue = () => {
    // In production, save the diet preferences
    console.log('Selected diets:', selectedDiets);
    navigation.navigate('OnboardingAllergies');
  };

  return (
    <MobileFrame>
      <LinearGradient
        colors={['#1f2937', '#000000', '#000000']} // from-gray-900 via-black to-black
        style={styles.gradient}
      >
        {/* Progress Bar - 25% (2nd step of 8) */}
        <View style={styles.progressContainer}>
          <Progress value={25} height={6} animated={true} />
        </View>

        {/* Header Text */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Any dietary preferences?</Text>
          <Text style={styles.subtitle}>
            Select any diets you follow. This will help us tailor your meal suggestions.
          </Text>
        </View>

        {/* Diet Selection Cards */}
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.cardsContainer}>
            {dietOptions.map((option) => (
              <View key={option} style={styles.cardWrapper}>
                <SelectionCard
                  label={option}
                  isSelected={selectedDiets.includes(option)}
                  onClick={() => toggleDiet(option)}
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
            style={styles.continueButton}
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
    maxWidth: 288, // max-w-xs
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingRight: 32, // pr-2 for scroll
    marginHorizontal: -8, // -mx-2
    paddingLeft: 8, // px-2
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  buttonText: {
    fontSize: 18, // text-lg  
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

export default DietScreen;