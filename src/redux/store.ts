import { configureStore } from '@reduxjs/toolkit';
import mapReducer from './map/slice';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: { mapReducer },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;