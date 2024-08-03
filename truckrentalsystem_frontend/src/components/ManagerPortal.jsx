import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ManagerPortal = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                    <div className="position-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link className="nav-link active" to="/manager-portal/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/manager-portal/rent-trucks">
                                    Rental Trucks
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/manager-portal/branches">
                                    Branches
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/manager-portal/employees">
                                    Employees
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Content Area */}
                <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ManagerPortal;
