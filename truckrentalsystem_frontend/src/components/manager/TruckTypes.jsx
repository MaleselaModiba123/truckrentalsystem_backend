// components/TruckTypes.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Updated import for navigation
import { createTruckType, getAllTruckTypes, updateTruckType } from '../../services/TruckTypeService.js';

function TruckTypes() {
    const [truckTypes, setTruckTypes] = useState([]);
    const [formState, setFormState] = useState({
        typeName: '',
        description: '',
        dimensions: '',
        capacity: 0,
        transmission: '',
        fuelConsumption: 0,
        fuelType: ''
    });
    const [selectedTruckType, setSelectedTruckType] = useState(null);
    const navigate = useNavigate(); // Updated hook for navigation
    const location = useLocation();

    useEffect(() => {
        fetchTruckTypes();

        // Get newTruckTypeId from location state if available
        if (location.state && location.state.newTruckTypeId) {
            setFormState({
                ...formState,
                truckTypeId: location.state.newTruckTypeId
            });
        }
    }, [location.state]);

    const fetchTruckTypes = async () => {
        try {
            const response = await getAllTruckTypes();
            setTruckTypes(response.data);
        } catch (error) {
            console.error('Error fetching truck types:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        setFormState({
            ...formState,
            [name]: type === 'number' ? parseFloat(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = selectedTruckType
                ? await updateTruckType(selectedTruckType.truckTypeId, formState)
                : await createTruckType(formState);

            if (!selectedTruckType) {
                // Redirect back to Trucks component with the newly created truckTypeId
                const newTruckTypeId = response.data.truckTypeId;
                navigate('/trucks', { state: { newTruckTypeId } });
            } else {
                // For editing, just redirect back to the TruckTypes list
                navigate('/truck-types');
            }
        } catch (error) {
            console.error('Error submitting truck type:', error);
        }
    };

    return (
        <div className="container mt-6" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Truck Types</h2>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="form-group">
                    <label>Type Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="typeName"
                        value={formState.typeName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formState.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Dimensions (Length*Width*Height in meters)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="dimensions"
                        value={formState.dimensions}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Capacity (tons)</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="capacity"
                        value={formState.capacity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Transmission</label>
                    <input
                        type="text"
                        className="form-control"
                        name="transmission"
                        value={formState.transmission}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fuel Consumption (km per liter)</label>
                    <input
                        type="number"
                        step="0.01"
                        className="form-control"
                        name="fuelConsumption"
                        value={formState.fuelConsumption}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Fuel Type</label>
                    <input
                        type="text"
                        className="form-control"
                        name="fuelType"
                        value={formState.fuelType}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {selectedTruckType ? 'Update' : 'Add'} Truck Type
                </button>
            </form>
            <ul className="list-group">
                {truckTypes.map((truckType) => (
                    <li key={truckType.truckTypeId} className="list-group-item">
                        {truckType.typeName} - {truckType.description}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TruckTypes;
