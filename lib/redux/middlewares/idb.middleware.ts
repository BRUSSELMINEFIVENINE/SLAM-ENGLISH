import { createListenerMiddleware, Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { saveDataState } from '@/lib/idb/db';

export const reduxIdbMiddleware = (): Middleware => {
  const listenerMiddleware = createListenerMiddleware<RootState>()

  listenerMiddleware.startListening({
    predicate: (action) =>
      action.type.startsWith('settings-data/'),
    effect: async (_, listenerApi) => {
      try {
        const state = listenerApi.getState()
        const { settings } = state

        await saveDataState({ settings })
      } catch (e) {
        console.error('Saving Error in IndexedDB: ', e)
      }
    },
  })

  return listenerMiddleware.middleware
}