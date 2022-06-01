import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './Slice/CounterSlice';
import userReducer from './Slice/UserSlice';

const rootStore = configureStore({
  reducer: {
    counter: counterSlice,
    users: userReducer
  }
});

export const store = rootStore;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
