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
export const createComplaint = (complaintData) =>
    axios.post(`${REST_API_BASE_URL}/create`, complaintData);
export const getComplaintsByCustomerID = (customerId) =>
    axios.get(`${REST_API_BASE_URL}/getByCustomerId/${customerId}`);

export const getAllComplaints = async (token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.get(`/getAll`);

};
export const sendResponse = (complaintId, responseText) =>
    axios.put(`${REST_API_BASE_URL}/respondToComplaint/${complaintId}`, {
        response: responseText
    });
