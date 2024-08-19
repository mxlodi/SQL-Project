import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";

function HomePage() {
  // INITIAL
  const [posts, setPosts] = React.useState([]);

  // GET POSTS
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts");
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchUser();
  }, [])



}

export default HomePage;
