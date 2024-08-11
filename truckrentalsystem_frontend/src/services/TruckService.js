import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/truck";

// Fetch all trucks
export const getAllTrucks = () => axios.get(`${REST_API_BASE_URL}/getAll`);

// Fetch a truck by ID (VIN)
export const getTruckById = (vin) => axios.get(`${REST_API_BASE_URL}/read/${vin}`);

export const createTruck = (truckData) => {
    return axios.post(`${REST_API_BASE_URL}/create`, truckData);
};

export const updateTruck = (truckData) => {
    return axios.put(`${REST_API_BASE_URL}/update`, truckData);
};

// Delete a truck by ID (VIN)
export const deleteTruckById = (vin) => axios.delete(`${REST_API_BASE_URL}/delete/${vin}`);
