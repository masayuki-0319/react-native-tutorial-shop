import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import ShopScreen from '../screens/ShopScreen';
import { RootStackParamList } from '../../types/Navigation';

const Stack = createStackNavigator<RootStackParamList>();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#000',
      }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='Shop' component={ShopScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
