import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/es/storage';
import articlesSlice from './articlesSlice';
import favoriteSlice from './favoritesSlice';
import persistReducer from 'redux-persist/es/persistReducer';
import persistStore from 'redux-persist/es/persistStore';

const persistorConfig = {
  key: 'root',
  storage,
  blacklist: ['articles'],
};

const rootReducer = combineReducers({
  articles: articlesSlice,
  favorites: favoriteSlice,
});

export const persistorReducer = persistReducer(persistorConfig, rootReducer);

export const store = configureStore({
  reducer: persistorReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PURGE',
          'persist/REGISTER',
          'persist/FLUSH',
          'persist/PAUSE',
        ],
      },
    }),
});

export const persistor = persistStore(store);
