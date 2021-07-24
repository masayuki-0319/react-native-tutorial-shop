import React, { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Image, View, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { IconButton } from '../components/IconButton';
import { TextArea } from '../components/TextArea';
import { StarInput } from '../components/StarInput';
import { Button } from '../components/Button';
import { createReviewRef, uploadImage } from '../lib/firebase';
import { userContext } from '../contexts/userContext';
import { Shop } from '../types/Shop';
import { Review } from '../types/Review';
import firebase from 'firebase';
import { pickImage } from '../lib/imagePicker';
import { getExtention } from '../utils/file';
import { Loading } from '../components/Loading';
import { reviewContext } from '../contexts/reviewsContext';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'CreateReview'>;
  route: RouteProp<RootStackParamList, 'CreateReview'>;
};

export const CreateReviewScreen: React.FC<Props> = ({
  navigation,
  route,
}: Props) => {
  const { shop } = route.params;
  const { user } = useContext(userContext);
  const { reviews, setReviews } = useContext(reviewContext);

  const [text, setText] = useState('');
  const [score, setScore] = useState(3);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onPickImage = async () => {
    const uri = await pickImage();
    if (uri !== undefined) {
      setImageUri(uri);
    }
  };

  const onSubmit = async () => {
    if (text === '') {
      Alert.alert('レビュー又は画像を入力してください');
      return;
    }
    setIsLoading(true);
    const reviewDocRef = await createReviewRef(shop.id as string);

    let downloadUrl = '';
    if (imageUri !== null) {
      const ext = getExtention(imageUri);
      const stroragePath = `reviews/${reviewDocRef.id}.${ext}`;
      downloadUrl = await uploadImage(imageUri, stroragePath);
    }

    const review: Review = {
      id: reviewDocRef.id,
      text,
      score,
      imageUrl: downloadUrl,
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
    await reviewDocRef.set(review);
    setReviews([review, ...reviews]);

    setIsLoading(false);
    navigation.goBack();
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
      <View style={styles.photoConatainer}>
        <IconButton name='camera' onPress={onPickImage} color='#ccc' />
        {imageUri !== null && (
          <Image source={{ uri: imageUri }} style={styles.image} />
        )}
      </View>
      <Button text='レビューを投稿する' onPress={onSubmit} />
      <Loading visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photoConatainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});
