import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

export const defaultMessages: MessagesState['leftMessages' | 'rightMessages'] = [
  'M',
  'M',
  'M',
  'M',
  'M',
  'M',
  'M',
  'M',
  'M',
  'M',
]

export interface MessagesState {
  leftMessages: [string, string, string, string, string, string, string, string, string, string]
  rightMessages: [string, string, string, string, string, string, string, string, string, string]
}

const initialState: MessagesState = {
  leftMessages: cloneDeep(defaultMessages),
  rightMessages: cloneDeep(defaultMessages),
}

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    changeLeftMessages: (state, action: PayloadAction<MessagesState['leftMessages']>) => {
      state.leftMessages = action.payload
    },
    changeRightMessages: (state, action: PayloadAction<MessagesState['rightMessages']>) => {
      state.rightMessages = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeLeftMessages, changeRightMessages } = messagesSlice.actions

export default messagesSlice.reducer
