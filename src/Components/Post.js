import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = ({posts}) => {
    const id = useParams().id;
    // const post = posts[id];

    const [post, setPost] = useState(null);
    const [categories, setCategories] = useState(null);

    console.log('cat', categories);

    const getCategories = async (pid) => {
        const params = {
            id : pid
        }
        try {
            const data = await axios.get('http://localhost:3001/blog/categories', { params : params });
            setCategories(data.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setPost(posts[id]);
        getCategories(posts[id].id);
    }, [])

    console.log('post', post);

    if (post == null || categories == null) {
        return null;
    }

    return (
        <>
            <ul>
                {categories.map((c, index) => {

                    return (
                        <li key={c.category.id}><Link  to={`/blog/${id}/category/${c.category.id}`}>{c.category.name}</Link></li>
                    )
                })}
            </ul>
            <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
            </div>
        </>
    )
};

export default Post;