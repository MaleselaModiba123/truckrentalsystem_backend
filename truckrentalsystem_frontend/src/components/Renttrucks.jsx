import React from 'react';
//import './Renttrucks.css';

const truckData = [
    {
        id: 1,
        image: '../public/smaller _truck.jpeg',
        model: 'Model A',
        type: 'Flatbed',
        payload: '5000 kg',
        dimension: '10x2x3 m',
        license: 'ABC123',
    },
    {
        id: 2,
        image: '../public/small_truck.jpeg',
        model: 'Model B',
        type: 'Refrigerated',
        payload: '3000 kg',
        dimension: '8x2.5x3 m',
        license: 'DEF456',
    },
    {
        id: 3,
        image: '../public/Medium_truck.jpeg',
        model: 'Model c',
        type: 'Refrigerated',
        payload: '3080 kg',
        dimension: '8x2.5x3 m',
        license: 'DEF456',
    },
    {
        id: 4,
        image: '../public/Logistics_truck copy.jpeg',
        model: 'Model d',
        type: 'Refrigerated',
        payload: '3081 kg',
        dimension: '8x2.5x3 m',
        license: 'DEF456',
    },
    {
        id: 5,
        image: '/public/large_Medium_truck.jpeg',
        model: 'Model e',
        type: 'Refrigerated',
        payload: '3082 kg',
        dimension: '8x2.5x3 m',
        license: 'DEF456',
    },
    {
        id: 6,
        image: '../public/Landing1.jpeg',
        model: 'Model f',
        type: 'Refrigerated',
        payload: '3083 kg',
        dimension: '8x2.5x3 m',
        license: 'DEF456',
    },
    {
        id: 7,
        image: '../public/Construction_truck.jpeg',
        model: 'Model g',
        type: 'Refrigerated',
        payload: '3084 kg',
        dimension: '8x2.5x3 m',
        license: 'DEF456',
    },
    {
        id: 8,
        image: '../public/code_10.jpeg',
        model: 'Model h',
        type: 'Refrigerated',
        payload: '3085 kg',
        dimension: '8x2.5x3 m',
        license: 'DEF456',
    }
    // Add more truck data as needed
];

const Renttrucks = () => {
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
                            <button className="get-quote-button">Get Quote</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Renttrucks;
