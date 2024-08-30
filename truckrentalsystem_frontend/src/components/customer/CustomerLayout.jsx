import React from 'react';
import { Outlet } from 'react-router-dom';
import CustomerSidebar from './CustomerSidebar.jsx';

const CustomerLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <CustomerSidebar />
            <div style={{
                marginLeft: '250px', // Adjust this value based on the sidebar width
                width: 'calc(100% - 250px)',
                padding: '20px'
            }}>
                <Outlet /> {/* This is where child routes will be rendered */}
            </div>
        </div>
    );
};

export default CustomerLayout;
