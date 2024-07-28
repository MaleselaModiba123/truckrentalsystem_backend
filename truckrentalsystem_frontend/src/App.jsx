import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Renttrucks from './components/Renttrucks';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Branches from './components/Branches';
import GetQuote from './components/GetQuote';
import CustomerProfile from './components/CustomerProfile.jsx';
import CustomerComponent from './components/CustomerComponent.jsx';
import CustomerSignUp from "./components/CustomerSignUp.jsx";
import FooterComponent from './components/FooterComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx';
import SignUpComponent from "./components/SignUpComponent.jsx";
import SignInComponent from "./components/SignInComponent.jsx";
import './App.css';

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
                        <Route path="/rent-trucks" element={<Renttrucks />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/branches" element={<Branches />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/sign-in" element={<SignInComponent />} />
                        <Route path="/sign-up" element={<SignUpComponent />} />
                        <Route path="/update-customer/:customerID" element={<CustomerComponent />} />
                        <Route path="/customer-sign-up" element={<CustomerSignUp />} />
                        <Route path="/customer-profile" element={<CustomerProfile />} />
                        <Route path="/get-quote/:truckId" element={<GetQuote />} />
                    </Routes>
                </div>
                {/*<FooterComponent />*/}
            </div>
        </Router>
    );
}

export default App;
