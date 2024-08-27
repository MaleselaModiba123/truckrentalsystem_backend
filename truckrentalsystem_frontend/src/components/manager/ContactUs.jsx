import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { createContactUs, deleteContactUsById, getContactUs, updateContactUs } from "../../services/ContactUsService.js";

function ContactUs() {
    const [contactUs, setContactUs] = useState([]);
    const [filteredContactUs, setFilteredContactUs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newContactUs, setNewContactUs] = useState({
        email: '',
        phone: '',
        address: '',
        businessHours: ''
    });
    const [editing, setEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchContactUs();
    }, []);

    const fetchContactUs = async () => {
        const response = await getContactUs();
        setContactUs(response.data);
        setFilteredContactUs(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewContactUs({ ...newContactUs, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await updateContactUs(newContactUs.contactUsId, newContactUs);
        } else {
            await createContactUs(newContactUs);
        }
        setEditing(false);
        setShowModal(false);
        fetchContactUs();
    };

    const handleEdit = (contactUs) => {
        setNewContactUs(contactUs);
        setEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (contactUsId) => {
        await deleteContactUsById(contactUsId);
        fetchContactUs();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = contactUs.filter(contactUs =>
            contactUs.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
            contactUs.phone.toLowerCase().includes(e.target.value.toLowerCase()) ||
            contactUs.address.toLowerCase().includes(e.target.value.toLowerCase()) ||
            contactUs.businessHours.toLowerCase().includes(e.target.value.toLowerCase())
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
        <div className="container mt-4 " >
            <h2 className="mb-4 d-flex justify-content-center" >Contact Us Update</h2>

            <InputGroup className="mb-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <FormControl
                    placeholder="Search Current Contact Us Information"
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button variant="primary" onClick={handleAdd } style={{ fontSize: '1.1rem', padding: '0.4rem 0.8rem' }} >Update Contact Us</Button>
            </InputGroup>

           <Table striped bordered hover className="table-sm" style={{ maxWidth: '800px', margin: '0 auto' }}>
                          <thead>
                          <tr>
                              <th>Email</th>
                              <th>Phone</th>
                              <th>Address</th>
                              <th>Business Hours</th>
                          </tr>
                          </thead>
                          <tbody>
                          {filteredBranches.map((branch) => (
                              <tr key={branch.branchId}>
                                  <td>{branch.branchName}</td>
                                  <td>{branch.address}</td>
                                  <td>
                                      <Button variant="warning" onClick={() => handleEdit(branch)} className="me-2">Edit</Button>
                                      <Button variant="danger" onClick={() => handleDelete(branch.branchId)}>Delete</Button>
                                  </td>
                              </tr>
                          ))}
                          </tbody>
                      </Table>

                      <div style={{ textAlign: 'center' }}>
                        <Button
                          variant="primary"
                          onClick={handleAdd}
                          style={{ fontSize: '1.1rem', padding: '0.4rem 0.8rem' }}
                        >
                          Update Contact Us
                        </Button>
                      </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <div className="d-flex justify-content-center w-100">
                        <Modal.Title>{editing ? 'Update Contact Us' : 'Update Contact Us'}</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} style={{maxWidth: '500px', margin: '0 auto' }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                value={newContactUs.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                               // required
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
                                 //required
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
                                  // required
                                />
                            </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={newContactUs.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                //required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {editing ? 'Update' : 'Add'} ContactUs
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ContactUs;