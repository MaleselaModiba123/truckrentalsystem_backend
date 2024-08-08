import React from 'react';
import { Outlet, Link } from 'react-router-dom';


function ManagerPortall() {
    return (

            <div className="manager-portal">
                <nav>
                    <ul>
                        <li><Link to="/manager/trucks">Trucks</Link></li>
                        <li><Link to="/manager/truck-types">Truck Types</Link></li>
                        <li><Link to="/manager/branchez">Branches</Link></li>
                        <li><Link to="/manager/employees">Employees</Link></li>
                        <li><Link to="/manager/insurances">Insurances</Link></li>
                    </ul>
                </nav>
            </div>
    );
}

export default ManagerPortall;
