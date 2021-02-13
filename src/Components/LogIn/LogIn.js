import React, {useState, useEffect, useRef} from "react";
import './LogIn.css';
import axios from "axios";
import base_url from "../../API";


const LogIn = ({ setUser, setErrorMessage, setMessage, history }) => {
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
                if (email === '' || password === '') {
                    setErrorMessage('Mail or password are empty');
                    setTimeout(() =>{
                        setErrorMessage('');
                    }, 2000);
                    return
                }
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
                  setMessage('you have logged in successfully!');
                  setTimeout(() => {
                      setMessage('', history.push('/'));
                  }, 2000);
            } catch (error) {
                setErrorMessage('Email or password are wrong, try again');
                setTimeout(()=> {
                    setErrorMessage('');
                }, 2000);
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