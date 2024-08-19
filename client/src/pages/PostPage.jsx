import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Box,
} from "@mui/material";

function PostPage() {
  const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1', 
  });

  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  // Fetch posts
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

  // Handle create new post
  const handleCreate = async (e) => {
    e.preventDefault(); // Corrected typo

    try {
      const response = await api.post('/posts', newPost); // Pass newPost data
      setPosts([...posts, response.data]); // Update state with new post
      setNewPost({ title: "", content: "" }); // Reset form fields
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <h1>POSTS</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <p>{p.title}</p>
          <p>{p.content}</p>
        </div>
      ))}

      

      <h1>Create New Post</h1>
      <Box component="form" onSubmit={handleCreate}> {/* Added component="form" */}
        <TextField
          label="Title"
          variant="filled"
          color="secondary"
          value={newPost.title}
          onChange={(event) =>
            setNewPost({ ...newPost, title: event.target.value })
          }
        />
        <TextField
          label="Content"
          variant="filled"
          color="secondary"
          value={newPost.content}
          onChange={(event) =>
            setNewPost({ ...newPost, content: event.target.value })
          }
        />
        <Button type="submit" variant="contained"> {/* Added type="submit" */}
          Create New Post
        </Button>
      </Box>
    </div>
  );
}

export default PostPage;
