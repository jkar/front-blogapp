import React, { useState, useEffect } from "react";
import './Post.css';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from "axios";
import base_url from "../../API";

const Post = ({posts, bid}) => {
    const id = useParams().id;

    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState(null);


    const getCategories = async () => {
        try {
            
            const params = {
                id : posts[id].id
            }
            const data = await axios.get(`${base_url}/blog/categories`, { params : params });
            setCategories(data.data);
            setPost(posts[id]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (posts.length !== 0) {
            getCategories();
        }
    }, [])

    if (post == null || categories == null) {
        return null;
    }

    return (
        <div id="post">
            <div className="container">
                <ul>
                    {categories.map((c, index) => {

                        return (
                            <li key={c.category.id}><Link  to={`/blog/${bid}/category/${c.category.id}`}>{c.category.name}</Link></li>
                        )
                    })}
                </ul>
                <div>
                    <h1>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
            </div>
        </div>
    )
};

export default Post;