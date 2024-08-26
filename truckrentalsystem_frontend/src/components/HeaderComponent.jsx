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
                                <Link to="/rent-trucks" className="nav-link">Home</Link>
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
                                    {showDropdown && branchesData.length > 0 && (
                                        branchesData.map(branch => (
                                            <a key={branch.branchId} className="dropdown-item" href={`#${branch.branchName.toLowerCase().replace(' ', '-')}`}>
                                                {branch.branchName }- {branch.address}
                                            </a>
                                        ))
                                    )}
                                    {showDropdown && branchesData.length === 0 && (
                                        <span className="dropdown-item">Loading...</span>
                                    )}
                                </div>
                            </li>
                            <li className="nav-item me-lg-5">
                               <Link to="/manager-portal/dashboard" className="nav-link">Manager Portal</Link>
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
                {/* Render the Branches component here to fetch the branches */}
                <Branches setBranchesData={setBranchesData} />
            </header>
        </div>
    );
}

export default HeaderComponent;
