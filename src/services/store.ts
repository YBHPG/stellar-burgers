import { configureStore } from '@reduxjs/toolkit';
import {
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
  TypedUseSelectorHook
} from 'react-redux';

import userData from './slices/userSlice';
import ingredientData from './slices/ingredientsSlice';
import constructorData from './slices/burgerConstructorSlice';
import orderData from './slices/orderSlice';
import feedData from './slices/feedSlice';
import historyData from './slices/orderHistorySlice';

const combinedReducers = {
  user: userData,
  ingredients: ingredientData,
  burgerConstructor: constructorData,
  order: orderData,
  feed: feedData,
  orderHistory: historyData
};

const globalStore = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof globalStore.getState>;

export type AppDispatch = typeof globalStore.dispatch;

export const useDispatch = (): AppDispatch => useAppDispatch();
export const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export default globalStore;
