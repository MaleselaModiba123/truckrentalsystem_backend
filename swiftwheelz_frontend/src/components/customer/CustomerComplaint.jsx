import React, {useContext, useEffect, useState} from 'react';
import {createComplaint, getComplaintsByCustomerEmail} from '../../services/ComplaintService.js';
import {Alert, Card, Col, Container, Row, Spinner} from 'react-bootstrap';
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


    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [complaintsPerPage] = useState(3);
    const [searchStatus, setSearchStatus] = useState('');
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

    const handleSuccess = async () => {
        setSuccess('Your complaint has been submitted successfully!');
        setFormData({ description: '' });

        const updatedComplaints = await getComplaintsByCustomerEmail(customer.email, auth.token);
        updatedComplaints.sort((a, b) => new Date(b.complaintDate) - new Date(a.complaintDate));
        setComplaints(updatedComplaints);
        setLoading(false);

        const timeoutId = setTimeout(() => {
            setSuccess(null);
        }, 3000);

        return () => clearTimeout(timeoutId);
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
        } finally {
            setLoading(false);
        }
    };
    const indexOfLastComplaint = currentPage * complaintsPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
    const currentComplaints = complaints?.slice(indexOfFirstComplaint, indexOfLastComplaint) || [];
    const totalPages = Math.ceil((complaints?.length || 0) / complaintsPerPage);

    const filteredComplaints = currentComplaints.filter(complaint =>
        complaint.status.toLowerCase().includes(searchStatus.toLowerCase())
    );

    return (
        <Container className="my-5">
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }

                    h1, h2 {
                        animation: fadeIn 1s ease-out;
                        color: #007bff; /* Blue color */
                        font-size: 2.5rem; /* Font size */
                        font-weight: bold; /* Font weight */
                    }

                    .search-container {
                        display: flex;
                        align-items: center;
                        max-width: 600px;
                        margin-bottom: 2rem;
                        border: 1px solid #ced4da;
                        border-radius: 4px;
                    }

                    .search-container input {
                        flex: 1;
                        padding: 0.5rem 1rem;
                        border: none;
                        border-radius: 4px;
                        font-size: 1rem;
                        outline: none;
                    }

                    .search-container .search-icon {
                        margin-left: 10px;
                        color: #007bff; /* Icon color */
                        font-size: 1.2rem;
                    }

                    .card-title {
                        color: #007bff; /* Text color */
                    }
                    .card-text strong {
                        color: #004080; /* Text color */
                    }
                `}
            </style>
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

            <h2 className="mt-5">Your Previous Complaints</h2>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Filter by status"
                    className="form-control"
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                />
            </div>
            {loadingComplaints ? (
                <div className="text-center my-5">
                    <Spinner animation="border" variant="primary"/>
                    <p className="mt-3">Loading complaints...</p>
                </div>
            ) : filteredComplaints.length > 0 ? (
                <>
                    <Row className="mt-4">
                        {filteredComplaints.map((complaint) => (
                            <Col md={6} lg={4} className="mb-4" key={complaint.id}>
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <Card.Title>Complaint ID: {complaint.id}</Card.Title>
                                        <Card.Text>
                                            <strong>Description:</strong> {complaint.description} <br/>
                                            <strong>Status: </strong>
                                            <span className={`status ${complaint.status.toLowerCase()}`}>
                                            {complaint.status}
                                        </span> <br/>
                                            <strong>Response:</strong> {complaint.response} <br/>
                                            <strong>Date:</strong> {complaint.complaintDate ? new Date(complaint.complaintDate).toLocaleDateString() : 'N/A'}
                                            <br/>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="btn btn-danger"
                        >
                            Prev
                        </button>
                        <span>{currentPage} of {totalPages}</span>
                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="btn btn-primary"
                        >
                            Next
                        </button>
                    </div>
                </>

            ) : (
                <Alert variant="info">You have not submitted any complaints yet.</Alert>
            )}
        </Container>
    );
};

export default CustomerComplaint;
