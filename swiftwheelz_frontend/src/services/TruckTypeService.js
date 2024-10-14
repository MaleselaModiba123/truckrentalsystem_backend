import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/truckType";

// Function to set up axios with an authorization token
const createAxiosInstance = (token) => {
    return axios.create({
        baseURL: REST_API_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};


// Fetch all truck types
export const getAllTruckTypes = async (token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.get(`${REST_API_BASE_URL}/getAll`);

};

// Fetch a specific truck type by its ID
export const getTruckTypeById = async (truckTypeId) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/read/${truckTypeId}`);
        return response.data; // Return truck type data
    } catch (error) {
        console.error("Error fetching truck type by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Create a new truck type
export const createTruckType = async (truckType, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.post(`${REST_API_BASE_URL}/create`, truckType);

};

// Update an existing truck type
export const updateTruckType = async (truckTypeId, truckType, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.put(`${REST_API_BASE_URL}/update/${truckTypeId}`, truckType);
};

// Delete a truck type by its ID
export const deleteTruckTypeById = async (truckTypeId, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.delete(`${REST_API_BASE_URL}/delete/${truckTypeId}`);

};
