import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/accidentReport";

// Function to set up axios with an authorization token
const createAxiosInstance = (token) => {
    return axios.create({
        baseURL: REST_API_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

// Fetch all Reports
export const getAllAccidentReport = async (token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.get(`/getAll`);
};

// Create a new Report
export const createAccidentReport = async (accidentReport, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.post(`/create`, accidentReport);
};

// Update an existing Report
export const updateAccidentReport = async (reportId, accidentReport, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.put(`/update/${reportId}`, accidentReport);
};

// Delete a Report by its reportId
export const deleteAccidentReportById = async (reportId, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.delete(`/delete/${reportId}`);
};

// Fetch reports by customer ID
export const findReportsByCustomerId = async (customerID, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.get(`/customer/${customerID}`);
};
export const getReportsByCustomerEmail = async (customerEmail, token) => {
    try {
        const axiosInstance = createAxiosInstance(token);
        const response = await axiosInstance.get(`/getReportByCustomerEmail`, { params: { email: customerEmail } });
        return response.data;
    } catch (error) {
        console.error("Error fetching reports by customer email:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error after logging
    }
};

// Respond to Customer Reports
export const sendResponse = async (reportId, responseText, token) => {
    const axiosInstance = createAxiosInstance(token);
    try {
        const response = await axiosInstance.put(`/respondToReport/${reportId}`, { response: responseText });
        return response.data; // Return the response data
    } catch (error) {
        console.error("Error sending response:", error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to handle it in the calling function
    }
};



