import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

import Constants from 'expo-constants';
import { Shop } from '../types/Shop';
import { initialUser, User } from '../types/User';
import { Review } from '../types/Review';

if (!firebase.apps.length) {
  const firebaseConfig = Constants.manifest!.extra!.firebase;
  firebase.initializeApp(firebaseConfig);
}

export const getShops = async () => {
  const snapshot = await firebase
    .firestore()
    .collection('shops')
    .orderBy('score', 'desc')
    .get();
  const shops = snapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Shop)
  );

  return shops;
};

export const signIn = async () => {
  const userCredential = await firebase.auth().signInAnonymously();
  const { uid } = userCredential.user!;

  const userDoc = await firebase.firestore().collection('users').doc(uid).get();
  if (!userDoc.exists) {
    await firebase.firestore().collection('users').doc(uid).set(initialUser);
    return {
      ...initialUser,
      id: uid,
    } as User;
  } else {
    return {
      id: uid,
      ...userDoc.data(),
    } as User;
  }
};

export const updateUser = async (userId: string, params: Partial<User>) => {
  await firebase.firestore().collection('users').doc(userId).update(params);
};

export const addReview = async (shopId: string, review: Review) => {
  await firebase
    .firestore()
    .collection('shops')
    .doc(shopId)
    .collection('reviews')
    .add(review);
};
