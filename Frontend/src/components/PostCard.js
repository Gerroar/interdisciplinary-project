import React from "react";

export default function PostCard({ post }) {

    return (
        <article className="post-article">
                <div id="pa-div-1">
                    <img src={post.img} alt={post.title} />
                    <p>{post.user_n}</p>
                </div>
                <h2>{post.title}</h2>
                <div id="pa-div-2">{post.content}</div>
                <p>{post.post_d}</p>
        </article>
    );
}
