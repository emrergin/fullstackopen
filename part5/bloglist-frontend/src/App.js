import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  const noteFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event,title,author,url) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    blogService
      .create(newBlog)
      .then(returnedBlog  => {
        noteFormRef.current.toggleVisibility()
        setBlogs(blogs.concat(returnedBlog))
        setMessage(`${returnedBlog.title} is saved.`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
      // this is the way to access the error message
        setMessage(error.response.data.error || error.request.statusText)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const increaseLike = (id,user,likes,author,title,url) => {
    const updatedBlog = {
      title: title,
      author: author,
      url: url,
      user: user,
      likes:likes
    }
    blogService
      .update(updatedBlog,id)
      .then(returnedBlog  => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        setMessage(`You liked ${returnedBlog.title}.`)
        setMessageType('success')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      .catch(error => {
      // this is the way to access the error message
        setMessage(error.response.data.error || error.request.statusText)
        setMessageType('error')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
  }

  const deleteBlog = (id,title) => {
    if (window.confirm(`Do you want to remove ${title} ?`)) {
      blogService
        .deleteBlog(id)
        .then(()  => {
          setBlogs(blogs.filter(blog => blog.id !== id ))
          setMessage(`You deleted ${title}.`)
          setMessageType('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          // this is the way to access the error message
          setMessage(error.response.data.error || error.request.statusText)
          setMessageType('error')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }else{return false}
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort((a,b) => b.likes-a.likes)
      setBlogs( blogs )
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  return (
    <div>
      <Notification message={message} messageType={messageType}/>
      {user===null && <LoginForm handleLogin={handleLogin}
        username={username}
        password={password}
        userChange={setUsername}
        passChange={setPassword}/>}
      {user!==null &&
      <div>
        <p>{user.name} is logged in.</p>
        <button onClick={() => {window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)}
        }> Logout </button>
      </div>}
      {user!==null &&
      <Togglable buttonLabel="new note" ref={noteFormRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>}

      {user!==null && <><h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}
            increaseHandler={increaseLike}
            deleteHandler = {deleteBlog}
            user={user} />
        )}
      </>
      }
    </div>
  )
}

export default App
