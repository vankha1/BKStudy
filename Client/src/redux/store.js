import { configureStore } from '@reduxjs/toolkit'
import { conversationSlice } from './features/conversation'

export const makeStore = () => {
  return configureStore({
    reducer: {
      conversation: conversationSlice,
    },
  })
}