import React from "react";
import './Posts.css';
import { Link } from 'react-router-dom';

const Posts = ({posts, id, user, blogs}) => {
    return (
        <div id="posts">
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
                        { user !== null && blogs[id].id === user.userForToken.bid ? <h3><Link to={`/blog/${id}/editpost/${index}`}>Edit Post</Link></h3> : null }
                    </div>
                )
            })}
        </div>
    )
};

export default Posts;