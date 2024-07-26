import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/customer";


export const createCustomer = (customer) =>
    axios.post(`${REST_API_BASE_URL}/create`, customer);

