import { createSlice } from '@reduxjs/toolkit';

export interface LoadingInterface {
  active: boolean;
}

const loadingState: LoadingInterface = {
  active: false
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState: loadingState,
  reducers: {
    showLoading: (state) => {
      state.active = true;
    },
    hideLoading: (state) => {
      state.active = false;
    }
  }
});

export const { showLoading, hideLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
