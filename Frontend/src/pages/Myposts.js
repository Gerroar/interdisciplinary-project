import React from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import Button from "../components/Button";
import { useState, useEffect } from "react";

export default function MyPosts(){

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));

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
        <section className="page">
            <section className="home-posts">
                {posts.map(post => (
                    <>
                    <PostCard post={post} postId={post.p_id}/>
                    <Button buttonName={"delete"} post={post}/>
                    </>
                ))}
            </section>
        </section>
    )
}