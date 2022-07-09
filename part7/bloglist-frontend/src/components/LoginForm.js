import loginService from "../services/login";
import blogService from "../services/blogs";
import { useState } from "react";
import { useDispatch } from "react-redux";

import { changeUser } from "../reducers/userReducer";

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
    <form onSubmit={handleLogin}>
      <div id="loginForm">
        username
        <input
          type="text"
          value={username}
          name="Username"
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          id="password"
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-button">
        login
      </button>
    </form>
  );
};

export default LoginForm;
