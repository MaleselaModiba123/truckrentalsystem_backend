import React, {useContext, useEffect, useState} from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getAdminDetails } from "../../services/EmployeesService.js";
import {AuthContext} from "../AuthContext.jsx";

const HelpDeskDashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;
    const [helpDeskUser, setHelpDeskUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const { auth, setAuth } = useContext(AuthContext);

    useEffect(() => {
        const fetchHelpDeskUser = async () => {
            if (auth) {
                try {
                    const response = await getAdminDetails(auth.contact.email);
                    setHelpDeskUser(response);
                } catch (error) {
                    console.error('Error fetching help desk user details:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                console.error('No help desk email found');
                setLoading(false);
            }
        };
        fetchHelpDeskUser();
    }, []);

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
                         style={{ height: '100vh', top: 0 }}>
                        {/* Help Desk User Details */}
                        <div className="mb-4 p-3 bg-white rounded shadow-sm">
                            {helpDeskUser ? (
                                <div>
                                    <h4 className="mb-1" style={{ fontSize: '16px', fontWeight: 'bold', color: '#007bff' }}>
                                        Welcome, {helpDeskUser.name.firstName} {helpDeskUser.name.lastName}
                                    </h4>
                                     {/*<p className="text-muted mb-1" style={{fontSize: '13px'}}>*/}
                                     {/*<strong>Employee Number:</strong> {helpDeskUser.employeeNumber}*/}
                                     {/*</p>*/}
                                     <p className="text-muted mb-1" style={{fontSize: '13px'}}>
                                     <strong>Role:</strong> {helpDeskUser.role}
                                      </p>
                                    <p className="text-muted mb-1" style={{ fontSize: '13px' }}>
                                        <strong>Email:</strong> {helpDeskUser.contact.email}
                                    </p>
                                </div>
                            ) : (
                                <div>No helpdesk user details available</div>
                            )}
                        </div>

                        {/* Navigation Links */}
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <span
                                    className={`nav-link d-flex align-items-center ${path === '/help-desk/dashboard' ? 'active' : ''}`}
                                    style={{ fontSize: '23px', fontWeight: 'bold', color: '#007bff' , transition: 'all 0.3s ease'}}

                                    onMouseEnter={(e) => e.currentTarget.style.fontSize = '25px'}
                                    onMouseLeave={(e) => e.currentTarget.style.fontSize = '23px'}
                                >
                                    <i className="bi bi-house-door me-2"></i>
                                    Dashboard
                                </span>
                            </li>

                            <li className="nav-item">
                                <Link
                                    className={`nav-link d-flex align-items-center ${path.startsWith('/help-desk/dashboard/accident-reports') ? 'active' : ''}`}
                                    to="/help-desk/dashboard/accident-reports"
                                    style={{ fontSize: '20px', transition: 'all 0.3s ease' }}
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
                                    Customer Accident Reports
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className={`nav-link d-flex align-items-center ${path.startsWith('/help-desk/dashboard/complaints') ? 'active' : ''}`}
                                    to="/help-desk/dashboard/complaints"
                                    style={{ fontSize: '20px', transition: 'all 0.3s ease' }}
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
                                    <i className="bi bi-exclamation-circle me-2"></i>
                                    Complaints
                                </Link>
                            </li>
                            {/*<li className="nav-item">*/}
                            {/*    <Link*/}
                            {/*        className={`nav-link d-flex align-items-center ${path.startsWith('/help-desk/dashboard/discounts') ? 'active' : ''}`}*/}
                            {/*        to="/help-desk/dashboard/discounts"*/}
                            {/*        style={{ fontSize: '20px', transition: 'all 0.3s ease' }}*/}
                            {/*        onMouseEnter={(e) => {*/}
                            {/*            e.currentTarget.style.fontSize = '21px';*/}
                            {/*            e.currentTarget.style.fontWeight = 'bold';*/}
                            {/*            e.currentTarget.style.backgroundColor = '#f8f9fa';*/}
                            {/*            e.currentTarget.style.color = '#0056b3';*/}
                            {/*            e.currentTarget.style.borderRadius = '4px';*/}
                            {/*            e.currentTarget.style.textDecoration = 'none';*/}
                            {/*        }}*/}
                            {/*        onMouseLeave={(e) => {*/}
                            {/*            e.currentTarget.style.fontSize = '20px';*/}
                            {/*            e.currentTarget.style.fontWeight = 'normal';*/}
                            {/*            e.currentTarget.style.backgroundColor = 'transparent';*/}
                            {/*            e.currentTarget.style.color = '#0056b3';*/}
                            {/*        }}*/}
                            {/*    >*/}
                            {/*        <i className="bi bi-percent me-2"></i>*/}
                            {/*        Discounts*/}
                            {/*    </Link>*/}
                            {/*</li>*/}

                              {/* Divider */}
                               <li className="nav-item">
                                  <hr className="my-3" style={{borderTop: '3px solid #dc3545'}}/>
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
                        <Outlet />
                    </main>
                </div>
            )}
        </div>
    );
};


export default HelpDeskDashboard;