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
            </nav>
    )
};

export default Header;