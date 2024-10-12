import axios from 'axios'

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/branch";

const getAuthHeaders = () => ({
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
});
export const getAllBranches=() =>{ 
    console.info(`Fetching all branches`); 
    console.info(`Attempting to fetch the truck usign the link: ${REST_API_BASE_URL}/getAll`); 

    let results = axios.get(`${REST_API_BASE_URL}/getAll`);
    console.info("Branches results fromt the api");
    console.log(results);
    return results;
}
export const getBranchById = (branchId) => axios.get(`${REST_API_BASE_URL}/read/${branchId}`, getAuthHeaders());
// export const createBranch = (branch) => axios.post(`${REST_API_BASE_URL}/create`, branch);
// export const deleteBranchById = (branchId) => axios.delete(`${REST_API_BASE_URL}/delete/${branchId}`);
// export const updateBranch = (branchId, branch) => axios.put(`${REST_API_BASE_URL}/update/${branchId}`, branch);

// Create a new branch
export const createBranch = async (branch) => {
    try {
        const response = await axios.post(`${REST_API_BASE_URL}/create`, branch, getAuthHeaders());
        return response.data; // Return created branch data
    } catch (error) {
        console.error("Error creating branch:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Update an existing branch
export const updateBranch = async (branchId, branch) => {
    try {
        const response = await axios.put(`${REST_API_BASE_URL}/update/${branchId}`, branch, getAuthHeaders());
        return response.data; // Return updated branch data
    } catch (error) {
        console.error("Error updating branch:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};

// Delete a branch by ID
export const deleteBranchById = async (branchId) => {
    try {
        await axios.delete(`${REST_API_BASE_URL}/delete/${branchId}`, getAuthHeaders());
    } catch (error) {
        console.error("Error deleting branch by ID:", error);
        throw error; // Re-throw error for handling in the calling function
    }
};