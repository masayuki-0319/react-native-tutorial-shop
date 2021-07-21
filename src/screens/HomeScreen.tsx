import React, { useEffect, useState, VFC } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Shop } from '../../types/Shop';
import { ShopReviewItem } from '../components/ShopReviewItem';
import { getShops } from '../lib/firebase';

type RootStackParamList = {
  Home: undefined;
  Shop: undefined;
};
type ShopScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Shop'>;

type Props = {
  navigation: ShopScreenNavigationProp;
};

export const HomeScreen: VFC<Props> = ({ navigation }) => {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  const onPressShop = () => {
    navigation.navigate('Shop');
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} onPress={onPressShop} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
