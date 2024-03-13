import { Router } from "express";
import Posts from "../models/Posts";

const router = Router();

//Get all posts
router.get("/", async (req, res) => {
  console.log(req);

  const posts = await Posts.find({});
  res.json(posts);
});

//Get a single post
router.get("/:postId", async (req, res) => {
  console.log(req);
  const postId = await Posts.findById(req.params.postId);
  res.json(postId);
});

//Add a post
router.post("/add", async (req, res) => {
  console.log(req);
  const newPost = await Posts.create(req.body);
  res.json(newPost);
});

//Update a post
router.put("/:postId", async (req, res) => {
  const updatePost = await Posts.findByIdAndUpdate(
    req.params.postId,
    req.body,
    { new: true }
  );
  res.json(updatePost);
});

//Delete a post
router.delete("/:postId", async (req, res) => {
  const deletePost = await Posts.findByIdAndDelete(req.params.postId);
  res.json(deletePost);
});

//Get all posts by user id
router.get("/user/:userId", async (req, res) => {
  // console.log(req.body);
  const userId = await Posts.find({ userId: req.params.userId });
  res.json(userId);
});
export default router;
