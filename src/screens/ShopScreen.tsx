import React, { useContext, useEffect, useState, VFC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from '../types/Navigation';
import { getReviews } from '../lib/firebase';
import { reviewContext } from '../contexts/reviewsContext';

import { ShopDetail } from '../components/ShopDetail';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { ReviewItem } from '../components/ReviewItem';

type Props = {
  route: RouteProp<RootStackParamList, 'Shop'>;
  navigation: StackNavigationProp<RootStackParamList, 'Shop'>;
};

const ShopScreen: VFC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;
  const { reviews, setReviews } = useContext(reviewContext);

  useEffect(() => {
    navigation.setOptions({ title: shop.name });

    const fetchReviews = async () => {
      const reviews = await getReviews(shop!.id as string);
      setReviews(reviews);
    };
    fetchReviews();
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={<ShopDetail shop={shop} />}
        data={reviews}
        renderItem={({ item }) => <ReviewItem review={item} />}
        keyExtractor={(_, index) => index.toString()}
      />
      <FloatingActionButton
        iconName='plus'
        onPress={() => navigation.navigate('CreateReview', { shop })}
      />
    </SafeAreaView>
  );
};

export default ShopScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
  },
});
