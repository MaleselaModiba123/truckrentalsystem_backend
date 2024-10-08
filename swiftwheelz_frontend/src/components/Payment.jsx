import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';

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

        localStorage.setItem('paymentInfo', JSON.stringify({
            ...rentData,
            paymentAmount: parseFloat(paymentAmount),
        }));

        setSuccess('Payment information stored. Redirecting to sign-in page...');
        setTimeout(() => {
            navigate('/sign-in');
        }, 2000);
    };
    const handleBack = () => {
        navigate('/home');
    };
    return (
        <div className="payment-page-container">
            <h1 className="payment-heading">Payment Page</h1>

            {rentData.vin.image && (
                <div className="truck-image-container">
                    <img src={rentData.vin.image} alt="Truck" className="truck-image" />
                </div>
            )}

            <div className="rental-info">
                <p><strong>Model:</strong> {rentData.vin.model}</p>
                <p><strong>Pickup Location:</strong> {rentData.pickUp.branchName}</p>
                <p><strong>Drop-off Location:</strong> {rentData.dropOff.branchName}</p>
                <p><strong>Rental Date:</strong> {rentData.rentDate}</p>
                <p><strong>Return Date:</strong> {rentData.returnDate}</p>
                <p><strong>Total Cost:</strong> R{rentData.totalCost}</p>
            </div>

            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">{success}</p>}

            <div className="payment-form">
                <label className="payment-label">
                    Payment Amount:
                    <input
                        type="number"
                        min="1"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="payment-input"
                    />
                </label>
                <div style={{display: 'flex', gap: '10px'}}>
                    <button
                        type="button"
                        onClick={handlePayment}

                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#004080',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                        }}
                >
                    Pay Now
                </button>
                    <button
                        type="button"
                        onClick={handleBack}
                        style={{
                            padding: '10px 20px',
                            fontSize: '16px',
                            cursor: 'pointer',
                            backgroundColor: '#f44336', // Red color
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
