import loginService from "../services/login";
import blogService from "../services/blogs";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { changeUser } from "../reducers/userReducer";
import { Form, Button } from "react-bootstrap";

const LoginForm = ({ sendMessage }) => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(changeUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      sendMessage("Wrong credentials", "error");
    }
  };
  return (
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />

        <Form.Label>password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          id="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />

        <Button variant="primary" type="submit">
          login
        </Button>
      </Form.Group>
    </Form>
  );
};

export default LoginForm;
