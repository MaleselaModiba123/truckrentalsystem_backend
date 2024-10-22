import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    createTruck,
    deleteTruck,
    getAllTrucks,
    getTruckByVin,
    getTruckImageUrl,
    updateTruck
} from '../../services/TruckService.js';
import {getAllTruckTypes} from '../../services/TruckTypeService.js';
import {getAllInsurance} from '../../services/InsuranceService.js';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import {FaSearch} from "react-icons/fa";

const Trucks = () => {
    const [trucks, setTrucks] = useState([]);
    const [filteredTrucks, setFilteredTrucks] = useState([]);
    const [truckTypes, setTruckTypes] = useState([]);
    const [insurances, setInsurances] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const errorTimeoutRef = useRef(null);
    const [formState, setFormState] = useState({
        model: '',
        truckImage: null,
        availability: true,
        licensePlate: '',
        currentMileage: '',
        truckTypeId: '',
        insuranceId: ''
    });
    const [selectedTruck, setSelectedTruck] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [truckToDelete, setTruckToDelete] = useState(null);
    const [showUpdateConfirm, setShowUpdateConfirm] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [messageType, setMessageType] = useState(''); // 'success' or 'error'
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const trucksPerPage = 6;
    const token = localStorage.getItem('token');
    useEffect(() => {
        fetchTrucks();
        fetchTruckTypes();
        fetchInsurances();
    }, []);

    const filterTrucks = useCallback(() => {
        if (searchTerm) {
            const filtered = trucks.filter(truck =>
                truck.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                truck.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
                truck.vin.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredTrucks(filtered);
        } else {
            setFilteredTrucks(trucks);
        }
    }, [searchTerm, trucks]);

    useEffect(() => {
        filterTrucks();
    }, [filterTrucks]);

    const fetchTrucks = async () => {
        try {
            const response = await getAllTrucks(token);
            setTrucks(response.data);
        } catch (error) {
            console.error("Error fetching trucks:", error);
        }
    };

    const fetchTruckTypes = async () => {
        try {
            const response = await getAllTruckTypes(token);
            setTruckTypes(response.data);
        } catch (error) {
            console.error("Error fetching truck types:", error);
        }
    };

    const fetchInsurances = async () => {
        try {
            const response = await getAllInsurance(token);
            setInsurances(response.data);
        } catch (error) {
            console.error("Error fetching insurances:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const allowedTypes = ['image/jpeg', 'image/png'];
            if (allowedTypes.includes(file.type)) {
        setFormState(prevState => ({
            ...prevState,
            truckImage: file
        }));

        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
                reader.readAsDataURL(file);
                setErrorMessage('');
            } else {
                setErrorMessage('Please select a JPEG or PNG image.');
                setFormState(prevState => ({
                    ...prevState,
                    truckImage: null
                }));
                setImagePreview(null);
                e.target.value = ''; // Clear the file input

                // Clear any existing timeout
                if (errorTimeoutRef.current) {
                    clearTimeout(errorTimeoutRef.current);
                }

                // Set a new timeout to clear the error message after 3 seconds
                errorTimeoutRef.current = setTimeout(() => {
                    setErrorMessage('');
                }, 2000);

            }
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedTruck) {
                setShowUpdateConfirm(true);
            } else {
                await createTruck(formState, token);
                setConfirmationMessage('Truck created successfully!');
                setMessageType('success');
                fetchTrucks();
                clearForm();
            }
        } catch (error) {
            console.error("Error saving truck:", error);
            if (error.response) {
                if (error.response.status === 401) {
                    // inspect the error message returned by the server
                    if (error.response.data && error.response.data.message) {
                        setErrorMessage(error.response.data.message);
                    } else {
                        setErrorMessage('A truck with this license plate already exists.');
                    }
                } else {
                    setErrorMessage('Error saving truck. Please try again.');
                }
            } else {
                setErrorMessage('Network error. Please try again later.');
            }


            setConfirmationMessage('');
            setMessageType('error');
            // Clear the error message after 3 seconds
            if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current);
            }
            errorTimeoutRef.current = setTimeout(() => {
                setErrorMessage('');
            }, 3000);

        }
        setTimeout(() => setConfirmationMessage(''), 3000);
    };

    const confirmUpdate = async () => {
        try {
            await updateTruck({...formState, vin: selectedTruck.vin}, token);
            setConfirmationMessage('Truck updated successfully!');
            setMessageType('success');
            setShowUpdateConfirm(false);
            fetchTrucks();
            clearForm();
        } catch (error) {
            console.error("Error updating truck:", error);
            setConfirmationMessage('Error updating truck.');
            setMessageType('error');
        }
        setTimeout(() => setConfirmationMessage(''), 3000);
    };

    const clearForm = () => {
        setFormState({
            model: '',
            truckImage: null,
            availability: true,
            licensePlate: '',
            currentMileage: '',
            truckTypeId: '',
            insuranceId: ''
        });
        setSelectedTruck(null);
        setImagePreview(null);
        document.getElementById('truckImage').value = '';
    };

    const handleDelete = (vin) => {
        setTruckToDelete(vin);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteTruck(truckToDelete, token);
            setConfirmationMessage('Truck deleted successfully!');
            setMessageType('success');
            fetchTrucks();
        } catch (error) {
            console.error("Error deleting truck:", error);
            setConfirmationMessage('Error deleting truck.');
            setMessageType('error');
        }
        setShowDeleteModal(false);
        setTimeout(() => setConfirmationMessage(''), 3000);
    };

    const handleSelectTruck = async (vin) => {
        try {
            const response = await getTruckByVin(vin);
            setFormState({
                model: response.data.model,
                truckImage: null,
                availability: response.data.availability,
                licensePlate: response.data.licensePlate,
                currentMileage: response.data.currentMileage,
                truckTypeId: response.data.truckType.truckTypeId,
                insuranceId: response.data.insurance.insuranceID
            });
            setImagePreview(getTruckImageUrl(vin));
            setSelectedTruck(response.data);
        } catch (error) {
            console.error("Error selecting truck:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to the first page on search
    };

    // Pagination
    const indexOfLastTruck = currentPage * trucksPerPage;
    const indexOfFirstTruck = indexOfLastTruck - trucksPerPage;
    const currentTrucks = filteredTrucks.slice(indexOfFirstTruck, indexOfLastTruck);
    const totalPages = Math.ceil(filteredTrucks.length / trucksPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="container mt-5">
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

                    .search-input input {
                        padding-left: 30px; /* Space for the icon */
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
            <h1 className="mb-4">Truck Management</h1>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={handleSubmit} style={{
                        backgroundColor: '#f8f9fa',
                        padding: '20px',
                        borderRadius: '5px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
                    }}>
                        <div className="form-group">
                            <label htmlFor="model">Model</label>
                            <input
                                type="text"
                                className="form-control"
                                id="model"
                                name="model"
                                value={formState.model}
                                onChange={handleChange}
                                placeholder="Model"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="truckImage">Truck Image</label>
                            <input
                                type="file"
                                className="form-control-file"
                                id="truckImage"
                                name="truckImage"
                                onChange={handleFileChange}
                            />
                            {imagePreview && <img src={imagePreview} alt="Preview" style={{
                                width: '50px',
                                height: '50px',
                                marginTop: '10px',
                                borderRadius: '5px'
                            }}/>}
                            {errorMessage && (
                                <div className="alert alert-danger mt-2">
                                    {errorMessage}
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="availability"
                                    name="availability"
                                    checked={formState.availability}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label" htmlFor="availability">Available</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="licensePlate">License Plate</label>
                            <input
                                type="text"
                                className="form-control"
                                id="licensePlate"
                                name="licensePlate"
                                value={formState.licensePlate}
                                onChange={handleChange}
                                placeholder="License Plate"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="currentMileage">Current Mileage</label>
                            <input
                                type="number"
                                className="form-control"
                                id="currentMileage"
                                name="currentMileage"
                                value={formState.currentMileage}
                                onChange={handleChange}
                                placeholder="Current Mileage"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="truckTypeId">Truck Type</label>
                            <select
                                className="form-control"
                                id="truckTypeId"
                                name="truckTypeId"
                                value={formState.truckTypeId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Truck Type</option>
                                {truckTypes?.length > 0 ? (
                                    truckTypes.map(type => (
                                        <option key={type.truckTypeId} value={type.truckTypeId}>
                                            {type.typeName}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>Loading truck types...</option>
                                )}

                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="insuranceId">Insurance</label>
                            <select
                                className="form-control"
                                id="insuranceId"
                                name="insuranceId"
                                value={formState.insuranceId}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Insurance</option>
                                {insurances?.length > 0 ? (
                                    insurances.map(ins => (
                                        <option key={ins.insuranceID} value={ins.insuranceID}>
                                            {ins.provider} - {ins.policyNumber}
                                        </option>
                                    ))
                                ) : (
                                    <option value="" disabled>Loading truck types...</option>
                                )}
                                {/*{insurances.map(ins => (*/}
                                {/*    <option key={ins.insuranceID} value={ins.insuranceID}>*/}
                                {/*        {ins.provider} - {ins.policyNumber}*/}
                                {/*    </option>*/}
                                {/*))}*/}
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            {selectedTruck ? 'Update Truck' : 'Save Truck'}
                        </button>
                    </form>
                    {confirmationMessage && (
                        <div className={`alert ${messageType === 'success' ? 'alert-success' : 'alert-danger'} mt-3`}>
                            {confirmationMessage}
                        </div>
                    )}
                </div>
                <div className="col-md-6">
                    <h2>Existing Trucks</h2>
                    <div className="search-input mb-3">
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Search trucks..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                        <FaSearch className="search-icon"/>
                    </div>
                    <div className="overflow-auto" style={{maxHeight: '500px'}}>
                        <ul className="list-group">
                            {currentTrucks.map(truck => (
                                <li key={truck.vin}
                                    className="list-group-item d-flex justify-content-between align-items-center">
                                    {truck.truckImage && (
                                        <img
                                            src={getTruckImageUrl(truck.vin)}
                                            alt={truck.model}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                marginRight: '10px',
                                                borderRadius: '5px'
                                            }}
                                        />
                                    )}
                                    <div className="d-flex flex-column">
                                        <span><strong>Model:</strong> {truck.model}</span>
                                        <span><strong>Type:</strong> {truck.truckType.typeName}</span>
                                        <span><strong>VIN:</strong> {truck.vin}</span>
                                        <span><strong>License Plate:</strong> {truck.licensePlate}</span>
                                        <span><strong>Mileage:</strong> {truck.currentMileage} km</span>
                                        <span><strong>Availability:</strong> {truck.availability ? 'Available' : 'Not Available'}</span>
                                        <span><strong>Insurance:</strong> {truck.insurance.provider} - {truck.insurance.policyNumber}</span>

                                    </div>
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => handleSelectTruck(truck.vin)}
                                        >
                                            <FontAwesomeIcon icon={faEdit}/>
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm ml-2"
                                            onClick={() => handleDelete(truck.vin)}
                                            style={{marginLeft: '8px'}}
                                        >
                                            <FontAwesomeIcon icon={faTrashAlt}/>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* Pagination Controls */}
                    <nav aria-label="Page navigation">
                        <ul className="pagination mt-3">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages).keys()].map(num => (
                                <li key={num} className={`page-item ${currentPage === num + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(num + 1)}>
                                        {num + 1}
                                    </button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <div className={`modal fade ${showDeleteModal ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Delete</h5>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this truck?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}>Cancel
                            </button>
                            <button type="button" className="btn btn-danger" onClick={confirmDelete}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Update Confirmation Modal */}
            <div className={`modal fade ${showUpdateConfirm ? 'show d-block' : ''}`} tabIndex="-1" role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Update</h5>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to update this truck?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary"
                                    onClick={() => setShowUpdateConfirm(false)}>Cancel
                            </button>
                            <button type="button" className="btn btn-primary" onClick={confirmUpdate}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Trucks;
