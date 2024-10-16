import React, {useContext, useEffect, useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faCommentDots,
    faExclamationTriangle,
    faGear,
    faHistory,
    faHome,
    faMoneyBillWave,
    faSignOutAlt,
    faUser
} from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from "../AuthContext.jsx";

const CustomerSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const {auth, setAuth} = useContext(AuthContext);
    useEffect(() => {
        const fetchCustomer = async () => {
            if (auth) {
                try {
                    // // const response = await getCustomerProfile(); // Fetch customer profile
                    // console.log("Customer details response:", response.data);
                    // setCustomer(response.data);
                } catch (error) {
                    console.error('Error fetching customer details:', error);
                    if (error.response && error.response.status === 401) {
                        navigate('/sign-in'); // Redirect to sign-in if unauthorized
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                console.error('No customer authentication found');
                setLoading(false);
                navigate('/sign-in');
            }
        };
        fetchCustomer();
    }, [auth, navigate]);
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
                <li className="nav-item mb-2">
                    <Link
                        to="/customer/complaint"
                        className="nav-link d-flex align-items-center"
                        style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                    >
                        <FontAwesomeIcon icon={faCommentDots} style={{marginRight: '10px'}} />
                        Submit Complaint
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
