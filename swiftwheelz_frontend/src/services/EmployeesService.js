import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/employees";

// Helper function to get the token from local storage
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});
// Function to set up axios with an authorization token
const createAxiosInstance = (token) => {
    return axios.create({
        baseURL: REST_API_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

// Fetch all employees
export const getEmployees = async (token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.get(`${REST_API_BASE_URL}/getAllEmployees`);

};


// Create a new employee
export const createEmployee = async (employee, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.post(`${REST_API_BASE_URL}/create`, employee);

};

// Delete an employee by ID
export const deleteEmployeeById = async (employeeNumber, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.delete(`${REST_API_BASE_URL}/delete/${employeeNumber}`);

};

// Update an employee
export const updateEmployee = async (employeeNumber, employee, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.put(`${REST_API_BASE_URL}/update/${employeeNumber}`, employee);

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


