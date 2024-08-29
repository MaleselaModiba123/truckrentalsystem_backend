import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTrucks, getTruckImageUrl } from "../services/TruckService.js";
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { FaTruck, FaCogs, FaTachometerAlt, FaOilCan, FaGasPump, FaWeight } from 'react-icons/fa';

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
            truck.model.toLowerCase().includes(query)
        );
        setFilteredTrucks(filtered);
    };

    const handleGetQuote = (truckId) => {
        navigate(`/get-quote/${truckId}`);
    };

    return (
        <Container className="rent-trucks mt-4">
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
                `}
            </style>
            <div className="header-section text-center mb-4">
                <h1>Our Trucks</h1>
                <p>Discover amazing trucks at affordable rates</p>
            </div>
            <div className="intro-section text-center mb-4">
                <h2>Our trucks for hire across South Africa</h2>
                <p>Rental Trucks provide an extensive range of quality trucks for hire across South Africa. Browse our
                    selection of truck rentals.</p>
            </div>
            <Form.Group className="mb-4">
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Search by model"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <Button variant="outline-secondary">Search</Button>
                </InputGroup>
            </Form.Group>
            <Row className="g-4">
                {filteredTrucks.map((truck) => (
                    <Col md={4} lg={4} key={truck.vin}> {/* Set Col to 4 for both md and lg */}
                        <Card style={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            border: '1px solid #ddd',
                            padding: '24px',
                            borderRadius: '12px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                        }}>
                            <Card.Img variant="top" src={truck.image} alt={`Truck ${truck.model}`}
                                      style={{marginBottom: '16px'}}/>
                            <Card.Body style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                flexGrow: 1
                            }}>
                                <div>
                                    <Card.Title style={{
                                        fontSize: '1.5rem',
                                        fontWeight: 'bold',
                                        color: '#002e7a'
                                    }}>{truck.model}</Card.Title>
                                    <Card.Text style={{marginBottom: '16px', lineHeight: '1.5'}}>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                            <FaTruck style={{marginRight: '8px', color: '#002e7a'}}/>
                                            <span><strong>Type:</strong> {truck.truckType.typeName}</span>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                            <FaWeight style={{marginRight: '8px', color: '#002e7a'}}/>
                                            <span><strong>Capacity:</strong> {truck.truckType.capacity} tons</span>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                            <FaCogs style={{marginRight: '8px', color: '#002e7a'}}/>
                                            <span><strong>Transmission:</strong> {truck.truckType.transmission}</span>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                            <FaTachometerAlt style={{marginRight: '8px', color: '#002e7a'}}/>
                                            <span><strong>Fuel Consumption:</strong> {truck.truckType.fuelConsumption} km/l</span>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                            <FaGasPump style={{marginRight: '8px', color: '#002e7a'}}/>
                                            <span><strong>Fuel Type:</strong> {truck.truckType.fuelType}</span>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                            <FaOilCan style={{marginRight: '8px', color: '#002e7a'}}/>
                                            <span><strong>Mileage:</strong> {truck.currentMileage} km</span>
                                        </div>
                                        <div style={{display: 'flex', alignItems: 'center', marginBottom: '8px'}}>
                                            <FaTruck style={{marginRight: '8px', color: '#002e7a'}}/>
                                            <span><strong>Dimensions:</strong> {truck.truckType.dimensions}m</span>
                                        </div>
                                    </Card.Text>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 'auto'}}>
                                    <Button
                                        variant="primary"
                                        onClick={() => handleGetQuote(truck.vin)}
                                        style={{
                                            backgroundColor: '#002e7a',
                                            borderColor: '#002e7a',
                                            borderRadius: '4px',
                                            padding: '10px 20px'
                                        }}
                                    >
                                        Get Quote
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Home;
