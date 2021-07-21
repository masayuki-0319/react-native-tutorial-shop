import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, StyleSheet } from 'react-native';

import { ShopReviewItem } from './src/components/ShopReviewItem';
import { getShops } from './src/lib/firebase';
import { Shop } from './types/Shop';

export default function App() {
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    getFirebaseItems();
  }, []);

  const getFirebaseItems = async () => {
    const shops = await getShops();
    setShops(shops);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shops}
        renderItem={({ item }: { item: Shop }) => (
          <ShopReviewItem shop={item} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
