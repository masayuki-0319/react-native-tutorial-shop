import { Shop } from './Shop';

export type RootStackParamList = {
  Home: undefined;
  Shop: { shop: Shop };
  User: undefined;
};
