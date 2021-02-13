import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const EditPost = ({ posts, bid }) => {
    const [post, SetPost] = useState(null);
    const id = useParams().id;


    useEffect(()=> {
        SetPost(posts[id]);
    }, []);

    if (post === null || post === undefined) {
        return null;
    }

    return (
        <div>
            <h3>Edit Post</h3>
            <h6>Title: {post.title}</h6>
            <p>Content: {post.content}</p>

        </div>
    )
};

export default EditPost;