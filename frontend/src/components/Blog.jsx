import { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({
  blog, likeBlog, deleteBlog, createdByLoggedUser,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const details = () => (
    <div>
      {blog.url}
      <br />
      likes:
      {" "}
      {blog.likes}
      {" "}
      <button type="button" onClick={() => likeBlog(blog)}>like</button>
      <br />
      {blog.user.name}
      <br />
      {createdByLoggedUser
      && (<button type="button" onClick={() => deleteBlog(blog)}>remove</button>)}
    </div>
  );

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blog">
      <div>
        {blog.title}
        {" "}
        {blog.author}
        {" "}
        <button type="button" onClick={toggleShowDetails}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails
        && details()}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    url: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default Blog;
