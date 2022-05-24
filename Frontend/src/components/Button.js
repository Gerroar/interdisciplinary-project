import React from "react";

export default function Button({buttonName, post}) {

    const url = `http://localhost:8000/backend/posts/?id=${post.p_id}`;
    async function deletePost() {

        const confirmDelete = false;
        if(buttonName == "delete"){
            confirmDelete = window.confirm(`Do you want to delete post, ${post.title}?`);
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
    return(
        <button onClick={deletePost}>
            ${buttonName}
        </button>
    );
}