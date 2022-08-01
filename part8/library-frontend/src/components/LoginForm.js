import { useState, useEffect } from 'react'
import { gql, useMutation  } from '@apollo/client'

const LOGIN = gql`
mutation createBook($username: String!, $password: String!) {
  login(
    username: $username,
    password: $password
  ) {
    value
  }
}
`

const LoginForm = ({setError,setToken,show}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [ login , result] = useMutation(LOGIN,{
    onError: (error)=>{
      setError(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
      console.log(token)
    }
  }, [result.data])// eslint-disable-line

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({  variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm
