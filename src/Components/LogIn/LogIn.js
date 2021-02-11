import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import base_url from "../../API";


const LogIn = ({ setUser }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const _isMounted = useRef(true); // Initial value _isMounted = true

    useEffect(()=> {
        return () => { // ComponentWillUnmount in Class Component
            _isMounted.current = false;
        }
    },[]);

    const handleMail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();
        if (_isMounted.current) {
            try {

                const data = await axios.post(`${base_url}/user/login`, {
                    "email": email,
                    "password": password
                });
                const u = data.data;
                setUser(u);
                setEmail('');
                setPassword('');

                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(u)
                  );
                // history.push('/');
                console.log('ress', data.data);

            } catch (error) {
                console.log(error.response.data.error);
            }
        }

    }

    return (
        <div id="login">
            <h2>Log In</h2>
            <form onSubmit={submit}>
                <label>Email</label>
                <input type="text" value={email} onChange={handleMail} />
                <label>Password</label>
                <input type="password" value={password} onChange={handlePassword} />
                <input type="submit" name="Submit" />
            </form>
        </div>
    )
};

export default LogIn;