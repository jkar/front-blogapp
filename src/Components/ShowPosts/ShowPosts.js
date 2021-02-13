import React from "react";
import './ShowPosts.css';
import Posts from "../Posts/Posts";

const ShowPosts = ({blog, blogs, posts, id, user}) => {
    return (
        <div className="show-posts">
            <h1>{blog.name}</h1>
            <div className="container-posts">
                {
                    posts.length !== 0 ?
                    <Posts posts={posts} id={id} user={user} blogs={blogs} />
                    :
                    null
                }
            </div>
        </div>
    )
}

export default ShowPosts;