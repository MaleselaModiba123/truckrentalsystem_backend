import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTruckByVin, getTruckImageUrl } from '../services/TruckService';
import { getAllBranches } from '../services/BranchService';
import { createRentTruck } from '../services/RentTructService';

const GetQuote = () => {
    const { truckId } = useParams();
    const navigate = useNavigate();

    const [truck, setTruck] = useState({});
    const [truckImageUrl, setTruckImageUrl] = useState('');
    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({
        rentalDate: '',
        returnDate: '',
        pickUp: '',
        dropOff: '',
    });
    const [price, setPrice] = useState(null);
    const [rentalDuration, setRentalDuration] = useState(null);
    const [error, setError] = useState('');

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
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.pickUp || !formData.dropOff) {
            setError('Both pick-up and drop-off locations are required.');
            return;
        }

        if (!formData.rentalDate || !formData.returnDate) {
            setError('Both rental and return dates are required.');
            return;
        }

        const rentalDate = new Date(formData.rentalDate);
        const returnDate = new Date(formData.returnDate);

        if (returnDate <= rentalDate) {
            setError('Return date must be after the rental date.');
            return;
        }

        const calculatedDuration = Math.ceil((returnDate - rentalDate) / (1000 * 60 * 60 * 24));
        setRentalDuration(calculatedDuration);

        const calculatedPrice = calculatePrice(calculatedDuration, formData.pickUp, formData.dropOff, truck);
        setPrice(calculatedPrice);

        const selectedPickUp = branches.find((branch) => branch.branchName === formData.pickUp) || {};
        const selectedDropOff = branches.find((branch) => branch.branchName === formData.dropOff) || {};

        const updatedRentData = {
            rentDate: formData.rentalDate,
            returnDate: formData.returnDate,
            totalCost: calculatedPrice,
            isPaymentMade: false,
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
        const basePrice = truck.truckType.typeName === 'Flatbed' ? 100 : 500;
        const distanceFactor = pickupLocation !== dropoffLocation ? 1.5 : 1.0;
        return basePrice * duration * distanceFactor;
    };

    if (!truck) return <p>Loading...</p>;
    return (
        <div className="get-quote-container">
            <div className="get-quote-box">
                <div key={truck.id} className="truck-info">
                    <div>
                        {truckImageUrl && <img src={truckImageUrl} alt="Truck" />}
                        {truck.truckType ? (
                            <>
                                <p><strong>Model:</strong> {truck.model}</p>
                                <p><strong>Type:</strong> {truck.truckType.typeName}</p>
                                <p><strong>Capacity:</strong> {truck.truckType.capacity} tons</p>
                                <p><strong>Transmission:</strong> {truck.truckType.transmission}</p>
                                <p><strong>Fuel Consumption:</strong> {truck.truckType.fuelConsumption}</p>
                                <p><strong>Fuel Type:</strong> {truck.truckType.fuelType}</p>
                                <p><strong>Mileage:</strong> {truck.currentMileage} km</p>
                                <p><strong>Dimension:</strong> {truck.truckType.dimensions}</p>
                                <p><strong>License Plate:</strong> {truck.licensePlate}</p>
                            </>
                        ) : (
                            <p>Truck details are not available yet.</p>
                        )}
                    </div>
                </div>
                <div className="quote-form">
                    <h1>Truck Rental Form</h1>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <label>
                            Pickup Location:
                            <select name="pickUp" value={formData.pickUp} onChange={handleChange} required>
                                <option value="">Select Pick-up Location</option>
                                {branches.map(branch => (
                                    <option key={branch.branchId} value={branch.branchName}>
                                        {branch.branchName} - {branch.address}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Dropoff Location:
                            <select name="dropOff" value={formData.dropOff} onChange={handleChange} required>
                                <option value="">Select Drop-off Location</option>
                                {branches.map(branch => (
                                    <option key={branch.branchId} value={branch.branchName}>
                                        {branch.branchName} - {branch.address}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label htmlFor="rentalDate">
                            Rental Date:
                            <input type="date" name="rentalDate" value={formData.rentalDate} onChange={handleChange} required />
                        </label>
                        <label htmlFor="returnDate">
                            Return Date:
                            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
                        </label>
                        <button type="submit">Calculate Price</button>
                    </form>
                    {price !== null && (
                        <div className="get-quote-result">
                            <h2>Total Price: R{price}</h2>
                            {rentalDuration !== null && (
                                <p>Rental Duration: {rentalDuration} days</p>
                            )}
                            <button className="back-button" onClick={() => navigate('/sign-in')}>Sign-in</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default GetQuote;


