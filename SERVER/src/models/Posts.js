import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  userId: Number,
  reactions: Number,
  tags: [String],
});

const Posts = mongoose.model("Posts", postSchema);

export default Posts;