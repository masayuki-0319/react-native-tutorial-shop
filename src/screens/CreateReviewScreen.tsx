import React, { useLayoutEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { IconButton } from '../components/IconButton';
import { TextArea } from '../components/TextArea';
import { StarInput } from '../components/StarInput';

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
        value={''}
        onChangeText={(text) => setText(text)}
        label='レビュー'
        placeholder='レビューを書いてください'
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
