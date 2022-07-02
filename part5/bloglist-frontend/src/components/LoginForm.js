const LoginForm = ({handleLogin,username,password,userChange,passChange}) => {
    return (   
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => userChange(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => passChange(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>      
      );
}
 
export default LoginForm;