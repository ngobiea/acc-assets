import { configureStore } from '@reduxjs/toolkit';

import { declarationReducer } from './slices/declarationSlice/declarationSlice';
import { setupReducer } from './slices/setupSlice/setupSlice';
import { appReducer } from './slices/appSlice/appSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      setup: setupReducer,
      declaration: declarationReducer,
      app: appReducer,
    },
    middleware(getDefaultMiddleware) {
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
