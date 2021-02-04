import React, { useState, useEffect } from "react";
import './Category.css';
import { useParams } from "react-router-dom";
import axios from "axios";

const Category = () => {
    const id = useParams().id;

    const [category, setCategory] = useState(null);
    const [posts, setPosts] = useState([]);

    const getPosts = async (cid) => {
        try {
            const params = {
                id : cid
            }
            const data = await axios.get('http://localhost:3001/blog/specificposts', { params: params });
            const p = data.data.map(cat => {
                return cat.post
            })
            setPosts(p);
            setCategory(data.data[0].category.name)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=> {
        getPosts(id);
    }, []);

    if (posts.length == 0 || Category === null) {
        return null;
    }

    return (
        <div id="category">
            <h3>Category: </h3> <p> {category}</p>
            <div>
                {posts.map((post, index) => {
                    return (
                        <div key={index}>
                            <h1>{post.title}</h1>
                            <p>{post.content}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Category;