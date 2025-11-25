import mongoose from "mongoose";
//category schema
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model("Category", categorySchema);
