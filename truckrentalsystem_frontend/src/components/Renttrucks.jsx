import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './Renttrucks.css';

export const truckData = [
    {
        id: 1,
        image: '/smaller_truck.jpeg',
        model: 'Model A',
        type: 'Flatbed',
        payload: '5000 kg',
        dimension: '10x2x3 m',
        license: 'ABC123',
    },
    {
        id: 2,
        image: '/small_truck.jpeg',
        model: 'Model B',
        type: 'Refrigerated',
        payload: '3000 kg',
        dimension: '8x2.5x3 m',
        license: 'DEF456',
    },
    {
        id: 3,
        image: '/Medium_truck.jpeg',
        model: 'Model C',
        type: 'Refrigerated',
        payload: '3080 kg',
        dimension: '8x2.5x3 m',
        license: 'GHI789',
    },
    {
        id: 4,
        image: '/Logistics_truck_copy.jpeg',
        model: 'Model D',
        type: 'Refrigerated',
        payload: '3081 kg',
        dimension: '8x2.5x3 m',
        license: 'JKL012',
    },
    {
        id: 5,
        image: '/large_Medium_truck.jpeg',
        model: 'Model E',
        type: 'Refrigerated',
        payload: '3082 kg',
        dimension: '8x2.5x3 m',
        license: 'MNO345',
    },
    {
        id: 6,
        image: '/Landing1.jpeg',
        model: 'Model F',
        type: 'Refrigerated',
        payload: '3083 kg',
        dimension: '8x2.5x3 m',
        license: 'PQR678',
    },
    {
        id: 7,
        image: '/Construction_truck.jpeg',
        model: 'Model G',
        type: 'Refrigerated',
        payload: '3084 kg',
        dimension: '8x2.5x3 m',
        license: 'STU901',
    },
    {
        id: 8,
        image: '/code_10.jpeg',
        model: 'Model H',
        type: 'Refrigerated',
        payload: '3085 kg',
        dimension: '8x2.5x3 m',
        license: 'VWX234',
    }
    // Add more truck data as needed
];

const Renttrucks = () => {
    const navigate = useNavigate(); // Updated from useHistory to useNavigate

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
                {truckData.map((truck) => (
                    <div key={truck.id} className="truck-item">
                        <img src={truck.image} alt={`Truck ${truck.model}`} />
                        <div className="truck-details">
                            <p><strong>Model:</strong> {truck.model}</p>
                            <p><strong>Type:</strong> {truck.type}</p>
                            <p><strong>Payload:</strong> {truck.payload}</p>
                            <p><strong>Dimension:</strong> {truck.dimension}</p>
                            <p><strong>License:</strong> {truck.license}</p>
                            <button className="get-quote-button" onClick={() => handleGetQuote(truck.id)}>Get Quote</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Renttrucks;
