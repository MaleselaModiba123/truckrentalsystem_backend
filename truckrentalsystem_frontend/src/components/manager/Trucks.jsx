import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createTruck, deleteTruckById, getAllTrucks, updateTruck } from '../../services/TruckService.js';
import { getAllTruckTypes } from '../../services/TruckTypeService.js';
import { getAllInsurance } from '../../services/InsuranceService.js';


function Trucks() {
    const [trucks, setTrucks] = useState([]);
    const [truckTypes, setTruckTypes] = useState([]);
    const [insuranceOptions, setInsuranceOptions] = useState([]);
    const [newTruck, setNewTruck] = useState({
        vin: '',
        model: '',
        photo: '',
        availability: true,
        licensePlate: '',
        currentMileage: 0,
        truckTypeId: '',
        insuranceID: ''
    });
    const [editing, setEditing] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        fetchTrucks();
        fetchTruckTypes();
        fetchInsuranceOptions();

        if (location.state && location.state.newTruckTypeId) {
            setNewTruck(prevState => ({
                ...prevState,
                truckTypeId: location.state.newTruckTypeId
            }));
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

    const fetchInsuranceOptions = async () => {
        try {
            const response = await getAllInsurance();
            setInsuranceOptions(response.data);
        } catch (error) {
            console.error('Error fetching insurance options:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewTruck(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handlePhotoChange = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            // Check if the selected file type is PNG, JPEG, or JPG
            const fileType = selectedFile.type;
            if (fileType === 'image/png' || fileType === 'image/jpeg') {
                setPhotoFile(selectedFile);
                setNewTruck(prevState => ({
                    ...prevState,
                    photo: selectedFile.name
                }));

                const reader = new FileReader();
                reader.onloadend = () => {
                    setPhotoPreview(reader.result);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                alert('Please select a PNG, JPEG, or JPG image file.');
                e.target.value = ''; // Clear the input
            }
        } else {
            setPhotoFile(null);
            setPhotoPreview(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            formData.append('truck', JSON.stringify({
                vin: newTruck.vin,
                model: newTruck.model,
                availability: newTruck.availability,
                licensePlate: newTruck.licensePlate,
                currentMileage: newTruck.currentMileage,
                truckTypeId: newTruck.truckTypeId,
                insuranceID: newTruck.insuranceID
            }));

            if (photoFile) {
                formData.append('photo', photoFile);
            }

            // Do not set Content-Type header manually
            if (editing) {
                await updateTruck(formData);
            } else {
                await createTruck(formData);
            }

            setEditing(false);
            setPhotoPreview(null);
            setNewTruck({
                vin: '',
                model: '',
                photo: '',
                availability: true,
                licensePlate: '',
                currentMileage: 0,
                truckTypeId: '',
                insuranceID: ''
            });
            setPhotoFile(null);
            fetchTrucks();
        } catch (error) {
            console.error('Error submitting truck:', error.response ? error.response.data : error.message);
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
            insuranceID: truck.insurance?.insuranceID || ''
        });
        setPhotoPreview(`http://localhost:8080/truckrentalsystem/imageData/${truck.photo}`);
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
        navigate('/manager/truck-types');
    };

    useEffect(() => {
        return () => {
            if (photoPreview) {
                URL.revokeObjectURL(photoPreview);
            }
        };
    }, [photoPreview]);

    return (
        <div className="container mt-6" style={{ maxWidth: '1000px' }}>
            <h2 className="text-center mb-4">Trucks</h2>
            <button className="btn btn-secondary mb-4" onClick={handleAddTruckType}>
                Add Truck Type
            </button>
            <form onSubmit={handleSubmit} className="mb-4">
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
                        accept={".png, .jpeg, .jpg"}
                        type="file"
                        className="form-control"
                        onChange={handlePhotoChange}
                    />
                    {photoPreview && <img src={photoPreview} alt="Preview" style={{ width: '100px', height: '100px', marginTop: '10px' }} />}
                </div>
                <div className="form-row mb-3">
                    <div className="col">
                        <label htmlFor="availability" style={{ marginRight: '10px' }}>Available</label>
                        <input
                            type="checkbox"
                            className="form-check-input"
                            name="availability"
                            checked={newTruck.availability}
                            onChange={handleChange}
                            disabled
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
                                {type.typeName} - {type.dimensions}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Insurance</label>
                    <select
                        className="form-control"
                        name="insuranceID"
                        value={newTruck.insuranceID}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Insurance</option>
                        {insuranceOptions.map(option => (
                            <option key={option.insuranceID} value={option.insuranceID}>
                                {option.provider} - {option.coverage}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">
                    {editing ? 'Update Truck' : 'Create Truck'}
                </button>
            </form>
            <table className="table table-bordered">
                <thead>
                <tr>
                    <th>VIN</th>
                    <th>Model</th>
                    <th>Photo</th>
                    <th>Availability</th>
                    <th>License Plate</th>
                    <th>Current Mileage</th>
                    <th>Truck Type</th>
                    <th>Insurance</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {trucks.map(truck => (
                    <tr key={truck.vin}>
                        <td>{truck.vin}</td>
                        <td>{truck.model}</td>
                        <td>
                            {truck.photo && (
                                <img
                                    src={`http://localhost:8080/truckrentalsystem/imageData/${truck.photo}`}
                                    alt="Truck"
                                    style={{ width: '100px', height: '100px' }}
                                />
                            )}
                        </td>
                        <td>{truck.availability ? 'Yes' : 'No'}</td>
                        <td>{truck.licensePlate}</td>
                        <td>{truck.currentMileage}</td>
                        <td>{truck.truckType?.typeName || ''}</td>
                        <td>{truck.insurance?.provider || ''}</td>
                        <td>
                            <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(truck)}>
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(truck.vin)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default Trucks;
