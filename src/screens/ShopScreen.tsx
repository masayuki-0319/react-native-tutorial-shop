import React, { useEffect, useState, VFC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/Navigation';
import { RouteProp } from '@react-navigation/native';
import { ShopDetail } from '../components/ShopDetail';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { getReviews } from '../lib/firebase';
import { Review } from '../types/Review';
import { FlatList } from 'react-native-gesture-handler';
import { ReviewItem } from '../components/ReviewItem';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Shop'>;
  route: RouteProp<RootStackParamList, 'Shop'>;
};

const ShopScreen: VFC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;
  const [reviews, setReviews] = useState<Review[]>([]);

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
