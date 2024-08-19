const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

// Implement Route
router.get("/:id", commentController.getComments);

router.post("/:id", commentController.createComment);

module.exports = router;
