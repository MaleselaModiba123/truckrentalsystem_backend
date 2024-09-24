import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/accidentReport";

// Fetch all Reports
export const getAllAccidentReport = () => axios.get(`${REST_API_BASE_URL}/getAll`);

// Fetch a specific Report by its reportId
export const getReportById = (reportId) => axios.get(`${REST_API_BASE_URL}/read/${reportId}`);

// Create a new Report
export const createAccidentReport = (accidentReport) => axios.post(`${REST_API_BASE_URL}/create`, accidentReport);

// Update an existing Report
export const updateAccidentReport = (reportId, accidentReport) => axios.put(`${REST_API_BASE_URL}/update/${reportId}`, accidentReport);

// Delete a Report by its reportId
export const deleteAccidentReportById = (reportId) => axios.delete(`${REST_API_BASE_URL}/delete/${reportId}`);

// Fetch reports by customer ID
export const getReportsByCustomerId = (customerId) => axios.get(`${REST_API_BASE_URL}/customer/${customerId}`);
