import React, {useContext, useState, useEffect } from 'react';
import { createComplaint, getComplaintsByCustomerEmail } from '../../services/ComplaintService.js';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import {AuthContext} from "../AuthContext.jsx";
import {getCustomerByEmail} from '../../services/CustomerService.js';

const CustomerComplaint = () => {
    const [formData, setFormData] = useState({ description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { auth } = useContext(AuthContext);
    const [complaints, setComplaints] = useState(null);
    const [loadingComplaints, setLoadingComplaints] = useState(true);
    const [success, setSuccess] = useState(null);
    const [customer, setCustomer] = useState(null);
    const token = localStorage.getItem('token');

    // Fetch customer data
    useEffect(() => {
        const fetchCustomerData = async () => {
            if (auth?.email) {
                try {
                    const customerData = await getCustomerByEmail(auth.email);
                    setCustomer(customerData);
                } catch (error) {
                    console.error("Error fetching customer data:", error);
                    setError('Error fetching customer data. Please try again.');
                }
            } else {
                setError('Customer email missing. Please log in.');
            }
        };

        fetchCustomerData();
    }, [auth]);

    // Fetch complaints once customer data is available
    useEffect(() => {
        const fetchComplaints = async () => {
            if (customer?.email) {
                setLoadingComplaints(true);
                const token = auth?.token;

                try {
                    const data = await getComplaintsByCustomerEmail(customer.email, token);
                    setComplaints(data);
                } catch (error) {
                        setError('Error fetching complaints. Please try again.');
                } finally {
                    setLoadingComplaints(false);
                }
            }
        };

        if (customer) {
            fetchComplaints();
        }
    }, [customer]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateFormData = () => {
        if (!formData.description.trim()) {
            setError('Please provide a complaint description.');
            setLoading(false);
            return false;
        }
        return true;
    };

    const validateCustomer = () => {
        const token = auth.token;
        if (!customer?.customerID || !token) {
            setError('No customer ID found. Please ensure you are logged in.');
            setLoading(false);
            return false;
        }
        return true;
    };

    const submitComplaint = async () => {
        const token = auth.token;
        const email = auth.email;

        const response = await createComplaint({
            description: formData.description,
            email: email,  // Use customerID
        }, token);

        if (response.status !== 201) {
            throw new Error('Error submitting complaint');
        }

        return response;
    };

    /*const handleError = (error) => {
        if (error.response && error.response.status === 401) {
            setError('Session expired. Please log in again.');
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else {
            setError('There was an error submitting your complaint. Please try again.');
        }
        setLoading(false);
    };*/

    const handleSuccess = async () => {
        setSuccess('Your complaint has been submitted successfully!');
        setFormData({ description: '' });

        const updatedComplaints = await getComplaintsByCustomerEmail(customer.email, auth.token);
        setComplaints(updatedComplaints);
        setLoading(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (!validateFormData() || !validateCustomer()) {
            return;
        }

        try {
            await submitComplaint();
            await handleSuccess();
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Container className="my-5">
            <h2>Submit a Complaint</h2>
            <p>We value your feedback and will address your complaints promptly.</p>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <textarea
                        name="description"
                        placeholder="Describe your complaint"
                        className="form-control"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit Complaint'}
                </button>
            </form>

            <h3 className="mt-5">Your Previous Complaints</h3>
            {loadingComplaints ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-3">Loading complaints...</p>
                </div>
            ) : complaints.length > 0 ? (
                <Row className="mt-4">
                    {complaints.map((complaint) => (
                        <Col md={6} lg={4} className="mb-4" key={complaint.id}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>Complaint ID: {complaint.id}</Card.Title>
                                    <Card.Text>
                                        <strong>Description:</strong> {complaint.description} <br />
                                        <strong>Status: </strong>
                                        <span className={`status ${complaint.status.toLowerCase()}`}>
                                            {complaint.status}
                                        </span> <br />
                                        <strong>Response:</strong> {complaint.response} <br />
                                        <strong>Date:</strong> {complaint.complaintDate ? new Date(complaint.complaintDate).toLocaleDateString() : 'N/A'} <br />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Alert variant="info">You have not submitted any complaints yet.</Alert>
            )}
        </Container>
    );
};

export default CustomerComplaint;
