import React, {useContext, useEffect, useState} from 'react';
import {createRentTruck, getRentalsByCustomerId} from "../../services/RentTruckService.js";
import {AuthContext} from '../AuthContext.jsx';
import {getCustomerByEmail} from "../../services/CustomerService.js";

const PendingPayments = () => {
    const { auth } = useContext(AuthContext);
    const [pendingPayment, setPendingPayment] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
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

        setLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            if (auth?.email) {
                const customerResponse = await getCustomerByEmail(auth.email);
                console.log("Signed in customer email:",auth.email)
                const customerID = customerResponse.customerID;
                if (!customerID) {
                    setError('No customer ID found.');
                    return;
                }
                // Check for unreturned rentals
                const rentalsResponse = await getRentalsByCustomerId(customerID, token);
                const unreturnedRentals = rentalsResponse.data.filter(rental => !rental.isReturned);
                const activeRentals = unreturnedRentals.filter(rental => rental.status === 'ACTIVE');
                if (activeRentals.length > 0) {
                    setError('You have unreturned rental with ACTIVE status. Please return the truck before renting again.');
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
                    setSuccessMessage('Payment successfully finalized.');

                    setTimeout(() => {
                        setSuccessMessage('');
                    }, 3000);
                } else {
                    setError('Failed to finalize payment.');
                }
            }
        } catch (error) {
            console.error('Error finalizing payment:', error.response ? error.response.data : error.message);
            setError('Failed to finalize payment.');
        } finally {
            setLoading(false);
        }
    };
    const handleConfirmFinalizePayment = () => {
        setShowConfirm(false); // Close confirmation dialog
        handleFinalizePayment(); // Proceed with finalizing payment
    };

    const handleCancelFinalizePayment = () => {
        setShowConfirm(false); // Close confirmation dialog
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
                        color: #007bff; /* Blue color */
                        font-size: 2.5rem; /* Font size */
                        font-weight: bold; /* Font weight */
                    }
                `}
            </style>
            <h2>Pending Payment</h2>
            {error && <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
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
                    <button onClick={() => setShowConfirm(true)} disabled={loading}>
                        Finalize Payment
                    </button>
                </div>
            )}

            {/* Bootstrap Modal for Confirmation */}
            <div className={`modal ${showConfirm ? 'show' : ''}`} style={{display: showConfirm ? 'block' : 'none'}}
                 tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Payment</h5>

                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to finalize the payment?</p>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-danger" onClick={handleCancelFinalizePayment}>No</button>
                            <button className="btn btn-success" onClick={handleConfirmFinalizePayment}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingPayments;
