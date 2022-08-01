import { useState,useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'
import { useApolloClient} from '@apollo/client';



const App = () => {
  const [page, setPage] = useState('authors')  
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  

  useEffect(()=>{
    const token = localStorage.getItem('library-user-token')
    if(token){setToken(token)};
  },[])

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')} >authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token&& <button onClick={() => setPage('add')}>add book</button>}
        {token&& <button onClick={() => setPage('recommendations')}>recommendations</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token &&<button onClick={logout}>logout</button>}
      </div>

      <Authors show={page === 'authors'} setError={notify} token={token}/>

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setError={notify}/>

      <Recommendations show ={page==='recommendations'}/>

      <LoginForm show={page === 'login'} setError={notify} setToken={setToken} />
    </div>
  )
}

export default App
