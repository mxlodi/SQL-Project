import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Box } from "@mui/material";

function CommentPage() {
  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
  });

  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({ postId: '', comment_body: '' });

  // Fetch all posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts');
        setPosts(response.data);
      } catch (err) {
        console.log(`Error fetching posts: ${err}`);
      }
    };

    fetchPosts();
  }, []);

  // Fetch comments for each post
  useEffect(() => {
    const fetchCommentsForPosts = async () => {
      try {
        const allComments = await Promise.all(posts.map(post =>
          api.get(`/comments/${post.id}`).then(res => ({ postId: post.id, comments: res.data }))
        ));

        const commentsByPost = allComments.reduce((acc, { postId, comments }) => {
          acc[postId] = comments;
          return acc;
        }, {});

        setComments(commentsByPost);
      } catch (err) {
        console.log(`Error fetching comments: ${err}`);
      }
    };

    if (posts.length > 0) {
      fetchCommentsForPosts();
    }
  }, [posts]);

  // Handle create comment
  const handleCreateComment = async (e) => {
    e.preventDefault();
  
    try {
      if (!newComment.postId || !newComment.comment_body) {
        console.log("Post ID and comment body are required.");
        return;
      }
  
      const response = await api.post(`/comments/${newComment.postId}`, {
        comment_body: newComment.comment_body,
      });
  
      setComments((prevComments) => ({
        ...prevComments,
        [newComment.postId]: [...(prevComments[newComment.postId] || []), response.data],
      }));
  
      setNewComment({ postId: "", comment_body: "" });
    } catch (err) {
      console.log(`Error creating comment: ${err}`);
    }
  };
  

  return (
    <div>
      <h1>Posts and Their Comments</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>

          <h3>Comments</h3>
          {comments[post.id] && comments[post.id].length > 0 ? (
            <ul>
              {comments[post.id].map(comment => (
                <li key={comment.id}>{comment.comment_body}</li>
              ))}
            </ul>
          ) : (
            <p>No comments yet.</p>
          )}
        </div>
      ))}

      <h1>Create New Comment</h1>
      <Box component="form" onSubmit={handleCreateComment}>
        <TextField
          label="Post ID"
          variant="filled"
          color="secondary"
          value={newComment.postId}
          onChange={(event) =>
            setNewComment({ ...newComment, postId: event.target.value })
          }
        />
        <TextField
          label="Comment"
          variant="filled"
          color="secondary"
          value={newComment.comment_body}
          onChange={(event) =>
            setNewComment({ ...newComment, comment_body: event.target.value })
          }
        />
        <Button type="submit" variant="contained">
          Create New Comment
        </Button>
      </Box>
    </div>
  );
}

export default CommentPage;
