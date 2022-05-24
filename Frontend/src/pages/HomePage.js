import { useEffect, useState} from "react";
import PostCard from "../components/PostCard";
import CreatePage from "../components/UserMenu";

export default function HomePage(){
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            const url = "http://localhost:8000/backend/posts/";
            const response = await fetch(url);
            const responseData = await response.json();
            setPosts(responseData.data);
        }
        getPosts();
    }, [posts]);

    return (
        <section className="page">
            <section className="user-menu">        
                <CreatePage/>
            </section>
            <section className="grid-container" id="home-posts">
                {posts.map(post => (
                    <PostCard post={post} key={post.id}/>
                ))}
            </section>
        </section>
    )
 }