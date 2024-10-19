import React, {useContext, useEffect, useState} from "react";
import {deleteCustomerById, getCustomerProfile, updateCustomerProfile} from "../../services/CustomerService.js";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../AuthContext.jsx";

const CustomerProfile = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [pendingPayment, setPendingPayment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedCustomer, setUpdatedCustomer] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomerData = async () => {
            if (auth) {
                try {
                    const customerData = await getCustomerProfile();
                    setCustomer(customerData);
                    setUpdatedCustomer(customerData);
                } catch (error) {
                    console.error("Error retrieving customer data:", error);
                } finally {
                    setLoading(false);
                }

                const paymentInfo = localStorage.getItem('paymentInfo');
                if (paymentInfo) {
                    const parsedPaymentInfo = JSON.parse(paymentInfo);
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

    const toggleEdit = () => {
        setIsEditing(!isEditing);
        setSuccessMessage(''); // Reset messages when toggling edit
        setErrorMessage('');
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUpdatedCustomer({...updatedCustomer, [name]: value});
    };

    const confirmUpdate = () => {
        setShowUpdateConfirm(true);
    };

    const handleUpdate = async () => {
        try {
            await updateCustomerProfile(updatedCustomer);
            setCustomer(updatedCustomer);
            toggleEdit(); // Hide the edit form
            setSuccessMessage("Profile updated successfully.");
            setTimeout(() => setSuccessMessage(''), 2000);
        } catch (error) {
            console.error("Error updating customer profile:", error);
            setErrorMessage("Failed to update profile.");
            setTimeout(() => setErrorMessage(''), 2000);
        } finally {
            setShowUpdateConfirm(false);
        }
    };

    const confirmDeleteAccount = () => {
        setShowDeleteConfirm(true);
    };

    const deleteAccount = async () => {
        try {
            await deleteCustomerById(customer.customerID);
            setAuth(null);
            localStorage.removeItem('auth');
            setSuccessMessage("Account deleted successfully.");
            setTimeout(() => setSuccessMessage(''), 2000);
            navigate('/'); // Redirect to home page after deletion
        } catch (error) {
            console.error("Error deleting customer:", error);
            setErrorMessage("Failed to delete account.");
            setTimeout(() => setErrorMessage(''), 2000);
        } finally {
            setShowDeleteConfirm(false);
        }
    };


    if (loading) {
        return <div style={styles.loading}>Loading...</div>;
    }

    if (!customer) {
        return <div style={styles.noData}>No customer data available.</div>;
    }

    return (
        <div style={styles.container}>
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
            <main style={styles.mainContent}>
                <div style={styles.contentSection}>
                    <section style={styles.profileSection}>
                        <h2 style={styles.heading}>Profile</h2>
                        <div style={styles.card}>
                            <div style={styles.cardBody}>
                                <h4>Customer Details</h4>
                                {(successMessage || errorMessage) && (
                                    <div style={styles.message}>
                                        {successMessage || errorMessage}
                                    </div>
                                )}
                                <div style={styles.details}>
                                    {isEditing ? (
                                        <>
                                            <input type="text" name="firstName" value={updatedCustomer.firstName}
                                                   onChange={handleInputChange} placeholder="First Name"/>
                                            <input type="text" name="lastName" value={updatedCustomer.lastName}
                                                   onChange={handleInputChange} placeholder="Last Name"/>
                                            <input type="email" name="email" value={updatedCustomer.email}
                                                   onChange={handleInputChange} placeholder="Email"/>
                                            <input type="text" name="cellNo" value={updatedCustomer.cellNo}
                                                   onChange={handleInputChange} placeholder="Cell Number"/>
                                            <div style={styles.actionButtons}>
                                                <button style={styles.btnSuccess} onClick={confirmUpdate}>Save</button>
                                                <button style={styles.btnCancel} onClick={toggleEdit}>Cancel</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {[{label: "Customer ID", value: customer.customerID},
                                                {label: "First Name", value: customer.firstName},
                                                {label: "Last Name", value: customer.lastName},
                                                {label: "Email", value: customer.email},
                                                {label: "Password", value: "**************"},
                                                {label: "License", value: customer.license},
                                                {label: "Cell Number", value: customer.cellNo}].map(({label, value}) => (
                                                <div style={styles.detailItem} key={label}>
                                                    <span style={styles.detailLabel}>{label}:</span>
                                                    <span style={styles.detailValue}>{value}</span>
                                                </div>
                                            ))}
                                            <div style={styles.actionButtons}>
                                                <button style={styles.btnSuccess} onClick={toggleEdit}>Update</button>
                                                <button style={styles.btnDanger} onClick={confirmDeleteAccount}>Delete
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Confirmation dialog for delete */}
            {showDeleteConfirm && (
                <div style={styles.confirmDialog}>
                    <div style={styles.confirmDialogContent}>
                        <h4>Confirm Account Deletion</h4>
                        <p>Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div style={styles.confirmDialogActions}>
                            <button style={styles.btnDanger} onClick={deleteAccount}>Yes, Delete</button>
                            <button style={styles.btnCancel} onClick={() => setShowDeleteConfirm(false)}>No, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation dialog for update */}
            {showUpdateConfirm && (
                <div style={styles.confirmDialog}>
                    <div style={styles.confirmDialogContent}>
                        <h4>Confirm Profile Update</h4>
                        <p>Are you sure you want to save the changes to your profile?</p>
                        <div style={styles.confirmDialogActions}>
                            <button style={styles.btnSuccess} onClick={handleUpdate}>Yes, Save</button>
                            <button style={styles.btnCancel} onClick={() => setShowUpdateConfirm(false)}>No, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    mainContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: '20px',
    },
    profileSection: {
        maxWidth: '500px',
        margin: '20px 0',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
    },
    card: {
        width: '100%',
        border: '1px solid #ddd',
        borderRadius: '5px',
        overflow: 'hidden',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '10px',
        marginBottom: '20px',
    },
    detailItem: {
        display: 'flex',
        alignItems: 'center',
    },
    detailLabel: {
        fontWeight: 'bold',
        marginRight: '10px',
        width: '150px',
    },
    detailValue: {
        color: '#6c757d',
        flex: 1,
    },
    actionButtons: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    btnSuccess: {
        padding: '10px 5px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#28a745',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
        flex: 1,
        marginRight: '10px',
    },
    btnDanger: {
        padding: '10px 5px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#dc3545',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
        flex: 1,
    },
    btnCancel: {
        padding: '10px 5px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#6c757d',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '16px',
        flex: 1,
    },
    loading: {
        textAlign: 'center',
        fontSize: '18px',
    },
    noData: {
        textAlign: 'center',
        fontSize: '18px',
    },
    message: {
        color: '#28a745',
        marginBottom: '15px',
        textAlign: 'center',
    },
    confirmDialog: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    confirmDialogContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
    },
    confirmDialogActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '20px',
    },
};

export default CustomerProfile;
