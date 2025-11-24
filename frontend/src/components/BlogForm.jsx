import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  createBlog,
  createTag,
  getCategories,
  getTags,
  updateBlog,
} from "../api/api";

export default function BlogForm({ blog, onSuccess }) {
  //  Yup Schema
  const schema = yup.object({
    title: yup.string().required("Title is required"),
    content: yup.string().required("Content is required"),
    image: yup.string().url("Invalid Image URL").nullable(),
    category: yup.string().nullable(),
    tags: yup.array().of(yup.string().trim()),
  });

  //  useForm
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      image: "",
      category: "",
      tags: [],
    },
  });

  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  //  Load categories + tags + blog
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await getCategories();
        const tagRes = await getTags();
        setCategories(catRes);
        setTags(tagRes);

        if (blog) {
          reset({
            title: blog.title,
            content: blog.content,
            category: blog.category?._id || "",
            tags: blog.tags.map((t) => t.name),
            image: blog.image || "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch categories or tags:", err);
      }
    };

    fetchData();
  }, [blog, reset]);

  //  Submit Handler
  const onSubmit = async (formData) => {
    try {
      // Ensure tags exist or create new ones
      const tagIds = await Promise.all(
        formData.tags.map(async (name) => {
          const normalized = name.trim().toLowerCase();
          if (!normalized) return null;

          const existing = tags.find(
            (t) => t.name.toLowerCase() === normalized
          );

          if (existing) return existing._id;

          const newTagRes = await createTag({
            name: name.trim(),
            slug: normalized.replace(/\s+/g, "-"),
          });

          setTags((prev) => [...prev, newTagRes]);
          return newTagRes._id;
        })
      );

      const payload = {
        ...formData,
        tags: tagIds.filter(Boolean),
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

  const tagInput = watch("tags");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title */}
      <input
        {...register("title")}
        placeholder="Title"
        className="w-full p-3 border rounded-lg"
      />
      <p className="text-red-500">{errors.title?.message}</p>

      {/* Content */}
      <textarea
        {...register("content")}
        placeholder="Content"
        rows="10"
        className="w-full p-3 border rounded-lg"
      />
      <p className="text-red-500">{errors.content?.message}</p>

      {/* Image URL */}
      <input
        {...register("image")}
        placeholder="Image URL (optional)"
        className="w-full p-3 border rounded-lg"
      />
      <p className="text-red-500">{errors.image?.message}</p>

      {/* Category */}
      <select
        {...register("category")}
        className="w-full p-3 border rounded-lg"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* Tags Input */}
      <input
        type="text"
        placeholder="Enter tags separated by commas"
        value={tagInput.join(", ")}
        onChange={(e) =>
          setValue(
            "tags",
            e.target.value.split(",").map((t) => t.trim())
          )
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
