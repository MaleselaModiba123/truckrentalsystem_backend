import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const ManagerPortal = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar p-3 position-sticky" style={{ height: '100vh', top: 0 }}>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center active" to="/manager-portal/dashboard" style={{ fontWeight: 'bold', color: '#007bff' }}>
                                <i className="bi bi-house-door me-2"></i>
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/manager-portal/trucks">
                                <i className="bi bi-truck me-2"></i>
                                Trucks
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/manager-portal/truck-types">
                                <i className="bi bi-truck me-2"></i>
                                Truck Types
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/manager-portal/branchez">
                                <i className="bi bi-geo-alt me-2"></i>
                                Branches
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/manager-portal/employees">
                                <i className="bi bi-person me-2"></i>
                                Employees
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center" to="/manager-portal/insurances">
                                <i className="bi bi-file-earmark-text me-2"></i>
                                Insurances
                            </Link>
                        </li>
                    </ul>
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
