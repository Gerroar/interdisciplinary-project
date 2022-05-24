import { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import UserMenu from "../components/UserMenu";
import Button from "../components/Button";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  //Gets the posts from backend
  useEffect(() => {
    async function getPosts() {
      const url = "http://localhost:8000/backend/posts/";
      const response = await fetch(url);
      const responseData = await response.json();
      setPosts(responseData.data);
    }
    getPosts();
  }, [posts]);

  return (
    <section className="page">
      <section className="user-menu">
        <UserMenu />
      </section>
      <section className="home-posts">
        {posts.map((post) => (
          <>
          <PostCard post={post} />
          <Button buttonName={"Rescue Food!"} post={post}/>
          </>
        ))}
      </section>
    </section>
  );
}
