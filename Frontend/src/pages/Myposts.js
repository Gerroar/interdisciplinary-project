import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import Button from "../components/Button";
import { useState, useEffect } from "react";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [user] = useState(JSON.parse(localStorage.getItem("authUser")));

  useEffect(() => {
    async function getPosts() {
      const url = `http://localhost:8000/backend/posts/?id=${user.u_id}`;
      const response = await fetch(url);
      const responseData = await response.json();
      setPosts(responseData.data);
    }
    getPosts();
  }, [posts]);

  return (
    <section>
      <Link to="/home">
        <button className="back-home" type="button">
          Home
        </button>
      </Link>
      <section className="home-posts">
        {posts.map((post) => (
          <>
            <PostCard post={post} postId={post.p_id} />
            <Button buttonName={"Delete"} post={post} />
            <Button buttonName={"Food Rescued !"} post={post} />
          </>
        ))}
      </section>
    </section>
  );
}
