const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

// Implement Route
router.get("/", postController.getPosts);

router.post("/", postController.createPost);

router.get("/with-comments", postController.getPostsWithComments);

module.exports = router;
