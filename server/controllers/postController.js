const db = require("../models");

exports.createPost = async (req, res) => {
  try {
    const post = await db.Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await db.Post.findAll();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller to fetch posts with their comments
exports.getPostsWithComments = async (req, res) => {
  try {
    const posts = await db.Post.findAll({
      include: [
        {
          model: db.Comment,
          as: "comments", // This must match the alias defined in the Post model
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
