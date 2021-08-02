const Post = require("../models/post");

const blogPost = async (req, res) => {
  const post = new Post(req.body);
  try {
    const savedPost = await post.save();
    res.status(200).json({ Post: savedPost });
  } catch (err) {
    res.status(500).json("error occured");
    console.log(err.message);
  }
};

module.exports = { blogPost };
