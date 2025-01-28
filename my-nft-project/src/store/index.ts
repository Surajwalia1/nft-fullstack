// store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import { authApi } from '../services/authApi';
import nftReducer from './nftSlice';
import { nftApi } from '../services/nftApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    nft: nftReducer,
    [nftApi.reducerPath]: nftApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, nftApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
