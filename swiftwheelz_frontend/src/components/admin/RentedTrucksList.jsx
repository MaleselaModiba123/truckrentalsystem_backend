import React, {useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Modal, Row, Spinner} from 'react-bootstrap';
import {getAvailableTrucks, markTruckAsReturned} from "../../services/RentTructService.js";
import {FaSearch} from 'react-icons/fa';

const RentedTrucksList = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedRental, setSelectedRental] = useState(null);

    useEffect(() => {
        fetchRentals();
    }, []);

    const fetchRentals = async () => {
        setLoading(true);
        try {
            const response = await getAvailableTrucks();
            setRentals(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsReturned = (rental) => {
        setSelectedRental(rental);
        setShowModal(true);
    };

    const confirmMarkAsReturned = async () => {
        if (selectedRental) {
            try {
                await markTruckAsReturned(selectedRental.rentId);
                fetchRentals();
                setSelectedRental(null);
                setShowModal(false);
            } catch (err) {
                setError(err);
            }
        }
    };

    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary"/>
                <p className="mt-3">Loading...</p>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="my-5">
                <Alert variant="danger">
                    Error: {error.message}
                </Alert>
            </Container>
        );
    }

    // Filter the rentals based on the search query
    const filteredRentals = rentals.filter(rental =>
        rental.customerID?.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rental.customerID?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <h1 className="mb-4">Rented Trucks</h1>
            <div className="search-container">
                <FaSearch className="search-icon"/>
                <input
                    type="text"
                    placeholder="Search by customer name or vehicle model"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {filteredRentals.length === 0 ? (
                <Alert variant="danger">
                    No trucks match your search criteria.
                </Alert>
            ) : (
                <Row>
                    {filteredRentals.map((rental) => (
                        <Col md={6} lg={4} className="mb-4" key={rental.rentId}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: '#007bff' /* Title color */
                                    }}>Rent ID: {rental.rentId || 'N/A'}</Card.Title>
                                    <Card.Text>
                                        <strong>Vehicle Model:</strong> {rental.vin.model || 'N/A'} <br/>
                                        <strong>Payment Made:</strong> {rental.isPaymentMade ? 'Yes' : 'No'} <br/>
                                        <strong>Rent
                                            Date:</strong> {rental.rentDate ? new Date(rental.rentDate).toLocaleDateString() : 'N/A'}
                                        <br/>
                                        <strong>Return
                                            Date:</strong> {rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : 'N/A'}
                                        <br/>
                                        <strong>Total
                                            Cost:</strong> R {rental.totalCost ? rental.totalCost.toFixed(2) : '0.00'}
                                        <br/>
                                        <strong>Customer
                                            Name:</strong> {rental.customerID?.firstName || 'N/A'} {rental.customerID?.lastName || ''}
                                        <br/>
                                        <strong>Pick-Up Branch:</strong> {rental.pickUp?.branchName || 'N/A'} <br/>
                                        <strong>Drop-Off Branch:</strong> {rental.dropOff?.branchName || 'N/A'}
                                    </Card.Text>
                                    <Button
                                        onClick={() => handleMarkAsReturned(rental)}
                                        style={{backgroundColor: '#007bff', borderColor: '#004080'}}
                                    >
                                        Mark as Returned
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Confirmation Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Return</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to mark this truck as returned? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmMarkAsReturned}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RentedTrucksList;
