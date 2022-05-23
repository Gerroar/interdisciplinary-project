import React from "react";

export default function PostCard({ post }) {

    return (
        <article>
            <img src={post.image} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </article>
    );
}
