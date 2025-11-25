import mongoose from "mongoose";
//tags schema
const tagSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
});

export default mongoose.model("Tag", tagSchema);
