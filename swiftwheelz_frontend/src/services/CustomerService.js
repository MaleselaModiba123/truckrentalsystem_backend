import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/customer";

// Helper function to get the token from local storage
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

export const getCustomerById = async (customerID) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/read/${customerID}`, getAuthHeaders());
        return response.data; // Return customer data
    } catch (error) {
        console.error("Error fetching customer by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

export const getCustomerByEmail = async (email) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/findByEmail`, { params: { email }, ...getAuthHeaders() });
        return response.data; // Return customer data
    } catch (error) {
        console.error("Error fetching customer by email:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};
export const deleteCustomerById = async (customerID) => {
    try {
        await axios.delete(`${REST_API_BASE_URL}/delete/${customerID}`, getAuthHeaders());
    } catch (error) {
        console.error("Error deleting customer by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};


export const createCustomer = (customer) =>
    axios.post(`${REST_API_BASE_URL}/create`, customer);

export const getCustomerProfile = async () => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/profile`, getAuthHeaders());
        return response.data; // Return customer profile data
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

export const customerSignIn = async (user) => {
    const customer = {
        email: user.email,
        password: user.password,
    };
    return await axios.post(`${REST_API_BASE_URL}/authenticate`, customer);
};

export const updateCustomerProfile = async (customer) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/update/${customer.customerID}`, customer, getAuthHeaders());
        return response.data; // Return updated customer data
    } catch (error) {
        console.error("Error updating customer profile:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};
