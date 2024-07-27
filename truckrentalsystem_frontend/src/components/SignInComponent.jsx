import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        // sign-in logic still needs to be done
        navigate("/customer-profile"); // Navigate to the customer profile after successful sign-in
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
