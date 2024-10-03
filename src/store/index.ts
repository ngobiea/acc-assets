import { configureStore } from '@reduxjs/toolkit';

import { declarationReducer } from './slices/declarationSlice/declarationSlice';
import { setupReducer } from './slices/setupSlice/setupSlice';
import { appReducer } from './slices/appSlice/appSlice';
import { authReducer } from './slices/authSlice/authSlice';
export const store = () => {
  return configureStore({
    reducer: {
      setup: setupReducer,
      declaration: declarationReducer,
      app: appReducer,
      auth: authReducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
