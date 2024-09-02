import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoneyBillWave, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';

const navStyle = {
    width: '250px',
    height: '100vh',
    position: 'fixed',
    top: '40px',
    left: '0',
    paddingTop: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column'
};

const ulStyle = {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    padding: 0,
    marginBottom: '30px'
};

const CustomerSidebar = () => {
    const navigate = useNavigate();

    // Handle sign-out and navigation
    const handleSignOutAndNavigate = () => {
        navigate('/home'); // Redirect to the home page
    };
    return (
        <nav className="bg-light border-right" style={navStyle}>
            <ul className="nav flex-column" style={ulStyle}>
                <li className="nav-item mb-2">
                    <Link
                        to="/customer/profile"
                        className="nav-link d-flex align-items-center"
                        style={{width: '100%', marginTop: '50px'}}
                    >
                        <FontAwesomeIcon icon={faUser} style={{marginRight: '10px'}}/>
                        Profile
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/customer/pending-payments"
                        className="nav-link d-flex align-items-center"
                        style={{width: '100%'}}
                    >
                        <FontAwesomeIcon icon={faMoneyBillWave} style={{marginRight: '10px'}}/>
                        Pending Payments
                    </Link>
                </li>
                {/*<li className="nav-item mb-2">*/}
                {/*    <Link*/}
                {/*        to="/customer/rentals"*/}
                {/*        className="nav-link d-flex align-items-center"*/}
                {/*        style={{width: '100%'}}*/}
                {/*    >*/}
                {/*        <FontAwesomeIcon icon={faMoneyBillWave} style={{marginRight: '10px'}}/>*/}
                {/*        Rentals*/}
                {/*    </Link>*/}
                {/*</li>*/}
                <li className="nav-item mt-auto">
                    <button
                        className="btn btn-danger d-flex align-items-center"
                        style={{width: '50%'}}
                        onClick={handleSignOutAndNavigate}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} style={{marginLeft: '10px'}}/>
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default CustomerSidebar;
