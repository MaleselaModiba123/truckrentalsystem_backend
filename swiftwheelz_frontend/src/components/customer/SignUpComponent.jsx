import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {createCustomer} from "../../services/CustomerService.js";
import {FaEye, FaEyeSlash} from "react-icons/fa"; // Import icons for visibility toggle

const SignUpComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [license, setLicense] = useState('');
    const [cellNo, setCellNo] = useState('');
    const [errors, setErrors] = useState({});
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        setErrors({});
        if (validateForm()) {
            const customer = {firstName, lastName, email, password, license, cellNo, role: 'CUSTOMER'};
            createCustomer(customer)
                .then((response) => {
                    console.log(response.data);
                    navigate("/sign-in");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response && error.response.data) {
                        const errorMessages = error.response.data.errors || {};
                        const newErrors = {};
                        if (errorMessages.email) {
                            newErrors.email = "Email is already registered.";
                        }
                        if (errorMessages.cellNo) {
                            newErrors.cellNo = "Cell Number is already registered.";
                        }
                        setErrors((prev) => ({...prev, ...newErrors}));
                    } else {
                        setErrors({general: 'Email or Cell Number is already registered. Please try to sign in.'});
                    }
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
        } else if (password.length < 5 || !/[A-Z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*]/.test(password)) {
            errorsCopy.password = 'Password must be at least 5 characters long and include an uppercase letter, a number, and a special character';
            valid = false;
        }
        if (password !== confirmPassword) {
            errorsCopy.confirmPassword = 'Passwords do not match';
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
        <div style={{
            backgroundColor: '#f8f9fa',
            minHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <div style={{width: '100%', maxWidth: '400px', padding: '10px'}}>
                <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgb(84, 85, 87)',
                    padding: '20px',
                    margin: '0 auto'
                }}>
                    <h2 style={{textAlign: 'center', marginBottom: '20px', color: '#343a40'}}>Sign Up</h2>
                    <form onSubmit={handleSignUp}>
                        {errors.general && (
                            <div style={{
                                color: '#dc3545',
                                fontSize: '0.75em',
                                marginBottom: '10px',
                                textAlign: 'center'
                            }}>{errors.general}</div>
                        )}
                        <div style={{marginBottom: '10px'}}>
                            <label
                                style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057'}}>First
                                Name:</label>
                            <input
                                type="text"
                                name="firstName"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ced4da',
                                    boxSizing: 'border-box'
                                }}
                                className={errors.firstName ? "is-invalid" : ""}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            {errors.firstName && (
                                <div style={{
                                    color: '#dc3545',
                                    fontSize: '0.75em',
                                    marginTop: '5px'
                                }}>{errors.firstName}</div>
                            )}
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <label
                                style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057'}}>Last
                                Name:</label>
                            <input
                                type="text"
                                name="lastName"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ced4da',
                                    boxSizing: 'border-box'
                                }}
                                className={errors.lastName ? "is-invalid" : ""}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                            {errors.lastName && (
                                <div style={{
                                    color: '#dc3545',
                                    fontSize: '0.75em',
                                    marginTop: '5px'
                                }}>{errors.lastName}</div>
                            )}
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: 'bold',
                                color: '#495057'
                            }}>Email:</label>
                            <input
                                type="email"
                                name="email"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ced4da',
                                    boxSizing: 'border-box'
                                }}
                                className={errors.email ? "is-invalid" : ""}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && (
                                <div style={{
                                    color: '#dc3545',
                                    fontSize: '0.75em',
                                    marginTop: '5px'
                                }}>{errors.email}</div>
                            )}
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: 'bold',
                                color: '#495057'
                            }}>Password:</label>
                            <div style={{position: 'relative'}}>
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    name="password"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ced4da',
                                        boxSizing: 'border-box'
                                    }}
                                    className={errors.password ? "is-invalid" : ""}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setPasswordVisible(!passwordVisible)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#495057'
                                    }}
                                >
                                    {passwordVisible ? <FaEyeSlash/> : <FaEye/>}
                                </button>
                            </div>
                            {errors.password && (
                                <div style={{
                                    color: '#dc3545',
                                    fontSize: '0.75em',
                                    marginTop: '5px'
                                }}>{errors.password}</div>
                            )}
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <label
                                style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057'}}>Confirm
                                Password:</label>
                            <div style={{position: 'relative'}}>
                                <input
                                    type={confirmPasswordVisible ? 'text' : 'password'}
                                    name="confirmPassword"
                                    style={{
                                        width: '100%',
                                        padding: '8px',
                                        borderRadius: '4px',
                                        border: '1px solid #ced4da',
                                        boxSizing: 'border-box'
                                    }}
                                    className={errors.confirmPassword ? "is-invalid" : ""}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                                    style={{
                                        position: 'absolute',
                                        right: '10px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: '#495057'
                                    }}
                                >
                                    {confirmPasswordVisible ? <FaEyeSlash/> : <FaEye/>}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <div style={{
                                    color: '#dc3545',
                                    fontSize: '0.75em',
                                    marginTop: '5px'
                                }}>{errors.confirmPassword}</div>
                            )}
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <label style={{
                                display: 'block',
                                marginBottom: '5px',
                                fontWeight: 'bold',
                                color: '#495057'
                            }}>License:</label>
                            <select
                                name="license"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ced4da',
                                    boxSizing: 'border-box'
                                }}
                                className={errors.license ? "is-invalid" : ""}
                                value={license}
                                onChange={(e) => setLicense(e.target.value)}
                            >
                                <option value="">Select License</option>
                                <option value="Code 10">Code 10</option>
                                <option value="Code 14">Code 14</option>
                            </select>
                            {errors.license && (
                                <div style={{
                                    color: '#dc3545',
                                    fontSize: '0.75em',
                                    marginTop: '5px'
                                }}>{errors.license}</div>
                            )}
                        </div>
                        <div style={{marginBottom: '15px'}}>
                            <label
                                style={{display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#495057'}}>Cell
                                Number:</label>
                            <input
                                type="text"
                                name="cellNo"
                                style={{
                                    width: '100%',
                                    padding: '8px',
                                    borderRadius: '4px',
                                    border: '1px solid #ced4da',
                                    boxSizing: 'border-box'
                                }}
                                className={errors.cellNo ? "is-invalid" : ""}
                                value={cellNo}
                                onChange={(e) => setCellNo(e.target.value)}
                            />
                            {errors.cellNo && (
                                <div style={{
                                    color: '#dc3545',
                                    fontSize: '0.75em',
                                    marginTop: '5px'
                                }}>{errors.cellNo}</div>
                            )}
                        </div>
                        <div style={{textAlign: 'center', marginBottom: '10px'}}>
                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    padding: '10px 20px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '16px'
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <span style={{color: '#6c757d'}}>
                                Already have an account?
                                <button
                                    type="button"
                                    onClick={() => navigate("/sign-in")}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#007bff',
                                        fontWeight: 'bold',
                                        textDecoration: 'underline',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Sign In
                                </button>
                            </span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpComponent;
