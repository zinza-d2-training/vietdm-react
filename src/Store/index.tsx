import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './Slice/CounterSlice';
import loadingSlice from './Slice/LoadingSlice';
import userSlice from './Slice/UserSlice';

const rootStore = configureStore({
  reducer: {
    counter: counterSlice,
    loading: loadingSlice,
    users: userSlice
  }
});

export const store = rootStore;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
