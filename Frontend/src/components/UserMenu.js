import React from "react";
import PostForm from "./PostForm";
import { useState } from "react";
import { Link } from "react-router-dom";

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

    console.log(user.u_type);
    if(user.u_type === 'b'){
        return (
            <section className="user-management">
                <img src={user.u_img} alt={user.u_name}/>
                <h1>{user.u_name}</h1>
                <Link to="/home/profile">
                    <button type="button">
                        Profile
                    </button>
                </Link>
            </section>
        );
    }else{
        
        return (
            <section className="user-management">
                <img src={user.u_img} alt={user.u_name}/>
                <h1>{user.u_name}</h1>
                <Link to="/home/profile">
                    <button className="user-menu-button" type="button">
                        Profile
                    </button>
                </Link>
                <Link to="/home/myposts">
                    <button className="user-menu-button" type="button">
                        My Posts
                    </button>
                </Link>
                <Link to="/home/messages">
                    <button className="user-menu-button" type="button">
                        Messages
                    </button>
                </Link>
                <h1>Create New Post </h1>
                <PostForm savePost={createPost} />
            </section>
        );
    }
}
