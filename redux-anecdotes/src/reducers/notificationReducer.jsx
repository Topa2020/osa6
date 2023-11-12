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

export const setNotification = (content, time) => {
  return async dispatch => {
    dispatch(notification(content))
    setTimeout(() => {
      dispatch(notification(''))
    }, 1000 * time)
  }
}

export const { notification } = notificationSlice.actions
export default notificationSlice.reducer