import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const RecipeScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1f2937', '#000000']} style={styles.gradient}>
        <View style={styles.content}>
          <Text style={styles.title}>Recipe Instructions</Text>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dashboard' as never)}>
            <Text style={styles.buttonText}>Back to Dashboard</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  gradient: { flex: 1 },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 32 },
  title: { fontSize: 28, fontWeight: 'bold', color: '#ffffff', textAlign: 'center' },
  button: { backgroundColor: '#3b82f6', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 25 },
  buttonText: { fontSize: 16, fontWeight: 'bold', color: '#ffffff' },
});

export default RecipeScreen;