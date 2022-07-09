import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import { useDispatch, useSelector } from "react-redux";
import {
  changeNotification,
  removeNotification,
} from "./reducers/notificationReducer";
import { changeUser, removeUser } from "./reducers/userReducer";
import { initializeBlogs, appendBlog } from "./reducers/blogsReducer";

import blogService from "./services/blogs";
import axios from "axios";
import { Routes, Route, Link,  useMatch } from "react-router-dom";

const MainView = ({ blogs, user, addBlog, sendMessage, noteFormRef }) => {
  if (!user) {
    return null;
  }
  return (
    <>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} sendMessage={sendMessage} user={user} />
      ))}
    </>
  );
};

const Users = ({ users }) => {
  const padding = {
    padding: 5
  }
  return (
    <table>
      <thead>
        <tr>
          <th>name</th>
          <th>blogs created</th>
          <th>id</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
            <td> <Link style={padding} to={`/users/${user.id}`}>User Page</Link></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const User = ({ individualUser }) => {
  if (!individualUser){
    return null
  }
  return (
    <div>
      <h2>{individualUser.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {individualUser.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [individualUser, setIndividualUser]=useState(null);

  const noteFormRef = useRef();
  const dispatch = useDispatch();
  const match = useMatch('/users/:id');

  let [blogs, user] = useSelector((state) => [state.blogs, state.user]);
  let timeoutID = null;

  const sendMessage = (message, messageType, timeout = 5000) => {
    clearTimeout(timeoutID);
    dispatch(changeNotification({ message, messageType }));
    timeoutID = setTimeout(() => dispatch(removeNotification()), timeout);
  };

  const addBlog = async (event, title, author, url) => {
    event.preventDefault();
    const newBlog = {
      title: title,
      author: author,
      url: url,
    };
    blogService
      .create(newBlog)
      .then((returnedBlog) => {
        noteFormRef.current.toggleVisibility();
        dispatch(appendBlog(returnedBlog));
        sendMessage(`${returnedBlog.title} is saved.`, "success");
      })
      .catch((error) => {
        sendMessage(
          error || error.response.data.error || error.request.statusText,
          "error"
        );
      });
  };

  useEffect(() => {
    dispatch(initializeBlogs());
    const getAll = async () => {
      const request = await axios.get("/api/users");
      setUsers(request.data);    
    };
    const userN = match     
    ? users.find(user => user.id === Number(match.params.id))    
    : null
    setIndividualUser(userN)
    getAll();
  }, [dispatch,users,match]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(changeUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  return (
      <div>
        <Notification />
        {user === null && <LoginForm />}
        {user !== null && (
          <div>
            <p>{user.name} is logged in.</p>
            <button
              onClick={() => {
                window.localStorage.removeItem("loggedBlogappUser");
                dispatch(removeUser());
              }}
            >
              {" "}
              Logout{" "}
            </button>
          </div>
        )}
        <h2>blogs</h2>

        <Routes>
          {/* <Route path="/notes" element={<Notes />} /> */}
          <Route path="/users/:id" element={<User individualUser={individualUser} />} />
          <Route path="/users" element={<Users users={users} />} />
          <Route
            path="/"
            element={
              <MainView
                blogs={blogs}
                user={user}
                addBlog={addBlog}
                sendMessage={sendMessage}
                noteFormRef={noteFormRef}
              />
            }
          />
        </Routes>
      </div>
  );
};

export default App;
