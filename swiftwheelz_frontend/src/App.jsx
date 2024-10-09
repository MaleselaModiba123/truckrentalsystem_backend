import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes,useNavigate } from 'react-router-dom';
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
import AdminPortal from './components/admin/AdminPortal';
import Trucks from './components/admin/Trucks';
import Branchez from './components/admin/Branchez';
import Employees from './components/admin/Employees';
import TruckTypes from './components/admin/TruckTypes';
import ImagesComponent from './components/admin/ImagesComponent';
import InsuranceList from './components/admin/InsuranceList';
import PendingPayments from './components/customer/PendingPayments';
import CustomerLayout from './components/customer/CustomerLayout';
import AdminContactUs from './components/admin/AdminContactUs';
import RentalsList from './components/customer/RentalsList.jsx';
import RentedTrucksList from "./components/admin/RentedTrucksList.jsx";
import HelpDeskDashboard from "./components/helpdesk/HelpDeskDashboard.jsx";
import Complaints from "./components/helpdesk/Complaints.jsx";
import ReportAccident from "./components/customer/ReportAccident.jsx";
import AdminAccidentReports from "./components/admin/AdminAccidentReports.jsx";
import RentalHistory from './components/customer/RentalHistory.jsx';
import CustomerComplaint from './components/customer/CustomerComplaint.jsx';

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

                        {/*---------ADMIN FUNCTIONALITY STARTS-----------*/}
                        <Route path="/admin-portal/dashboard/*" element={<AdminPortal />}>
                            <Route index element={<Navigate to="trucks" />} />
                            <Route path="trucks" element={<Trucks />} />
                            <Route path="branchez" element={<Branchez />} />
                            <Route path="employees" element={<Employees />} />
                            <Route path="truck-types" element={<TruckTypes />} />
                            <Route path="images" element={<ImagesComponent />} />
                            <Route path="insurances" element={<InsuranceList />} />
                            <Route path="manage-contact-us" element={<AdminContactUs />} />
                            <Route path="rented-trucks" element={<RentedTrucksList />} />
                            <Route path="admin-reports" element={<AdminAccidentReports />} />
                        </Route>
                        {/*---------ADMIN FUNCTIONALITY ENDS-----------*/}

                        {/*---------HELPDESK FUNCTIONALITY STARTS-----------*/}
                            < Route path="/help-desk/dashboard/*" element={< HelpDeskDashboard />}>
                             <Route index element={<Navigate to="complaints" />} />
                             <Route path="complaints" element={<Complaints />} />
                             {/*<Route path="customerAccidentReports" element={<CustomerAccidentReports />} />*/}
                             {/*<Route path="discounts" element={<Discounts />} />*/}
                             </Route>
                         {/*---------HELPDESK FUNCTIONALITY ENDS-----------*/}

                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/sign-in" element={<SignInComponent />} />
                        <Route path="/sign-up" element={<SignUpComponent />} />
                        <Route path="/update-customer/:customerID" element={<CustomerComponent />} />

                        {/* Customer Routes wrapped in layout */}
                        <Route path="/customer/*" element={<CustomerLayout />}>
                            <Route path="profile" element={<CustomerProfile />} />
                            <Route path="pending-payments" element={<PendingPayments />} />
                            <Route path="report-accident" element={<ReportAccident />} />
                            <Route path="history" element={<RentalHistory/>}/>
                            <Route path="complaint"element={<CustomerComplaint/>}/>
                            <Route path="rentals" element={<RentalsList/>}/>
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
