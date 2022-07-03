import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin,username,password,userChange,passChange }) => {

    return (
        <form onSubmit={handleLogin}>
            <div id="loginForm">
            username
                <input
                    type="text"
                    value={username}
                    name="Username"
                    id="username"
                    onChange={({ target }) => userChange(target.value)}
                />
            </div>
            <div>
            password
                <input
                    type="password"
                    value={password}
                    id="password"
                    name="Password"
                    onChange={({ target }) => passChange(target.value)}
                />
            </div>
            <button type="submit" id="login-button">login</button>
        </form>
    )
}

LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    userChange: PropTypes.func.isRequired,
    passChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
}

export default LoginForm