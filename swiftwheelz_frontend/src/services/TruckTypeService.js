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
    try {
        return await axiosInstance.get('/getAll');
    } catch (error) {
        console.error("Error fetching truck types:", error.response ? error.response.data : error.message);
        throw error;
    }
};


// Create a new truck type
export const createTruckType = async (truckType, token) => {
    const axiosInstance = createAxiosInstance(token);
    try {
        return await axiosInstance.post('/create', truckType);
    } catch (error) {
        console.error("Error creating truck type:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update an existing truck type
export const updateTruckType = async (truckTypeId, truckType, token) => {
    const axiosInstance = createAxiosInstance(token);
    try {
        return await axiosInstance.put(`/update/${truckTypeId}`, truckType);
    } catch (error) {
        console.error("Error updating truck type:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Delete a truck type by its ID
export const deleteTruckTypeById = async (truckTypeId, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.delete(`/delete/${truckTypeId}`);

};