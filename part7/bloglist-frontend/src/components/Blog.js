import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { updateBlog, removeBlog } from "../reducers/blogsReducer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "react-bootstrap";

const Blog = ({ blog, sendMessage, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  if (!blog) {
    return null;
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 15,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

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
          return navigate("/");
        })
        .catch((error) => {
          sendMessage(
            error.response.data.error || error.request.statusText,
            "error"
          );
        });
    } else {
      return false;
    }
  };

  const handleComment = async (event, id) => {
    event.preventDefault();
    await blogService.comment({ comment }, id);
    const list = document.getElementById("commentsList");
    const newItem = document.createElement("li");
    newItem.textContent = comment;
    list.prepend(newItem);
    setComment("");
  };

  return (
    <div style={blogStyle}>
      <h2>{blog.title}</h2> {blog.author}
      <hr></hr>
      <div className="likeButtonDiv">
        <strong>likes</strong>: {blog.likes}
        <Button variant="success"
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
        </Button>
      </div>
      {blog.user && <div><em>Shared by</em>: {blog.user.name}</div>}
      {blog.user && blog.user.username === user.username && (
        <Button variant="danger" onClick={() => deleteBlog(blog.id, blog.title)}>delete</Button>
      )}
      <h4>comments</h4>
      <form onSubmit={(event) => handleComment(event, blog.id)}>
        <input
          type="text"
          value={comment}
          name="comment"
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="primary" type="submit">add comment</Button>
      </form>
      <ul id="commentsList">
        {blog.comments &&
          blog.comments
            .map((comment, index) => <li key={index}>{comment}</li>)
            .reverse()}
      </ul>
    </div>
  );
};

export default Blog;
