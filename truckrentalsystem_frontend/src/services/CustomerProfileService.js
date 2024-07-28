import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/customer";

export const getCustomerById = (customerID) =>
    axios.get(`${REST_API_BASE_URL}/read/${customerID}`);
export const createCustomer = (customer) =>
    axios.post(`${REST_API_BASE_URL}/create`, customer);
export const deleteCustomerById = (customerID) =>
    axios.delete(`${REST_API_BASE_URL}/delete/${customerID}`);
export const updateCustomer = (customerID, customer) =>
    axios.put(`${REST_API_BASE_URL}/update/${customerID}`, customer);
export const signIn = (email, password) =>
    axios.post(`${REST_API_BASE_URL}/authenticate`, { email, password });