const router = require("express").Router();
const { blogPost, getPosts } = require("../controllers/PostController");

router.post("/", blogPost);
router.get("/", getPosts);

module.exports = router;
