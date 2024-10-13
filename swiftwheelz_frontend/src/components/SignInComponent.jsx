import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {customerSignIn} from "../services/CustomerService.js";
import {AuthContext} from "./AuthContext.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {employeeSignIn, getAdminDetails} from "../services/EmployeesService.js";

const SignInComponent = () => {
    const [user, setUser] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({...prevUser, [name]: value}));
    };

    const handleSignIn = async (e) => {
        e.preventDefault();
        setError('');

        const employeeResponse = await handleEmployeeSignIn();

        if (employeeResponse) {
            return;
        }
        // If employee sign-in fails, try customer sign-in
        const customerResponse = await handleCustomerSignIn();

        // Check if customer sign-in failed
        if (!customerResponse) {
            setError('Invalid email or password'); // Set error only if both attempts failed
        }
    };

    const handleEmployeeSignIn = async () => {
        try {
            const employeeResponse = await employeeSignIn(user);

            if (employeeResponse.status === 200) {
                const token = employeeResponse.data;
                setAuth({ email: user.email, token });
                localStorage.setItem('token', token);

                const employeeDetails = await getAdminDetails(user.email);
                const { role } = employeeDetails;
                setAuth(employeeDetails);

                switch (role) {
                    case "ADMIN":
                        navigate("/admin-portal/dashboard");
                        return true; // Successful sign-in
                    case "HELP_DESK":
                        navigate("/help-desk/dashboard");
                        return true; // Successful sign-in
                    default:
                        setError('Unknown role');
                        return false; // Indicate failure
                }
            } else {
                return false;
            }
        } catch (error) {
            console.error("Employee authentication error:", error);
            return false;
        }
    };
    const handleCustomerSignIn = async () => {
        try {
            const customerResponse = await customerSignIn(user);

            if (customerResponse.status === 200) {
                const token = customerResponse.data;
                setAuth({email: user.email, token});
                localStorage.setItem('token', token);
                const paymentInfo = JSON.parse(localStorage.getItem('paymentInfo'));
                navigate(paymentInfo ? "/customer/pending-payments" : "/customer/profile");
                return true;
            }
        } catch (error) {
            console.error("Customer authentication error:", error);
        }
        return false;
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div
                        className="card shadow-sm border-light rounded-lg"
                        style={{backgroundColor: '#e0f7fa'}}
                    >
                        <div className="card-body">
                            <h2 className="text-center mb-4" style={{color: '#007bff'}}>Sign In</h2>
                            <form onSubmit={handleSignIn}>
                                <div className="form-group mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        value={user.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-4 position-relative">
                                    <label className="form-label">Password</label>
                                    <div style={{position: 'relative'}}>
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            name="password"
                                            className="form-control"
                                            value={user.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            required
                                            style={{paddingRight: '40px'}}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setPasswordVisible(!passwordVisible)}
                                            style={{
                                                position: 'absolute',
                                                top: '50%',
                                                right: '10px',
                                                transform: 'translateY(-50%)',
                                                border: 'none',
                                                background: 'transparent',
                                                cursor: 'pointer',
                                                padding: '0',
                                                fontSize: '16px',
                                                color: '#6c757d'
                                            }}
                                        >
                                            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye}/>
                                        </button>
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{width: 'auto'}}
                                    >
                                        Sign In
                                    </button>
                                </div>
                            </form>
                            {error && <p className="text-danger text-center mt-3">{error}</p>}
                            <div className="text-center mt-4">
                                <span className="text-muted">
                                    Don't have an account?
                                    <button
                                        className="btn btn-link text-primary fw-bold"
                                        onClick={() => navigate("/sign-up")}
                                    >
                                        Sign Up
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;
