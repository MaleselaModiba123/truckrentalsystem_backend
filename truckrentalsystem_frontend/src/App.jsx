import { useState } from 'react'
import './App.css'
import FooterComponent from "./components/FooterComponent.jsx";
import CustomerComponent from "./components/CustomerComponent.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent.jsx";
import CustomerProfile from "./components/CustomerProfile.jsx";
import CustomerSignUp from "./components/CustomerSignUp.jsx";

function App() {
    return (
        <div className="app-container">
            <BrowserRouter>
                <HeaderComponent />
                <div className="content-container">
                    <Routes>
                        <Route path="/" element={<CustomerProfile />} />
                        <Route
                            path="/update-customer/:customerID"
                            element={<CustomerComponent />}
                        />

                        <Route path="/" element={<CustomerSignUp />} />
                        <Route
                             path="/Sign Up"
                             element={<CustomerSignUp />}
                        />

                    </Routes>
                </div>
                <FooterComponent />
            </BrowserRouter>
        </div>
    );
}

export default App
