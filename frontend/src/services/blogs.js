import axios from "axios";
const baseUrl = "/api/blogs";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addBlog = async (blogToAdd, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(baseUrl, blogToAdd, config);
  return response.data;
};

const addOneLike = async (blogToLike) => {
  await axios.put(
    `${baseUrl}/${blogToLike.id}`,
    {
      ...blogToLike,
      likes: blogToLike.likes + 1,
      user: blogToLike.user.id,
    },
  );
};

const deleteBlog = async (blogToDelete, token) => {
  const config = { headers: { Authorization: `Bearer ${token}` } };
  await axios.delete(`${baseUrl}/${blogToDelete.id}`, config);
};

export default {
  getAll, addBlog, deleteBlog, addOneLike,
};
