const router = require("express").Router();
const {
  blogPost,
  getPosts,
  updatePost,
} = require("../controllers/PostController");

router.post("/", blogPost);
router.get("/", getPosts);
router.put("/:id", updatePost);

module.exports = router;
