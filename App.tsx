/**
 * NutriAI React Native App
 * Main entry point for the native iOS/Android application
 */

import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserProvider } from './src/context/UserContext';

// Import screens
import LandingScreen from './src/screens/LandingScreen';
import SignInScreen from './src/screens/SignInScreen';
import OnboardingLocationScreen from './src/screens/onboarding/LocationScreen';
import OnboardingDietScreen from './src/screens/onboarding/DietScreen';
import OnboardingGoalsScreen from './src/screens/onboarding/GoalsScreen';
import OnboardingTimingsScreen from './src/screens/onboarding/TimingsScreen';
import OnboardingCaloriesScreen from './src/screens/onboarding/CaloriesScreen';
import OnboardingMacrosScreen from './src/screens/onboarding/MacrosScreen';
import OnboardingCuisinesScreen from './src/screens/onboarding/CuisinesScreen';
import OnboardingAllergiesScreen from './src/screens/onboarding/AllergiesScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import RecipeScreen from './src/screens/RecipeScreen';
import OrderScreen from './src/screens/OrderScreen';
import AdminScreen from './src/screens/AdminScreen';

// Navigation type definitions
export type RootStackParamList = {
  Landing: undefined;
  SignIn: undefined;
  OnboardingLocation: undefined;
  OnboardingDiet: undefined;
  OnboardingGoals: undefined;
  OnboardingTimings: undefined;
  OnboardingCalories: undefined;
  OnboardingMacros: undefined;
  OnboardingCuisines: undefined;
  OnboardingAllergies: undefined;
  Dashboard: undefined;
  Recipe: { id: string };
  Order: { id: string };
  Admin: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Landing"
          screenOptions={{
            headerShown: false, // Hide default header to use custom UI
            gestureEnabled: true,
            animationEnabled: true,
            cardStyleInterpolator: ({ current, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            },
          }}
        >
          {/* Landing and Authentication */}
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          
          {/* Onboarding Flow */}
          <Stack.Screen name="OnboardingLocation" component={OnboardingLocationScreen} />
          <Stack.Screen name="OnboardingDiet" component={OnboardingDietScreen} />
          <Stack.Screen name="OnboardingGoals" component={OnboardingGoalsScreen} />
          <Stack.Screen name="OnboardingTimings" component={OnboardingTimingsScreen} />
          <Stack.Screen name="OnboardingCalories" component={OnboardingCaloriesScreen} />
          <Stack.Screen name="OnboardingMacros" component={OnboardingMacrosScreen} />
          <Stack.Screen name="OnboardingCuisines" component={OnboardingCuisinesScreen} />
          <Stack.Screen name="OnboardingAllergies" component={OnboardingAllergiesScreen} />
          
          {/* Main App */}
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
          <Stack.Screen name="Recipe" component={RecipeScreen} />
          <Stack.Screen name="Order" component={OrderScreen} />
          
          {/* Admin */}
          <Stack.Screen name="Admin" component={AdminScreen} />
        </Stack.Navigator>
        </NavigationContainer>
        
        {/* Status bar configuration */}
        <StatusBar style="light" backgroundColor="#000000" />
      </UserProvider>
    </SafeAreaProvider>
  );
}