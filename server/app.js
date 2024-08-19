const express = require("express");
const cors = require("cors");
const app = express();
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");

// middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

module.exports = app;
