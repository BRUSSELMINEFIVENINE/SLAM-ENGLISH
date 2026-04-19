import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface SettingsState {
  shuffle: boolean
  learnMode: boolean
}

export const initialSettingsState = {
  shuffle: false,
  learnMode: false,
}

export const settingsSlice = createSlice({
  name: 'settings-data',
  initialState: initialSettingsState,
  reducers: {
    setSettings: (state, action: PayloadAction<SettingsState>) => {
      state.shuffle = action.payload.shuffle
      state.learnMode = action.payload.learnMode
    },

    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle
    },

    toggleLearnMode: (state) => {
      state.learnMode = !state.learnMode
    },
  },
})

export const { toggleShuffle, toggleLearnMode, setSettings } = settingsSlice.actions