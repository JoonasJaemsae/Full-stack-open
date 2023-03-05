import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        displayNotification(state, action) {
            return action.payload
        }
    },
})

export const { displayNotification } = notificationSlice.actions

export const setNotification = (content, duration) => {
    return async dispatch => {
        dispatch(displayNotification(content))
        setTimeout(() => {
            dispatch(displayNotification(''))
        }, duration * 1000);
    }
}

export default notificationSlice.reducer



