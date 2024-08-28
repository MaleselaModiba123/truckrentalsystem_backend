import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '/logo.jpeg';
import Branches from "./Branches.jsx";

const HeaderComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [branchesData, setBranchesData] = useState([]);  // Store branches data here
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
    // Inline styles
    const navbarStyle = {
        backgroundColor: '#007bff',
        padding: '1rem',
    };

    const navbarBrandStyle = {
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
        fontSize: '2rem',
        fontWeight: 'bold',
    };

    const navbarTitleStyle = {
        marginLeft: '0.5rem',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#ffffff',
    };

    const navLinkStyle = {
        fontSize: '1.1rem',
        color: '#ffffff',
        transition: 'color 0.3s, transform 0.3s',
    };

    const navLinkHoverStyle = {
        color: '#f8f9fa',
        transform: 'scale(1.05)',
    };

    const dropdownMenuStyle = {
        backgroundColor: '#ffffff',
        border: '1px solid #007bff',
        borderRadius: '0.25rem',
        transition: 'opacity 0.3s',
        opacity: showDropdown ? 1 : 0,
        position: 'absolute',
        top: '100%',
        left: 0,
    };

    const dropdownItemStyle = {
        transition: 'background-color 0.3s, color 0.3s',
    };

    const dropdownItemHoverStyle = {
        backgroundColor: '#007bff',
        color: '#ffffff',
    };
    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-lg navbar-primary ' style={navbarStyle}>
                    <NavLink to={"/"} className="navbar-brand d-flex align-items-center m-lg-2" style={navbarBrandStyle}>
                        <img src={logo} alt="logo" className="logo" />
                        <span style={navbarTitleStyle}>Swift Wheelz</span>
                    </NavLink>
                    <div className="collapse navbar-collapse d-flex justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item me-lg-5">
                                <Link to="/home" className="nav-link"  style={navLinkStyle}
                                      onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
                                      onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>Home</Link>
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
                                    style={navLinkStyle}
                                    onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
                                    onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}
                                >
                                    Branches
                                </Link>
                                <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`} aria-labelledby="branchesDropdown"  style={dropdownMenuStyle}>
                                    {showDropdown && branchesData.length > 0 && (
                                        branchesData.map(branch => (
                                            <a key={branch.branchId} className="dropdown-item" href={`#${branch.branchName.toLowerCase().replace(' ', '-')}`}
                                               style={dropdownItemStyle}
                                               onMouseOver={(e) => Object.assign(e.target.style, dropdownItemHoverStyle)}
                                               onMouseOut={(e) => Object.assign(e.target.style, dropdownItemStyle)}
                                            >
                                                {branch.branchName }- {branch.address}
                                            </a>
                                        ))
                                    )}
                                    {showDropdown && branchesData.length === 0 && (
                                        <span className="dropdown-item" style={dropdownItemStyle}>Loading...</span>
                                    )}
                                </div>
                            </li>
                            <li className="nav-item me-lg-5">
                                <Link to="/about-us" className="nav-link"  style={navLinkStyle}
                                      onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
                                      onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>About Us</Link>
                            </li>
                            <li className="nav-item me-lg-5">
                                <Link to="/contact-us" className="nav-link"  style={navLinkStyle}
                                      onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
                                      onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>Contact Us</Link>
                            </li>
                            <li className="nav-item me-lg-5">
                                <Link to="/sign-in" className="nav-link"  style={navLinkStyle}
                                      onMouseOver={(e) => Object.assign(e.target.style, navLinkHoverStyle)}
                                      onMouseOut={(e) => Object.assign(e.target.style, navLinkStyle)}>Sign in</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                {/* Render the Branches component here to fetch the branches */}
                <Branches setBranchesData={setBranchesData} />
            </header>
        </div>
    );
}

export default HeaderComponent;
