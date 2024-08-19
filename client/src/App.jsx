import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/posts">Post</Link>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
