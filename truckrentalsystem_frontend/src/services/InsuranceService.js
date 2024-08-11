import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/insurance";

// Fetch all insurances
export const getAllInsurance = () => axios.get(`${REST_API_BASE_URL}/getAll`);

// Fetch a specific insurance by its insuranceID
export const getInsuranceById = (insuranceID) => axios.get(`${REST_API_BASE_URL}/read/${insuranceID}`);

// Create a new insurance
export const createInsurance = (insurance) => axios.post(`${REST_API_BASE_URL}/create`, insurance);

// Update an existing insurance
export const updateInsurance = (insuranceID, insurance) => axios.put(`${REST_API_BASE_URL}/update/${insuranceID}`, insurance);

// Delete a insurance by its insuranceID
export const deleteInsuranceById = (insuranceID) => axios.delete(`${REST_API_BASE_URL}/delete/${insuranceID}`);