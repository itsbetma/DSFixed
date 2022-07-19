import { configureStore } from '@reduxjs/toolkit'
import processReducer from './process/slice'
import messagesReducer from './messages/slice'

export const store = configureStore({
  reducer: {
    process: processReducer,
    messages: messagesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
