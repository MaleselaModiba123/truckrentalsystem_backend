import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb";

// Helper function to get the token from local storage
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

// Fetch all trucks
export const getAllTrucks = () => axios.get(`${REST_API_BASE_URL}/truck/getAll`);

// Fetch a truck by VIN
export const getTruckByVin = (vin) => axios.get(`${REST_API_BASE_URL}/truck/${vin}`);

// Create a new truck
export const createTruck = async (truckData) => {
    const formData = new FormData();
    Object.keys(truckData).forEach(key => {
        formData.append(key, truckData[key]);
    });
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/truck/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders().headers // Include authorization headers
            }
        });
        return response.data; // Return created truck data
    } catch (error) {
        console.error("Error creating truck:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Update an existing truck
export const updateTruck = async (truckData) => {
    const formData = new FormData();
    Object.keys(truckData).forEach(key => {
        formData.append(key, truckData[key]);
    });
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/truck/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders().headers // Include authorization headers
            }
        });
        return response.data; // Return updated truck data
    } catch (error) {
        console.error("Error updating truck:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Delete a truck by VIN
export const deleteTruck = async (vin) => {
    try {
        await axios.delete(`${REST_API_BASE_URL}/truck/${vin}`, getAuthHeaders());
    } catch (error) {
        console.error("Error deleting truck by VIN:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Fetch truck image URL by VIN
export const getTruckImageUrl = (vin) => `${REST_API_BASE_URL}/truck/image/${vin}`;

// Fetch available trucks
export const getAvailableTrucks = () => axios.get(`${REST_API_BASE_URL}/truck/available`);
