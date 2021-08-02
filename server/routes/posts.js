const router = require("express").Router();
const { blogPost } = require("../controllers/PostController");

router.post("/", blogPost);

module.exports = router;
