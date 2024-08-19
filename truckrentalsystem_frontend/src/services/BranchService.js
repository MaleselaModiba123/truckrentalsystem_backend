import axios from 'axios'

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/branch";
export const getAllBranches=() =>{ 
    console.info(`Fetching all branches`); 
    console.info(`Attempting to fetch the truck usign the link: ${REST_API_BASE_URL}/getAll`); 

    let results = axios.get(`${REST_API_BASE_URL}/getAll`);
    console.info("Branches results fromt the api");
    console.log(results);
    return results;
}
export const getBranchById = (branchId) => axios.get(`${REST_API_BASE_URL}/read/${branchId}`);
export const createBranch = (branch) => axios.post(`${REST_API_BASE_URL}/create`, branch);
export const deleteBranchById = (branchId) => axios.delete(`${REST_API_BASE_URL}/delete/${branchId}`);
export const updateBranch = (branchId, branch) => axios.put(`${REST_API_BASE_URL}/update/${branchId}`, branch);