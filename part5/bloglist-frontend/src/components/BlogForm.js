const BlogForm = ({addBlog,newTitle,titleChange,newAuthor,authorChange,newUrl,urlChange}) => {
    return (     
    <form onSubmit={addBlog}>
      <h2>Create new</h2>
      <div>
      <label htmlFor="titleBox">Title:</label>
        <input id="titleBox"
          value={newTitle}
          onChange={({ target }) => titleChange(target.value)}
        />
      </div>
      <div>
      <label htmlFor="authorBox">Author:</label>
        <input id="authorBox"
          value={newAuthor}
          onChange={({ target }) => authorChange(target.value)}
        />
      </div>
      <div>
      <label htmlFor="urlBox">Url:</label>
        <input
          id = "urlBox"
          value={newUrl}
          onChange={({ target }) => urlChange(target.value)}
        />
      </div>
      <div>
        <button type="submit">create</button>
      </div>
      </form>   );
}
 
export default BlogForm;