import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { truckData } from './Renttrucks';
import Branches from './Branches';

const GetQuote = () => {
    const { truckId } = useParams();
    const navigate = useNavigate();
    const selectedTruck = truckData.find(truck => truck.id === parseInt(truckId));

    const [branchesData, setBranchesData] = useState([]);  // Store branches data here
    const [formData, setFormData] = useState({
        rentalDuration: 1,
        pickupLocation: '',
        dropoffLocation: ''
    });
    const [price, setPrice] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "rentalDuration") {
            // Ensure rental duration is at least 1
            const duration = Math.max(1, parseInt(value, 10));
            setFormData({
                ...formData,
                rentalDuration: duration,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedPrice = calculatePrice(formData.rentalDuration, formData.pickupLocation, formData.dropoffLocation, selectedTruck);
        setPrice(calculatedPrice);
    };

    const calculatePrice = (duration, pickupLocation, dropoffLocation, truck) => {
        if (!truck) return 0;
        const basePrice = truck.type === 'Flatbed' ? 100 : 500;  // Example base pricing logic
        const distanceFactor = pickupLocation !== dropoffLocation ? 1.5 : 1.0;  // Example factor for different locations
        return basePrice * duration * distanceFactor;
    };

    return (
        <div className="get-quote-container">
            <div className="get-quote-box">
                <Branches setBranchesData={setBranchesData} />  {/* Fetch branches data */}
                <div className="truck-info">
                    {selectedTruck && (
                        <div>
                            <img src={selectedTruck.image} alt={`Truck ${selectedTruck.model}`} className="truck-image" />
                            <h2>{selectedTruck.model}</h2>
                            <p><strong>Type:</strong> {selectedTruck.type}</p>
                            <p><strong>Payload:</strong> {selectedTruck.payload}</p>
                            <p><strong>Dimension:</strong> {selectedTruck.dimension}</p>
                            <p><strong>License:</strong> {selectedTruck.license}</p>
                        </div>
                    )}
                </div>
                <div className="quote-form">
                    <h1>Truck Rental Form</h1>
                    <form onSubmit={handleSubmit}>
                        <label>
                            Rental Duration (days):
                            <input type="number" name="rentalDuration" value={formData.rentalDuration} onChange={handleChange} min="1"/>
                        </label>
                        <label>
                            Pickup Location:
                            <select name="pickupLocation" value={formData.pickupLocation} onChange={handleChange}>
                                <option value="">Select Pick-up Location</option>
                                {branchesData.map(branch => (
                                    <option key={branch.branchId} value={branch.branchName}>
                                        {branch.branchName}- {branch.address}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Dropoff Location:
                            <select name="dropoffLocation" value={formData.dropoffLocation} onChange={handleChange}>
                                <option value="">Select Drop-off Location</option>
                                {branchesData.map(branch => (
                                    <option key={branch.branchId} value={branch.branchName}>
                                        {branch.branchName}- {branch.address}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <button type="submit">Calculate Price</button>
                    </form>
                    {price !== null && (
                        <div className="get-quote-result">
                            <h2>Total Price: R{price}</h2>
                            <button className="back-button" onClick={() => navigate('/rent-trucks')}>Back to Rent Trucks</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetQuote;
