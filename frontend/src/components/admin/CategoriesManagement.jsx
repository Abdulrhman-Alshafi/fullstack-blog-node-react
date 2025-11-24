import { useState, useEffect } from "react";
import { getCategories, createCategory, deleteCategory } from "../../api/api";

import Loading from "../Loading";
import ErrorUI from "../ErrorUI";
import ItemCard from "./ItemCard";
import CreateItemForm from "./CreateItemFrom";

export default function CategoriesManagement() {
  const [categories, setCategories] = useState([]);
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

  const handleSubmit = async (data) => {
    try {
      await createCategory(data);
      alert("Category created successfully!");
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
      await deleteCategory(id);
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

      {/* Shared Form */}
      <CreateItemForm
        title="Create Category"
        buttonText="Add Category"
        onSubmit={handleSubmit}
      />

      {/* Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 text-lg py-12">
            No categories yet. Create your first one!
          </p>
        ) : (
          categories.map((cat) => (
            <ItemCard
              key={cat._id}
              id={cat._id}
              name={cat.name}
              slug={cat.slug}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
