import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Branches from './components/Branches';
import GetQuote from './components/GetQuote';
import CustomerProfile from './components/customer/CustomerProfile';
import CustomerComponent from './components/customer/CustomerComponent';
import HeaderComponent from './components/HeaderComponent';
import SignUpComponent from './components/customer/SignUpComponent';
import SignInComponent from './components/customer/SignInComponent';
import ConfirmDetails from './components/ConfirmDetails';
import Payment from './components/Payment';
import './App.css';
import ManagerPortal from './components/manager/ManagerPortal';
import Trucks from './components/manager/Trucks';
import Branchez from './components/manager/Branchez';
import Employees from './components/manager/Employees';
import TruckTypes from './components/manager/TruckTypes';
import ImagesComponent from './components/manager/ImagesComponent';
import InsuranceList from './components/manager/InsuranceList';
import PendingPayments from './components/customer/PendingPayments';
import CustomerLayout from './components/customer/CustomerLayout';
import ManagerContactUs from './components/manager/ManagerContactUs';

function App() {
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        function handleScroll() {
            const currentScrollPos = window.pageYOffset;
            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [prevScrollPos]);

    const handleSignOut = () => {
        // Implement sign-out logic here
    };

    return (
        <Router>
            <div className={`App ${!visible ? 'hidden' : ''}`}>
                <HeaderComponent />
                <div className="content-container">
                    <Routes>
                        <Route exact path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/branches" element={<Branches />} />

                        {/*---------MANAGER FUNCTIONALITY STARTS-----------*/}
                        <Route path="/manager-portal/dashboard/*" element={<ManagerPortal />}>
                            <Route index element={<Navigate to="trucks" />} />
                            <Route path="trucks" element={<Trucks />} />
                            <Route path="branchez" element={<Branchez />} />
                            <Route path="employees" element={<Employees />} />
                            <Route path="truck-types" element={<TruckTypes />} />
                            <Route path="images" element={<ImagesComponent />} />
                            <Route path="insurances" element={<InsuranceList />} />
                            <Route path="manage-contact-us" element={<ManagerContactUs />} />
                        </Route>
                        {/*---------MANAGER FUNCTIONALITY ENDS-----------*/}

                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/sign-in" element={<SignInComponent />} />
                        <Route path="/sign-up" element={<SignUpComponent />} />
                        <Route path="/update-customer/:customerID" element={<CustomerComponent />} />

                        {/* Customer Routes wrapped in layout */}
                        <Route path="/customer/*" element={<CustomerLayout />}>
                            <Route path="profile" element={<CustomerProfile />} />
                            <Route path="pending-payments" element={<PendingPayments />} />
                        </Route>

                        <Route path="/get-quote/:truckId" element={<GetQuote />} />
                        <Route path="/confirm-details" element={<ConfirmDetails />} />
                        <Route path="/payment" element={<Payment />} />
                    </Routes>
                </div>
                {/*<FooterComponent />*/}
            </div>
        </Router>
    );
}

export default App;
