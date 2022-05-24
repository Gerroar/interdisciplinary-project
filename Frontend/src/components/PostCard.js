import React from "react";

export default function PostCard({ post , postId}) {

    return (
        <article className="post-article">
                <div id="pa-div-1">
                    <img src={post.img} alt={post.title} />
                    <h2>{post.user_n}</h2>
                </div>
                <h2>{post.title}</h2>
                <div id="pa-div-2">{post.content}</div>
                <p>{post.post_d}</p>
        </article>
    );
}
