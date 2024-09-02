import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, FormControl, InputGroup, Modal, Table } from 'react-bootstrap';
import { createContactUs, deleteContactUsById, updateContactUs, getContactUsId } from "../../services/ContactUsService.js";
import { getAllBranches } from "../../services/BranchService.js";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchIcon from '@mui/icons-material/Search';
function AdminContactUs() {
    const [contactUs, setContactUs] = useState([]);
    const [filteredContactUs, setFilteredContactUs] = useState([]);
    const [branches, setBranches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newContactUs, setNewContactUs] = useState({
        email: '',
        phone: '',
        address: '',
        businessHours: ''
    });
    const [editing, setEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetchContactUs();
        fetchBranches();
    }, []);

    const fetchContactUs = async () => {
        try {
            const data = await getContactUsId();
            setContactUs(data);
            setFilteredContactUs(data);
        } catch (error) {
            setError('Failed to fetch contact information.');
        }
    };

    const fetchBranches = async () => {
        try {
            const response = await getAllBranches();
            setBranches(response.data);
        } catch (error) {
            setError('Failed to fetch branches.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContactUs({ ...newContactUs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            if (editing) {
                await updateContactUs(newContactUs.contactUsId, newContactUs);
                setSuccess('Contact information updated successfully!');
            } else {
                await createContactUs(newContactUs);
                setSuccess('New contact information added successfully!');
            }
            setEditing(false);
            setShowModal(false);
            fetchContactUs();
        } catch (error) {
            setError('Failed to save contact information.');
        }
    };

    const handleEdit = (contact) => {
        setNewContactUs(contact);
        setEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (contactUsId) => {
        if (window.confirm('Are you sure you want to delete this contact information?')) {
            try {
                await deleteContactUsById(contactUsId);
                fetchContactUs();
            } catch (error) {
                setError('Failed to delete contact information.');
            }
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = contactUs.filter(contact =>
            contact.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
            contact.phone.toLowerCase().includes(e.target.value.toLowerCase()) ||
            contact.address.toLowerCase().includes(e.target.value.toLowerCase()) ||
            contact.businessHours.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredContactUs(filtered);
    };

    const handleAdd = () => {
        setNewContactUs({
            email: '',
            phone: '',
            address: '',
            businessHours: ''
        });
        setEditing(false);
        setShowModal(true);
    };

    return (
        <div className="container mt-4">
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
                        position: relative;
                        max-width: 800px;
                        margin: 0;
                    }

                    .search-icon {
                        position: absolute;
                        top: 50%;
                        left: 10px;
                        transform: translateY(-50%);
                        color: #6c757d; /* Bootstrap's text-secondary color */
                    }

                    .search-input {
                        padding-left: 35px; /* Adjust padding to fit the icon */
                    }
                `}
            </style>
            <h2 className="mb-4 d-flex">Manage Contact Us</h2>

            <InputGroup className="mb-3" style={{maxWidth: '800px', margin: '0'}}>
                <InputGroup.Text>
                    <SearchIcon />
                </InputGroup.Text>
                <FormControl
                    placeholder="Search Contact Us Information..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button variant="primary" onClick={handleAdd} style={{fontSize: '1.1rem', padding: '0.4rem 0.8rem'}}>
                    Add Contact Us
                </Button>
            </InputGroup>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Table striped bordered hover className="table-sm" style={{maxWidth: '800px', margin: '0'}}>
                <thead>
                <tr>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Business Hours</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredContactUs.map((contact) => (
                    <tr key={contact.contactUsId}>
                        <td>{contact.email}</td>
                        <td>{contact.phone}</td>
                        <td>{contact.address}</td>
                        <td>{contact.businessHours}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEdit(contact)} className="me-2"><FontAwesomeIcon icon={faEdit}/></Button>
                            <Button variant="danger" onClick={() => handleDelete(contact.contactUsId)}><FontAwesomeIcon icon={faTrashAlt}/></Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/*<div style={{textAlign: 'center'}}>*/}
            {/*    <Button*/}
            {/*        variant="primary"*/}
            {/*        onClick={handleAdd}*/}
            {/*        style={{fontSize: '1.1rem', padding: '0.4rem 0.8rem'}}*/}
            {/*    >*/}
            {/*        Add Contact Us*/}
            {/*    </Button>*/}
            {/*</div>*/}

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <div className="d-flex justify-content-center w-100">
                        <Modal.Title>{editing ? 'Update Contact Us' : 'Add Contact Us'}</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} style={{maxWidth: '500px', margin: '0 auto'}}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={newContactUs.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={newContactUs.phone}
                                onChange={handleChange}
                                placeholder="Enter phone number"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Business Hours</Form.Label>
                            <Form.Control
                                type="text"
                                name="businessHours"
                                value={newContactUs.businessHours}
                                onChange={handleChange}
                                placeholder="Enter business hours"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="select"
                                name="address"
                                value={newContactUs.address}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select a branch</option>
                                {branches.map(branch => (
                                    <option key={branch.branchId} value={branch.address}>
                                        {branch.address}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {editing ? 'Update' : 'Add'} Contact Us
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AdminContactUs;
