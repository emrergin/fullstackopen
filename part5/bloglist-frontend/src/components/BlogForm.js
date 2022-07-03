import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
    const [title, setTitle] = useState('')
    const [url, setUrl] = useState('')
    const [author, setAuthor] = useState('')

    return (
        <form onSubmit={(event) => {addBlog(event,title,author,url)
            setTitle('')
            setUrl('')
            setAuthor('')}}>
            <h2>Create new</h2>
            <div>
                <label htmlFor="titleBox">Title:</label>
                <input id="titleBox"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                <label htmlFor="authorBox">Author:</label>
                <input id="authorBox"
                    value={author}
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                <label htmlFor="urlBox">Url:</label>
                <input
                    id = "urlBox"
                    value={url}
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <div>
                <button type="submit">create</button>
            </div>
        </form>   )
}

export default BlogForm