import React from "react";
import Posts from "./Posts";

const ShowPosts = ({blog, posts, id}) => {
    return (
        <>
        <h1>{blog.name}</h1>
        {
            posts.length !== 0 ?
            <Posts posts={posts} id={id} />
            :
            null
        }
        </>
    )
}

export default ShowPosts;