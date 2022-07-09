import { createSlice } from "@reduxjs/toolkit";

const initialState = { message: null, messageType: `success` };

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    changeNotification(state, action) {
      // console.log(action.payload)
      return {
        message: action.payload.message,
        messageType: action.payload.messageType,
      };
    },
    removeNotification(state, action) {
      return { message: null, messageType: `success` };
    },
  },
});

export const { changeNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
