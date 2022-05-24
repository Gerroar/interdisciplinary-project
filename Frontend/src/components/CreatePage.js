import React from "react";
import PostForm from "./PostForm";
import { useState } from "react";

export default function CreatePage() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));

    async function createPost(newPost) {
        newPost.uid = user.u_id;

        const url = "http://localhost:8000/backend/posts/";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost)
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <section className="post-create">
            <h1>Create New Post</h1>
            <PostForm savePost={createPost} />
        </section>
    );
}
