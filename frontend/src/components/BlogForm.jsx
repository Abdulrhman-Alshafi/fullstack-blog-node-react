import { useState, useEffect } from "react";
import {
  createBlog,
  createTag,
  getCategories,
  getTags,
  updateBlog,
} from "../api/api";

export default function BlogForm({ blog, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    image: "",
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getCategories();
        const tagRes = await getTags();
        setCategories(catRes);
        setTags(tagRes);
      } catch (err) {
        console.error("Failed to fetch categories or tags:", err);
      }
    };
    fetchData();

    if (blog) {
      setFormData({
        title: blog.title,
        content: blog.content,
        category: blog.category?._id || "",
        tags: blog.tags.map((t) => t.name) || [],
        image: blog.image || "",
      });
    }
  }, [blog]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Ensure tags exist or create new ones
      const tagIds = await Promise.all(
        formData.tags.map(async (name) => {
          if (!name.trim()) return null;

          const normalizedName = name.trim().toLowerCase();
          const existingTag = tags.find(
            (t) => t.name.toLowerCase() === normalizedName
          );

          if (existingTag) return existingTag._id;

          const newTagRes = await createTag({
            name: name.trim(),
            slug: normalizedName.replace(/\s+/g, "-"),
          });
          setTags((prev) => [...prev, newTagRes]);
          return newTagRes._id;
        })
      );

      const payload = {
        ...formData,
        tags: tagIds.filter(Boolean),
        category: formData.category || null,
      };

      if (blog) {
        await updateBlog(blog._id, payload);
      } else {
        await createBlog(payload);
      }

      onSuccess();
    } catch (err) {
      alert("Error saving blog");
      console.error(err);
    }
  };

  return (
    <form onSubmit={submitHandler} className="space-y-6">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        className="w-full p-3 border rounded-lg"
        required
      />
      <textarea
        placeholder="Content"
        rows="10"
        value={formData.content}
        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
        className="w-full p-3 border rounded-lg"
        required
      />
      <input
        type="text"
        placeholder="Image URL (optional)"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        className="w-full p-3 border rounded-lg"
      />
      <select
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        className="w-full p-3 border rounded-lg"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Enter tags separated by commas"
        value={formData.tags.join(", ")}
        onChange={(e) =>
          setFormData({
            ...formData,
            tags: e.target.value.split(",").map((t) => t.trim()),
          })
        }
        className="w-full p-3 border rounded-lg"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
      >
        {blog ? "Update" : "Create"} Blog
      </button>
    </form>
  );
}
