import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: AppSliceState = {
  mdas: [],
  file: null,
};
const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setFile(state, action: PayloadAction<File |null>) {
      state.file = action.payload;
    },
  },
});

export const {
  setFile
} = appSlice.actions;
export const appReducer = appSlice.reducer;
