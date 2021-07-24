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

export const createReviewRef = async (shopId: string) => {
  return await firebase
    .firestore()
    .collection('shops')
    .doc(shopId)
    .collection('reviews')
    .doc();
};

export const uploadImage = async (
  uri: string,
  path: string
): Promise<string> => {
  const localUri = await fetch(uri);
  const blob = await localUri.blob();
  const ref = firebase.storage().ref().child(path);

  let downloadUrl = '';
  try {
    await ref.put(blob);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.error(err);
  }
  return downloadUrl;
};

export const getReviews = async (shopId: string) => {
  const reviewDocs = await firebase
    .firestore()
    .collection('shops')
    .doc(shopId)
    .collection('reviews')
    .orderBy('createdAt', 'desc')
    .get();
  return reviewDocs.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Review)
  );
};
