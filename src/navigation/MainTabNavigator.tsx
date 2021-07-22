import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeStackNavigator from './HomeStackNavigator';
import { UserScreen } from '../screens/UserScreen';
import { RootStackParamList } from '../types/Navigation';
import { Feather } from '@expo/vector-icons';

const Tab = createBottomTabNavigator<RootStackParamList>();

export const MainTabNavigator = () => {
  const tabBarOptions = {
    activeTintColor: '#900',
    inactiveTintColor: '#999',
  };

  return (
    <Tab.Navigator tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarLabel: ({ color }) => (
            <Feather name='home' color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name='User'
        component={UserScreen}
        options={{
          tabBarLabel: ({ color }) => (
            <Feather name='user' color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
