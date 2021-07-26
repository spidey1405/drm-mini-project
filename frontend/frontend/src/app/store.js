import { configureStore } from '@reduxjs/toolkit';
import dbSlice from '../features/backendConnect/backendSlice';

export const store = configureStore({
  reducer: {
    dbSlice: dbSlice,
  },
});
