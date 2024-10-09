import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/complaints";

export const createComplaint = (complaintData) =>
    axios.post(`${REST_API_BASE_URL}/create`, complaintData);
export const getComplaintsByCustomerID = (customerId) =>
    axios.get(`${REST_API_BASE_URL}/getByCustomerId/${customerId}`);

export const getAllComplaints = () =>
    axios.get(`${REST_API_BASE_URL}/getAll`);
export const sendResponse = (complaintId, responseText) =>
    axios.put(`${REST_API_BASE_URL}/respondToComplaint/${complaintId}`, {
        response: responseText
    });
