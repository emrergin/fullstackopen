import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    changeUser(state, action) {
      return action.payload;
    },
    removeUser(state, action) {
      return null;
    },
  },
});

export const { changeUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
