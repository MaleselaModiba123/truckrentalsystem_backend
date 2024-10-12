import React, { useContext, useState, useEffect } from 'react';
import { createComplaint, getComplaintsByCustomerID } from '../../services/ComplaintService.js';
import { AuthContext } from "../AuthContext.jsx";
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';

const CustomerComplaint = () => {
    const [formData, setFormData] = useState({ description: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [complaints, setComplaints] = useState([]);
    const [loadingComplaints, setLoadingComplaints] = useState(true);
    const { auth } = useContext(AuthContext);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        const fetchComplaints = async () => {
            if (auth && auth.customerID) {
                try {
                    setLoadingComplaints(true);
                    const data = await getComplaintsByCustomerID(auth.customerID);
                    setComplaints(data.data);
                } catch (error) {
                    setError('Error fetching complaints. Please try again.');
                } finally {
                    setLoadingComplaints(false);
                }
            }
        };
        fetchComplaints();
    }, [auth]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

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
            setFormData({ description: '' });

            const updatedComplaints = await getComplaintsByCustomerID(auth.customerID);
            setComplaints(updatedComplaints.data);
        } catch (error) {
            setError('There was an error submitting your complaint. Please try again.');
        } finally {
            setLoading(false);
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
                                        <strong>Status:</strong>
                                        <span className={`status ${complaint.status.toLowerCase()}`}>
                                            {complaint.status}
                                        </span> <br />
                                        <strong>Date:</strong> {complaint.complaintDate ? new Date(complaint.complaintDate).toLocaleDateString(): 'N/A'} <br />
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
