import React from 'react';
import './css/navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar-container">
            <div className="navbar-center">
                <div className="navbar-left">
                    <a href="/">Women</a>
                    <a href="/">Men</a>
                    <a href="/">Children</a>
                </div>
                <div className="navbar-right">
                    <input type="search" placeholder="Search" className="search-input" />
                    <a href="/" className="icon-link"><img src="https://cdn-icons-png.flaticon.com/512/4308/4308439.png" alt="Heart Icon" className='icon' /></a>
                    <a href="/login" className="icon-link"><img src="https://cdn-icons-png.flaticon.com/512/2956/2956820.png" alt="User Icon" className='icon' /></a>
                </div>
            </div>
        </nav>
    
    );
};

export default Navbar;
