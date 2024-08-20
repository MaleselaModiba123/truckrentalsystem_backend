import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Branches from './Branches';
import { getTruckById } from '../services/TruckService';
import { getAllBranches } from '../services/BranchService';
import { createRentTruck } from '../services/RentTructService';
import { getEmployeeById } from '../services/EmployeesService';

const GetQuote = () => {
    const { truckId } = useParams();
    const [truck, setTruck] = useState({});
    const navigate = useNavigate();

    const [branches, setBranches] = useState([]);  // Store branches data here
    const [formData, setFormData] = useState({
        rentalDuration: 1,
        pickUp: '',
        dropOff: '',
        returnDate: '',
        firstName: '',
        lastName: '',
        email: '',
        license: '',
        cellNo: '',
    });
    const [employee, setEmployee] = useState({});
    const [price, setPrice] = useState(null);
    const [rentData, setRentData] = useState({
        rentId: 0,
        rentDate: new Date().toISOString().split('T')[0], // LocalDate.now() equivalent in JavaScript
        returnDate: new Date(),
        totalCost: price,
        isPaymentMade: false,
        vin: {},
        customerID: {
            customerID: 100,
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            license: '',
            cellNo: '',
            rentedTruck: []
        },
        salesAgent: {
            wages: 0.0,
            hours: 0,
            customerID: []
        },
        pickUp: {
            branchId: 0,
            branchName: '',
            address: '',
            rentTrucks: []
        },
        dropOff: {
            branchId: 0,
            branchName: '',
            address: '',
            rentTrucks: []
        }
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const truckResponse = await getTruckById(truckId);
                if (truckResponse && truckResponse.data) {
                    setTruck(truckResponse.data);
                } else {
                    console.error('Unexpected response format:', truckResponse);
                }

                const branchesResponse = await getAllBranches();
                if (branchesResponse && branchesResponse.data) {
                    setBranches(branchesResponse.data);
                } else {
                    console.error('Unexpected response format:', branchesResponse);
                }

                const employeeResponse = await getEmployeeById(1005);
                if (employeeResponse && employeeResponse.data) {
                    setEmployee(employeeResponse.data);
                } else {
                    console.error('Unexpected response format:', employeeResponse);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [truckId]);


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
        const calculatedPrice = calculatePrice(formData.rentalDuration, formData.pickupLocation, formData.dropoffLocation, truck);
        setPrice(calculatedPrice);
        rentData.totalCost = calculatedPrice;
        rentData.customerID.cellNo = formData.cellNo;
        rentData.customerID.email = formData.email;
        rentData.customerID.firstName = formData.firstName;
        rentData.customerID.lastName = formData.lastName;
        rentData.customerID.license = formData.license;
        rentData.customerID.rentedTruck = rentData.customerID.rentedTruck.push(truck);
        rentData.pickUp = branches.find((branch) => branch.branchName === formData.pickUp)
        rentData.dropOff = branches.find((branch) => branch.branchName === formData.dropOff)
        rentData.salesAgent.hours = employee.hours
        rentData.salesAgent.wages = employee.wages
        rentData.salesAgent.customerID.push(rentData.customerID);
        rentData.vin = truck;
        rentData.returnDate = formData.returnDate
        try{
            createRentTruck(rentData);
        } catch (error) {
            console.error(error);
        }
    };

    const calculatePrice = (duration, pickupLocation, dropoffLocation, truck) => {
        if (!truck) return 0;
        const basePrice = truck.typeName === 'Flatbed' ? 100 : 500;  // Example base pricing logic
        const distanceFactor = pickupLocation !== dropoffLocation ? 1.5 : 1.0;  // Example factor for different locations
        console.info(`The rental duration is: ${duration}`);
        return basePrice * duration * distanceFactor;
    };

    return (
        <div className="get-quote-container">
            <div className="get-quote-box">
                {/* <Branches setBranchesData={branches} />  Fetch branches data */}
                <div key={truck.id} className="truck-info">
                <div>
                    <p><strong>Model:</strong> {truck.model}</p>
                    {truck.truckType ? (
                        <>
                            <p><strong>Type:</strong> {truck.truckType.typeName}</p>
                            <p><strong>Transmission:</strong> {truck.truckType.transmission}</p>
                            <p><strong>Fuel Consumption:</strong> {truck.truckType.fuelConsumption}</p>
                            <p><strong>Fuel Type:</strong> {truck.truckType.fuelType}</p>
                            <p><strong>Dimension:</strong> {truck.truckType.dimensions}</p>
                        </>
                    ) : (
                        <p>Truck details are not available yet.</p>
                    )}
                    <p><strong>License:</strong> {truck.licensePlate}</p>
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
                        <label htmlFor="returnDate">
                            Return Date:
                            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} id="returnDate" />
                        </label>

                        <label htmlFor="firstName">
                            First Name:
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} id="firstName" />
                        </label>

                        <label htmlFor="lastName">
                            Last Name:
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} id="lastName" />
                        </label>

                        <label htmlFor="email">
                            Email:
                            <input type="text" name="email" value={formData.email} onChange={handleChange} id="email" />
                        </label>

                        <label htmlFor="license">
                            License:
                            <input type="text" name="license" value={formData.license} onChange={handleChange} id="license" />
                        </label>

                        <label htmlFor="cellNo">
                            Cellphone:
                            <input type="text" name="cellNo" value={formData.cellNo} onChange={handleChange} id="cellNo" />
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
