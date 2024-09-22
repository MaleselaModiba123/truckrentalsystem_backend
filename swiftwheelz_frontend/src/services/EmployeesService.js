import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/employees";

export const getEmployees = () => axios.get(`${REST_API_BASE_URL}/getAllEmployees`);
export const getEmployeeById = (employeeNumber) => axios.get(`${REST_API_BASE_URL}/read/${employeeNumber}`);
export const createEmployee = (employee) => axios.post(`${REST_API_BASE_URL}/create`, employee);
export const deleteEmployeeById = (employeeNumber) => axios.delete(`${REST_API_BASE_URL}/delete/${employeeNumber}`);
export const updateEmployee = (employeeNumber, employee) => axios.put(`${REST_API_BASE_URL}/update/${employeeNumber}`, employee);
export const getAdminDetails = (email) => axios.get(`${REST_API_BASE_URL}/getByEmail/${email}`);
