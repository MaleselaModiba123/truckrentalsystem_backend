import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import Renttrucks from './components/Renttrucks';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Profile from './components/Profile';
import Branches from './components/Branches';
import CustomerProfile from './components/CustomerProfile.jsx';
import CustomerComponent from './components/CustomerComponent.jsx';
import CustomerSignUp from "./components/CustomerSignUp.jsx";
import FooterComponent from './components/FooterComponent.jsx';
import HeaderComponent from './components/HeaderComponent.jsx';
import logo from '/public/logo.jpeg'; // Update the path to your logo image
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
                <nav className={`navbar ${!visible ? 'hidden' : ''}`}>
                    <img src={logo} alt="logo" className="logo" />
                    <div className="nav-buttons">
                        <Link to="/" className="nav-button">Home</Link>
                        <Link to="/rent-trucks" className="nav-button">Rent Trucks</Link>
                        <Branches /> {/* Render Branches dropdown */}
                        <Link to="/about-us" className="nav-button">About Us</Link>
                        <Link to="/contact-us" className="nav-button">Contact Us</Link>
                        <Link to="/profile" className="nav-button">Profile</Link>
                    </div>
                </nav>
                <div className="content-container">
                    <Routes>

                        <Route exact path="/" element={<Home />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/rent-trucks" element={<Renttrucks />} />
                        <Route path="/about-us" element={<AboutUs />} />
                        <Route path="/contact-us" element={<ContactUs />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/update-customer/:customerID" element={<CustomerComponent />} />
                        <Route path="/Sign Up" element={<CustomerSignUp />} />
                        <Route path="/customer-profile" element={<CustomerProfile />} />
                    </Routes>
                </div>
                <FooterComponent />
            </div>
        </Router>
    );
}

export default App;
