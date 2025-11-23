import apiFetch from "./apiFetch";
import {
  AuthEndpoints,
  BlogEndpoints,
  CommentEndpoints,
  CategoryEndpoints,
  TagEndpoints,
} from "./endpoints";

// ----- Auth -----
export const register = (data) =>
  apiFetch(AuthEndpoints.REGISTER, {
    method: "POST",
    body: JSON.stringify(data),
  });

export const login = (data) =>
  apiFetch(AuthEndpoints.LOGIN, { method: "POST", body: JSON.stringify(data) });

export const getProfile = () => apiFetch(AuthEndpoints.PROFILE);

// ----- Blogs -----
export const getBlogs = () => apiFetch(BlogEndpoints.BLOGS);
export const getMyBlogs = () => apiFetch(BlogEndpoints.MY_BLOGS);
export const getBlogById = (id) => apiFetch(BlogEndpoints.BLOG_DETAILS(id));
export const createBlog = (data) =>
  apiFetch(BlogEndpoints.BLOGS, { method: "POST", body: JSON.stringify(data) });
export const updateBlog = (id, data) =>
  apiFetch(BlogEndpoints.BLOG_DETAILS(id), {
    method: "PUT",
    body: JSON.stringify(data),
  });
export const deleteBlog = (id) =>
  apiFetch(BlogEndpoints.BLOG_DETAILS(id), { method: "DELETE" });

// ----- Comments -----
export const getComments = (blogId) =>
  apiFetch(CommentEndpoints.BLOG_COMMENTS(blogId));
export const createComment = (blogId, data) =>
  apiFetch(CommentEndpoints.BLOG_COMMENTS(blogId), {
    method: "POST",
    body: JSON.stringify(data),
  });
export const deleteComment = (blogId, commentId) =>
  apiFetch(CommentEndpoints.DELETE_COMMENT(blogId, commentId), {
    method: "DELETE",
  });

// ----- Categories -----
export const getCategories = () => apiFetch(CategoryEndpoints.CATEGORIES);
export const createCategory = (data) =>
  apiFetch(CategoryEndpoints.CATEGORIES, {
    method: "POST",
    body: JSON.stringify(data),
  });

// ----- Tags -----
export const getTags = () => apiFetch(TagEndpoints.TAGS);
export const createTag = (data) =>
  apiFetch(TagEndpoints.TAGS, { method: "POST", body: JSON.stringify(data) });
