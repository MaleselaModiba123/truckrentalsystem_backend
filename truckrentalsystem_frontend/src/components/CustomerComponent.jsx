import React, { useEffect, useState } from "react";
import { updateCustomer, getCustomerById } from "../services/CustomerProfileService";
import { useNavigate, useParams } from "react-router-dom";

const CustomerComponent = () => {
    const { customerID } = useParams();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [license, setLicense] = useState('');
    const [cellNo, setCellNo] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (customerID) {
            getCustomerById(customerID)
                .then((response) => {
                    const customer = response.data;
                    setFirstName(customer.firstName);
                    setLastName(customer.lastName);
                    setEmail(customer.email);
                    setPassword(customer.password);
                    setLicense(customer.license);
                    setCellNo(customer.cellNo);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [customerID]);

    const saveCustomer = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const customer = { firstName, lastName, email, password, license, cellNo };
            updateCustomer(customerID, customer)
                .then((response) => {
                    console.log(response.data);
                    navigate("/customer-profile");
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    };

    const validateForm = () => {
        const errorsCopy = {};
        let valid = true;

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        }
        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }
        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        }
        if (!password.trim()) {
            errorsCopy.password = 'Password is required';
            valid = false;
        }
        if (!license.trim()) {
            errorsCopy.license = 'License is required';
            valid = false;
        }
        if (!cellNo.trim()) {
            errorsCopy.cellNo = 'Cell Number is required';
            valid = false;
        }
        setErrors(errorsCopy);
        return valid;
    };

    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="card col-md-4 offset-md-4">
                    <h2 className="text-center">Update Account</h2>
                    <div className="card-body">
                        <form onSubmit={saveCustomer}>
                            <div className="form-group mb-2">
                                <label className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={firstName}
                                    className={`form-control form-control-sm ${errors.firstName ? "is-invalid" : ""}`}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && (
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                )}

                                <label className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={lastName}
                                    className={`form-control form-control-sm ${errors.lastName ? "is-invalid" : ""}`}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && (
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                )}

                                <label className="form-label">Email:</label>
                                <input
                                    type="text"
                                    name="email"
                                    value={email}
                                    className={`form-control form-control-sm ${errors.email ? "is-invalid" : ""}`}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                                <label className="form-label">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    className={`form-control form-control-sm ${errors.password ? "is-invalid" : ""}`}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}

                                <label className="form-label">License:</label>
                                <input
                                    type="text"
                                    name="license"
                                    value={license}
                                    className={`form-control form-control-sm ${errors.license ? "is-invalid" : ""}`}
                                    onChange={(e) => setLicense(e.target.value)}
                                />
                                {errors.license && (
                                    <div className="invalid-feedback">{errors.license}</div>
                                )}

                                <label className="form-label">Cell Number:</label>
                                <input
                                    type="text"
                                    name="cellNo"
                                    value={cellNo}
                                    className={`form-control form-control-sm ${errors.cellNo ? "is-invalid" : ""}`}
                                    onChange={(e) => setCellNo(e.target.value)}
                                />
                                {errors.cellNo && (
                                    <div className="invalid-feedback">{errors.cellNo}</div>
                                )}
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    style={{ width: "100px" }}
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerComponent;
