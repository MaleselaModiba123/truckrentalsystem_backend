import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/logo.jpeg';
import Branches from "./Branches.jsx";

const HeaderComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-lg navbar-primary bg-primary'>
                    <NavLink to={"/home"} className="navbar-brand d-flex align-items-center m-lg-2">
                        <img src={logo} alt="logo" className="logo" />Truck Rental System
                    </NavLink>
                    <div className="collapse navbar-collapse d-flex justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item me-lg-5">
                                <Link to="/rent-trucks" className="nav-link">Rent Trucks</Link>
                            </li>
                            <li className={`nav-item dropdown ${showDropdown ? 'show' : ''}`} ref={dropdownRef}>
                                <Link
                                    to="#"
                                    className="nav-link dropdown-toggle me-lg-5"
                                    id="branchesDropdown"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded={showDropdown ? 'true' : 'false'}
                                    onClick={toggleDropdown}
                                >
                                    Branches
                                </Link>
                                <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`} aria-labelledby="branchesDropdown">
                                    <Branches showDropdown={showDropdown} />
                                </div>
                            </li>
                            <li className="nav-item me-lg-5">
                                <Link to="/about-us" className="nav-link">About Us</Link>
                            </li>
                            <li className="nav-item me-lg-5">
                                <Link to="/contact-us" className="nav-link">Contact Us</Link>
                            </li>
                            <li className="nav-item me-lg-5">
                                <Link to="/sign-in" className="nav-link">Sign in</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    );
}

export default HeaderComponent;
