import { combineReducers, configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { setupListeners } from '@reduxjs/toolkit/query';

import { experienceApi} from './services';
import { generatedSlice } from './generatedSlice';


const persistConfig = {
  key: 'root',
  storage
};

const rootReducer = combineReducers({
  generated: persistReducer(persistConfig, generatedSlice.reducer),
  [experienceApi.reducerPath]: experienceApi.reducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: {
        extraArgument: experienceApi,
      },
    }).concat(experienceApi.middleware),
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store["getState"]>;

setupListeners(store.dispatch)