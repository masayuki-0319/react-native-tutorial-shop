import React, { useState } from 'react';

import { User } from './src/types/User';
import { Review } from './src/types/Review';
import { reviewContext } from './src/contexts/reviewsContext';
import { userContext } from './src/contexts/userContext';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);

  return (
    <userContext.Provider value={{ user, setUser }}>
      <reviewContext.Provider value={{ reviews, setReviews }}>
        <AppNavigator />
      </reviewContext.Provider>
    </userContext.Provider>
  );
}
