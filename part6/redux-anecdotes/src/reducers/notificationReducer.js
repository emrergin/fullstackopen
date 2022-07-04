import { createSlice } from '@reduxjs/toolkit'

const initialState = [{id:0, message:'' , active: false}]
const getId = () => (100000 * Math.random()).toFixed(0)

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
      addNotification(state, action) {
        state.push({id: action.payload.id, message: action.payload.message, active: true});
      },
      deactivateNotification(state,action){
        const id = action.payload
        const notificationToChange = state.find(n => n.id === id)
        const changedNotification = { 
            ...notificationToChange, 
            active: false 
        }
        return state.map(notification =>
            notification.id !== id ? notification : changedNotification 
        )
      }
    },
  })
  
  export const { addNotification, deactivateNotification } = notificationSlice.actions

  export const setNotification = (text,time) => {
    return async dispatch => {
      const notificationId=getId();
      dispatch(addNotification({message:text, id:notificationId}))
      setTimeout(() => {
            dispatch(deactivateNotification(notificationId))
          }, time*1000)
    }
  }
  export default notificationSlice.reducer