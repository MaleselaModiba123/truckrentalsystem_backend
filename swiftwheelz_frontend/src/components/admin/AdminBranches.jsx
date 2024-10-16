import React, { useState, useEffect } from 'react';
import { Button, Form, Table, Modal, InputGroup, FormControl } from 'react-bootstrap';
import { createBranch, deleteBranchById, getAllBranches, updateBranch } from "../../services/BranchService.js";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEdit, faSearch, faTrashAlt} from '@fortawesome/free-solid-svg-icons';

function AdminBranches() {
    const [branches, setBranches] = useState([]);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [newBranch, setNewBranch] = useState({
        branchName: '',
        address: ''
    });
    const [editing, setEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        const response = await getAllBranches();
        setBranches(response.data);
        setFilteredBranches(response.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBranch({ ...newBranch, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editing) {
            await updateBranch(newBranch.branchId, newBranch);
        } else {
            await createBranch(newBranch);
        }
        setEditing(false);
        setShowModal(false);
        fetchBranches();
    };

    const handleEdit = (branch) => {
        setNewBranch(branch);
        setEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (branchId) => {
        await deleteBranchById(branchId);
        fetchBranches();
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        const filtered = branches.filter(branch =>
            branch.branchName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            branch.address.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredBranches(filtered);
    };

    const handleAdd = () => {
        setNewBranch({
            branchName: '',
            address: ''
        });
        setEditing(false);
        setShowModal(true);
    };

    return (
        <div className="container mt-4 ">
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

                    .search-input {
                        position: relative;
                        width: 100%;
                    }

                    .search-input .form-control {
                        padding-left: 40px; /* Adjust for the icon space */
                    }

                    .search-input .search-icon {
                        position: absolute;
                        left: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                        color: #007bff; /* Icon color */ 
                    }
                `}
            </style>
            <h2 className="mb-4 d-flex ">Branches</h2>

            <InputGroup className="mb-3" style={{maxWidth: '800px', margin: '0'}}>
                <InputGroup.Text className="search-icon">
                    <FontAwesomeIcon icon={faSearch} />
                </InputGroup.Text>
                <FormControl
                    placeholder="Search Branches..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <Button variant="primary" onClick={handleAdd} style={{fontSize: '1.1rem', padding: '0.4rem 0.8rem'}}>Add
                    New Branch</Button>
            </InputGroup>

            <Table striped bordered hover className="table-sm" style={{maxWidth: '800px', margin: '0 '}}>
                <thead>
                <tr>
                    <th>Branch Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {filteredBranches.map((branch) => (
                    <tr key={branch.branchId}>
                        <td>{branch.branchName}</td>
                        <td>{branch.address}</td>
                        <td>
                            <Button variant="warning" onClick={() => handleEdit(branch)} className="me-2">  <FontAwesomeIcon icon={faEdit}/></Button>
                            <Button variant="danger" onClick={() => handleDelete(branch.branchId)}> <FontAwesomeIcon icon={faTrashAlt}/></Button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>


            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <div className="d-flex justify-content-center w-100">
                        <Modal.Title>{editing ? 'Edit Branch' : 'Add New Branch'}</Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} style={{maxWidth: '500px', margin: '0 auto'}}>
                        <Form.Group className="mb-3">
                            <Form.Label>Branch Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="branchName"
                                value={newBranch.branchName}
                                onChange={handleChange}
                                placeholder="Enter branch name"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                name="address"
                                value={newBranch.address}
                                onChange={handleChange}
                                placeholder="Enter address"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            {editing ? 'Update' : 'Add'} Branch
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default AdminBranches;
