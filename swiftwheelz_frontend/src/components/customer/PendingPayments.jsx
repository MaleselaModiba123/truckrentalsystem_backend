import React, {useEffect, useState} from 'react';
import {createRentTruck} from "../../services/RentTruckService.js";


const PendingPayments = () => {
    const [pendingPayment, setPendingPayment] = useState(null);
    // const [customerRentalCount, setCustomerRentalCount] = useState(0);
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
        try {
            const customerID = localStorage.getItem('customerID'); // Retrieve customerID from localStorage
            if (!customerID) {
                console.error('No customer ID found.');
                return;
            }

            const rentTruckData = {
                rentDate: pendingPayment.rentDate,
                returnDate: pendingPayment.returnDate,
                totalCost: pendingPayment.totalCost,
                isPaymentMade: true, // Mark payment as completed
                customerID: parseInt(customerID, 10),
                vin: pendingPayment.vin.vin,
                pickUpBranchId: pendingPayment.pickUp.branchId,
                dropOffBranchId: pendingPayment.dropOff.branchId,
            };

            console.log('Sending payload:', rentTruckData); // Log payload for debugging

            // Create the RentTruck
            const response = await createRentTruck(rentTruckData);
            if (response.status === 200) {
                localStorage.removeItem('paymentInfo');
                localStorage.removeItem('customerID'); // Clear customerID from localStorage
                setPendingPayment(null);
                alert('Payment successfully finalized.');
            } else {
                alert('Failed to finalize payment.');
            }
        } catch (error) {
            console.error('Error finalizing payment:', error.response ? error.response.data : error.message);
            alert('Failed to finalize payment.');
        }
    };

    return (

        <div>
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    h1, h2 {
                        animation: fadeIn 1s ease-out;
                        color: #007bff;
                        font-size: 2.5rem;
                        font-weight: bold;
                    }
                `}
            </style>
            <h2>Pending Payment</h2>
            {!pendingPayment ? (
                <p>No pending payment.</p>
            ) : (
                <div>
                    <p><strong>Model:</strong> {pendingPayment.vin.model}</p>
                    <p><strong>Pickup Location:</strong> {pendingPayment.pickUp.branchName}</p>
                    <p><strong>Drop-off Location:</strong> {pendingPayment.dropOff.branchName}</p>
                    <p><strong>Total Cost:</strong> R{pendingPayment.totalCost}</p>
                    <p><strong>Payment Amount:</strong> R{pendingPayment.paymentAmount}</p>
                    <button onClick={handleFinalizePayment}>
                        Finalize Payment
                    </button>
                </div>
            )}
        </div>
    );
};

export default PendingPayments;
