import React, { useState, useEffect } from 'react';
import { getAllBranches } from '../services/BranchService';


const Home = () => {
    const [branches, setBranches] = useState([]); // State to store branches data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const response = await getAllBranches();
                setBranches(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchBranches();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error loading branches: {error.message}</p>;
    }

    return (
        <div className="home">
            <div className="header-section1">
                <h1>UNBEATABLE TRUCK HIRE, EASY BOOKINGS</h1>
                <p>Rent a Truck Simply. No Stress Meet & Greet Truck Hire in South Africa</p>
            </div>
            <div className="form-section">
                <div className="form-item">
                    <label htmlFor="pickup-location">Pick-up Location:</label>
                    <select id="pickup-location">
                        <option value="">Select pick-up location</option>
                        {branches.map((branch) => (
                            <option key={branch.branchId} value={branch.branchId}>
                                {branch.branchName} - {branch.address}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="dropoff-location">Drop-off Location:</label>
                    <select id="dropoff-location">
                        <option value="">Select drop-off location</option>
                        {branches.map((branch) => (
                            <option key={branch.branchId} value={branch.branchId}>
                                {branch.branchName} - {branch.address}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-item">
                    <label htmlFor="pickup-date">Pick up Date & Time:</label>
                    <input type="datetime-local" id="pickup-date" />
                </div>
                <div className="form-item">
                    <label htmlFor="dropoff-date">Drop-off Date & Time:</label>
                    <input type="datetime-local" id="dropoff-date" />
                </div>
                <div className="form-item">
                    <label htmlFor="driver-age">Driver's Age:</label>
                    <input type="number" id="driver-age" placeholder="Enter driver's age" />
                </div>
            </div>
            <div className="button-section">
                <button className="get-quote-button">Get Quote</button>
            </div>
        </div>
    );
};

export default Home;
