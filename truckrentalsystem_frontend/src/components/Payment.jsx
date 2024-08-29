import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTruck, FaMapMarkerAlt, FaCalendarAlt, FaDollarSign } from 'react-icons/fa';

const PaymentPage = () => {
    const location = useLocation();
    const [rentData, setRentData] = useState(location.state?.rentData || {});
    const [paymentInfo, setPaymentInfo] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardHolderName: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPaymentInfo({ ...paymentInfo, [name]: value });
    };

    const handlePayment = () => {
        // Handle the payment submission logic here, such as calling an API to process the payment
        console.log('Processing payment with the following information:', paymentInfo);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Payment Information</h2>

            {Object.keys(rentData).length > 0 && (
                <div className="rental-details">
                    <h3>Rental Details</h3>
                    <div style={{ marginBottom: '10px' }}>
                        <FaTruck />
                        <p><strong>Model:</strong> {rentData.truck?.model || 'N/A'}</p>
                    </div>
                    {rentData.truck?.image && (
                        <div style={{ marginBottom: '10px' }}>
                            <img src={rentData.truck.image} alt="Truck" style={{ width: '100%', height: 'auto' }} />
                        </div>
                    )}
                    <div style={{ marginBottom: '10px' }}>
                        <FaMapMarkerAlt />
                        <p><strong>Pickup Location:</strong> {rentData.formData?.pickUp || 'N/A'}</p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <FaMapMarkerAlt />
                        <p><strong>Drop-off Location:</strong> {rentData.formData?.dropOff || 'N/A'}</p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <FaCalendarAlt />
                        <p><strong>Rental Date:</strong> {rentData.formData?.rentalDate || 'N/A'}</p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <FaCalendarAlt />
                        <p><strong>Return Date:</strong> {rentData.formData?.returnDate || 'N/A'}</p>
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                        <FaDollarSign />
                        <p><strong>Total Price:</strong> R{rentData.price || '0'}</p>
                    </div>
                </div>
            )}

            <div className="payment-form">
                <h3>Enter Your Payment Details</h3>
                <div style={{ marginBottom: '10px' }}>
                    <label>Card Number</label>
                    <input
                        type="text"
                        name="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Expiry Date</label>
                    <input
                        type="text"
                        name="expiryDate"
                        value={paymentInfo.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>CVV</label>
                    <input
                        type="text"
                        name="cvv"
                        value={paymentInfo.cvv}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Card Holder Name</label>
                    <input
                        type="text"
                        name="cardHolderName"
                        value={paymentInfo.cardHolderName}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
                    />
                </div>
                <button
                    type="button"
                    onClick={handlePayment}
                    style={{ backgroundColor: '#002e7a', color: '#fff', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}
                >
                    Complete Payment
                </button>
            </div>
        </div>
    );
};

export default PaymentPage;
