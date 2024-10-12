import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/truckType";

// Helper function to get the token from local storage
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

// Fetch all truck types
export const getAllTruckTypes = async () => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/getAll`, getAuthHeaders());
        return response.data; // Return the list of truck types
    } catch (error) {
        console.error("Error fetching all truck types:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Fetch a specific truck type by its ID
export const getTruckTypeById = async (truckTypeId) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/read/${truckTypeId}`, getAuthHeaders());
        return response.data; // Return truck type data
    } catch (error) {
        console.error("Error fetching truck type by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Create a new truck type
export const createTruckType = async (truckType) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/create`, truckType, getAuthHeaders());
        return response.data; // Return created truck type data
    } catch (error) {
        console.error("Error creating truck type:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Update an existing truck type
export const updateTruckType = async (truckTypeId, truckType) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/update/${truckTypeId}`, truckType, getAuthHeaders());
        return response.data; // Return updated truck type data
    } catch (error) {
        console.error("Error updating truck type:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Delete a truck type by its ID
export const deleteTruckTypeById = async (truckTypeId) => {
    try {
        await axios.delete(`${REST_API_BASE_URL}/delete/${truckTypeId}`, getAuthHeaders());
    } catch (error) {
        console.error("Error deleting truck type by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};
