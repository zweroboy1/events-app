import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { eventsApi } from './services/eventsApi';

const rootReducer = combineReducers({
  eventsApi: eventsApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;
