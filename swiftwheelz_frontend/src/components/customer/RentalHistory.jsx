import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Row, Spinner} from 'react-bootstrap';
import {getRentalsByCustomerEmail} from "../../services/RentTruckService.js";
import {getAllBranches} from '../../services/BranchService.js';
import {getCustomerByEmail} from '../../services/CustomerService.js';
import {AuthContext} from "../AuthContext.jsx";

const RentalHistory = () => {
    const [rentals, setRentals] = useState([]);
    const [thisUser, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [branches, setBranches] = useState([]);
    const [searchStatus, setSearchStatus] = useState('');
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 3;
    useEffect(() => {
        const fetchCustomerData = async () => {
            if (auth?.email) {
                try {
                    const response = await getCustomerByEmail(auth.email);
                    console.log("Customer email: ", auth.email)
                    setCustomer(response);
                } catch (error) {
                    console.error("Error retrieving customer data:", error);
                    setError(error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchCustomerData();
    }, [auth]);

    // Fetch rentals and branches once customer data is available
    useEffect(() => {
        if (thisUser) {
            fetchRentals();
            fetchBranches();
        }
    }, [thisUser]);

    const fetchRentals = async () => {
        setLoading(true);
        try {
            if (thisUser?.email) {
                const token = auth?.token;
                const response = await getRentalsByCustomerEmail(thisUser.email, token);
                const rental = Array.isArray(response) ? response : [];
                console.log("rental: ",rental);
                setRentals(rental);
            }
        } catch (err) {
            console.error('Error fetching rentals:', err);
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchBranches = async () => {
        try {
            const response = await getAllBranches();
            setBranches(response.data);
        } catch (err) {
            console.error('Error fetching branches:', err);
            setError(err);
        }
    };
    if (loading) {
        return (
            <Container className="text-center my-5">
                <Spinner animation="border" variant="primary" />
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
    const sortedRentals = rentals.sort((a, b) => new Date(b.rentDate) - new Date(a.rentDate));
    const filteredRentals = sortedRentals.filter(rental =>
        rental.status.toLowerCase().includes(searchStatus.toLowerCase())
    );
    const totalPages = Math.ceil(filteredRentals.length / rowsPerPage);

    // Get current rentals based on pagination
    const indexOfLastRental = currentPage * rowsPerPage;
    const indexOfFirstRental = indexOfLastRental - rowsPerPage;
    const currentRentals = filteredRentals.slice(indexOfFirstRental, indexOfLastRental);

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
            <h1 className="mb-4">Rental History</h1>
            <div className="mb-3">
                <input
                    type="text"
                    placeholder="Filter by status"
                    className="form-control"
                    value={searchStatus}
                    onChange={(e) => setSearchStatus(e.target.value)}
                />
            </div>
            {currentRentals.length === 0 ? (
                <Alert variant="danger">No rentals found.</Alert>
            ) : (
                <Row>
                    {currentRentals.map((rental) => (
                        <Col md={6} lg={4} className="mb-4" key={rental.rentId}>
                            <Card className="shadow-sm">
                                <Card.Body>
                                    <Card.Title>Rent ID: {rental.rentId || 'N/A'}</Card.Title>
                                    <Card.Text>
                                        <strong>Vehicle Model:</strong> {rental.vin?.model || 'N/A'} <br/>
                                        <strong>Payment Made:</strong> {rental.isPaymentMade ? 'Yes' : 'No'} <br/>
                                        <p><strong>Pickup Location:</strong> {rental.pickUp.branchName}</p>
                                        <p><strong>Drop-off Location:</strong> {rental.dropOff.branchName}</p>
                                        <strong>Rent
                                            Date:</strong> {rental.rentDate ? new Date(rental.rentDate).toLocaleDateString() : 'N/A'}
                                        <br/>
                                        <strong>Return
                                            Date:</strong> {rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : 'N/A'}
                                        <br/>
                                        <strong>Total Cost:</strong> R {rental.totalCost?.toFixed(2) || '0.00'} <br/>
                                        <strong>Customer:</strong> {thisUser?.firstName} {thisUser?.lastName} <br/>
                                        <p style={{color: rental.status === 'ACTIVE' ? 'green' : 'red'}}>
                                            <strong>Status: </strong> {rental.status}
                                        </p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}

            {/* Pagination Controls */}
            <div className="d-flex justify-content-between mt-4 mb-4">
                <Button
                    variant="secondary"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <span>Page {currentPage} of {totalPages}</span>
                <Button
                    variant="success"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </div>
        </Container>
    );
};

export default RentalHistory;
