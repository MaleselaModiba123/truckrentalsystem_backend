import React from 'react';
import {Outlet} from 'react-router-dom';
import CustomerSidebar from './CustomerSidebar.jsx';

const CustomerLayout = () => {
    return (
        <div style={{display: 'flex', height: '100vh'}}> {/* Full height view */}

            <div style={{
                flex: '0 0 250px',  /* Fixed width of 250px */
                backgroundColor: '#f8f9fa',  /* Light gray sidebar background */
                color: '#007bff',  /* Blue text */
                position: 'sticky',
                top: 0,
                height: '100vh'  /* Full height */
            }}>
                <CustomerSidebar/>
            </div>
            <div style={{flex: 1, padding: '20px'}}> {/* Content takes the remaining width */}
                <Outlet/> {/* This is where child routes will be rendered */}
            </div>
        </div>
    );
};

export default CustomerLayout;
