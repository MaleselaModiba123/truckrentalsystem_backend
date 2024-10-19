import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/contactUs";

// Helper function to get the token from local storage
const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});

// Function to fetch contact us data
export const getContactUsId = async () => {
    try {
        console.info(`Fetching contactUs data from ${REST_API_BASE_URL}/getAll`);

        // Make the API call
        const response = await axios.get(`${REST_API_BASE_URL}/getAll`, getAuthHeaders());

        // Log and return the data
        console.info("Contact results from the API:", response.data);
        return response.data;  // Return the actual data
    } catch (error) {
        console.error('Error fetching contact info:', error);
        throw error;  // Rethrow the error for potential handling upstream
    }
};//
// Function to fetch contact us data
export const getContactUs = async () => {
    try {
        // Make the API call
        const response = await axios.get(`${REST_API_BASE_URL}/getAll`);
        // Log and return the data
        console.info("Contact results from the API:", response.data);
        return response.data;  // Return the actual data
    } catch (error) {
        console.error('Error fetching contact info:', error);
        throw error;  // Rethrow the error for potential handling upstream
    }
};


// Create a new contact us entry
export const createContactUs = async (contactUs) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/create`, contactUs, getAuthHeaders());
        return response.data; // Return created contact us data
    } catch (error) {
        console.error("Error creating contact us:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Delete a contact us entry by its ID
export const deleteContactUsById = async (contactUsId) => {
    try {
        await axios.delete(`${REST_API_BASE_URL}/delete/${contactUsId}`, getAuthHeaders());
    } catch (error) {
        console.error("Error deleting contact us by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Update an existing contact us entry
export const updateContactUs = async (contactUsId, contactUs) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/update/${contactUsId}`, contactUs, getAuthHeaders());
        return response.data; // Return updated contact us data
    } catch (error) {
        console.error("Error updating contact us:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};
