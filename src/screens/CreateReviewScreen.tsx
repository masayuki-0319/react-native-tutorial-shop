import React, { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { IconButton } from '../components/IconButton';
import { TextArea } from '../components/TextArea';
import { StarInput } from '../components/StarInput';
import { Button } from '../components/Button';
import { addReview } from '../lib/firebase';
import { userContext } from '../contexts/userContext';
import { Shop } from '../types/Shop';
import { Review } from '../types/Review';
import firebase from 'firebase';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateReview'>;
  route: RouteProp<RootStackParamList, 'CreateReview'>;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const [text, setText] = useState('');
  const [score, setScore] = useState(3);

  const { user } = useContext(userContext);

  const onSubmit = async () => {
    const review: Review = {
      text,
      score,
      user: {
        name: user!.name,
        id: user!.id as string,
      },
      shop: {
        name: shop.name,
        id: shop!.id as string,
      },
      updatedAt: firebase.firestore.Timestamp.now(),
      createdAt: firebase.firestore.Timestamp.now(),
    };
    await addReview(shop.id as string, review);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton onPress={() => navigation.goBack()} name='x' />
      ),
    });
  }, [navigation, shop]);

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(score) => setScore(score)} />
      <TextArea
        value={text}
        onChangeText={(text) => setText(text)}
        label='レビュー'
        placeholder='レビューを書いてください'
      />
      <Button text='レビューを投稿する' onPress={onSubmit} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
