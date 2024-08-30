import React, {useEffect, useState} from 'react';
import axios from 'axios';

const PendingPayments = () => {
    const [pendingPayment, setPendingPayment] = useState(null);

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
            const response = await axios.post('http://localhost:8080/truckrentalsystem/rentTruck/create', {
                rentDate: pendingPayment.rentDate,
                returnDate: pendingPayment.returnDate,
                totalCost: pendingPayment.totalCost,
                isPaymentMade: true,
                customerID: pendingPayment.customerID,
                vin: pendingPayment.vin,
                pickUp: pendingPayment.pickUp,
                dropOff: pendingPayment.dropOff,
                paymentAmount: pendingPayment.paymentAmount
            });

            localStorage.removeItem('paymentInfo');
            setPendingPayment(null);
            alert('Payment successfully finalized.');
        } catch (error) {
            console.error('Error finalizing payment:', error);
            alert('Failed to finalize payment.');
        }
    };

    return (
        <div>
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
