// controllers/postsController.js
import { uploadFile } from '../s3.js';
import Post from '../models/Post.js';
import User from '../models/User.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user'); // Populate user field
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



export const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username'); // Populate user field
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  try {
    if(req.file){
      const user= await User.findById(req.user.userId)
      await uploadFile(req.file, user.name, "posts")
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${user.name}/posts/${req.file.originalname}`
      req.body.fileUrl= fileUrl
    }
  const post = new Post({
    user: req.user.userId,
    description: req.body.description,
    fileUrl: req.body.fileUrl,
  });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ errmessage: err.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    post.title = req.body.title;
    post.content = req.body.content;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.remove();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
