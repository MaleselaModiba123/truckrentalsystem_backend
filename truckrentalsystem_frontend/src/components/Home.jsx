import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTrucks, getTruckImageUrl } from "../services/TruckService.js";
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';

const Home = () => {
    const [trucks, setTrucks] = useState([]);
    const [filteredTrucks, setFilteredTrucks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getAllTrucks()
            .then(response => {
                const trucksWithImages = response.data.map(truck => ({
                    ...truck,
                    image: getTruckImageUrl(truck.vin)
                }));
                setTrucks(trucksWithImages);
                setFilteredTrucks(trucksWithImages);
            })
            .catch(error => {
                console.error('There was an error fetching the trucks!', error);
            });
    }, []);

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);
        filterTrucks(query);
    };

    const filterTrucks = (query) => {
        const filtered = trucks.filter(truck =>
            truck.model.toLowerCase().includes(query) ||
            truck.licensePlate.toLowerCase().includes(query)
        );
        setFilteredTrucks(filtered);
    };

    const handleGetQuote = (truckId) => {
        navigate(`/get-quote/${truckId}`);
    };

    return (
        <div className="home">
            {/* Keep the header section */}
            <div className="header-section1 text-center mb-4">
                <h1>UNBEATABLE TRUCK HIRE, EASY BOOKINGS</h1>
                <p>Rent a Truck Simply. No Stress Meet & Greet Truck Hire in South Africa</p>
            </div>

            {/* Truck listing and search functionality without the "Our Trucks" text and picture */}
            <Container className="rent-trucks mt-4">
                <Form.Group className="mb-4">
                    <InputGroup>
                        <Form.Control
                            type="text"
                            placeholder="Search by model or license plate"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <Button variant="outline-secondary">Search</Button>
                    </InputGroup>
                </Form.Group>
                <Row className="g-4">
                    {filteredTrucks.map((truck) => (
                        <Col md={4} lg={3} key={truck.vin}>
                            <Card className="d-flex flex-column h-100">
                                <Card.Img variant="top" src={truck.image} alt={`Truck ${truck.model}`} />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title>{truck.model}</Card.Title>
                                    <Card.Text className="flex-grow-1">
                                        <strong>Type:</strong> {truck.truckType.typeName} <br/>
                                        <strong>Capacity:</strong> {truck.truckType.capacity} tons <br/>
                                        <strong>Transmission:</strong> {truck.truckType.transmission} <br/>
                                        <strong>Fuel Consumption:</strong> {truck.truckType.fuelConsumption} km/l <br/>
                                        <strong>Fuel Type:</strong> {truck.truckType.fuelType} <br/>
                                        <strong>Mileage:</strong> {truck.currentMileage} km <br/>
                                        <strong>Dimensions (l*w*h):</strong> {truck.truckType.dimensions}m <br/>
                                        <strong>License Plate:</strong> {truck.licensePlate}
                                    </Card.Text>
                                    <Button variant="primary" onClick={() => handleGetQuote(truck.vin)}>Get Quote</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Home;

