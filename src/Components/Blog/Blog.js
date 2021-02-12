import React, {useState, useEffect} from "react";
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { useParams } from "react-router-dom";
import './Blog.css';
import axios from "axios";
import Post from "../Post/Post";
import ShowPosts from "../ShowPosts/ShowPosts";
import Category from "../Category/Category";
import CreateCategory from "../CreateCategory/CreateCategory";
import CreatePost from "../CreatePost/CreatePost";
import base_url from '../../API';

const Blog = ({blogs, user, setErrorMessage, setMessage}) => {
    const id = useParams().id;

    const [blog, setBlog] = useState(null);
    const [posts, setPosts] = useState([]);
    const history = useHistory();

    const getPosts = async (id) => {
        const params = {
            id : id
          }
        const data = await axios.get(`${base_url}/blog/posts`, {params : params});
        setPosts(data.data);
    };

    useEffect(() => {
        setBlog(blogs[id]);
        getPosts(blogs[id].id);      
    },[id]);

    if (blog == null) {
        return null;
    }

    return (
        
        <div id="blog">
            {
                user !== null && blogs[id].id === user.userForToken.bid ?

            
            <nav>
                <Link to={`/blog/${id}/createCategory`}>Create Category</Link>
                <Link to={`/blog/${id}/createPost`}>Create Post</Link>
            </nav>
            :
            null
            }
            <Switch>
                <Route exact path={`/blog/${id}`} component={() => <ShowPosts blog={blog} posts={posts} id={id} />} />
                <Route path={`/blog/${id}/post/:id`} component={() => <Post posts={posts} bid={id} /> } />
                <Route path={`/blog/${id}/category/:id`} component={() => <Category />} />
                <Route path={`/blog/${id}/createCategory`} component={()=> <CreateCategory bid={blog.id} history={history} user={user} setErrorMessage={setErrorMessage} setMessage={setMessage} /> } />
                <Route path={`/blog/${id}/createPost`} component={()=> <CreatePost bid={blog.id} history={history} user={user} setErrorMessage={setErrorMessage} setMessage={setMessage} /> } />
            </Switch>
            
        </div>
    )
};

export default Blog;