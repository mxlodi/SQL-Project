import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import CommentPage from "./pages/CommentPage";
function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/posts">Post</Link>
      <Link to="/comments">Comments</Link>
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/posts" element={<PostPage />} />
        <Route path="/comments" element={<CommentPage />} />
      </Routes>
    </Router>
  );
}

export default App;
