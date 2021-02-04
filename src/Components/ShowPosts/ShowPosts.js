import React from "react";
import './ShowPosts.css';
import Posts from "../Posts/Posts";

const ShowPosts = ({blog, posts, id}) => {
    return (
        <div className="show-posts">
            <h1>{blog.name}</h1>
            <div className="container-posts">
                {
                    posts.length !== 0 ?
                    <Posts posts={posts} id={id} />
                    :
                    null
                }
            </div>
        </div>
    )
}

export default ShowPosts;