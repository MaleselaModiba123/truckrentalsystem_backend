import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { getCustomerById } from '../services/CustomerProfileService';
import { FaCalendarAlt, FaClock, FaDollarSign, FaMapMarkerAlt, FaTruck } from 'react-icons/fa';

const ConfirmDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [customer, setCustomer] = useState(null);
    const [rentData, setRentData] = useState(location.state?.rentData || {});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Assume auth.customerID is available in the context or state
    const customerID = 1000; // Replace with actual customer ID from your authentication context

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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!customer) {
        return <div>No customer data available.</div>;
    }

    const {
        firstName = '',
        lastName = '',
        email = '',
        cellNo = '',
        address = ''
    } = customer;

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2>Confirm Your Details</h2>
            {Object.keys(rentData).length > 0 ? (
                <div className="get-quote-result">
                    <h2 style={{ color: '#037bfc' }}>Rental Details</h2>
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
                    <div style={{ marginBottom: '10px' }}>
                        <FaClock />
                        <p><strong>Rental Duration:</strong> {rentData.rentalDuration || '0'} days</p>
                        <Link
                            to="/get-quote"
                            state={{ rentData }}
                            style={{ color: '#037bfc', textDecoration: 'underline' }}
                        >
                            Change
                        </Link>
                    </div>
                </div>
            ) : (
                <p>No rental details available.</p>
            )}
            <div style={{ marginBottom: '10px' }}>
                <p><strong>Full Name:</strong> {`${firstName} ${lastName}`}</p>
                <p><strong>Email:</strong> {email}</p>
                <p><strong>Phone Number:</strong> {cellNo}</p>
                <p><strong>Address:</strong> {address}</p>
            </div>

            <button
                type="button"
                onClick={handleConfirm}
                style={{ backgroundColor: '#002e7a', color: '#fff', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}
            >
                Confirm and Proceed to Payment
            </button>
        </div>
    );
};

export default ConfirmDetails;
