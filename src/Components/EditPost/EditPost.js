import React, {useState, useEffect} from "react";
import axios from 'axios';
import base_url from "../../API";
import { useParams } from "react-router-dom";

const EditPost = ({ posts, bid, user, setMessage, setErrorMessage, history }) => {
    const [post, SetPost] = useState(null);
    const [categories, setCategories] = useState(null);
    const [allcids, setAllcids] = useState(null);
    const [selectedcids, setSelectedcids] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const id = useParams().id;

    useEffect(()=> {
        return () => { // ComponentWillUnmount in Class Component
            setAllcids(null);
            setSelectedcids([]);
            setTitle('');
            setContent('');
        }
    },[]);

    useEffect(()=> {
        SetPost(posts[id]);
        getAllCategories(bid);
        if (posts.length !== 0) {
            getCategories();
        }
    }, []);

    const getCategories = async () => {
        try {
            const params = {
                id : posts[id].id
            }
            const data = await axios.get(`${base_url}/blog/categories`, { params : params });
            setCategories(data.data);
            SetPost(posts[id]);
        } catch (error) {
            console.log(error);
        }
    };

    const getAllCategories = async (id) => {
        try {
            const params = {
                id : id
            }
            const data = await axios.get(`${base_url}/user/categories`, { params : params } );
            setAllcids(data.data);  
        } catch (error) {
            console.log(error);
        }
    };

    const submit = async (e) => {
        e.preventDefault();
            try {
                if (title === '' || content === '' || selectedcids.length === 0) {
                    setErrorMessage('Title, Content is empty or Categories are not chosen')
                    setTimeout(() => {
                        setErrorMessage('');
                    }, 1500);
                    return
                }
                const config = {
                    headers: {
                        'Authorization' : `Bearer ${user.token}`
                    }
                };
                const data = await axios.post(`${base_url}/user/updatepost`, {
                    "id": post.id,
                    "title": title,
                    "content": content,
                    "cid": selectedcids
                }, config);
                setMessage('Post has been created successfully!');
                setTitle('');
                setContent('');
                setSelectedcids([]);
                setTimeout(() => {
                    setMessage('', history.push('/'));
                }, 2000);
            } catch (error) {
                setErrorMessage('Post has not been created..');
                setTitle('');
                setContent('');
                setSelectedcids([]);
                setTimeout(()=> {
                    setErrorMessage('');
                }, 2000);
                console.log(error);
            }
    };

    const handleCheckboxes = (e) => {
        if(e.target.checked) {
            const sc = [...selectedcids, parseInt(e.target.value)];
            setSelectedcids(sc)
        } else {
            let sc = [...selectedcids];
            sc = sc.filter(el => el !== parseInt(e.target.value));
            setSelectedcids(sc);
        }
    };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    if (post === null || post === undefined || categories === null || allcids === null) {
        return null;
    }

    let categoryNames = categories.map(c => c.category.name);

    return (
        <div>
            <h3>Edit Post</h3>
            <p><b>Title: </b>{post.title}</p>
            <p><b>Content: </b>{post.content}</p>
            <div><b>Categories: </b>{categoryNames.join()}</div>
            <br/>
            <form onSubmit={submit}>
                <h3>Select Categories</h3>
                {allcids.map((c, index) => {
                    return (
                        <div key={index}>
                            <input type="checkbox" onChange={handleCheckboxes} id={index} name={c.name} value={c.id}></input>
                            <label>{c.name}</label>
                        </div>
                    )
                })}
                <br />
                <label>Title</label>
                <input type="text" value={title} onChange={handleTitleChange} />
                <label>Content</label>
                <input type="text" value={content} onChange={handleContentChange} />
                <input type="submit" name="Submit" />
            </form>
        </div>
    )
};

export default EditPost;