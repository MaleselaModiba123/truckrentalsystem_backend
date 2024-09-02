import React, {useEffect, useRef, useState} from 'react';
import {Link, NavLink} from 'react-router-dom';
import logo from '/logo.jpeg';
import Branches from "./Branches.jsx";

const HeaderComponent = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [branchesData, setBranchesData] = useState([]);
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

    // Define internal styles including the animation
    const styles = {
        navbar: {
            backgroundColor: '#007bff',
            padding: '1rem',
        },
        navbarBrand: {
            display: 'flex',
            alignItems: 'center',
            color: '#ffffff',
            fontFamily: 'Roboto, sans-serif',
            fontSize: '2rem',
            fontWeight: 'bold',
            transition: 'color 0.3s ease',
            // Animation keyframes
            animation: 'slide-left-right 3s infinite'
        },
        navbarBrandHover: {
            color: '#f8f9fa',
        },
        navbarTitle: {
            marginLeft: '0.5rem',
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#ffffff',
        },
        navLink: {
            fontFamily: 'Roboto, sans-serif',
            fontSize: '1.1rem',
            color: '#ffffff',
            transition: 'color 0.3s, transform 0.3s',
        },
        navLinkHover: {
            color: '#f8f9fa',
            transform: 'scale(1.05)',
        },
        dropdownMenu: {
            backgroundColor: '#ffffff',
            border: '1px solid #007bff',
            borderRadius: '0.25rem',
            transition: 'opacity 0.3s ease-in-out',
            opacity: showDropdown ? 1 : 0,
            position: 'absolute',
            top: '100%',
            left: 0,
        },
        dropdownItem: {
            transition: 'background-color 0.3s ease, color 0.3s ease',
        },
        dropdownItemHover: {
            backgroundColor: '#007bff',
            color: '#ffffff',
        },
    };

    // Keyframes for the animation
    const animationStyles = `
        @keyframes slide-left-right {
            0% { transform: translateX(-10px); }
            50% { transform: translateX(10px); }
            100% { transform: translateX(-10px); }
        }
    `;

    return (
        <div>
            <style>
                {animationStyles}
            </style>
            <header>
                <nav className='navbar navbar-expand-lg navbar-primary' style={styles.navbar}>
                    <NavLink
                        to={"/"}
                        className="navbar-brand d-flex align-items-center m-lg-2"
                        style={styles.navbarBrand}
                        onMouseOver={(e) => e.target.style.color = styles.navbarBrandHover.color}
                        onMouseOut={(e) => e.target.style.color = styles.navbarBrand.color}
                    >
                        <img src={logo} alt="logo" className="logo" />
                        <span style={styles.navbarTitle}>Swift Wheelz</span>
                    </NavLink>
                    <div className="collapse navbar-collapse d-flex justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item me-lg-5">
                                <Link
                                    to="/home"
                                    className="nav-link"
                                    style={styles.navLink}
                                    onMouseOver={(e) => Object.assign(e.target.style, styles.navLinkHover)}
                                    onMouseOut={(e) => Object.assign(e.target.style, styles.navLink)}
                                >
                                    Home
                                </Link>
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
                                    style={styles.navLink}
                                    onMouseOver={(e) => Object.assign(e.target.style, styles.navLinkHover)}
                                    onMouseOut={(e) => Object.assign(e.target.style, styles.navLink)}
                                >
                                    Branches
                                </Link>
                                <div className={`dropdown-menu ${showDropdown ? 'show' : ''}`}
                                     aria-labelledby="branchesDropdown" style={styles.dropdownMenu}>
                                    {showDropdown && branchesData.length > 0 && (
                                        branchesData.map(branch => (
                                            <a
                                                key={branch.branchId}
                                                className="dropdown-item"
                                                href={`#${branch.branchName.toLowerCase().replace(' ', '-')}`}
                                                style={styles.dropdownItem}
                                                onMouseOver={(e) => Object.assign(e.target.style, styles.dropdownItemHover)}
                                                onMouseOut={(e) => Object.assign(e.target.style, styles.dropdownItem)}
                                            >
                                                {branch.branchName} - {branch.address}
                                            </a>
                                        ))
                                    )}
                                    {showDropdown && branchesData.length === 0 && (
                                        <span className="dropdown-item" style={styles.dropdownItem}>Loading...</span>
                                    )}
                                </div>
                            </li>
                            <li className="nav-item me-lg-5">
                                <Link
                                    to="/about-us"
                                    className="nav-link"
                                    style={styles.navLink}
                                    onMouseOver={(e) => Object.assign(e.target.style, styles.navLinkHover)}
                                    onMouseOut={(e) => Object.assign(e.target.style, styles.navLink)}
                                >
                                    About Us
                                </Link>
                            </li>
                            <li className="nav-item me-lg-5">
                                <Link
                                    to="/contact-us"
                                    className="nav-link"
                                    style={styles.navLink}
                                    onMouseOver={(e) => Object.assign(e.target.style, styles.navLinkHover)}
                                    onMouseOut={(e) => Object.assign(e.target.style, styles.navLink)}
                                >
                                    Contact Us
                                </Link>
                            </li>
                            <li className="nav-item me-lg-5">
                                <Link
                                    to="/sign-in"
                                    className="nav-link"
                                    style={styles.navLink}
                                    onMouseOver={(e) => Object.assign(e.target.style, styles.navLinkHover)}
                                    onMouseOut={(e) => Object.assign(e.target.style, styles.navLink)}
                                >
                                    Sign in
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <Branches setBranchesData={setBranchesData} />
            </header>
        </div>
    );
}

export default HeaderComponent;
