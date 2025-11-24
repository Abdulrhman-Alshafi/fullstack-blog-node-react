import { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "../../api/api";
import Loading from "../Loading";
import ErrorUI from "../ErrorUI";

export default function CategoriesManagement() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch categories. Please try again.");
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
      await createCategory({ name, slug });
      alert("Category created successfully!");
      setName("");
      setSlug("");
      load();
    } catch (err) {
      alert(err.response?.message || "Failed to create category");
    }
  };

  const handleDelete = async (id, catName) => {
    if (
      !confirm(
        `Delete category "${catName}" permanently?\nAll blogs in this category will lose it.`
      )
    ) {
      return;
    }

    try {
      await deleteCategory(id); // ← uses your clean API
      alert("Category deleted!");
      load();
    } catch (err) {
      alert(err.response?.message || "Failed to delete category");
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorUI error={error} onRetry={load} />;

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Manage Categories
      </h1>

      {/* Create Form */}
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-xl shadow-lg mb-10 max-w-2xl"
      >
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="Category Name"
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
          Add Category
        </button>
      </form>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg py-12">
            No categories yet. Create your first one!
          </p>
        ) : (
          categories.map((cat) => (
            <div
              key={cat._id}
              className="relative group bg-gradient-to-br from-teal-500 via-cyan-500 to-blue-600 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-300 cursor-default"
            >
              <div className="text-center">
                <h3 className="font-bold text-2xl mb-2">{cat.name}</h3>
                <p className="text-lg opacity-90">/{cat.slug}</p>
              </div>

              {/* Delete Button - Hover Only */}
              <button
                onClick={() => handleDelete(cat._id, cat.name)}
                className="absolute top-3 right-3 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                title="Delete category"
                aria-label="Delete category"
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
