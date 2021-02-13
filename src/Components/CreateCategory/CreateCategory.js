import React, { useState, useRef, useEffect } from "react";
import './CreateCategory.css';
import axios from "axios";
import base_url from "../../API";

const CreateCategory = ({bid, history, user, setMessage, setErrorMessage}) => {
    const [name, setName] = useState('');
    const _isMounted = useRef(true); // Initial value _isMounted = true

    useEffect(()=> {
        return () => { // ComponentWillUnmount in Class Component
            _isMounted.current = false;
            setName('');
        }
    },[]);

    const changeName = (e) => {
        setName(e.target.value);
    };

    const submit = async (e) => {
        e.preventDefault();
        if (_isMounted.current) {
            try {
                if (name === '') {
                    setErrorMessage('Name is empty.. please add a name');
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
                const data = await axios.post(`${base_url}/user/createcategory`, {
                    "id": bid,
                    "name": name
                }, config);
                setMessage('Category has been created successfully!');
                setTimeout(() => {
                    setMessage('', history.push('/'));
                }, 2000);
            } catch (error) {
                setErrorMessage('Category has not been created..');
                setTimeout(()=> {
                    setErrorMessage('');
                }, 2000);
                console.log(error);
            }
        }
    };

    return (
        <div id="create-category">
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