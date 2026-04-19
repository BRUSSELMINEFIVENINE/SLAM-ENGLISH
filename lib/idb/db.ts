import { openDB } from 'idb'
import { PersistedState } from '../redux/types'

const DB_NAME = 'ES_DB'
const STORE_NAME = 'esDataState'

let dbPromise: ReturnType<typeof openDB> | null = null

function getDB() {
  if (typeof window === 'undefined') return null

  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME)
        }
      }
    })
  }

  return dbPromise
}

  export const saveDataState = async (data: PersistedState) => {
    const db = await getDB()

    if (!db) return

    await db.put(STORE_NAME, data, 'current')
  }

  export const loadDataState = async (): Promise<PersistedState | undefined> => {
    const db = await getDB()

    if (!db) return

    return await db.get(STORE_NAME, 'current')
  } 