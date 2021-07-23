import React, { useState } from 'react';
import { userContext } from './src/contexts/userContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { User } from './src/types/User';

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <AppNavigator />
    </userContext.Provider>
  );
}
