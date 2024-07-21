import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="profile-dropdown">
            <button className="nav-button profile-button" onClick={toggleDropdown}>
                <i className="fas fa-user"></i>
            </button>
            {showDropdown && (
                <div className="dropdown-content">
                    <Link to="/signin">Sign In</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            )}
        </div>
    );
};

export default Profile;
