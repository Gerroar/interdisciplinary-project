import React from "react";
//import imgPlaceholder from "../assets/img/user-placeholder.jpg";

export default function PostCard({ post }) {

    return (
        <article>
            <img src={post.img} alt={post.title} />
            <h2>{post.title}</h2>
            <p>{post.content}</p>
        </article>
    );
}
