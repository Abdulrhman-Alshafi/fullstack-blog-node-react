import Blog from "../models/Blog.js";
import Category from "../models/Category.js";

//get categories function
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    return res.json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//create category function
const createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    const category = await Category.create({ name, slug });
    return res.status(201).json(category);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//delete category function
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: "Not found" });

    await Blog.updateMany(
      { category: req.params.id },
      { $unset: { category: "" } }
    );

    await category.deleteOne();
    res.json({ message: "Category removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export { getCategories, createCategory };
