import { combineReducers, configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { setupListeners } from '@reduxjs/toolkit/query'
import { experienceApi} from './services'
import { generatedSlice } from './generatedSlice'


const persistConfig = {
  key: 'root',
  storage
}
const rootReducer = combineReducers({
  generated: persistReducer(persistConfig, generatedSlice.reducer),
  [experienceApi.reducerPath]: experienceApi.reducer,
})


export const store = configureStore({
  reducer: rootReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
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
// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)