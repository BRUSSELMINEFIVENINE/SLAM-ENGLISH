import { configureStore } from '@reduxjs/toolkit'
import { settingsSlice } from './features/settingsSlice'
import { api } from './api/api'

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch