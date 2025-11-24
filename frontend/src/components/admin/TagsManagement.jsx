import { useState, useEffect } from "react";
import { getTags, createTag, deleteTag } from "../../api/api";
import Loading from "../Loading";
import ErrorUI from "../ErrorUI";

export default function TagsManagement() {
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
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

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createTag({ name, slug });
      alert("Tag created successfully!");
      setName("");
      setSlug("");
      load(); // refresh list
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
      load(); // refresh
    } catch (err) {
      alert(err.response?.message || "Failed to delete tag");
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorUI error={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Tags</h1>

      {/* Create Form */}
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg mb-10 max-w-2xl"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="Tag Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
          <input
            type="text"
            placeholder="slug-example"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition">
          Add Tag
        </button>
      </form>

      {/* Tags Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {tags.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No tags yet. Create your first one!
          </p>
        ) : (
          tags.map((tag) => (
            <div
              key={tag._id}
              className="relative group bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-default"
            >
              <div className="text-center">
                <h3 className="font-bold text-lg truncate">{tag.name}</h3>
                <p className="text-sm opacity-90 mt-1">#{tag.slug}</p>
              </div>

              {/* Delete Button - Hover Only */}
              <button
                onClick={() => handleDelete(tag._id, tag.name)}
                className="absolute top-2 right-2 w-9 h-9 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                title="Delete tag"
                aria-label="Delete tag"
              >
                ×
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
