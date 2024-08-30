import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { rentData } = location.state || {};
    const [paymentAmount, setPaymentAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    if (!rentData) return <p>No rental data found.</p>;

    const handlePayment = () => {
        if (!paymentAmount) {
            setError('Please enter an amount.');
            return;
        }

        if (parseFloat(paymentAmount) < rentData.totalCost) {
            setError('Payment amount is less than the total cost.');
            return;
        }

        if (parseFloat(paymentAmount) > rentData.totalCost) {
            setError('Payment amount exceeds the total cost.');
            return;
        }

        // Store the payment information temporarily in localStorage
        localStorage.setItem('paymentInfo', JSON.stringify({
            ...rentData,
            paymentAmount: parseFloat(paymentAmount),
        }));

        setSuccess('Payment information stored. Redirecting to sign-in page...');
        setTimeout(() => {
            navigate('/sign-in');
        }, 2000); // Redirect after 2 seconds
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Payment Page</h1>
            <p><strong>Model:</strong> {rentData.vin.model}</p>
            <p><strong>Pickup Location:</strong> {rentData.pickUp.branchName}</p>
            <p><strong>Drop-off Location:</strong> {rentData.dropOff.branchName}</p>
            <p><strong>Rental Date:</strong> {rentData.rentDate}</p>
            <p><strong>Return Date:</strong> {rentData.returnDate}</p>
            <p><strong>Total Cost:</strong> R{rentData.totalCost}</p>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <label>
                Payment Amount:
                <input
                    type="number"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    style={{ padding: '10px', marginBottom: '10px' }}
                />
            </label>
            <button
                type="button"
                onClick={handlePayment}
                style={{
                    backgroundColor: '#002e7a',
                    color: '#fff',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                }}
            >
                Pay Now
            </button>
        </div>
    );
};

export default PaymentPage;
