import axios from 'axios'

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/branch/getAll";
export const getAllBranches=()=> axios.get(REST_API_BASE_URL);