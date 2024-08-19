import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/truck";

// Fetch all trucks
export const getAllTrucks = () => axios.get(`${REST_API_BASE_URL}/getAll`);

// Fetch a truck by ID (VIN)
export const getTruckById = (vin) => axios.get(`${REST_API_BASE_URL}/read/${vin}`);

// Create a truck
export const createTruck = (truckData, photo) => {
    const formData = new FormData();
    // Append the truck data as a JSON blob
    formData.append('truck', new Blob([JSON.stringify(truckData)], {type: 'application/json'}));
    if (photo) {
        formData.append('photo', photo); // Append the photo if it exists
    }
    return axios.post(`${REST_API_BASE_URL}/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // Set the correct content type
        }
    });
};
// Update a truck
export const updateTruck = (vin, truckData, photo) => {
    const formData = new FormData();
    formData.append('truck', new Blob([JSON.stringify(truckData)], {type: 'application/json'}));
    if (photo) {
        formData.append('photo', photo);
    }
    return axios.put(`${REST_API_BASE_URL}/update/${vin}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

// Delete a truck by ID (VIN)
export const deleteTruckById = (vin) => axios.delete(`${REST_API_BASE_URL}/delete/${vin}`);
