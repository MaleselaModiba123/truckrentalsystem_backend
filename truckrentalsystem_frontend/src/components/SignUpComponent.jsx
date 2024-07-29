import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCustomer } from "../services/CustomerProfileService";

const SignUpComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [license, setLicense] = useState('');
    const [cellNo, setCellNo] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const customer = { firstName, lastName, email, password, license, cellNo };
            createCustomer(customer)
                .then((response) => {
                    console.log(response.data);
                    navigate("/sign-in"); // Navigate to sign-in page after successful sign-up
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
        } else if (!/^\d{10}$/.test(cellNo)) {
            errorsCopy.cellNo = 'Cell Number must be exactly 10 digits';
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
                    <h2 className="text-center">Sign Up</h2>
                    <div className="card-body">
                        <form onSubmit={handleSignUp}>
                            <div className="form-group mb-2">
                                <label>First Name:</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                {errors.firstName && (
                                    <div className="invalid-feedback">{errors.firstName}</div>
                                )}
                            </div>
                            <div className="form-group mb-2">
                                <label>Last Name:</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                                {errors.lastName && (
                                    <div className="invalid-feedback">{errors.lastName}</div>
                                )}
                            </div>
                            <div className="form-group mb-2">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && (
                                    <div className="invalid-feedback">{errors.email}</div>
                                )}
                            </div>
                            <div className="form-group mb-2">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && (
                                    <div className="invalid-feedback">{errors.password}</div>
                                )}
                            </div>
                            <div className="form-group mb-2">
                                <label>License:</label>
                                <select
                                    name="license"
                                    className={`form-control ${errors.license ? "is-invalid" : ""}`}
                                    value={license}
                                    onChange={(e) => setLicense(e.target.value)}
                                >
                                    <option value="">Select License</option>
                                    <option value="Code 8">Code 8</option>
                                    <option value="Code 10">Code 10</option>
                                    <option value="Code 14">Code 14</option>
                                </select>
                                {errors.license && (
                                    <div className="invalid-feedback">{errors.license}</div>
                                )}
                            </div>
                            <div className="form-group mb-2">
                                <label>Cell Number:</label>
                                <input
                                    type="text"
                                    name="cellNo"
                                    className={`form-control ${errors.cellNo ? "is-invalid" : ""}`}
                                    value={cellNo}
                                    onChange={(e) => setCellNo(e.target.value)}
                                />
                                {errors.cellNo && (
                                    <div className="invalid-feedback">{errors.cellNo}</div>
                                )}
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponent;
