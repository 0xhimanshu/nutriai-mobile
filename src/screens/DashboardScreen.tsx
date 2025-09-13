/**
 * Dashboard Screen - Main app interface
 * Shows AI meal recommendations and navigation
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../../App';

const { width } = Dimensions.get('window');

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

// Mock meal data
const mockMeals = [
  {
    id: '1',
    name: 'Butter Chicken',
    restaurant: 'Maharaja Palace',
    cuisine: 'Indian',
    rating: 4.5,
    calories: 520,
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300',
    deliveryTime: '30-45 min',
    tags: ['Spicy', 'Protein Rich'],
  },
  {
    id: '2',
    name: 'Mediterranean Bowl',
    restaurant: 'Fresh Greens',
    cuisine: 'Mediterranean',
    rating: 4.3,
    calories: 380,
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300',
    deliveryTime: '20-30 min',
    tags: ['Healthy', 'Vegetarian'],
  },
  {
    id: '3',
    name: 'Sushi Combo',
    restaurant: 'Tokyo Express',
    cuisine: 'Japanese',
    rating: 4.7,
    calories: 340,
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300',
    deliveryTime: '25-35 min',
    tags: ['Fresh', 'Low Carb'],
  },
];

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<DashboardScreenNavigationProp>();
  const [currentTime, setCurrentTime] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hour = now.getHours();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }));

      if (hour < 12) setGreeting('Good morning');
      else if (hour < 17) setGreeting('Good afternoon'); 
      else setGreeting('Good evening');
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRecipePress = (mealId: string) => {
    navigation.navigate('Recipe', { id: mealId });
  };

  const handleOrderPress = (mealId: string) => {
    navigation.navigate('Order', { id: mealId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#1f2937', '#000000', '#000000']}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View style={styles.logoContainer}>
              <View style={styles.logoCircle}>
                <Ionicons name="nutrition" size={20} color="#60a5fa" />
              </View>
              <View>
                <Text style={styles.logoText}>NutriAI</Text>
                <Text style={styles.greetingText}>{greeting}! Ready to eat well?</Text>
              </View>
            </View>
            
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{currentTime}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={12} color="#9ca3af" />
                <Text style={styles.locationText}>Mumbai, India</Text>
              </View>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={[styles.statCard, { backgroundColor: 'rgba(59, 130, 246, 0.1)' }]}>
              <Text style={[styles.statLabel, { color: '#60a5fa' }]}>Today's Goal</Text>
              <Text style={styles.statValue}>1,800 cal</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: 'rgba(16, 185, 129, 0.1)' }]}>
              <Text style={[styles.statLabel, { color: '#34d399' }]}>Meals Left</Text>
              <Text style={styles.statValue}>2 meals</Text>
            </View>
            <View style={[styles.statCard, { backgroundColor: 'rgba(168, 85, 247, 0.1)' }]}>
              <Text style={[styles.statLabel, { color: '#a78bfa' }]}>Streak</Text>
              <Text style={styles.statValue}>5 days</Text>
            </View>
          </View>
        </View>

        {/* Main Content */}
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitle}>
              <Ionicons name="sparkles" size={20} color="#60a5fa" />
              <Text style={styles.sectionTitleText}>Today's AI Picks</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.regenerateText}>Regenerate</Text>
            </TouchableOpacity>
          </View>

          {/* Meal Cards */}
          <View style={styles.mealsContainer}>
            {mockMeals.map((meal) => (
              <View key={meal.id} style={styles.mealCard}>
                <View style={styles.mealCardContent}>
                  <Image source={{ uri: meal.image }} style={styles.mealImage} />
                  
                  <View style={styles.mealInfo}>
                    <View style={styles.mealHeader}>
                      <View>
                        <Text style={styles.mealName}>{meal.name}</Text>
                        <Text style={styles.restaurantName}>{meal.restaurant}</Text>
                      </View>
                      <View style={styles.priceContainer}>
                        <Text style={styles.price}>${meal.price}</Text>
                        <View style={styles.ratingContainer}>
                          <Ionicons name="star" size={12} color="#fbbf24" />
                          <Text style={styles.rating}>{meal.rating}</Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.tagsContainer}>
                      <View style={styles.cuisineTag}>
                        <Text style={styles.tagText}>{meal.cuisine}</Text>
                      </View>
                      {meal.tags.map(tag => (
                        <View key={tag} style={styles.tag}>
                          <Text style={styles.tagText}>{tag}</Text>
                        </View>
                      ))}
                    </View>

                    <View style={styles.mealFooter}>
                      <View style={styles.mealDetails}>
                        <View style={styles.detailItem}>
                          <Ionicons name="time" size={12} color="#9ca3af" />
                          <Text style={styles.detailText}>{meal.deliveryTime}</Text>
                        </View>
                        <Text style={styles.detailText}>{meal.calories} cal</Text>
                      </View>

                      <View style={styles.actionButtons}>
                        <TouchableOpacity 
                          style={styles.cookButton}
                          onPress={() => handleRecipePress(meal.id)}
                        >
                          <Ionicons name="restaurant" size={12} color="#60a5fa" />
                          <Text style={styles.cookButtonText}>Cook</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                          style={styles.orderButton}
                          onPress={() => handleOrderPress(meal.id)}
                        >
                          <Ionicons name="bag" size={12} color="#ffffff" />
                          <Text style={styles.orderButtonText}>Order</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="restaurant" size={20} color="#60a5fa" />
            <Text style={[styles.navText, { color: '#60a5fa' }]}>Today</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="location" size={20} color="#9ca3af" />
            <Text style={styles.navText}>Nearby</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="chatbubble" size={20} color="#9ca3af" />
            <Text style={styles.navText}>AI Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person" size={20} color="#9ca3af" />
            <Text style={styles.navText}>Profile</Text>
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
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  greetingText: {
    fontSize: 14,
    color: '#9ca3af',
  },
  timeContainer: {
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#ffffff',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  scrollView: {
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitleText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  regenerateText: {
    fontSize: 14,
    color: '#60a5fa',
    fontWeight: '500',
  },
  mealsContainer: {
    paddingHorizontal: 24,
    gap: 16,
  },
  mealCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
  },
  mealCardContent: {
    padding: 16,
  },
  mealImage: {
    width: '100%',
    height: 120,
    borderRadius: 12,
    marginBottom: 12,
  },
  mealInfo: {
    gap: 12,
  },
  mealHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  mealName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  restaurantName: {
    fontSize: 14,
    color: '#9ca3af',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 12,
    color: '#9ca3af',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cuisineTag: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  tag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tagText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  mealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  cookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
  },
  cookButtonText: {
    fontSize: 12,
    color: '#60a5fa',
    fontWeight: '500',
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#3b82f6',
  },
  orderButtonText: {
    fontSize: 12,
    color: '#ffffff',
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    backgroundColor: 'rgba(17, 24, 39, 0.5)',
    paddingVertical: 12,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '500',
  },
});

export default DashboardScreen;