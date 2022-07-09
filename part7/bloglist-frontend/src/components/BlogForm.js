import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  return (
    <Form
      onSubmit={(event) => {
        addBlog(event, title, author, url);
        setTitle("");
        setUrl("");
        setAuthor("");
      }}
    >
      <Form.Group>
      <h2>Create new</h2>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <Form.Label>Author:</Form.Label>
        <Form.Control
          id="authorBox"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <Form.Label>Url:</Form.Label>
        <Form.Control
          id="urlBox"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <Button variant="primary"ctype="submit">create</Button>
        </Form.Group>
    </Form>
  );
};

export default BlogForm;
