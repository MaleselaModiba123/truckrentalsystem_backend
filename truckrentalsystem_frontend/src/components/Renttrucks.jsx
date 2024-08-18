import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { getAllTrucks } from '../services/TruckService';
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
    const [trucks, setTrucks] = useState([]);

    useEffect(() => {
        fetchTrucks();
    }, []);

    const handleGetQuote = (truckId) => {
        navigate(`/get-quote/${truckId}`);
    };

    const fetchTrucks = async () => {
        const response = await getAllTrucks();
        setTrucks(response.data);
    };

    function byteArrayToBase64(byteArray) {
        return btoa(String.fromCharCode.apply(null, byteArray));
    }

    function setImage (imageBytesString) {
        let utf8Encode = new TextEncoder();
        let imageBytes = utf8Encode.encode(imageBytesString);
        return "data:image/jpg;base64," + byteArrayToBase64(imageBytes);
    }


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
            <div key={1} className="truck-grid">
                {trucks.map((truck) => (
                    <div key={truck.id} className="truck-item">
                        <img src={setImage(truck.photo)} id="truckImage" alt={`Truck ${truck.model}`} />
                        <div className="truck-details">
                            <p><strong>Model:</strong> {truck.model}</p>
                            <p><strong>Type:</strong> {truck.truckType.typeName}</p>
                            <p><strong>Transmission:</strong> {truck.truckType.transmission}</p>
                            <p><strong>Fuel Consuption:</strong> {truck.truckType.fuelConsumption}</p>
                            <p><strong>Fuel Type:</strong> {truck.truckType.fuelType}</p>
                            <p><strong>Dimension:</strong> {truck.truckType.dimensions}</p>
                            <p><strong>License:</strong> {truck.licensePlate}</p>
                            <button className="get-quote-button" onClick={() => handleGetQuote(truck.vin)}>Get Quote</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Renttrucks;
