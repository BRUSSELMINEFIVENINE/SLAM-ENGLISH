import { createSlice } from '@reduxjs/toolkit'

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: { shuffle: false },
  reducers: {
    toggleShuffle: (state) => {
      state.shuffle = !state.shuffle
    },
  },
})

export const { toggleShuffle } = settingsSlice.actions