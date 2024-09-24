import React, { useEffect, useState, useContext } from 'react';
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { getRentalsByCustomerId } from "../../services/RentTructService.js";
import { FaSearch } from 'react-icons/fa';
import { AuthContext } from "../AuthContext.jsx";

const RentalsList = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchRentals = async () => {
            setLoading(true);
            try {
                const customerID = localStorage.getItem('customerID');
                if (!customerID) {
                    console.error('No customer ID found.');
                    setError(new Error('Customer ID not found.'));
                    setLoading(false);
                    return;
                }

                // Fetch rentals by customer ID from the API
                const response = await getRentalsByCustomerId(customerID);
                setRentals(response.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);

    // Handle loading state
    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
                <p className="mt-3">Loading...</p>
            </Container>
        );
    }

    // Handle error state
    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">Error: {error.message}</Alert>
            </Container>
        );
    }

    // Filter rentals based on search query
    const filteredRentals = rentals.filter(rental =>
        rental.customerId?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rental.customerId?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rental.vin.model.toLowerCase().includes(searchQuery.toLowerCase())
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
                        color: #007bff;
                        font-size: 2.5rem;
                        font-weight: bold;
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
                        color: #007bff;
                        font-size: 1.2rem;
                    }

                    .card-title {
                        color: #007bff;
                    }
                    .card-text strong {
                        color: #004080;
                    }
                `}
            </style>

            <h1 className="mb-4">Your Rented Trucks</h1>

            <div className="search-container">
                <FaSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search by vehicle model"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {filteredRentals.length === 0 ? (
                <Alert variant="danger">No trucks match your search criteria.</Alert>
            ) : (
                <Row>
                    {filteredRentals.map((rental) => (
                        <Col md={6} lg={4} className="mb-4" key={rental.rentId}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>
                                        Rent ID: {rental.rentId || 'N/A'}
                                    </Card.Title>
                                    <Card.Text>
                                        <strong>Vehicle Model:</strong> {rental.vin.model || 'N/A'} <br />
                                        <strong>Payment Made:</strong> {rental.isPaymentMade ? 'Yes' : 'No'} <br />
                                        <strong>Rent Date:</strong> {rental.rentDate ? new Date(rental.rentDate).toLocaleDateString() : 'N/A'} <br />
                                        <strong>Return Date:</strong> {rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : 'N/A'} <br />
                                        <strong>Total Cost:</strong> R {rental.totalCost ? rental.totalCost.toFixed(2) : '0.00'} <br />
                                        <strong>Customer Name:</strong> {rental.customerId?.firstName || 'N/A'} {rental.customerId?.lastName || ''} <br />
                                        <strong>Pick-Up Branch:</strong> {rental.pickUp?.branchName || 'N/A'} <br />
                                        <strong>Drop-Off Branch:</strong> {rental.dropOff?.branchName || 'N/A'}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default RentalsList;
