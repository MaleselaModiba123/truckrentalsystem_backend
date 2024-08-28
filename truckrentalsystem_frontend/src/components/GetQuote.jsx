import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {getTruckByVin, getTruckImageUrl} from '../services/TruckService';
import {getAllBranches} from '../services/BranchService';
import {createRentTruck} from '../services/RentTructService';
import {
    FaCalendarAlt,
    FaClock,
    FaCogs,
    FaDollarSign,
    FaGasPump,
    FaMapMarkerAlt,
    FaOilCan,
    FaTachometerAlt,
    FaTruck,
    FaWeight
} from 'react-icons/fa';

const GetQuote = () => {
    const { truckId } = useParams();
    const navigate = useNavigate();

    const [truck, setTruck] = useState({});
    const [truckImageUrl, setTruckImageUrl] = useState('');
    const [branches, setBranches] = useState([]);
    const [formData, setFormData] = useState({
        rentalDate: '',
        returnDate: '',
        pickUp: '',
        dropOff: '',
    });
    const [price, setPrice] = useState(null);
    const [rentalDuration, setRentalDuration] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [truckResponse, branchesResponse] = await Promise.all([
                    getTruckByVin(truckId),
                    getAllBranches(),
                ]);

                if (truckResponse.data) {
                    setTruck(truckResponse.data);
                    setTruckImageUrl(getTruckImageUrl(truckId));
                } else {
                    console.error('Truck data not found.');
                }

                if (branchesResponse.data) {
                    setBranches(branchesResponse.data);
                } else {
                    console.error('Branches data not found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [truckId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRentTruck = () => {
        const currentDate = new Date();
        const rentalDate = new Date(formData.rentalDate);
        const returnDate = new Date(formData.returnDate);

        // Strip off time components for accurate date comparison
        const currentDateOnly = new Date(currentDate.toDateString());
        const rentalDateOnly = new Date(rentalDate.toDateString());
        const returnDateOnly = new Date(returnDate.toDateString());

        if (!formData.pickUp || !formData.dropOff) {
            setError('Both pick-up and drop-off locations are required.');
            return;
        }

        if (!formData.rentalDate || !formData.returnDate) {
            setError('Both rental and return dates are required.');
            return;
        }

        if (rentalDateOnly < currentDateOnly) {
            setError('Rental date cannot be in the past.');
            return;
        }

        if (returnDateOnly <= rentalDateOnly) {
            setError('Return date must be after the rental date.');
            return;
        }

        const calculatedDuration = Math.ceil((returnDateOnly - rentalDateOnly) / (1000 * 60 * 60 * 24));
        setRentalDuration(calculatedDuration);

        const calculatedPrice = calculatePrice(calculatedDuration, formData.pickUp, formData.dropOff, truck);
        setPrice(calculatedPrice);

        setShowSummary(true);
    };


    const calculatePrice = (duration, pickupLocation, dropoffLocation, truck) => {
        if (!truck) return 0;
        const basePrice = truck.truckType.typeName === 'Flatbed' ? 100 : 500;
        const distanceFactor = pickupLocation !== dropoffLocation ? 1.5 : 1.0;
        return basePrice * duration * distanceFactor;
    };

    const handleContinueToRent = async () => {
        const selectedPickUp = branches.find((branch) => branch.branchName === formData.pickUp) || {};
        const selectedDropOff = branches.find((branch) => branch.branchName === formData.dropOff) || {};

        const updatedRentData = {
            rentDate: formData.rentalDate,
            returnDate: formData.returnDate,
            totalCost: calculatedPrice,
            isPaymentMade: false,
            vin: truck,
            pickUp: selectedPickUp,
            dropOff: selectedDropOff,
        };

        try {
            await createRentTruck(updatedRentData);
            navigate('/sign-in'); // Navigate to sign-in page
        } catch (error) {
            console.error('Error creating rental:', error);
        }
    };

    const handleCancel = () => {
        setShowSummary(false);
        setFormData({
            rentalDate: '',
            returnDate: '',
            pickUp: '',
            dropOff: '',
        });
        setPrice(null);
        setRentalDuration(null);
        setError('');
    };

    const robotoStyle = {
        fontFamily: "'Roboto', sans-serif",
    };

    const containerStyle = {
        ...robotoStyle,
        padding: '20px',
        maxWidth: '900px',
        margin: '0 auto',
        backgroundColor: '#f4f4f4',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const headerStyle = {
        ...robotoStyle,
        fontSize: '32px',
        color: '#002e7a',
        marginBottom: '20px',
        textAlign: 'center',
    };

    const formStyle = {
        ...robotoStyle,
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
        ...robotoStyle,
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    };

    const selectStyle = {
        ...robotoStyle,
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '4px',
        border: '1px solid #ddd',
    };

    const buttonStyle = {
        ...robotoStyle,
        backgroundColor: '#002e7a',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '10px',
    };

    const buttonHoverStyle = {
        ...buttonStyle,
        backgroundColor: '#004080',
    };

    const cancelButtonStyle = {
        ...buttonStyle,
        backgroundColor: '#d9534f',
    };

    const buttonContainerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    };

    const modelStyle = {
        ...robotoStyle,
        fontSize: '24px',
        color: '#002e7a',
        fontWeight: '700',
    };

    const resultStyle = {
        ...robotoStyle,
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        marginTop: '20px',
    };

    const errorStyle = {
        ...robotoStyle,
        color: 'red',
        marginBottom: '20px',
    };

    const detailItemStyle = {
        ...robotoStyle,
        display: 'flex',
        alignItems: 'center',
        marginBottom: '12px',
        fontSize: '16px',
    };

    const iconStyle = {
        marginRight: '12px',
        color: '#002e7a',
        fontSize: '20px',
        verticalAlign: 'middle', // Aligns the icon vertically with the text
    };

    if (!truck) return <p style={robotoStyle}>Loading...</p>;

    return (
        <div className="get-quote-container">
            <div className="get-quote-box">
                <div key={truck.id} className="truck-info">
                    <div>
                        {truckImageUrl &&
                            <img src={truckImageUrl} alt="Truck" style={{width: '100%', borderRadius: '8px'}}/>}
                        {truck.truckType ? (
                            <>
                                <p style={{
                                    ...robotoStyle,
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '16px'
                                }}>
                                    <strong style={modelStyle}>{truck.model}</strong>
                                </p>
                                <p style={{...robotoStyle, display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                    <FaTruck style={iconStyle}/>
                                    <strong>Type:</strong> {truck.truckType.typeName}
                                </p>
                                <p style={{...robotoStyle, display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                    <FaWeight style={iconStyle}/> {/* Updated icon */}
                                    <strong>Capacity:</strong> {truck.truckType.capacity} tons
                                </p>
                                <p style={{...robotoStyle, display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                    <FaCogs style={iconStyle}/>
                                    <strong>Transmission:</strong> {truck.truckType.transmission}
                                </p>
                                <p style={{...robotoStyle, display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                    <FaTachometerAlt style={iconStyle}/>
                                    <strong>Fuel Consumption:</strong> {truck.truckType.fuelConsumption}
                                </p>
                                <p style={{...robotoStyle, display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                    <FaGasPump style={iconStyle}/>
                                    <strong>Fuel Type:</strong> {truck.truckType.fuelType}
                                </p>
                                <p style={{...robotoStyle, display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                    <FaOilCan style={iconStyle}/>
                                    <strong>Mileage:</strong> {truck.currentMileage} km
                                </p>
                                <p style={{...robotoStyle, display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                    <FaTruck style={iconStyle}/>
                                    <strong>Dimension:</strong> {truck.truckType.dimensions}
                                </p>
                            </>
                        ) : (
                            <p style={robotoStyle}>Truck details are not available yet.</p>
                        )}
                    </div>
                </div>
                {!showSummary ? (
                    <div className="quote-form">
                        <h1 style={headerStyle}>Truck Rental Form</h1>
                        {error && <p style={errorStyle}>{error}</p>}
                        <form onSubmit={(e) => e.preventDefault()}>
                            <label style={robotoStyle}>
                                Pickup Location:
                                <select name="pickUp" value={formData.pickUp} onChange={handleChange} required
                                        style={selectStyle}>
                                    <option value="">Select Pick-up Location</option>
                                    {branches.map(branch => (
                                        <option key={branch.branchId} value={branch.branchName}>
                                            {branch.branchName} - {branch.address}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label style={robotoStyle}>
                                Dropoff Location:
                                <select name="dropOff" value={formData.dropOff} onChange={handleChange} required
                                        style={selectStyle}>
                                    <option value="">Select Drop-off Location</option>
                                    {branches.map(branch => (
                                        <option key={branch.branchId} value={branch.branchName}>
                                            {branch.branchName} - {branch.address}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <label htmlFor="rentalDate" style={robotoStyle}>
                                Rental Date:
                                <input type="date" name="rentalDate" value={formData.rentalDate} onChange={handleChange}
                                       required style={inputStyle} min={new Date().toISOString().split('T')[0]}/>
                            </label>
                            <label htmlFor="returnDate" style={robotoStyle}>
                                Return Date:
                                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange}
                                       required style={inputStyle}/>
                            </label>
                            <button type="button" style={buttonStyle} onClick={handleRentTruck}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}>
                                Rent Truck
                            </button>
                        </form>
                    </div>
                ) : (
                    <div style={resultStyle} className="get-quote-result">
                        <h2 style={{...robotoStyle, color: '#037bfc'}}>Rental Details</h2>
                        <div style={detailItemStyle}>
                            <FaTruck style={iconStyle}/>
                            <p><strong>Model:</strong> {truck.model}</p>
                        </div>
                        <div style={detailItemStyle}>
                            <FaMapMarkerAlt style={iconStyle}/>
                            <p><strong>Pickup Location:</strong> {formData.pickUp}</p>
                        </div>
                        <div style={detailItemStyle}>
                            <FaMapMarkerAlt style={iconStyle}/>
                            <p><strong>Drop-off Location:</strong> {formData.dropOff}</p>
                        </div>
                        <div style={detailItemStyle}>
                            <FaCalendarAlt style={iconStyle}/>
                            <p><strong>Rental Date:</strong> {formData.rentalDate}</p>
                        </div>
                        <div style={detailItemStyle}>
                            <FaCalendarAlt style={iconStyle}/>
                            <p><strong>Return Date:</strong> {formData.returnDate}</p>
                        </div>
                        <div style={detailItemStyle}>
                            <FaDollarSign style={iconStyle}/> {/* Updated icon */}
                            <p><strong>Total Price:</strong> R{price}</p>
                        </div>
                        <div style={detailItemStyle}>
                            <FaClock style={iconStyle}/>
                            <p><strong>Rental Duration:</strong> {rentalDuration} days</p>
                        </div>
                        <div style={buttonContainerStyle}>
                            <button
                                type="button"
                                style={buttonStyle}
                                onClick={handleContinueToRent}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                            >
                                Continue to Rent
                            </button>

                            <button type="button" style={cancelButtonStyle} onClick={handleCancel}
                                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#c9302c'}
                                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = cancelButtonStyle.backgroundColor}>
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default GetQuote;


