import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInterface } from '../../Types';

type userSliceType = {
  logined: boolean;
  message: string | null;
  data: null | UserInterface;
};

const userState: userSliceType = {
  logined: false,
  message: null,
  data: null
};

const userSlice = createSlice({
  name: 'users',
  initialState: userState,
  reducers: {
    setLogin: (state, action: PayloadAction<UserInterface>) => {
      state.logined = true;
      state.message = null;
      state.data = action.payload;
    },
    clearLogin: (state, action: PayloadAction<string>) => {
      state.logined = false;
      state.message = action.payload;
      state.data = null;
    }
  }
});
export const { setLogin, clearLogin } = userSlice.actions;
export default userSlice.reducer;
