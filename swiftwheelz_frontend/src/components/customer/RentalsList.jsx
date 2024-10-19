import React, {useContext, useEffect, useState} from 'react';
import {Alert, Button, Card, Col, Container, Form, Modal, Row, Spinner} from 'react-bootstrap';
import {cancelRental, getRentalsByCustomerEmail, updateRentTruck} from "../../services/RentTruckService.js";
import {getAllBranches} from '../../services/BranchService.js';
import {getCustomerByEmail} from '../../services/CustomerService.js';
import {AuthContext} from "../AuthContext.jsx";

const RentedTrucksList = () => {
    const [rentals, setRentals] = useState([]);
    const [activeRentals, setActiveRentals] = useState([]);
    const [thisUser, setCustomer] = useState(null);
    const [loading, setLoading] = useState(true);
    const {auth} = useContext(AuthContext);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedRental, setSelectedRental] = useState(null);
    const [editFormData, setEditFormData] = useState({
        pickUp: '',
        dropOff: '',
        rentDate: '',
        returnDate: '',
    });
    const [branches, setBranches] = useState([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancellation, setCancellation] = useState({ reason: '' });
    const [selectedCancelRental, setSelectedCancelRental] = useState(null);

    const [searchTerm, setSearchTerm] = useState('');
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 6; // 2 rows with 3 columns
    // Fetch customer data based on authenticated user
    useEffect(() => {
        const fetchCustomerData = async () => {
            if (auth?.email) {
                try {
                    const response = await getCustomerByEmail(auth.email);
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
                setRentals(Array.isArray(response) ? response : []);
                // const rentalData = Array.isArray(response) ? response : [];
                // console.log("rental: ",rentalData);
                // const activeRentals = rentalData.filter(rentalData => rentalData.status === 'ACTIVE');
                // setRentals(rentalData);
                // setActiveRentals(activeRentals);
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
            const token = auth?.token;
            const response = await getAllBranches(token);
            setBranches(response.data);
        } catch (err) {
            console.error('Error fetching branches:', err);
            setError(err);
        }
    };

    const handleEditRental = (rental) => {
        setSelectedRental(rental);
        setEditFormData({
            pickUp: rental.pickUp?.branchId || '',
            dropOff: rental.dropOff?.branchId || '',
            rentDate: rental.rentDate ? rental.rentDate.slice(0, 10) : '',
            returnDate: rental.returnDate ? rental.returnDate.slice(0, 10) : '',
        });
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const confirmEditRental = async () => {
        if (selectedRental) {
            try {
                const updatedRental = {
                    ...selectedRental,
                    pickUp: { branchId: parseInt(editFormData.pickUp, 10) },
                    dropOff: { branchId: parseInt(editFormData.dropOff, 10) },

                    rentDate: editFormData.rentDate,
                    returnDate: editFormData.returnDate,
                };
                const token = auth?.token;
                await updateRentTruck(selectedRental.rentId, updatedRental, token);
                console.log("rentIT to be updated",selectedRental.rentId);
                console.log("updated rental data", updatedRental);
                await fetchRentals();
                setShowModal(false);
            } catch (err) {
                console.error('Error updating rental:', err);
                setError(err);
            }
        }
    };

    const handleCancelRental = (rental) => {
        setSelectedCancelRental(rental);
        setCancellation({reason: ""});
        setShowCancelModal(true);
    };

    const confirmCancelRental = async () => {
        if (selectedCancelRental && cancellation.reason) {
            try {
                const cancelData = {
                    cancelReason: cancellation.reason,
                    rentTruck: selectedCancelRental,
                };
                const token = auth?.token;
                await cancelRental(cancelData, token);
                console.log("Final cancellation object to send to backend:", cancelData);
                fetchRentals();
                setShowCancelModal(false);
            } catch (err) {
                console.error('Error cancelling rental:', err);
                setError(err);
            }
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

    const filteredActiveRentals = rentals.filter(rental =>
        rental.status === 'ACTIVE' &&
        (rental.vin?.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rental.pickUp.branchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rental.dropOff.branchName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    const sortedRentals = filteredActiveRentals.sort((a, b) => new Date(b.rentDate) - new Date(a.rentDate));
    const totalPages = Math.ceil(sortedRentals.length / rowsPerPage);

    // Get current rentals based on pagination
    const indexOfLastRental = currentPage * rowsPerPage;
    const indexOfFirstRental = indexOfLastRental - rowsPerPage;
    const currentRentals = sortedRentals.slice(indexOfFirstRental, indexOfLastRental)
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
            <div className="search-container mb-4">
                <input
                    type="text"
                    placeholder="Search by vehicle model or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                                    <div className="d-flex justify-content-between">
                                        <Button onClick={() => handleEditRental(rental)} variant="primary">Edit
                                            Rental</Button>
                                        <Button onClick={() => handleCancelRental(rental)} variant="danger">Cancel
                                            Rental</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
            {/* Pagination Controls */}
            <div className="d-flex justify-content-between mt-4">
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
            {/* Edit Rental Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Rental</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="pickUp">
                            <Form.Label>Pick-Up Branch</Form.Label>
                            <Form.Control
                                as="select"
                                name="pickUp"
                                value={editFormData.pickUp}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Branch</option>
                                {branches.map((branch) => (
                                    <option key={branch.branchId} value={branch.branchId}>
                                        {branch.branchName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="dropOff">
                            <Form.Label>Drop-Off Branch</Form.Label>
                            <Form.Control
                                as="select"
                                name="dropOff"
                                value={editFormData.dropOff}
                                onChange={handleInputChange}
                            >
                                <option value="">Select Branch</option>
                                {branches.map((branch) => (
                                    <option key={branch.branchId} value={branch.branchId}>
                                        {branch.branchName}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="rentDate">
                            <Form.Label>Rent Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="rentDate"
                                value={editFormData.rentDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="returnDate">
                            <Form.Label>Return Date</Form.Label>
                            <Form.Control
                                type="date"
                                name="returnDate"
                                value={editFormData.returnDate}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={confirmEditRental}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Cancel Rental Modal */}
            <Modal show={showCancelModal} onHide={() => setShowCancelModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancel Rental</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="cancellationReason">
                            <Form.Label>Reason for Cancellation</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                name="reason"
                                value={cancellation.reason}
                                onChange={(e) => setCancellation({...cancellation, reason: e.target.value})}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={confirmCancelRental}>
                        Confirm Cancellation
                    </Button>
                    <Button variant="danger" onClick={() => setShowCancelModal(false)}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default RentedTrucksList;
