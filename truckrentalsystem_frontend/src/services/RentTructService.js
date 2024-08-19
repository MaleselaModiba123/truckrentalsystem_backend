import axios from 'axios';
const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/rentTruck";

export const getRentTrucks = () => axios.get(`${REST_API_BASE_URL}/getAll`);
export const getRentTruckById = (rentTruckNumber) => axios.get(`${REST_API_BASE_URL}/read/${rentTruckNumber}`);
export const createRentTruck = (rentTruck) => axios.post(`${REST_API_BASE_URL}/create`, rentTruck);
export const deleteRentTruckById = (rentTruckNumber) => axios.delete(`${REST_API_BASE_URL}/delete/${rentTruckNumber}`);
export const updateRentTruck = (rentTruckNumber, rentTruck) => axios.post(`${REST_API_BASE_URL}/update`, rentTruck);
