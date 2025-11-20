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
      // Step 1: Resolve existing tags + create missing ones
      const tagIds = await Promise.all(
        formData.tags.map(async (name) => {
          if (!name.trim()) return null;

          // Look for existing tag (case-insensitive)
          const normalizedName = name.trim().toLowerCase();
          const existingTag = tags.find(
            (t) => t.name.toLowerCase() === normalizedName
          );

          if (existingTag) {
            return existingTag._id;
          }

          // If not found → create new tag
          try {
            const newTagRes = await apiFetch("/tags", {
              method: "POST",
              body: JSON.stringify({
                name: name.trim(),
                slug: name.trim().toLowerCase().replace(/\s+/g, "-"), // simple slug
              }),
            });
            // Update local tags list so future matches work without refetch
            setTags((prev) => [...prev, newTagRes]);
            return newTagRes._id;
          } catch (err) {
            console.error(`Failed to create tag: ${name}`, err);
            return null;
          }
        })
      );

      const validTagIds = tagIds.filter(Boolean);

      const payload = {
        ...formData,
        tags: validTagIds,
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
