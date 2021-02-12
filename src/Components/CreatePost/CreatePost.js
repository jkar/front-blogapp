import React, { useState, useEffect, useRef } from "react";
import './CreatePost.css';
import axios from "axios";
import base_url from "../../API";

const CreatePost = ({ bid, history, user, setMessage, setErrorMessage }) => {
    const [allcids, setAllcids] = useState(null);
    const [selectedcids, setSelectedcids] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const _isMounted = useRef(true); // Initial value _isMounted = true

    useEffect(()=> {
        return () => { // ComponentWillUnmount in Class Component
            _isMounted.current = false;
            setAllcids(null);
            setSelectedcids([]);
            setTitle('');
            setContent('');
        }
    },[]);

    const getCategories = async (id) => {
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
    
    useEffect(() => {
        getCategories(bid);
    }, []);

    const submit = async (e) => {
        e.preventDefault();
        // if (_isMounted.current) {
            try {
                const config = {
                    headers: {
                        'Authorization' : `Bearer ${user.token}`
                    }
                };
                const data = await axios.post(`${base_url}/user/createpost`, {
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
                console.log('success', data);
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
        // }
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

    if (allcids === null) {
        return null;
    }

    return (
        <div id="create-post">
            <h2>Create Post</h2>
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

export default CreatePost;