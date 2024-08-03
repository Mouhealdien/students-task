import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import { Api } from './services/Api'
import authReducer from './features/authSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [Api.reducerPath]: Api.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
})


setupListeners(store.dispatch)