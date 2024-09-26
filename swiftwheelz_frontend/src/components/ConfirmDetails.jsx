import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getCustomerById } from '../services/CustomerService.js';
import { FaCalendarAlt, FaClock, FaDollarSign, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';

const ConfirmDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [customer, setCustomer] = useState(null);
    const [rentData, setUpdatedRentData] = useState(location.state?.rentData || {});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const customerID = 1000;

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const response = await getCustomerById(customerID);
                setCustomer(response.data);
            } catch (error) {
                console.error("Error fetching customer data:", error);
                setError("Failed to load customer data");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [customerID]);

    const handleConfirm = () => {
        navigate('/payment', { state: { rentData, personalDetails: customer } });
    };

    const handleGetQuote = () => {
        navigate('/get-quote', { state: { rentData } });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!customer) return <div>No customer data available.</div>;

    const { firstName = '', lastName = '', email = '', cellNo = '', address = '' } = customer;

    return (
        <div className="confirm-details-container">
            <h2 className="confirm-heading">Confirm Your Details</h2>
            {Object.keys(rentData).length > 0 ? (
                <div className="get-quote-result">
                    <h2 className="rental-heading">Rental Details</h2>
                    <div className="detail-item">
                        <FaTruck />
                        <p><strong>Model:</strong> {rentData.truck?.model || 'N/A'}</p>
                    </div>
                    {rentData.truck?.image && (
                        <div className="detail-item">
                            <img src={rentData.truck.image} alt="Truck" className="truck-image" />
                        </div>
                    )}
                    <div className="detail-item">
                        <FaMapMarkerAlt />
                        <p><strong>Pickup Location:</strong> {rentData.formData?.pickUp || 'N/A'}</p>
                    </div>
                    <div className="detail-item">
                        <FaMapMarkerAlt />
                        <p><strong>Drop-off Location:</strong> {rentData.formData?.dropOff || 'N/A'}</p>
                    </div>
                    <div className="detail-item">
                        <FaCalendarAlt />
                        <p><strong>Rental Date:</strong> {rentData.formData?.rentalDate || 'N/A'}</p>
                    </div>
                    <div className="detail-item">
                        <FaCalendarAlt />
                        <p><strong>Return Date:</strong> {rentData.formData?.returnDate || 'N/A'}</p>
                    </div>
                    <div className="detail-item">
                        <FaDollarSign />
                        <p><strong>Total Price:</strong> R{rentData.price || '0'}</p>
                    </div>
                    <div className="detail-item">
                        <FaClock />
                        <p><strong>Rental Duration:</strong> {rentData.rentalDuration || '0'} days</p>
                        <Link to="#" onClick={handleGetQuote} className="change-link">Change</Link>
                    </div>
                </div>
            ) : (
                <p>No rental details available.</p>
            )}
            <div className="customer-details">
                <p><strong>Full Name:</strong> {`${firstName} ${lastName}`}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone Number:</strong> {cellNo}</p>
                <p><strong>Address:</strong> {address}</p>
            </div>
            <button
                type="button"
                onClick={handleConfirm}
                className="confirm-button"
            >
                Confirm and Proceed to Payment
            </button>
        </div>
    );
};

export default ConfirmDetails;
