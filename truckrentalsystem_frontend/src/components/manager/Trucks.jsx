// components/Trucks.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTruck, deleteTruckById, getAllTrucks, updateTruck } from '../../services/TruckService.js';
import { getAllTruckTypes } from '../../services/TruckTypeService.js';

function Trucks() {
    const [trucks, setTrucks] = useState([]);
    const [truckTypes, setTruckTypes] = useState([]);
    const [newTruck, setNewTruck] = useState({
        vin: '', // This field will be auto-generated
        model: '',
        photo: null,
        availability: true, // Always set to true
        licensePlate: '',
        currentMileage: 0,
        truckTypeId: '', // ID of the selected truck type
        insurance: ''
    });
    const [editing, setEditing] = useState(false);
    const [photoPreview, setPhotoPreview] = useState(null);
    const navigate = useNavigate(); // Updated hook for navigation
    const location = useLocation();

    useEffect(() => {
        fetchTrucks();
        fetchTruckTypes();

        // Get newTruckTypeId from location state if available
        if (location.state && location.state.newTruckTypeId) {
            setNewTruck({
                ...newTruck,
                truckTypeId: location.state.newTruckTypeId
            });
        }
    }, [location.state]);

    const fetchTrucks = async () => {
        try {
            const response = await getAllTrucks();
            setTrucks(response.data);
        } catch (error) {
            console.error('Error fetching trucks:', error);
        }
    };

    const fetchTruckTypes = async () => {
        try {
            const response = await getAllTruckTypes();
            setTruckTypes(response.data);
        } catch (error) {
            console.error('Error fetching truck types:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTruck({
            ...newTruck,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        setNewTruck({ ...newTruck, photo: file });
        setPhotoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        for (const key in newTruck) {
            if (key !== 'vin') { // VIN is auto-generated and should not be included
                formData.append(key, newTruck[key]);
            }
        }
        try {
            if (editing) {
                await updateTruck(newTruck.vin, formData);
            } else {
                await createTruck(formData);
            }
            setEditing(false);
            setPhotoPreview(null);
            setNewTruck({
                vin: '', // Reset VIN
                model: '',
                photo: null,
                availability: true, // Always true
                licensePlate: '',
                currentMileage: 0,
                truckTypeId: '',
                insurance: ''
            });
            fetchTrucks();
        } catch (error) {
            console.error('Error submitting truck:', error);
        }
    };

    const handleEdit = (truck) => {
        setNewTruck({
            vin: truck.vin,
            model: truck.model,
            photo: truck.photo,
            availability: truck.availability,
            licensePlate: truck.licensePlate,
            currentMileage: truck.currentMileage,
            truckTypeId: truck.truckType?.truckTypeId || '',
            insurance: truck.insurance
        });
        setPhotoPreview(`data:image/jpeg;base64,${truck.photo}`);
        setEditing(true);
    };

    const handleDelete = async (vin) => {
        try {
            await deleteTruckById(vin);
            fetchTrucks();
        } catch (error) {
            console.error('Error deleting truck:', error);
        }
    };

    const handleAddTruckType = () => {
        navigate('/truck-types'); // Updated navigation method
    };

    const selectedTruckType = truckTypes.find(type => type.truckTypeId === parseInt(newTruck.truckTypeId));

    return (
        <div className="container mt-6" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Trucks</h2>
            <button className="btn btn-secondary mb-4" onClick={handleAddTruckType}>
                Add Truck Type
            </button>
            <form onSubmit={handleSubmit} className="mb-4">
                {/* Form Fields */}
                <div className="form-group">
                    <label>Model</label>
                    <input
                        type="text"
                        className="form-control"
                        name="model"
                        value={newTruck.model}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Photo</label>
                    <input
                        type="file"
                        className="form-control"
                        name="photo"
                        onChange={handlePhotoChange}
                    />
                    {photoPreview && <img src={photoPreview} alt="Preview" style={{ width: '100px', height: '100px' }} />}
                </div>
                <div className="form-row mb-3">
                    <div className="col">
                        <label htmlFor="availability" style={{ marginRight: '10px' }}>Available</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="availability"
                            checked={newTruck.availability} // Always true
                            onChange={handleChange} // This will not actually change the state
                            disabled // Disable the checkbox
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label>License Plate</label>
                    <input
                        type="text"
                        className="form-control"
                        name="licensePlate"
                        value={newTruck.licensePlate}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Current Mileage</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="currentMileage"
                        value={newTruck.currentMileage}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Truck Type</label>
                    <select
                        className="form-control"
                        name="truckTypeId"
                        value={newTruck.truckTypeId}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Truck Type</option>
                        {truckTypes.map(type => (
                            <option key={type.truckTypeId} value={type.truckTypeId}>
                                {type.typeName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Insurance</label>
                    <input
                        type="text"
                        className="form-control"
                        name="insurance"
                        value={newTruck.insurance}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {editing ? 'Update' : 'Add'} Truck
                </button>
            </form>
            <ul className="list-group">
                {trucks.map((truck) => (
                    <li key={truck.vin} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{truck.model} - {truck.licensePlate} - {truck.availability ? 'Available' : 'Not Available'}</span>
                        <div>
                            <button className="btn btn-secondary btn-sm mr-2" onClick={() => handleEdit(truck)}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(truck.vin)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Trucks;
