import { createContext } from 'react';
import { Review } from '../types/Review';

type ReviewsContextValue = {
  reviews: Review[] | [];
  setReviews: (review: Review[]) => void;
};

export const reviewContext = createContext<ReviewsContextValue>({
  reviews: [],
  setReviews: () => {},
});
