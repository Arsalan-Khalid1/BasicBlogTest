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

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.username === req.body.username);
    {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );

        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    }
    res.status(401).json("You can update only your post!");
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = { blogPost, getPosts, updatePost };
