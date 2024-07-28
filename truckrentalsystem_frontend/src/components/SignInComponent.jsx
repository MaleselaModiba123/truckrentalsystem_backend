import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../services/CustomerProfileService.js";
import { AuthContext } from "./AuthContext.jsx";

const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await signIn(email, password);
            if (response.data) {
                setAuth(response.data); // Update auth context
                setError(''); // Clear any previous errors
                navigate("/customer-profile");
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            console.error("Error during sign in:", error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="container">
            <br />
            <div className="row">
                <div className="card col-md-4 offset-md-4">
                    <h2 className="text-center">Sign In</h2>
                    <div className="card-body">
                        <form onSubmit={handleSignIn}>
                            <div className="form-group mb-2">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary">
                                    Sign In
                                </button>
                            </div>
                        </form>
                        {error && <p style={{ color: 'red' }} className="text-center">{error}</p>}
                        <div className="text-center mt-3">
                            <button
                                className="btn btn-link"
                                onClick={() => navigate("/sign-up")}
                            >
                                Don't have an account? Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignInComponent;
