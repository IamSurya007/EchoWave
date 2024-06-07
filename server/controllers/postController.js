// controllers/postsController.js
import { uploadFile } from "../s3.js";
import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  try {
    const totalPosts = await Post.countDocuments();
    const totalPages = Math.ceil(totalPosts / limit);
    const posts = await Post.find()
      .populate("user")
      .sort({createdAt: -1} ) // Populate user field
      .skip((page - 1) * limit) 
      .limit(limit);
    res.json({ fetchedPosts: posts, fetchedCurrentPage: page, fetchedTotalPages: totalPages });
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  } 
};

export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "user",
      "username"
    ); // Populate user field
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    if (!req.body.description) {
      return res.status(400).json({ message: "Description is required" });
    }
    const post = new Post({
      user: req.user._id,
      description: req.body.description,
      fileUrl: req.body.imageUrl,
    });
    const newPost = await post.save();
    res.status(201).json({ newPost, message: " Uploaded successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
export const likePost = async (req, res) => {
  const post = req.body.post;
  if (!post) {
    res.status(404).json({ message: " post not found" });
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).json({ message: " user not found" });
  }
  await Post.findByIdAndUpdate(post._id, { $addToSet: { likedBy: user._id } });
  const updatedPost = await Post.findById(post._id);
  res.status(200).json({ message: "liked the post", updatedPost });
};
export const unlike = async (req, res) => {
  const post = req.body.post;
  if (!post) {
    res.status(404).json({ message: " post not found" });
  }
  const user = await User.findById(req.user._id);
  if (!user) {
    res.status(404).json({ message: " user not found" });
  }
  await Post.findByIdAndUpdate(post._id, { $pull: { likedBy: user._id } });
  const updatedPost = await Post.findById(post._id);
  res.status(200).json({ message: "unliked the post", updatedPost });
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await post.remove();
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const post = req.body;
    if (!post) {
      res.status(404).json({ message: " post not found" });
    }
    const posts = await Post.findById(post._id).populate("comments");
    const comments = posts.comments;
    // const comments = await Comment.find({ _id: { $in: commentIds } });
    res.status(200).json({ comments });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const addComment = async (req, res) => {
  try {
    const post = req.body.post;
    if (!post) {
      res.status(404).json({ message: " post not found" });
    }
    const newComment = new Comment({
      content: req.body.content,
      user: req.user._id,
      post: req.body.post,
    });
    await newComment.save();
    await Post.findByIdAndUpdate(req.body.post, {
      $addToSet: { comments: newComment._id },
    });
    res
      .status(200)
      .json({ message: "Comment added successfully", comment: newComment });
  } catch (e) {
    console.log(e.message);
    res.status(404).json({ message: e.message });
  }
};
