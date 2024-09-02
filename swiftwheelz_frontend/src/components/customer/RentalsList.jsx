import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../AuthContext.jsx";
import {getRentalsList} from "../../services/RentTructService.js";

const RentalsList = () => {
    const {auth} = useContext(AuthContext);
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadRentals = async () => {
            setLoading(true);
            setError('');

            try {
                if (auth && auth.customerID) {
                    const data = await getRentalsList(auth.customerID);
                    setRentals(data);
                } else {
                    setError('No customer ID found in context.');
                }
            } catch (error) {
                console.error('Error fetching rental history:', error);
                setError('Failed to load rental history.');
            } finally {
                setLoading(false);
            }
        };

        loadRentals();
    }, [auth]);

    return (
        <div>
            <h2>Rental History</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            {rentals.length === 0 && !loading && <p>No rentals found.</p>}
            <ul>
                {rentals.map((rental) => (
                    <li key={rental.rentId}>
                        <p><strong>Model:</strong> {rental.vin.model}</p>
                        <p><strong>Pickup Location:</strong> {rental.pickUp.branchName}</p>
                        <p><strong>Drop-off Location:</strong> {rental.dropOff.branchName}</p>
                        <p><strong>Rent Date:</strong> {new Date(rental.rentDate).toLocaleDateString()}</p>
                        <p><strong>Return Date:</strong> {new Date(rental.returnDate).toLocaleDateString()}</p>
                        <p><strong>Total Cost:</strong> R{rental.totalCost}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RentalsList;
