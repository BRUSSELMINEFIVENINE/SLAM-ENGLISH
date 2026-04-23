import { SettingsState } from './features/settingsSlice'

export type PersistedState = {
  settings: SettingsState
}

export type Word = { word: string; value: string }