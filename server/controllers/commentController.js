const db = require("../models");

exports.createComment = async (req, res) => {
  try {
    // Validate the input
    const { postId, comment_body } = req.body;
    if (!postId || !comment_body) {
      return res
        .status(400)
        .json({ error: "Post ID and comment body are required" });
    }

    // Find the post
    const post = await db.Post.findByPk(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    // Create the comment
    const comment = await db.Comment.create({
      comment_body,
      postId, // Ensure the key matches the model definition
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    const comments = await db.Comment.findAll();
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
