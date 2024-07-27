import { useState } from 'react';
import {
    createCustomerCustomer,
} from "../services/CustomerSignUp";
import { useNavigate, useParams } from "react-router-dom";

function SignUpComponent() {
    const [customer, setCustomer] = useState({
        firstName: '',
        lastName: '',
        cellNo: '',
        license: '',
        email: '',
        password: '',
    });

    const [action, setAction] = useState('SignUp'); // Initial action is SignUp

    const handleSignUpClick = () => {
        // Perform validation or additional logic before creating customer
        createCustomer(customer);
    };

    const handleLoginClick = () => {

        console.log('Logging in with:', customer.email, customer.password);

        axios.post('/api/login', { email: customer.email, password: customer.password })
             .then(response => {
                 console.log('Login successful:', response.data);
                  //Handle login successful
             })
             .catch(error => {
                 console.error('Login failed:', error);
                // Handle login failure
            });
    };

    return (
        <div>
            {/* Render different content based on the 'action' state */}
            {action === 'SignUp' && (
                <div>
                    {/* Input fields for signup */}
                    <input
                        type="text"
                        placeholder="First Name"
                        value={customer.firstName}
                        onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={customer.lastName}
                        onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Cell Number"
                        value={customer.cellNo}
                        onChange={(e) => setCustomer({ ...customer, cellNo: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="License Number"
                        value={customer.license}
                        onChange={(e) => setCustomer({ ...customer, license: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={customer.password}
                        onChange={(e) => setCustomer({ ...customer, password: e.target.value })}
                    />
                    {/* Signup button */}
                    <button onClick={handleSignUpClick}>Sign Up</button>
                    <p>
                        Already have an account?{' '}
                        <span
                            className="action-link"
                            onClick={() => setAction('Login')}
                            style={{ cursor: 'pointer', color: 'blue' }}
                        >
                            Login
                        </span>
                    </p>
                </div>
            )}

            {action === 'Login' && (
                <div>
                    {/* Input fields for login */}
                    <input
                        type="email"
                        placeholder="Email"
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={customer.password}
                        onChange={(e) => setCustomer({ ...customer, password: e.target.value })}
                    />
                    {/* Login button */}
                    <button onClick={handleLoginClick}>Login</button>
                    <p>
                        Don't have an account?{' '}
                        <span
                            className="action-link"
                            onClick={() => setAction('SignUp')}
                            style={{ cursor: 'pointer', color: 'blue' }}
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}

export default SignUpComponent;