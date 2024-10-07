import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: AppSliceState = {
  mdas: [],
  file: null,
  openSidenav: false,
};
const appSlice = createSlice({
  initialState,
  name: 'app',
  reducers: {
    setFile(state, action: PayloadAction<File | null>) {
      state.file = action.payload;
    },
    setOpenSidenav: (state, action: PayloadAction<boolean>) => {
      state.openSidenav = action.payload;
    },
  },
});

export const {
  setFile,
   setOpenSidenav
} = appSlice.actions;
export const appReducer = appSlice.reducer;
