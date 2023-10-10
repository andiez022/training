import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import commonSlice from './services/controllers/common/CommonSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['common'],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    common: commonSlice,
  }),
);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
