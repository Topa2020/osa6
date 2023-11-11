import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    notification(state, action) {
      const content = action.payload
      return content
    }
  }
})

export const { notification } = notificationSlice.actions
export default notificationSlice.reducer