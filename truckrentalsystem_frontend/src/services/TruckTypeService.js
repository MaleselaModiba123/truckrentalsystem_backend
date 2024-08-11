import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/truckType";

// Fetch all truck types
export const getAllTruckTypes = () => axios.get(`${REST_API_BASE_URL}/getAll`);

// Fetch a specific truck type by its ID
export const getTruckTypeById = (truckTypeId) => axios.get(`${REST_API_BASE_URL}/read/${truckTypeId}`);

// Create a new truck type
export const createTruckType = (truckType) => axios.post(`${REST_API_BASE_URL}/create`, truckType);

// Update an existing truck type
export const updateTruckType = (truckTypeId, truckType) => axios.put(`${REST_API_BASE_URL}/update/${truckTypeId}`, truckType);

// Delete a truck type by its ID
export const deleteTruckTypeById = (truckTypeId) => axios.delete(`${REST_API_BASE_URL}/delete/${truckTypeId}`);
