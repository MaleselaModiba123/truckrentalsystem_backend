import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getTruckByVin, getTruckImageUrl} from '../services/TruckService';
import {getAllBranches} from '../services/BranchService';
import {createRentTruck} from '../services/RentTructService';

const GetQuote = () => {
    const { truckId } = useParams();
    const navigate = useNavigate();

    const [truck, setTruck] = useState({});
    const [truckImageUrl, setTruckImageUrl] = useState('');
    const [branches, setBranches] = useState([]);  // Store branches data here
    const [formData, setFormData] = useState({
        rentalDuration: 1,
        pickUp: '',
        dropOff: '',
        rentalDate: '',
        returnDate: '',
    });
    const [price, setPrice] = useState(null);
    const [rentData, setRentData] = useState({
        rentId: 0,
        rentDate: new Date().toISOString().split('T')[0], // LocalDate.now() equivalent in JavaScript
        returnDate: new Date(),
        totalCost: price,
        isPaymentMade: false,
        vin: null,
        pickUp: {},
        dropOff: {},
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [truckResponse, branchesResponse] = await Promise.all([
                    getTruckByVin(truckId),
                    getAllBranches(),
                ]);

                if (truckResponse.data) {
                    setTruck(truckResponse.data);
                    setTruckImageUrl(getTruckImageUrl(truckId));
                } else {
                    console.error('Truck data not found.');
                }

                if (branchesResponse.data) {
                    setBranches(branchesResponse.data);
                } else {
                    console.error('Branches data not found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [truckId]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'rentalDuration' ? Math.max(1, parseInt(value, 10)) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const calculatedPrice = calculatePrice(formData.rentalDuration, formData.pickUp, formData.dropOff, truck);
        setPrice(calculatedPrice);

        const selectedPickUp = branches.find((branch) => branch.branchName === formData.pickUp) || {};
        const selectedDropOff = branches.find((branch) => branch.branchName === formData.dropOff) || {};

        const updatedRentData = {
            ...rentData,
            totalCost: calculatedPrice,
            returnDate: formData.returnDate,
            vin: truck,
            pickUp: selectedPickUp,
            dropOff: selectedDropOff,
        };

        try {
            await createRentTruck(updatedRentData);
        } catch (error) {
            console.error('Error creating rental:', error);
        }
    };

    const calculatePrice = (duration, pickupLocation, dropoffLocation, truck) => {
        if (!truck) return 0;
        const basePrice = truck.typeName === 'Flatbed' ? 100 : 500;
        const distanceFactor = pickupLocation !== dropoffLocation ? 1.5 : 1.0;
        return basePrice * duration * distanceFactor;
    };

    if (!truck) return <p>Loading...</p>;
    return (
        <div className="get-quote-container">
            <div className="get-quote-box">
                <div key={truck.id} className="truck-info">
                    <div>
                        {truckImageUrl && <img src={truckImageUrl} alt="Truck"/>}
                        {truck.truckType ? (
                            <>
                                <p><strong>Model:</strong> {truck.model}</p>
                                <p><strong>Type:</strong> {truck.truckType.typeName}</p>
                                <strong>Capacity:</strong> {truck.truckType.capacity} tons <br/>
                                <p><strong>Transmission:</strong> {truck.truckType.transmission}</p>
                                <p><strong>Fuel Consumption:</strong> {truck.truckType.fuelConsumption}</p>
                                <p><strong>Fuel Type:</strong> {truck.truckType.fuelType}</p>
                                <strong>Mileage:</strong> {truck.currentMileage} km <br/>
                                <p><strong>Dimension:</strong> {truck.truckType.dimensions}</p>
                                <strong>License Plate:</strong> {truck.licensePlate}
                            </>
                        ) : (
                            <p>Truck details are not available yet.</p>
                        )}
                    </div>
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
                            <select name="pickUp" value={formData.pickupLocation} onChange={handleChange}>
                                <option value="">Select Pick-up Location</option>
                                {branches.map(branch => (
                                    <option key={branch.branchId} value={branch.branchName}>
                                        {branch.branchName}- {branch.address}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Dropoff Location:
                            <select name="dropOff" value={formData.dropoffLocation} onChange={handleChange}>
                                <option value="">Select Drop-off Location</option>
                                {branches.map(branch => (
                                    <option key={branch.branchId} value={branch.branchName}>
                                        {branch.branchName}- {branch.address}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label htmlFor="rentalDate">
                            Rental Date:
                            <input type="date" name="rentalDate" value={formData.rentalDate} onChange={handleChange} id="rentalDate" />
                        </label>

                        <label htmlFor="returnDate">
                            Return Date:
                            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} id="returnDate" />
                        </label>
                        <button type="submit">Calculate Price</button>
                    </form>
                    {price !== null && (
                        <div className="get-quote-result">
                            <h2>Total Price: R{price}</h2>
                            <button className="back-button" onClick={() => navigate('/sign-in')}>Sign-in</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetQuote;
