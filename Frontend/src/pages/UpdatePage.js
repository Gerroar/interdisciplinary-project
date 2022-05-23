import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PostForm from "../components/PostForm";

export default function UpdatePage() {
    const [post, setPost] = useState({});
    const params = useParams();
    const navigate = useNavigate();
    const url = `http://localhost:8000/Backend/posts/?id=${params.postId}`;

    useEffect(() => {
        async function getPost() {
            const response = await fetch(url);
            const responseData = await response.json();
            setPost(responseData.data[0]);
        }
        getPost();
    }, [url]);

    async function savePost(postToUpdate) {
        const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(postToUpdate)
        });
        const data = await response.json();
        console.log(data);
        if (data.status === "success") {
            navigate("/home");
        }
    }

    async function deletePost() {
        const confirmDelete = window.confirm(`Do you want to delete post, ${post.title}?`);
        if (confirmDelete) {
            const response = await fetch(url, {
                method: "DELETE"
            });
            const data = await response.json();
            console.log(data);
            if (data.status === "success") {
                navigate("/home");
            }
        }
    }

    return (
        <section className="page">
            <h1>Update Post</h1>
            <PostForm post={post} savePost={savePost} />
            <button className="btn-delete" onClick={deletePost}>
                Delete Post
            </button>
        </section>
    );
}
