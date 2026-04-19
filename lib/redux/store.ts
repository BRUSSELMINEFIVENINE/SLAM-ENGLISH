import { configureStore, Middleware } from '@reduxjs/toolkit'
import { settingsSlice } from './features/settingsSlice'
import { api } from './api/api'
import { reduxIdbMiddleware as createReduxIdbMiddleware } from './middlewares/idb.middleware'

const reduxIdbMiddleware: Middleware = createReduxIdbMiddleware()

export const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware, reduxIdbMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch