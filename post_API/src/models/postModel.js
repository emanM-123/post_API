import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  created_by: String,
  lattitude: String,
  longitude: String,
  status: String,
  created_at: Date,
});

const Post = mongoose.model("Post", postSchema);

export { Post };
