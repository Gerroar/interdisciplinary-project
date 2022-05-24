import React from "react";
import PostForm from "./PostForm";
import { useState } from "react";

export default function UserMenu() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));
    //console.log(user);
    async function createPost(newPost) {
        newPost.uid = user.u_id;

        const url = "http://localhost:8000/backend/posts/";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(newPost)
        });
        const data = await response.json();
        //console.log(data);
    }

    if(user.u_type === "b"){

        return (
            <section className="user-management">
                <img src={user.u_img} alt={user.u_name}/>
                <h1>{user.u_name}</h1>
                <h1>Create New Post </h1>
                <PostForm savePost={createPost} />
            </section>
        );
    }else{
        
        return (
            <section className="user-management">
                <img src={user.u_img} alt={user.u_name}/>
                <h1>{user.u_name}</h1>
                <h1>Create New Post </h1>
                <PostForm savePost={createPost} />
            </section>
        );
    }
}
