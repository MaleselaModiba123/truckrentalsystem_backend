import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/contactUs";

// Function to fetch contact us data
export const getContactUsId = async () => {
    try {
        console.info(`Fetching contactUs data from ${REST_API_BASE_URL}/getAll`);

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

// Other functions remain unchanged
export const getContactUs = (contactUsId) => axios.get(`${REST_API_BASE_URL}/read/${contactUsId}`);
export const createContactUs = (contactUs) => axios.post(`${REST_API_BASE_URL}/create`, contactUs);
export const deleteContactUsById = (contactUsId) => axios.delete(`${REST_API_BASE_URL}/delete/${contactUsId}`);
export const updateContactUs = (contactUsId, contactUs) => axios.put(`${REST_API_BASE_URL}/update/${contactUsId}`, contactUs);
