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
/*
*         <div style={{ display: 'flex' }}>
            <CustomerSidebar />
            <div style={{
                marginLeft: '250px', // Adjust this value based on the sidebar width
                width: 'calc(100% - 250px)',
                padding: '20px'
            }}>
*
* */