import React from 'react';
import './Header.css';
import { Link } from "react-router-dom";

const Header = ({ blogs }) => {
    return (
            <nav id="nav-up">
                <Link className="link" key={blogs.length} to='/'>Main</Link>
                {blogs.map((el, index) => {
                    return <Link className="link" key={el.id} to={`/blog/${index}`}>{el.name}</Link>
                })}

                {/* { user === null ? null : <p>{user.data.name} is logged in</p>}
                { user === null ? null : <button onClick={logOut}>Log Out</button> } */}
                {/* <Link to="/">Main </Link>
                <Link to="/about">About Us </Link>
                <Link to="/login">Log in </Link>
                <Link to="/signup">Sign up</Link> */}
                {/* { user !== null ? <h1 className="navbar"><Link to="/formProduct">Create Product</Link></h1> : null}
                { user !== null ? <h1 className="navbar"><Link to="/editeDeleteProduct">Edit/Delete Product</Link></h1> : null} */}
            </nav>
    )
};

export default Header;