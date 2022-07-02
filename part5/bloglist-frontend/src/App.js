import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')


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
      setMessageType(`error`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const addBlog = async (event)=>{
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    blogService
    .create(newBlog)
    .then(returnedBlog  => {
      setTitle(``);
      setUrl(``);
      setAuthor(``);
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`${returnedBlog.title} is saved.`);
      setMessageType(`success`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      // this is the way to access the error message
      setMessage(error.response.data.error);
      setMessageType(`error`);
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      // noteService.setToken(user.token)
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
        <button onClick={()=>{window.localStorage.removeItem('loggedBlogappUser')
                              setUser(null)}
          }> Logout </button>
      </div>}
      {user!==null && <BlogForm addBlog={addBlog} 
                                  newTitle={title} 
                                  titleChange={setTitle} 
                                  newAuthor={author} 
                                  authorChange={setAuthor} 
                                  newUrl={url} 
                                  urlChange={setUrl} 
                                  />}
                
      {user!==null && <><h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
        </>
      }
    </div>
  )
}

export default App
