import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/employees";

// Helper function to get the token from local storage
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

// Fetch all employees
export const getEmployees = async () => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/getAllEmployees`, getAuthHeaders());
        return response.data; // Return the list of employees
    } catch (error) {
        console.error("Error fetching employees:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Fetch employee by ID
export const getEmployeeById = async (employeeNumber) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/read/${employeeNumber}`, getAuthHeaders());
        return response.data; // Return employee data
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Create a new employee
export const createEmployee = async (employee) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/create`, employee, getAuthHeaders());
        return response.data; // Return created employee data
    } catch (error) {
        console.error("Error creating employee:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Delete an employee by ID
export const deleteEmployeeById = async (employeeNumber) => {
    try {
        await axios.delete(`${REST_API_BASE_URL}/delete/${employeeNumber}`, getAuthHeaders());
    } catch (error) {
        console.error("Error deleting employee by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Update an employee
export const updateEmployee = async (employeeNumber, employee) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/update/${employeeNumber}`, employee, getAuthHeaders());
        return response.data; // Return updated employee data
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Get admin details by email
export const getAdminDetails = async (email) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/getByEmail/${email}`, getAuthHeaders());
        return response.data; // Return admin details
    } catch (error) {
        console.error("Error fetching admin details by email:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

export const getEmployeeProfile = async () => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/profile`, getAuthHeaders());
        return response.data; // Return customer profile data
    } catch (error) {
        console.error("Error fetching customer profile:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};
// Authenticate employee
export const employeeSignIn = async (user) => {
    const employee = {
        contact: {
        email: user.email,
        },
        password: user.password,
    };
    return await axios.post(`${REST_API_BASE_URL}/authenticate`, employee);
};


