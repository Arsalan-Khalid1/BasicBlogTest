const Post = require("../models/post");

const blogPost = async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(200).json({ Post: savedPost });
  } catch (err) {
    res.status(500).json({ message: err._message });
    console.log(err._message);
  }
};

const getPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({});
    res.status(200).json({ posts: allPosts });
  } catch (err) {
    res.status(500).json({ "error message ": err._message });
    console.log(err._message);
  }
};

module.exports = { blogPost, getPosts };
