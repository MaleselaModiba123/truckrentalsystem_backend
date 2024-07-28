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
        console.log("Auth state in CustomerProfile:", auth); // Debug log
        if (auth && auth.customerID !== undefined) {
            getCustomerById(auth.customerID)
                .then((response) => {
                    console.log("Customer data retrieved:", response.data); // Debug log
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
        <div className="container d-flex flex-column align-items-center">
            <h2 className="text-center">Customer Profile</h2>
            <div className="table-container w-100 d-flex justify-content-center">
                <table className="table table-striped table-bordered w-50">
                    <tbody>
                    <tr>
                        <th>Customer ID</th>
                        <td>{customer.customerID}</td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <td>{customer.firstName}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>{customer.lastName}</td>
                    </tr>
                    <tr>
                        <th>Email Address</th>
                        <td>{customer.email}</td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>{customer.password}</td>
                    </tr>
                    <tr>
                        <th>Licence</th>
                        <td>{customer.license}</td>
                    </tr>
                    <tr>
                        <th>Cell Number</th>
                        <td>{customer.cellNo}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
            <div className="button-container d-flex justify-content-center mt-3">
                <button
                    className="btn btn-success mx-2"
                    style={{ width: "140px" }}
                    onClick={() => updateCustomer(customer.customerID)}
                >
                    Update Account
                </button>
                <button
                    className="btn btn-danger mx-2"
                    style={{ width: "140px" }}
                    onClick={() => deleteAccount(customer.customerID)}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default CustomerProfile;
