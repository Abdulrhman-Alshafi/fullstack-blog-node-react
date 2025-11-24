//auth
export const AuthEndpoints = {
  REGISTER: "/auth/register",
  LOGIN: "/auth/login",
  PROFILE: "/auth/profile",
};
//blog
export const BlogEndpoints = {
  BLOGS: "/blogs",
  MY_BLOGS: "/blogs/myblogs",
  BLOG_DETAILS: (id) => `/blogs/${id}`,
};

//comments
export const CommentEndpoints = {
  BLOG_COMMENTS: (blogId) => `/blogs/${blogId}/comments`,
  DELETE_COMMENT: (blogId, commentId) =>
    `/blogs/${blogId}/comments/${commentId}`,
};

//category
export const CategoryEndpoints = {
  CATEGORIES: "/categories",
  CATEGORY_DETAILS: (id) => `/categories/${id}`,
};

//tag
export const TagEndpoints = {
  TAGS: "/tags",
  TAG_DETAILS: (id) => `/tags/${id}`,
};

//user
export const UserEndpoints = {
  USERS: "/users",
  DELETE_USER: (id) => `/users/${id}`,
  TOGGLE_ADMIN: (id) => `/users/${id}/toggle-admin`,
};
