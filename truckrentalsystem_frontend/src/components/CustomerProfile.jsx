import React, { useEffect, useState } from "react";
import {
    deleteCustomerById,
    getCustomerById,
} from "../services/CustomerProfileService";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
    const [customer, setCustomer] = useState(null);
    const navigator = useNavigate();
    useEffect(() => {
        const customerID = 1;
        getCustomerById(customerID)
            .then((response) => {
                setCustomer(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    function updateCustomer(customerID) {
        navigator(`/update-customer/${customerID}`);
    }

    //Delete Method
    function deleteAccount(customerID) {
        console.log(customerID);
        deleteCustomerById(customerID)
            .then((response) => {
                console.log("Customer deleted:", response);
                navigator('/');
            })
            .catch((error) => {
                console.error(error);
            });
    }
    if (!customer) {
        return <div>Loading...</div>;
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
