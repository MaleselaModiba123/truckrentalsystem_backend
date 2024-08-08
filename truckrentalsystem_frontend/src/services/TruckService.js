import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/truck";

// Fetch all trucks
export const getAllTrucks = () => axios.get(`${REST_API_BASE_URL}/getAll`);

// Fetch a specific truck by its VIN
export const getTruckById = (vin) => axios.get(`${REST_API_BASE_URL}/read/${vin}`);

// Create a new truck
export const createTruck = (truck) => axios.post(`${REST_API_BASE_URL}/create`, truck);

// Update an existing truck
export const updateTruck = (vin, truck) => axios.put(`${REST_API_BASE_URL}/update/${vin}`, truck);

// Delete a truck by its VIN
export const deleteTruckById = (vin) => axios.delete(`${REST_API_BASE_URL}/delete/${vin}`);
