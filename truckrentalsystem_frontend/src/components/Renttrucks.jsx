import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {getAllTrucks} from "../services/TruckService.js";

const Renttrucks = () => {
    const [trucks, setTrucks] = useState([]);
    const navigate = useNavigate(); // Updated from useHistory to useNavigate


    useEffect(() => {
        // Fetch trucks data from the backend
        getAllTrucks()
            .then(response => {
                setTrucks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the trucks!', error);
            });
    }, []);


    const handleGetQuote = (truckId) => {
        navigate(`/get-quote/${truckId}`);
    };

    return (
        <div className="rent-trucks">
            <div className="header-section">
                <div className="header-content">
                    <h1>Our Trucks</h1>
                    <p>Discover amazing trucks at affordable rates</p>
                </div>
            </div>
            <div className="intro-section">
                <h2>Our trucks for hire across South Africa</h2>
                <p>
                    Rental Trucks provide an extensive range of quality trucks for hire across South Africa. Browse our selection of truck rentals.
                </p>
            </div>
            <div className="truck-grid">
                {trucks.map((truck) => (
                    <div key={truck.vin} className="truck-item">
                        <img src={truck.image} alt={`Truck ${truck.model}`} />
                        <div className="truck-details">
                            <p><strong>Model:</strong> {truck.model}</p>
                            <p><strong>Type:</strong> {truck.type}</p>
                            <p><strong>Payload:</strong> {truck.payload}</p>
                            <p><strong>Dimension:</strong> {truck.dimension}</p>
                            <p><strong>License:</strong> {truck.license}</p>
                            <button className="get-quote-button" onClick={() => handleGetQuote(truck.vin)}>Get Quote</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Renttrucks;
