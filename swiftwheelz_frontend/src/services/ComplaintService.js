import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/complaints";
// Function to set up axios with an authorization token
const createAxiosInstance = (token) => {
    return axios.create({
        baseURL: REST_API_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};
export const createComplaint = async (complaintData, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.post('/create', complaintData);
};
export const getComplaintsByCustomerEmail = async (customerEmail, token) => {
    try {
        const axiosInstance = createAxiosInstance(token);
        const response = await axiosInstance.get(`/getComplaintByCustomerEmail`, { params: { email: customerEmail } });
        return response.data;
    } catch (error) {
        console.error("Error fetching complaints by customer email:", error);
        throw error;
    }
};

export const getAllComplaints = async (token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.get(`/getAll`);

};
export const sendResponse = async (complaintId, responseText, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.put(`${REST_API_BASE_URL}/respondToComplaint/${complaintId}`, {
        response: responseText
    });
};
