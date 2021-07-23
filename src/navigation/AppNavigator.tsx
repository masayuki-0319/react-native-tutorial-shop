import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainTabNavigator } from './MainTabNavigator';
import { AuthScreen } from '../screens/AuthScreen';
import { userContext } from '../contexts/userContext';

export const AppNavigator = () => {
  const { user } = useContext(userContext);

  return (
    <NavigationContainer>
      {user === null ? <AuthScreen /> : <MainTabNavigator />}
    </NavigationContainer>
  );
};
