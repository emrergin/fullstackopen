import { useState } from 'react'


const Blog = ({ blog, increaseHandler, deleteHandler,user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    const [isFullView,setFullView]=useState(false)
    return(
        <div style={blogStyle}>
            {blog.title} {blog.author}
            <button onClick={() => {setFullView(!isFullView)}} className="showButton">{isFullView ? 'hide' : 'view'}</button>
            {isFullView && <>
                <div className="likeButtonDiv">likes: {blog.likes}
                    <button className="likeButton" onClick={() => {
                        if (blog.user){
                            increaseHandler(blog.id,blog.user.id,blog.likes+1,blog.author,blog.title,blog.url)
                        }
                        else{
                            increaseHandler(blog.id,undefined,blog.likes+1,blog.author,blog.title,blog.url)
                        }
                    }}>like</button>
                </div>
                {blog.user&& <div>{blog.user.name}</div>}
                {blog.user && blog.user.username === user.username &&<button onClick={() => deleteHandler(blog.id,blog.title)}>delete</button>}
            </>}
        </div>
    )
}

export default Blog