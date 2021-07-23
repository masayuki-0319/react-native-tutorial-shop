import { createContext } from 'react';
import { User } from '../types/User';

type UserContext = {
  user: User | null;
  setUser: (user: User | null) => void;
};

export const userContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});
