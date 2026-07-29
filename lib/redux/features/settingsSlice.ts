import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  shuffle: boolean
  learnMode: boolean
  layout: string // 'single' | 'list'
}

export const initialSettingsState = {
  shuffle: false,
  learnMode: false,
  layout: 'single',
}

export const settingsSlice = createSlice({
  name: 'settings-data',
  initialState: initialSettingsState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsState>) => {
      state.shuffle = action.payload.shuffle
      state.learnMode = action.payload.learnMode
      state.layout = action.payload.layout
    },

    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle
    },

    toggleLearnMode: (state) => {
      state.learnMode = !state.learnMode
    },

    toggleLayout: (state) => {
      if (state.layout === 'single') state.layout = 'list'
      else state.layout = 'single'
    }
  },
})

export const { toggleShuffle, toggleLearnMode, setSettings, toggleLayout } = settingsSlice.actions