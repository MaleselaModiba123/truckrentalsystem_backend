import React, { useContext, useState } from 'react';
import { createComplaint } from '../../services/ComplaintService.js';
import { AuthContext } from "../AuthContext.jsx";

const CustomerComplaint = () => {
    const [formData, setFormData] = useState({ description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);  // Use the auth context to get customerID
    const [success, setSuccess] = useState(null);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!formData.description.trim()) {
            setError('Please provide a complaint description.');
            setLoading(false);
            return;
        }

        try {
            if (!auth || !auth.customerID) {
                setError('No customer ID found. Please ensure you are logged in.');
                setLoading(false);
                return;
            }

            const response = await createComplaint({
                description: formData.description,
                customerId: auth.customerID
            });

            if (response.status !== 201) {
                throw new Error('Error submitting complaint');
            }

            setSuccess('Your complaint has been submitted successfully!');
            setFormData({ description: '' });  // Reset form
        } catch (error) {
            setError('There was an error submitting your complaint. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="customer-complaint-form">
            <h2>Submit a Complaint</h2>
            <p>We value your feedback and will address your complaints promptly.</p>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <textarea
                        name="description"
                        placeholder="Describe your complaint"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Complaint'}
                </button>
            </form>
        </div>
    );
};

export default CustomerComplaint;
