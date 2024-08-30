import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faMoneyBillWave, faSignOutAlt, faUser} from '@fortawesome/free-solid-svg-icons';

const navStyle = {
    width: '250px',
    height: '100vh',
    position: 'fixed',
    top: '45px',
    left: '0',
    paddingTop: '20px',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column'
};

const CustomerSidebar = ({handleSignOut}) => {
    const navigate = useNavigate();

    return (
        <nav className="bg-light border-right" style={navStyle}>
            <h4 className="text-center mb-4">Menu</h4>
            <ul className="nav flex-column flex-grow-1">
                <li className="nav-item mb-2">
                    <Link
                        to="/customer-profile"
                        className="nav-link btn btn-light d-flex align-items-center"
                        style={{width: '100%'}}
                    >
                        <FontAwesomeIcon icon={faUser} style={{marginRight: '10px'}}/>
                        View Profile
                    </Link>
                </li>
                <li className="nav-item mb-2">
                    <Link
                        to="/pending-payments"
                        className="nav-link btn btn-light d-flex align-items-center"
                        style={{width: '100%'}}
                    >
                        <FontAwesomeIcon icon={faMoneyBillWave} style={{marginRight: '10px'}}/>
                        Pending Payments
                    </Link>
                </li>
            </ul>
            <button
                className="btn btn-danger d-flex align-items-center mt-auto"
                style={{width: '60%', marginLeft: '10px', marginBottom: '90px'}}
                onClick={handleSignOut}
            >
                <FontAwesomeIcon icon={faSignOutAlt} style={{marginRight: '10px'}}/>
                Sign Out
            </button>
        </nav>
    );
};

export default CustomerSidebar;
