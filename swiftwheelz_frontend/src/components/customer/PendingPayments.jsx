import React, { useEffect, useState, useContext } from 'react';
import { createRentTruck} from "../../services/RentTruckService.js";
import { AuthContext } from '../AuthContext.jsx';
import {getCustomerByEmail} from "../../services/CustomerService.js";

const PendingPayments = () => {
    const { auth } = useContext(AuthContext);
    const [pendingPayment, setPendingPayment] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const storedPayment = localStorage.getItem('paymentInfo');
        if (storedPayment) {
            try {
                const payment = JSON.parse(storedPayment);
                setPendingPayment(payment);
            } catch (error) {
                console.error('Error parsing payment from local storage:', error);
            }
        }
    }, []);

    const handleFinalizePayment = async () => {
        if (!pendingPayment) {
            console.error('No payment information available.');
            return;
        }

        const token = auth?.token;
        if (!token) {
            setError('You must be signed in to finalize the payment.');
            return;
        }

        setLoading(true); // Set loading state

        try {
            if (auth?.email) {
                const customerResponse = await getCustomerByEmail(auth.email);
                console.log("Signed in customer email:",auth.email)
                const customerID = customerResponse.customerID; // Adjust based on your response structure
                if (!customerID) {
                    setError('No customer ID found.');
                    return;
                }

                const rentTruckData = {
                    rentDate: pendingPayment.rentDate,
                    returnDate: pendingPayment.returnDate,
                    totalCost: pendingPayment.totalCost,
                    isPaymentMade: true,
                    customerID: parseInt(customerID, 10),
                    vin: pendingPayment.vin.vin,
                    pickUpBranchId: pendingPayment.pickUp.branchId,
                    dropOffBranchId: pendingPayment.dropOff.branchId,
                };

                console.log('Sending payload:', rentTruckData);

                const response = await createRentTruck(rentTruckData, token);
                if (response.status === 200) {
                    localStorage.removeItem('paymentInfo');
                    setPendingPayment(null);
                    alert('Payment successfully finalized.');
                } else {
                    setError('Failed to finalize payment.');
                }
            }
        } catch (error) {
            console.error('Error finalizing payment:', error.response ? error.response.data : error.message);
            setError('Failed to finalize payment.');
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div>
            <h2>Pending Payment</h2>
            {error && <p className="text-danger">{error}</p>}
            {loading && <p>Loading...</p>}
            {!pendingPayment ? (
                <p>No pending payment.</p>
            ) : (
                <div>
                    <p><strong>Model:</strong> {pendingPayment.vin.model}</p>
                    <p><strong>Pickup Location:</strong> {pendingPayment.pickUp.branchName}</p>
                    <p><strong>Drop-off Location:</strong> {pendingPayment.dropOff.branchName}</p>
                    <p><strong>Total Cost:</strong> R{pendingPayment.totalCost}</p>
                    <p><strong>Payment Amount:</strong> R{pendingPayment.paymentAmount}</p>
                    <button onClick={handleFinalizePayment} disabled={loading}>
                        Finalize Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default PendingPayments;
