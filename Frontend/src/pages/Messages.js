import React from "react";
import { Link } from "react-router-dom";

export default function Messages(){
    return(
        <div>
        <Link to="/home">
            <button type="button">
                Home
            </button>
            </Link>
        </div>
    );
}