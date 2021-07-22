import React, { useEffect, VFC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';
import { RouteProp } from '@react-navigation/native';
import { ShopDetail } from '../components/ShopDetail';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Shop'>;
  route: RouteProp<RootStackParamList, 'Shop'>;
};

const ShopScreen: VFC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: shop.name });
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <ShopDetail shop={shop} />
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {},
});
