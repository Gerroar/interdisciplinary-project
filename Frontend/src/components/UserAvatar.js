import React, { useState, useEffect } from "react";
import placerholder from "../assets/img/user-placeholder.jpg";

export default function UserAvatar({ uid }) {
    const [user, setUser] = useState({
        image: placerholder,
        name: "User's Name",
        title: "User's Title"
    });
    const url = `http://localhost:8000/backend/users/?id=${uid}`;

    useEffect(() => {
        async function getUser() {
            const response = await fetch(url);
            const responseData = await response.json();
            setUser(responseData.data[0]);
        }
        getUser();
    }, [url]);

    return (
        <div className="avatar">
            <img src={user.image || placerholder} alt={user.id} />
            <span>
                <h3>{user.name}</h3>
                <p>{user.title}</p>
            </span>
        </div>
    );
}
