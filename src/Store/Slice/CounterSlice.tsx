import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterInterface {
  value: number;
  positive_number: boolean;
}

const counterState: CounterInterface = {
  value: 0,
  positive_number: false
};

export const CounterSlice = createSlice({
  name: 'counter',
  initialState: counterState,
  reducers: {
    plus: (state) => {
      state.value++;
    },
    plusByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    minus: (state) => {
      state.value--;
      if (state.value < 0 && state.positive_number) {
        state.value = 0;
      }
    },
    minusByAmount: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
      if (state.value < 0 && state.positive_number) {
        state.value = 0;
      }
    },
    setPositiveNumber: (state, action: PayloadAction<boolean>) => {
      state.positive_number = action.payload;
      if (action.payload && state.value < 0) {
        state.value = 0;
      }
    },
    setDefaultValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
      if (state.positive_number && state.value < 0) {
        state.value = 0;
      }
    }
  }
});

//ý tưởng của counterReader dùng để làm method read data cho CounterSlice
export const counterReader = {
  count: () => counterState.value,
  getPositiveNumber: () => counterState.positive_number
};

export const { plus, plusByAmount, minus, minusByAmount, setPositiveNumber, setDefaultValue } =
  CounterSlice.actions;
export default CounterSlice.reducer;
