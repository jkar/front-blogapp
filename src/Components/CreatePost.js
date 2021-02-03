import React, { useState, useEffect } from "react";
import axios from "axios";

const CreatePost = ({ bid, history }) => {
    const [allcids, setAllcids] = useState(null);
    const [selectedcids, setSelectedcids] = useState([]);

    console.log(allcids);
    console.log('selcid', selectedcids);

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


    const submit = (e) => {
        e.preventDefault();


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

    if (allcids === null) {
        return null;
    }

    return (
        <div>
            <form onSubmit={submit}>
                {allcids.map((c, index) => {
                    return (
                        <div key={index}>
                            <label>{c.name}</label>
                            <input type="checkbox" onChange={handleCheckboxes} id={index} name={c.name} value={c.id}></input>
                        </div>
                    )
                })}
            </form>
        </div>
    )
};

export default CreatePost;