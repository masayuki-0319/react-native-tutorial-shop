import firebase from 'firebase/app';
import 'firebase/firestore';

import Constants from 'expo-constants';
import { Shop } from '../../types/Shop';

if (!firebase.apps.length) {
  const firebaseConfig = Constants.manifest!.extra!.firebase;
  firebase.initializeApp(firebaseConfig);
}

export const getShops = async () => {
  const snapshot = await firebase.firestore().collection('shops').get();
  const shops = snapshot.docs.map((doc) => doc.data() as Shop);

  return shops;
};
