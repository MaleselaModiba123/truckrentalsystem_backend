import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/customer";

export const getCustomerById = (customerId) =>
    axios.get(`${REST_API_BASE_URL}/read/${customerId}`);
export const createCustomer = (customer) =>
    axios.post(`${REST_API_BASE_URL}/create`, customer);
export const deleteCustomerById = (customerID) =>
    axios.delete(`${REST_API_BASE_URL}/delete/${customerID}`);
export const updateCustomer = (customerID, customer) =>
    axios.put(`${REST_API_BASE_URL}/update/${customerID}`, customer);
