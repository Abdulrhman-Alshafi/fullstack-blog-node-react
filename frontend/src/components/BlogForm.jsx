import { useState, useEffect } from "react";
import apiFetch from "../api";

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
        const catRes = await apiFetch("/categories");
        const tagRes = await apiFetch("/tags");
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
        tags: blog.tags.map((t) => t._id) || [],
        image: blog.image || "",
      });
    }
  }, [blog]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Prepare payload: category and tags as ObjectIds
      const payload = {
        ...formData,
        tags: formData.tags, // Already an array of ObjectIds
        category: formData.category || null,
      };

      if (blog) {
        await apiFetch(`/blogs/${blog._id}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        await apiFetch("/blogs", {
          method: "POST",
          body: JSON.stringify(payload),
        });
      }
      onSuccess();
    } catch (err) {
      alert("Error saving blog");
      console.error(err);
    }
  };

  const handleTagChange = (e) => {
    const selectedOptions = [...e.target.selectedOptions];
    setFormData({ ...formData, tags: selectedOptions.map((o) => o.value) });
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
        placeholder="Content (HTML allowed)"
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
      <select
        multiple
        value={formData.tags}
        onChange={handleTagChange}
        className="w-full p-3 border rounded-lg"
      >
        {tags.map((tag) => (
          <option key={tag._id} value={tag._id}>
            {tag.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
      >
        {blog ? "Update" : "Create"} Blog
      </button>
    </form>
  );
}
