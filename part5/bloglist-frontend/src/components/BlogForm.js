import { useState } from "react"

const BlogForm = ({addBlog,newTitle,titleChange,newAuthor,authorChange,newUrl,urlChange}) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')

    return (     
    <form onSubmit={(event)=>{addBlog(event,title,url,author)
                          setTitle(``);
                          setUrl(``);
                          setAuthor(``);}}>
      <h2>Create new</h2>
      <div>
      <label htmlFor="titleBox">Title:</label>
        <input id="titleBox"
          value={newTitle}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
      <label htmlFor="authorBox">Author:</label>
        <input id="authorBox"
          value={newAuthor}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
      <label htmlFor="urlBox">Url:</label>
        <input
          id = "urlBox"
          value={newUrl}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
      </form>   );
}
 
export default BlogForm;