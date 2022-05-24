import React from "react";
import { useState } from "react";

export default function Button({buttonName, post}) {

    const url = `http://localhost:8000/backend/posts/?id=${post.p_id}`;
    
    async function deletePost() {

        let confirmDelete = false;

        if(buttonName === "Delete"){
            confirmDelete = window.confirm(`Do you want to delete post, ${post.title}?`);
        } else if (buttonName === "Rescue Food!") {
            confirmDelete = window.confirm(`Rescue this food ?`);
        }else{
            confirmDelete = window.confirm(`Congratulations, hero! Do you want to delete post, ${post.title}?`);
        }//end if-else

        if (confirmDelete) {
            const response = await fetch(url, {
                method: "DELETE"
            });
            const data = await response.json();
            console.log(data);
        }
    }
    
    if(buttonName === "Delete"){
        return(
            <>
            <button onClick={deletePost} className="myposts-button-delete">
                Delete
            </button>
            </>
        );
    } else if (buttonName === "Rescue Food!") {
            return (
                <>
                <button onClick={deletePost} className="myposts-button-rescued">
                    Rescue Food!
                </button>
            </>
            );
    }else{
        return(
            <>
            <button onClick={deletePost} className="myposts-button-rescued">
                Food Rescued!
            </button>
            </>
        );
    }
}