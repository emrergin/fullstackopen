import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "./reducers/notificationReducer";
import blogsReducer from "./reducers/blogsReducer";
import userReducer from "./reducers/userReducer";

// import filterReducer from './reducers/filterReducer'
// import anecdoteService from './services/anecdotes'
// import anecdoteReducer, { setAnecdotes } from './reducers/anecdoteReducer'

// anecdoteService.getAll().then(anecdotes =>
//     store.dispatch(setAnecdotes(anecdotes))
// )

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notifications: notificationReducer,
    user: userReducer,
    // filter: filterReducer
  },
});

export default store;
