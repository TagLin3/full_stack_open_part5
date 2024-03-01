import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Toggleable from "./components/Toggleable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState("");
  const blogFormRef = useRef();

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsFromBackend = await blogService.getAll();
      blogsFromBackend.sort((a, b) => b.likes - a.likes);
      setBlogs(blogsFromBackend);
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    setUser(JSON.parse(window.localStorage.getItem("loggedBlogListUser")));
  }, []);

  const logIn = async (credentials) => {
    try {
      const userFromBackend = await loginService.login(credentials);
      setUser(userFromBackend);
      window.localStorage.setItem("loggedBlogListUser", JSON.stringify(userFromBackend));
      setNotification(null);
    } catch (error) {
      setNotification("wrong username or password");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const logOut = async () => {
    window.localStorage.removeItem("loggedBlogListUser");
    setUser(null);
  };

  const addBlog = async (blogToAdd) => {
    blogFormRef.current.toggleVisibility();
    const addedBlog = await blogService.addBlog(blogToAdd, user.token);
    setBlogs(blogs.concat(addedBlog));
    setNotification(`a new blog ${addedBlog.title} added`);
    setTimeout(() => setNotification(""), 3000);
  };

  const likeBlog = async (blogToLike) => {
    await blogService.addOneLike(blogToLike);
    const updatedBlogs = blogs.map(
      (blog) => (
        blog.id === blogToLike.id
          ? { ...blog, likes: blog.likes + 1 }
          : blog),
    );
    updatedBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(updatedBlogs);
  };

  const deleteBlog = async (blogToDelete) => {
    await blogService.deleteBlog(blogToDelete, user.token);
    setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
  };

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        {(notification !== "") && (
          <div>
            <p>{notification}</p>
          </div>
        )}
        <LoginForm logIn={logIn} />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      {(notification !== "") && (
        <div>
          <p>{notification}</p>
        </div>
      )}
      <p>
        {user.name}
        {" "}
        logged in
        <button type="button" onClick={logOut}>log out</button>
      </p>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likeBlog={likeBlog}
          deleteBlog={deleteBlog}
          createdByLoggedUser={user.username === blog.user.username}
        />
      ))}
      <h2>create new</h2>
      <Toggleable
        buttonLabel="add blog"
        ref={blogFormRef}
        buttonId="viewBlogFormButton"
      >
        <BlogForm createBlog={addBlog} />
      </Toggleable>
    </div>
  );
};

export default App;
