import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    persistStore, 
    persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import todoReducer from "./todoSlice";
import themeReducer from './themeSlice';
import filterReducer from './filterSlice';

const rootReducer = combineReducers({
    todos: todoReducer,
    filter: filterReducer,
    theme: themeReducer,
});

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;