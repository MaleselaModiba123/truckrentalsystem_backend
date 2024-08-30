import React, { useContext, useEffect, useState } from "react";
import { deleteCustomerById, finalizePayment, getCustomerById } from "../../services/CustomerProfileService.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext.jsx";
import CustomerSidebar from "./CustomerSidebar.jsx";


const CustomerProfile = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pendingPayment, setPendingPayment] = useState(null);
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (auth && auth.customerID !== undefined) {
                try {
                    const response = await getCustomerById(auth.customerID);
                    setCustomer(response.data);
                } catch (error) {
                    console.error("Error retrieving customer data:", error);
                } finally {
                    setLoading(false);
                }

                // Retrieve payment information
                const paymentInfo = localStorage.getItem('paymentInfo');
                console.log('Retrieved payment info (raw):', paymentInfo); // Debugging line
                if (paymentInfo) {
                    const parsedPaymentInfo = JSON.parse(paymentInfo);
                    console.log('Parsed payment info:', parsedPaymentInfo); // Debugging line
                    if (parsedPaymentInfo && parsedPaymentInfo.customerID === auth.customerID) {
                        setPendingPayment(parsedPaymentInfo);
                    }
                }
            } else {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, [auth]);

    const updateCustomer = (customerID) => {
        navigate(`/update-customer/${customerID}`);
    };

    const deleteAccount = async (customerID) => {
        try {
            const response = await deleteCustomerById(customerID);
            console.log("Customer deleted:", response);
            setAuth(null); // Clear auth state
            localStorage.removeItem('auth'); // Or however you handle auth
            navigate('/');
        } catch (error) {
            console.error("Error deleting customer:", error);
        }
    };

    const handleFinalizePayment = async () => {
        if (pendingPayment) {
            try {
                await finalizePayment(pendingPayment);
                localStorage.removeItem('paymentInfo');
                setPendingPayment(null);
                alert('Payment successfully finalized.');
            } catch (error) {
                console.error('Error finalizing payment:', error);
                alert('Failed to finalize payment.');
            }
        }
    };

    const handleSignOut = () => {
        setAuth(null); // Clear auth state
        localStorage.removeItem('auth'); // Clear local auth
        navigate('/'); // Navigate to home
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!customer) {
        return <div>No customer data available.</div>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <CustomerSidebar handleSignOut={handleSignOut} /> {/* Use the Sidebar component */}

            {/* Main Content */}
            <div style={{
                marginLeft: '250px',
                width: 'calc(100% - 250px)',
                padding: '20px'
            }}>
                <div className="w-75" style={{ maxWidth: '700px', marginTop: '20px', marginBottom: '50px' }}>
                    <h2 className="text-center mb-4">Profile</h2>
                    <div className="card mb-4">
                        <div className="card-body">
                            <h4>Customer Details</h4>
                            <div className="mb-3">
                                <h6 className="mb-0">Customer ID:</h6>
                                <p className="text-muted">{customer.customerID}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="mb-0">First Name:</h6>
                                <p className="text-muted">{customer.firstName}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="mb-0">Last Name:</h6>
                                <p className="text-muted">{customer.lastName}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="mb-0">Email Address:</h6>
                                <p className="text-muted">{customer.email}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="mb-0">Password:</h6>
                                <p className="text-muted">••••••••</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="mb-0">License:</h6>
                                <p className="text-muted">{customer.license}</p>
                            </div>
                            <div className="mb-3">
                                <h6 className="mb-0">Cell Number:</h6>
                                <p className="text-muted">{customer.cellNo}</p>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <button
                                    className="btn btn-success mx-2"
                                    style={{ width: "120px" }}
                                    onClick={() => updateCustomer(customer.customerID)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger mx-2"
                                    style={{ width: "120px" }}
                                    onClick={() => deleteAccount(customer.customerID)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>

                    {pendingPayment && (
                        <div className="card">
                            <div className="card-body">
                                <h4>Pending Payment</h4>
                                <div className="mb-3">
                                    <h6 className="mb-0">Model:</h6>
                                    <p className="text-muted">{pendingPayment.vin.model}</p>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0">Pickup Location:</h6>
                                    <p className="text-muted">{pendingPayment.pickUp.branchName}</p>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0">Drop-off Location:</h6>
                                    <p className="text-muted">{pendingPayment.dropOff.branchName}</p>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0">Rental Date:</h6>
                                    <p className="text-muted">{pendingPayment.rentDate}</p>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0">Return Date:</h6>
                                    <p className="text-muted">{pendingPayment.returnDate}</p>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0">Total Cost:</h6>
                                    <p className="text-muted">R{pendingPayment.totalCost}</p>
                                </div>
                                <div className="mb-3">
                                    <h6 className="mb-0">Payment Amount:</h6>
                                    <p className="text-muted">R{pendingPayment.paymentAmount}</p>
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <button
                                        className="btn btn-primary"
                                        onClick={handleFinalizePayment}
                                    >
                                        Finalize Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;
