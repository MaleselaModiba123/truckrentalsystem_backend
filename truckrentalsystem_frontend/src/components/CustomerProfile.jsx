import React, { useContext, useEffect, useState } from "react";
import { deleteCustomerById, getCustomerById } from "../services/CustomerProfileService";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

const CustomerProfile = () => {
    const [customer, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth && auth.customerID !== undefined) {
            getCustomerById(auth.customerID)
                .then((response) => {
                    setCustomer(response.data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("Error retrieving customer data:", error);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [auth]);

    const updateCustomer = (customerID) => {
        navigate(`/update-customer/${customerID}`);
    };

    const deleteAccount = (customerID) => {
        deleteCustomerById(customerID)
            .then((response) => {
                console.log("Customer deleted:", response);
                navigate('/');
            })
            .catch((error) => {
                console.error("Error deleting customer:", error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!customer) {
        return <div>No customer data available.</div>;
    }

    return (
        <div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="w-75" style={{ maxWidth: '500px', marginTop: '20px', marginBottom: '50px' }}>
                <h2 className="text-center">Profile</h2>
                <div className="card">
                    <div className="card-body">
                        <div className="mb-1">
                            <h6 className="mb-0">Customer ID:</h6>
                            <p className="text-muted">{customer.customerID}</p>
                        </div>
                        <div className="mb-1">
                            <h6 className="mb-0">First Name:</h6>
                            <p className="text-muted">{customer.firstName}</p>
                        </div>
                        <div className="mb-1">
                            <h6 className="mb-0">Last Name:</h6>
                            <p className="text-muted">{customer.lastName}</p>
                        </div>
                        <div className="mb-1">
                            <h6 className="mb-0">Email Address:</h6>
                            <p className="text-muted">{customer.email}</p>
                        </div>
                        <div className="mb-1">
                            <h6 className="mb-0">Password:</h6>
                            <p className="text-muted">{customer.password}</p>
                        </div>
                        <div className="mb-1">
                            <h6 className="mb-0">License:</h6>
                            <p className="text-muted">{customer.license}</p>
                        </div>
                        <div className="mb-1">
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
            </div>
        </div>
    );
};

export default CustomerProfile;
