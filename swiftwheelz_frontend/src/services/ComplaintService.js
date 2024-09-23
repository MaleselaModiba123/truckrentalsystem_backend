import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/complaints";

// Method to create a complaint
export const createComplaint = () =>
    axios.post(`${REST_API_BASE_URL}/create`);

// Method to get all complaints
export const getAllComplaints = () =>
    axios.get(`${REST_API_BASE_URL}/getAll`);
