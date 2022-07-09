import blogService from "../services/blogs";
import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    appendBlog(state, action) {
      return state.concat(action.payload).sort((a, b) => b.likes - a.likes);
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes);
    },
    updateBlog(state, action) {
      return state
        .map((blog) => (blog.id === action.payload.id ? action.payload : blog))
        .sort((a, b) => b.likes - a.likes);
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogSlice.actions;
export default blogSlice.reducer;
