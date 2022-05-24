import React from "react";

export default function PostCard({ post }) {

    return (
        <article className="post-article">
            <img src={post.img} alt={post.title} />
            <p>{post.user_n}</p>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>{post.post_d}</p>
        </article>
    );
}
