import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/insurance";

// Function to set up axios with an authorization token
const createAxiosInstance = (token) => {
    return axios.create({
        baseURL: REST_API_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

// Fetch all insurances
export const getAllInsurance = async (token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.get(`/getAll`);


};

// Fetch a specific insurance by its insuranceID
export const getInsuranceById = async (insuranceID) => {
    const token = localStorage.getItem('token');
    const axiosInstance = createAxiosInstance(token);
    try {
        const response = await axiosInstance.get(`/read/${insuranceID}`);
        return response.data; // Return insurance data
    } catch (error) {
        console.error("Error fetching insurance by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Create a new insurance
export const createInsurance = async (insurance, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.post(`/create`, insurance);
};

// Update an existing insurance
export const updateInsurance = async (insuranceID, insurance, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.put(`/update/${insuranceID}`, insurance);
};

// Delete an insurance by its insuranceID
export const deleteInsuranceById = async (insuranceID, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.delete(`/delete/${insuranceID}`);

};
