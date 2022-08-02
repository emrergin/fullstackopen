import { useState,useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Notify from './components/Notify'
import Recommendations from './components/Recommendations'
import { useApolloClient, useSubscription,gql } from '@apollo/client';
import { ALL_BOOKS,ALL_GENRES } from './components/Books'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title 
      author{
        name
      }
      published 
      genres
    }
  }  
`
const App = () => {
  const [page, setPage] = useState('authors')  
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)

      client.cache.updateQuery({ query: ALL_BOOKS, variables:{genre: null} }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })

      client.cache.updateQuery({query:ALL_GENRES}, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook),
        }
      })

      addedBook.genres.forEach(
        genre => {
          client.cache.updateQuery({ query: ALL_BOOKS, variables:{genre} }, ({ allBooks }) => {
            return {
              allBooks: allBooks.concat(addedBook),
            }
          })
        }
      )
    }
  })

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
