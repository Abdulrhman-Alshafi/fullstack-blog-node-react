import { useState, useEffect } from "react";
import { getTags, createTag } from "../../api/api";
import Loading from "../Loading"; // adjust path if needed
import ErrorUI from "../ErrorUI"; // adjust path if needed

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
      alert("Tag created!");
      setName("");
      setSlug("");
      load();
    } catch (err) {
      alert(err.response?.message || "Failed");
    }
  };

  if (loading) return <Loading />;

  if (error) return <ErrorUI error={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Manage Tags</h1>

      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg mb-10 max-w-2xl"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="text"
            placeholder="slug-example"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="px-5 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg">
          Add Tag
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tags.map((tag) => (
          <div
            key={tag._id}
            className="bg-white p-4 rounded-lg shadow text-center"
          >
            <p className="font-semibold">{tag.name}</p>
            <p className="text-sm text-gray-500">#{tag.slug}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
