import React, { useState } from "react";
import axios from "axios";

const CreateCategory = ({bid, history}) => {
    const [name, setName] = useState('');

    const changeName = (e) => {
        setName(e.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();

        try {
            const data = await axios.post('http://localhost:3001/user/createcategory', {
                "id": bid,
                "name": name
            });
            history.push('/');
            console.log('success', data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h2>Create Category</h2>
            <form onSubmit={submit}>
                <label>Name</label>
                <input type="text" onChange={changeName} value={name} />
                <input type="submit" name="Submit" />
            </form>
        </div>
    )
};


export default CreateCategory;