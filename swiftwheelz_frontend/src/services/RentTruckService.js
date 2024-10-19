import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/rentTruck";

// Function to set up axios with an authorization token
const createAxiosInstance = (token) => {
    return axios.create({
        baseURL: REST_API_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

export const createRentTruck = async (rentTruck, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.post(`/create`, rentTruck);
};

export const updateRentTruck = async (rentId, rentTruck, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.put(`/update/${rentId}`, rentTruck);
};

export const getRentalsByCustomerId = async (customerId, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.get(`/getRentalsByCustomerId/${customerId}`);
};

export const getRentalsByCustomerEmail = async (customerEmail, token) => {
    try {
        const axiosInstance = createAxiosInstance(token);
        const response = await axiosInstance.get(`/getRentalsByCustomerEmail`, { params: { email: customerEmail } });
        return response.data;
    } catch (error) {
        console.error("Error fetching rentals by customer email:", error);
        throw error;
    }
};

export const markTruckAsReturned = async (rentId, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.patch(`/markAsReturned/${rentId}`);
};

export const getAvailableTrucks = async (token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.get(`/not-returned`);
};

export const cancelRental = async (cancellation, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.post(`/cancel/cancel`, cancellation);
};

