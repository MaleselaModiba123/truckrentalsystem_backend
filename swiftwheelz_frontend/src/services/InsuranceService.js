import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/insurance";

// Helper function to get the token from local storage
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

// Fetch all insurances
export const getAllInsurance = async () => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/getAll`, getAuthHeaders());
        return response.data; // Return the list of insurances
    } catch (error) {
        console.error("Error fetching all insurances:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Fetch a specific insurance by its insuranceID
export const getInsuranceById = async (insuranceID) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/read/${insuranceID}`, getAuthHeaders());
        return response.data; // Return insurance data
    } catch (error) {
        console.error("Error fetching insurance by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Create a new insurance
export const createInsurance = async (insurance) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/create`, insurance, getAuthHeaders());
        return response.data; // Return created insurance data
    } catch (error) {
        console.error("Error creating insurance:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Update an existing insurance
export const updateInsurance = async (insuranceID, insurance) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/update/${insuranceID}`, insurance, getAuthHeaders());
        return response.data; // Return updated insurance data
    } catch (error) {
        console.error("Error updating insurance:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Delete an insurance by its insuranceID
export const deleteInsuranceById = async (insuranceID) => {
    try {
        await axios.delete(`${REST_API_BASE_URL}/delete/${insuranceID}`, getAuthHeaders());
    } catch (error) {
        console.error("Error deleting insurance by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};
