import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthSliceState = {
  isSubmittingForgotPassword: false,
  isSubmittingLogin: false,
  isSubmittingLogout: false,
  isSubmittingRegister: false,
  isSubmittingResendVerification: false,
  isSubmittingResetPassword: false,
  isSubmittingVerification: false,
  isSubmittingUpdatePassword: false,
};

const authSlice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setSubmittingForgotPassword(state, action: PayloadAction<boolean>) {
      state.isSubmittingForgotPassword = action.payload;
    },
    setSubmittingLogin(state, action: PayloadAction<boolean>) {
      state.isSubmittingLogin = action.payload;
    },
    setSubmittingLogout(state, action: PayloadAction<boolean>) {
      state.isSubmittingLogout = action.payload;
    },
    setSubmittingRegister(state, action: PayloadAction<boolean>) {
      state.isSubmittingRegister = action.payload;
    },
    setSubmittingResendVerification(state, action: PayloadAction<boolean>) {
      state.isSubmittingResendVerification = action.payload;
    },
    setSubmittingResetPassword(state, action: PayloadAction<boolean>) {
      state.isSubmittingResetPassword = action.payload;
    },
    setSubmittingVerification(state, action: PayloadAction<boolean>) {
      state.isSubmittingVerification = action.payload;
    },
    setSubmittingUpdatePassword(state, action: PayloadAction<boolean>) {
      state.isSubmittingUpdatePassword = action.payload;
    },
  },
});

export const {
  setSubmittingForgotPassword,
  setSubmittingLogin,
  setSubmittingLogout,
  setSubmittingRegister,
  setSubmittingResendVerification,
  setSubmittingResetPassword,
  setSubmittingVerification,
  setSubmittingUpdatePassword,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
