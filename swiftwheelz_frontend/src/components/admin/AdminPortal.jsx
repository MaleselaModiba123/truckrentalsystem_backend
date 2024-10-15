import React, {useContext, useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from 'react-router-dom';
import {getAdminDetails, getEmployeeProfile} from "../../services/EmployeesService.js";
import {AuthContext} from "../AuthContext.jsx";

const AdminPortal = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const { auth, setAuth } = useContext(AuthContext);
    useEffect(() => {
        const fetchAdmin = async () => {
            if (auth) {
                try {
                    const response = await getEmployeeProfile();
                    console.log("Admin details response:", response.data);
                    setAdmin(response);
                } catch (error) {
                    console.error('Error fetching admin details:', error);
                    if (error.response && error.response.status === 401) {
                        navigate('/sign-in'); // Redirect to sign-in if unauthorized
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                console.error('No admin email found');
                setLoading(false);
                navigate('/sign-in');
            }
        };
        fetchAdmin();
    }, [auth,navigate]);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        setAuth(null);
        navigate('/home');
    };

    return (
        <div className="container-fluid">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="row">
                    {/* Sidebar */}
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar p-3 position-sticky"
                         style={{height: '100vh', top: 0}}>
                        {/* Admin Details */}
                        <div className="mb-4 p-3 bg-white rounded shadow-sm">
                            {admin ? (
                                <div>
                                    <h4 className="mb-1"
                                        style={{fontSize: '16px', fontWeight: 'bold', color: '#007bff'}}>
                                        Welcome, {admin.name.firstName} {admin.name.lastName}
                                    </h4>
                                    {/*<p className="text-muted mb-1" style={{fontSize: '13px'}}>*/}
                                    {/*    <strong>Employee Number:</strong> {admin.employeeNumber}*/}
                                    {/*</p>*/}
                                    <p className="text-muted mb-1" style={{fontSize: '13px'}}>
                                        <strong>Role:</strong> {admin.role}
                                    </p>
                                    <p className="text-muted mb-1" style={{fontSize: '13px'}}>
                                        <strong>Email:</strong> {admin.contact.email}
                                    </p>
                                </div>
                            ) : (
                                <div>No admin details available</div>
                            )}
                        </div>

                        {/* Navigation Links */}
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span
                                    className={`nav-link d-flex align-items-center ${path === '/admin-portal/dashboard' ? 'active' : ''}`}
                                    style={{
                                        fontSize: '23px',
                                        fontWeight: 'bold',
                                        color: '#007bff',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.fontSize = '25px'}
                                    onMouseLeave={(e) => e.currentTarget.style.fontSize = '23px'}
                                >
                                    <i className="bi bi-house-door me-2"></i>
                                    Dashboard
                                </span>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/truck-types') ? 'active' : ''}`}
                                    to="/admin-portal/dashboard/truck-types"
                                    style={{fontSize: '23px', transition: 'all 0.3s ease'}}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.fontSize = '23px';
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
                                        e.currentTarget.style.color = '#0056b3';
                                    }}
                                >
                                    <i className="bi bi-truck me-2"></i>
                                    Truck Types
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/insurances') ? 'active' : ''}`}
                                    to="/admin-portal/dashboard/insurances"
                                    style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.fontSize = '21px';
                                        e.currentTarget.style.fontWeight = 'bold';
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                        e.currentTarget.style.color = '#0056b3';
                                        e.currentTarget.style.borderRadius = '4px';
                                        e.currentTarget.style.textDecoration = 'none';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.fontSize = '20px';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#0056b3';
                                    }}
                                >
                                    <i className="bi bi-file-earmark-text me-2"></i>
                                    Insurances
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/trucks') ? 'active' : ''}`}
                                    to="/admin-portal/dashboard/trucks"
                                    style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.fontSize = '21px';
                                        e.currentTarget.style.fontWeight = 'bold';
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                        e.currentTarget.style.color = '#0056b3';
                                        e.currentTarget.style.borderRadius = '4px';
                                        e.currentTarget.style.textDecoration = 'none';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.fontSize = '20px';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#0056b3';
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
                                    style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.fontSize = '21px';
                                        e.currentTarget.style.fontWeight = 'bold';
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                        e.currentTarget.style.color = '#0056b3';
                                        e.currentTarget.style.borderRadius = '4px';
                                        e.currentTarget.style.textDecoration = 'none';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.fontSize = '20px';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#0056b3';
                                    }}
                                >
                                    <i className="bi bi-geo-alt me-2"></i>
                                    Branches
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/employees') ? 'active' : ''}`}
                                    to="/admin-portal/dashboard/employees"
                                    style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.fontSize = '21px';
                                        e.currentTarget.style.fontWeight = 'bold';
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                        e.currentTarget.style.color = '#0056b3';
                                        e.currentTarget.style.borderRadius = '4px';
                                        e.currentTarget.style.textDecoration = 'none';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.fontSize = '20px';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#0056b3';
                                    }}
                                >
                                    <i className="bi bi-person me-2"></i>
                                    Employees
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/manage-contact-us') ? 'active' : ''}`}
                                    to="/admin-portal/dashboard/manage-contact-us"
                                    style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.fontSize = '21px';
                                        e.currentTarget.style.fontWeight = 'bold';
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                        e.currentTarget.style.color = '#0056b3';
                                        e.currentTarget.style.borderRadius = '4px';
                                        e.currentTarget.style.textDecoration = 'none';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.fontSize = '20px';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#0056b3';
                                    }}
                                >
                                    <i className="bi bi-telephone me-2"></i>
                                    Manage Contact
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link d-flex align-items-center ${path.startsWith('/admin-portal/dashboard/rented-trucks') ? 'active' : ''}`}
                                    to="/admin-portal/dashboard/rented-trucks"
                                    style={{fontSize: '20px', transition: 'all 0.3s ease'}}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.fontSize = '21px';
                                        e.currentTarget.style.fontWeight = 'bold';
                                        e.currentTarget.style.backgroundColor = '#f8f9fa';
                                        e.currentTarget.style.color = '#0056b3';
                                        e.currentTarget.style.borderRadius = '4px';
                                        e.currentTarget.style.textDecoration = 'none';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.fontSize = '20px';
                                        e.currentTarget.style.fontWeight = 'normal';
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#0056b3';
                                    }}
                                >
                                    <i className="bi bi-truck me-2"></i>
                                    Rentals
                                </Link>
                            </li>

                            {/* Sign Out Button */}
                            <li className="nav-item mt-auto">
                                <button
                                    className="btn btn-link d-flex align-items-center text-danger"
                                    style={{fontSize: '20px', transition: 'all 0.3s ease', color: '#dc3545'}}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.backgroundColor = '#f8d7da';
                                        e.currentTarget.style.color = '#a71d2a';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.backgroundColor = 'transparent';
                                        e.currentTarget.style.color = '#dc3545';
                                    }}
                                    onClick={handleSignOut}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>
                                    Sign Out
                                </button>
                            </li>
                        </ul>
                    </nav>
                    {/* Main Content */}
                    <main className="col-md-9 ms-sm-auto col-lg-10 px-4">
                        <Outlet/>
                    </main>
                </div>
            )}
        </div>
    );
};

export default AdminPortal;