/**
 * User Context - Global state management for onboarding and user data
 * Ensures data persistence across all screens
 */

import React, { createContext, useContext, useState, ReactNode } from 'react';

// User data structure matching backend schema
interface UserData {
  // Authentication
  id?: string;
  email?: string;
  phone?: string;
  
  // Onboarding data
  location?: {
    city?: string;
    country?: string;
    latitude?: number;
    longitude?: number;
  };
  dietaryPreferences?: string[];
  primaryGoal?: string;
  mealTimings?: {
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
  calorieTarget?: number;
  macroPreferences?: {
    protein?: number;
    carbs?: number;
    fat?: number;
  };
  preferredCuisines?: string[];
  allergies?: string[];
  
  // App state
  onboardingCompleted?: boolean;
  subscriptionTier?: 'free' | 'premium';
  lastUpdated?: string;
}

interface UserContextType {
  userData: UserData;
  updateUserData: (data: Partial<UserData>) => void;
  clearUserData: () => void;
  isOnboardingComplete: () => boolean;
  validateOnboardingStep: (step: string) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>({
    subscriptionTier: 'free',
    onboardingCompleted: false,
  });

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({
      ...prev,
      ...data,
      lastUpdated: new Date().toISOString(),
    }));
    
    // In production, sync with backend API
    console.log('User data updated:', { ...userData, ...data });
  };

  const clearUserData = () => {
    setUserData({
      subscriptionTier: 'free',
      onboardingCompleted: false,
    });
  };

  const isOnboardingComplete = (): boolean => {
    return !!(
      userData.location &&
      userData.dietaryPreferences &&
      userData.primaryGoal &&
      userData.mealTimings &&
      userData.calorieTarget &&
      userData.preferredCuisines &&
      userData.allergies !== undefined // Can be empty array
    );
  };

  const validateOnboardingStep = (step: string): boolean => {
    switch (step) {
      case 'location':
        return !!(userData.location?.city && userData.location?.country);
      case 'diet':
        return !!(userData.dietaryPreferences && userData.dietaryPreferences.length > 0);
      case 'goals':
        return !!userData.primaryGoal;
      case 'timings':
        return !!(userData.mealTimings?.breakfast && userData.mealTimings?.lunch && userData.mealTimings?.dinner);
      case 'calories':
        return !!(userData.calorieTarget && userData.calorieTarget > 0);
      case 'macros':
        return !!(userData.macroPreferences?.protein);
      case 'cuisines':
        return !!(userData.preferredCuisines && userData.preferredCuisines.length > 0);
      case 'allergies':
        return userData.allergies !== undefined; // Can be empty
      default:
        return false;
    }
  };

  return (
    <UserContext.Provider 
      value={{
        userData,
        updateUserData,
        clearUserData,
        isOnboardingComplete,
        validateOnboardingStep,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export default UserContext;