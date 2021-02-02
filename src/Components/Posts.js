import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const Posts = ({posts, id}) => {
    return (
        <div>
            {posts.map((post, index) => {

                let content = post.content.split(' ').slice(0,10);
                content = content.join(" ");
                if (post.content.split(' ').length > 10) {
                    content = content + '...';
                }

                return (
                    <div key={index}>
                        <h1><Link key={post.id} to={`/blog/${id}/post/${index}`}>{post.title}</Link></h1>
                        <p>{content}</p>
                    </div>
                )
            })}
        </div>
    )
};

export default Posts;