import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faExclamationTriangle,
    faGear,
    faHistory,
    faHome,
    faMoneyBillWave,
    faSignOutAlt,
    faUser
} from '@fortawesome/free-solid-svg-icons';

const CustomerSidebar = () => {
    const navigate = useNavigate();

    // Handle sign-out and navigation
    const handleSignOutAndNavigate = () => {
        navigate('/home'); // Redirect to the home page
    };

    return (
        <nav className="col-md-3 col-lg-2 d-md-block bg-light sidebar p-3 position-sticky"
             style={{height: '100vh', top: 0}}>
            <ul className="nav flex-column">
                <li className="nav-item mb-2">
                    <span className="nav-link d-flex align-items-center" style={{
                        marginTop: '0',
                        cursor: 'default',
                        fontSize: '23px',
                        fontWeight: 'bold',
                        color: '#007bff'
                    }}>
                        <FontAwesomeIcon icon={faHome} style={{ marginRight: '10px' }} />
                        Customer Home
                    </span>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/customer/profile"
                        className="nav-link d-flex align-items-center"
                        style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                    >
                        <FontAwesomeIcon icon={faUser} style={{marginRight: '10px'}}/>
                        Profile
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/customer/pending-payments"
                        className="nav-link d-flex align-items-center"
                        style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                    >
                        <FontAwesomeIcon icon={faMoneyBillWave} style={{marginRight: '10px'}}/>
                        Pending Payments
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/customer/rentals"
                        className="nav-link d-flex align-items-center"
                        style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                    >
                        <FontAwesomeIcon icon={faGear} style={{marginRight: '10px'}}/>
                        Manage Rentals
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/customer/history"
                        className="nav-link d-flex align-items-center"
                        style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                    >
                        <FontAwesomeIcon icon={faHistory} style={{ marginRight: '10px' }} />
                        Rental History
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/customer/report-accident"
                        className="nav-link d-flex align-items-center"
                        style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                    >
                        <FontAwesomeIcon icon={faExclamationTriangle} style={{marginRight: '10px'}}/>
                        Report Accident
                    </Link>
                </li>
                <li className="nav-item mt-auto">
                    <button
                        className="btn btn-danger d-flex align-items-center"
                        style={{width: '100%', marginTop: '20px', fontSize: '20px'}}
                        onClick={handleSignOutAndNavigate}
                    >
                        <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '10px'}}/>
                        Sign Out
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default CustomerSidebar;
