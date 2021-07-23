import React, { useContext, useState } from 'react';
import { StyleSheet, SafeAreaView, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import { RouteProp } from '@react-navigation/native';
import { Form } from '../components/Form';
import { Button } from '../components/Button';
import { userContext } from '../contexts/userContext';
import { updateUser } from '../lib/firebase';
import firebase from 'firebase';
import { Loading } from '../components/Loading';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>;
  route: RouteProp<RootStackParamList, 'User'>;
};

export const UserScreen: React.FC<Props> = ({ navigation, route }: Props) => {
  const { user, setUser } = useContext(userContext);
  const [name, setName] = useState<string>(user!.name);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setIsLoading(true);
    const updatedAt = firebase.firestore.Timestamp.now();
    await updateUser(user!.id as string, {
      name,
      updatedAt: updatedAt,
    });

    setUser({ ...user!, name, updatedAt });
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Form value={name} onChangeText={(text) => setName(text)} label='名前' />
      <Button onPress={onSubmit} text='保存する' />
      <Loading visible={isLoading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
