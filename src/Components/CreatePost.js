import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePost = ({ bid, history }) => {
    const [allcids, setAllcids] = useState(null);
    const [selectedcids, setSelectedcids] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const getCategories = async (id) => {
        try {
            const params = {
                id : id
            }
            const data = await axios.get('http://localhost:3001/user/categories', { params : params } );
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
        try {
            const data = await axios.post('http://localhost:3001/user/createpost', {
                "title": title,
                "content": content,
                "cid": selectedcids
            });
            history.push('/');
        } catch (error) {
            console.log(error);
        }

    }

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
        <div>
            <form onSubmit={submit}>
                <h3>Select Categories</h3>
                {allcids.map((c, index) => {
                    return (
                        <div key={index}>
                            <label>{c.name}</label>
                            <input type="checkbox" onChange={handleCheckboxes} id={index} name={c.name} value={c.id}></input>
                        </div>
                    )
                })}
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