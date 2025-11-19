import Tag from "../models/Tag.js";

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

//create Tags functions
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

export { getTags, createTag };
