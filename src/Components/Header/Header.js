import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";

const Header = ({ blogs, user, logOut }) => {
    return (
            <nav id="nav-up">
                {user !== null ? <h3>{user.userForToken.name} is logged in </h3> : null }
                {user !== null ? <button onClick={logOut}>Log out</button> : null}
                <Link className="link" key={blogs.length} to='/'>Main</Link>
                {user !== null ? null : <Link className="link" to ='/login'>Log In</Link>}
                {blogs.map((el, index) => {
                    return <Link className="link" key={el.id} to={`/blog/${index}`}>{el.name}</Link>
                })}
            </nav>
    )
};

export default Header;