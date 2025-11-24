import Tag from "../models/Tag.js";
import Blog from "../models/Blog.js";

//get tags function
const getTags = async (req, res) => {
  try {
    const tags = await Tag.find({});
    return res.json(tags);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//create Tags function
const createTag = async (req, res) => {
  try {
    const { name, slug } = req.body;

    if (!name || !slug) {
      return res.status(400).json({ message: "Name and slug are required" });
    }

    const tag = await Tag.create({ name, slug });
    return res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

//delete tag function
export const deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ message: "Tag not found" });
    }
    await Blog.updateMany(
      { tags: req.params.id },
      { $pull: { tags: req.params.id } }
    );

    await tag.deleteOne();
    res.json({ message: "Tag removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { getTags, createTag };
