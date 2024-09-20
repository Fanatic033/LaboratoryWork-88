import {configureStore} from '@reduxjs/toolkit';
import {usersReducer} from '../features/User/UserSlice.ts';
import storage from 'redux-persist/lib/storage';
import {persistReducer, persistStore} from 'redux-persist';
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE} from 'redux-persist/es/constants';

const usersPersistConfig = {
  key: 'reddit',
  storage,
  whiteList: ['user'],
}

const rootReducer = {
  users: persistReducer(usersPersistConfig, usersReducer),
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  },
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;