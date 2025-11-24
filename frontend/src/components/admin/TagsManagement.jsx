import { useState, useEffect } from "react";
import { getTags, createTag, deleteTag } from "../../api/api";

import Loading from "../Loading";
import ErrorUI from "../ErrorUI";
import ItemCard from "./ItemCard";
import CreateItemForm from "./CreateItemFrom";

export default function TagsManagement() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTags();
      setTags(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch tags. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSubmit = async (data) => {
    try {
      await createTag(data);
      load();
    } catch (err) {
      alert(err.response?.message || "Failed to create tag");
    }
  };

  const handleDelete = async (id, tagName) => {
    if (
      !confirm(
        `Delete tag "${tagName}" permanently?\nIt will be removed from all blogs.`
      )
    ) {
      return;
    }

    try {
      await deleteTag(id);
      alert("Tag deleted!");
      load();
    } catch (err) {
      alert(err.response?.message || "Failed to delete tag");
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorUI error={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Tags</h1>

      {/* Shared Form */}
      <CreateItemForm
        title="Create Tag"
        buttonText="Add Tag"
        onSubmit={handleSubmit}
      />

      {/* Tags Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {tags.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No tags yet. Create your first one!
          </p>
        ) : (
          tags.map((tag) => (
            <ItemCard
              key={tag._id}
              id={tag._id}
              name={tag.name}
              slug={tag.slug}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
