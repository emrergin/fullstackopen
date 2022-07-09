import { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { updateBlog, removeBlog } from "../reducers/blogsReducer";

const Blog = ({ blog, sendMessage, user }) => {
  const dispatch = useDispatch();
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [isFullView, setFullView] = useState(false);
  const increaseLike = (id, user, likes, author, title, url) => {
    const updatedBlog = {
      title: title,
      author: author,
      url: url,
      user: user,
      likes: likes,
    };
    blogService
      .update(updatedBlog, id)
      .then((returnedBlog) => {
        dispatch(updateBlog(returnedBlog));
        sendMessage(`You liked ${returnedBlog.title}.`, "success");
      })
      .catch((error) => {
        // this is the way to access the error message
        sendMessage(
          error || error.response.data.error || error.request.statusText,
          "error"
        );
      });
  };

  const deleteBlog = (id, title) => {
    if (window.confirm(`Do you want to remove ${title} ?`)) {
      blogService
        .deleteBlog(id)
        .then(() => {
          dispatch(removeBlog(id));
          sendMessage(`You deleted ${title}.`, "success");
        })
        .catch((error) => {
          // this is the way to access the error message
          sendMessage(
            error.response.data.error || error.request.statusText,
            "error"
          );
        });
    } else {
      return false;
    }
  };

  return (
    <div style={blogStyle} className="blogItem">
      {blog.title} {blog.author}
      <button
        onClick={() => {
          setFullView(!isFullView);
        }}
        className="showButton"
      >
        {isFullView ? "hide" : "view"}
      </button>
      {isFullView && (
        <>
          <div className="likeButtonDiv">
            likes: {blog.likes}
            <button
              className="likeButton"
              onClick={() => {
                if (blog.user) {
                  increaseLike(
                    blog.id,
                    blog.user.id,
                    blog.likes + 1,
                    blog.author,
                    blog.title,
                    blog.url
                  );
                } else {
                  increaseLike(
                    blog.id,
                    undefined,
                    blog.likes + 1,
                    blog.author,
                    blog.title,
                    blog.url
                  );
                }
              }}
            >
              like
            </button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
          {blog.user && blog.user.username === user.username && (
            <button onClick={() => deleteBlog(blog.id, blog.title)}>
              delete
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
