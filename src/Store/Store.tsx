import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './Slice/CounterSlice';

const rootStore = configureStore({
  reducer: {
    counter: counterSlice
  }
});

export const store = rootStore;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
