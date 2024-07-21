import axios from 'axios'

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/truck/getAll";
export const getAllTrucks=()=> axios.get(REST_API_BASE_URL);