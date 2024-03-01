import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <form onSubmit={addBlog}>
      title:
      <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        id="title"
      />
      <br />
      author:
      <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        id="author"
      />
      <br />
      url:
      <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        id="url"
      />
      <br />
      <button type="submit" id="blogCreateButton">create</button>
    </form>
  );
};

export default BlogForm;
