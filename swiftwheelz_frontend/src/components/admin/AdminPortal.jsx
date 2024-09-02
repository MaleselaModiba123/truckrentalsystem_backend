import React from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import truckGif from '../../../public/truckGif.gif'

const AdminPortal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    const handleSignOut = () => {
        // Clear authentication data here if needed (e.g., remove tokens or user data from local storage)
        localStorage.removeItem('authToken');

        // Navigate to home page
        navigate('/home');
    };
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar p-3 position-sticky"
                     style={{height: '100vh', top: 0}}>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <span
                                className={`nav-link d-flex align-items-center active ${path === '/admin-portal/dashboard/' ? 'active' : ''}`}
                                // to="/admin-portal/dashboard"
                                style={{
                                    fontSize: '25px',
                                    fontWeight: 'bold',
                                    color: '#007bff',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.fontSize = '30px'}
                                onMouseLeave={(e) => e.currentTarget.style.fontSize = '25px'}
                            >
                                <i className="bi bi-house-door me-2"></i>
                                Dashboard
                            </span>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/truck-types') ? 'active' : ''}`}
                                to="/admin-portal/dashboard/truck-types"
                                style={{
                                    fontSize: '23px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.fontSize = '25px';
                                    e.currentTarget.style.fontWeight = 'bold';
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    e.currentTarget.style.color = '#0056b3';
                                    e.currentTarget.style.borderRadius = '4px';
                                    e.currentTarget.style.textDecoration = 'none';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.fontSize = '23px';
                                    e.currentTarget.style.fontWeight = 'normal';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#0056b3'; // Default color
                                }}>
                                <i className="bi bi-truck me-2"></i>
                                Truck Types
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link d-flex align-items-center${path.startsWith('/admin-portal/dashboard/insurances') ? 'active' : ''}`}
                                to="/admin-portal/dashboard/insurances"
                                style={{
                                    fontSize: '23px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.fontSize = '25px';
                                    e.currentTarget.style.fontWeight = 'bold';
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    e.currentTarget.style.color = '#0056b3';
                                    e.currentTarget.style.borderRadius = '4px';
                                    e.currentTarget.style.textDecoration = 'none';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.fontSize = '23px';
                                    e.currentTarget.style.fontWeight = 'normal';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#0056b3'; // Default color
                                }}>
                                <i className="bi bi-file-earmark-text me-2"></i>
                                Insurances
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/trucks') ? 'active' : ''}`}
                                to="/admin-portal/dashboard/trucks"
                                style={{
                                    fontSize: '23px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.fontSize = '25px';
                                    e.currentTarget.style.fontWeight = 'bold';
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    e.currentTarget.style.color = '#0056b3';
                                    e.currentTarget.style.borderRadius = '4px';
                                    e.currentTarget.style.textDecoration = 'none';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.fontSize = '23px';
                                    e.currentTarget.style.fontWeight = 'normal';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#0056b3'; // Default color
                                }}
                            >
                                <i className="bi bi-truck me-2"></i>
                                Trucks
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/branchez') ? 'active' : ''}`}
                                to="/admin-portal/dashboard/branchez"
                                style={{
                                    fontSize: '23px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.fontSize = '25px';
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    e.currentTarget.style.fontWeight = 'bold';
                                    e.currentTarget.style.color = '#0056b3';
                                    e.currentTarget.style.borderRadius = '4px';
                                    e.currentTarget.style.textDecoration = 'none';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.fontSize = '23px';
                                    e.currentTarget.style.fontWeight = 'normal';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#0056b3'; // Default color
                                }}>
                                <i className="bi bi-geo-alt me-2"></i>
                                Branches
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/employees') ? 'active' : ''}`}
                                to="/admin-portal/dashboard/employees"
                                style={{
                                    fontSize: '23px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.fontSize = '25px';
                                    e.currentTarget.style.fontWeight = 'bold';
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    e.currentTarget.style.color = '#0056b3';
                                    e.currentTarget.style.borderRadius = '4px';
                                    e.currentTarget.style.textDecoration = 'none';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.fontSize = '23px';
                                    e.currentTarget.style.fontWeight = 'normal';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#0056b3'; // Default color
                                }}>
                                <i className="bi bi-person me-2"></i>
                                Employees
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/manage-contact-us') ? 'active' : ''}`}
                                to="/admin-portal/dashboard/manage-contact-us"
                                style={{
                                    fontSize: '23px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.fontSize = '25px';
                                    e.currentTarget.style.fontWeight = 'bold';
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    e.currentTarget.style.color = '#0056b3';
                                    e.currentTarget.style.borderRadius = '4px';
                                    e.currentTarget.style.textDecoration = 'none';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.fontSize = '23px';
                                    e.currentTarget.style.fontWeight = 'normal';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#0056b3'; // Default color
                                }}>
                                <i className="bi bi-telephone me-2"></i>
                                Manage Contact
                            </Link>
                        </li>
                        {/* Sign Out Button */}
                        <li className="nav-item">
                            <button
                                className="nav-link d-flex align-items-center"
                                style={{
                                    fontSize: '23px',
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#c9302c',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.fontSize = '25px';
                                    e.currentTarget.style.fontWeight = 'bold';
                                    e.currentTarget.style.backgroundColor = '#f8f9fa';
                                    e.currentTarget.style.color = '#c9302c';
                                    e.currentTarget.style.borderRadius = '4px';
                                    e.currentTarget.style.textDecoration = 'none';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.fontSize = '23px';
                                    e.currentTarget.style.fontWeight = 'normal';
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.color = '#c9302c'; // Default color
                                }}
                                onClick={handleSignOut}
                            >
                                <i className="bi bi-box-arrow-right me-2"></i>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Content Area */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <div className="container mt-4">
                        {/* Conditionally render the welcome message */}
                        {path === '/admin-portal/dashboard' && (
                            <>
                                <h2 style={{
                                    color: '#007bff', // Blue color
                                    fontSize: '2.5rem',
                                    fontWeight: 'bold',
                                    animation: 'fadeIn 2s ease-in-out'
                                }}>
                                    Welcome to the Admin Portal
                                </h2>
                                <p style={{
                                    fontSize: '1.25rem',
                                    animation: 'fadeIn 3s ease-in-out'
                                }}>
                                    Use the sidebar to navigate through different sections of the portal.
                                </p>
                                <img src={truckGif} alt="Truck GIF"
                                     style={{width: '100%', maxWidth: '600px', height: 'auto', marginTop: '20px'}}/>
                            </>
                        )}

                        <Outlet/>
                    </div>
                </main>
            </div>
            <style>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminPortal;
