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
import { Routes, Route, Link, useMatch } from "react-router-dom";

import { Table, Navbar,Nav, Button } from "react-bootstrap";
import styled from 'styled-components'

const padding = {
  padding: 5,
};
const MainListItem = styled.div`
  padding: 2ch 5ch;
  border: solid;
  border-width: 1;
  margin-bottom: 10;
  border-radius: 3px;
  `


const MainView = ({ blogs, user, addBlog, noteFormRef }) => {
  if (!user) {
    return null;
  }

  return (
    <>
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs.map((blog) => (
        <MainListItem key={blog.id}>
          <Link style={padding} to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </MainListItem>
      ))}
    </>
  );
};

const Users = ({ users }) => {
  return (
    <Table striped>
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
            <td>
              {" "}
              <Link style={padding} to={`/users/${user.id}`}>
                User Page
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const User = ({ individualUser }) => {
  if (!individualUser) {
    return null;
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

  const noteFormRef = useRef();
  const dispatch = useDispatch();
  let [blogs, user] = useSelector((state) => [state.blogs, state.user]);
  let timeoutID =  useRef();

  const matchUser = useMatch("/users/:id");
  const matchBlog = useMatch("/blogs/:id");

  const individualUser = matchUser
    ? users.find((user) => user.id === matchUser.params.id)
    : null;

  const individualBlog = matchBlog
    ? blogs.find((blog) => blog.id === matchBlog.params.id)
    : null;

  const sendMessage = (message, messageType, timeout = 5000) => {
    clearTimeout(timeoutID.current);
    dispatch(changeNotification({ message, messageType }));
    timeoutID.current = setTimeout(() => dispatch(removeNotification()), timeout);
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
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(changeUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  useEffect(() => {
    const getAll = async () => {
      const request = await axios.get("/api/users");
      setUsers(request.data);
    };
    getAll();
  }, [dispatch]);

  return (
    <div className="container">
      <Notification />

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? 
                <span>
                  <span>{user.name} is logged in.</span>
                  <Button variant="secondary"
                    onClick={() => {
                      window.localStorage.removeItem("loggedBlogappUser");
                      dispatch(removeUser());
                    }}
                  >
                    {" "}
                    Logout{" "}
                  </Button>
                </span>
                : <LoginForm />
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {user && <h2>blogs</h2>}

      <Routes>
        <Route
          path="/users/:id"
          element={<User individualUser={individualUser} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route
          path="/blogs/:id"
          element={
            <Blog blog={individualBlog} sendMessage={sendMessage} user={user} />
          }
        />
        <Route
          path="/"
          element={
            <MainView
              blogs={blogs}
              user={user}
              addBlog={addBlog}
              noteFormRef={noteFormRef}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
