import axios from 'axios';
const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb/rentTruck";

export const getRentTrucks = () => axios.get(`${REST_API_BASE_URL}/getAll`);
export const getRentTruckById = (rentTruckNumber) => axios.get(`${REST_API_BASE_URL}/read/${rentTruckNumber}`);
export const createRentTruck = (rentTruck) => axios.post(`${REST_API_BASE_URL}/create`, rentTruck);
export const deleteRentTruckById = (rentTruckNumber) => axios.delete(`${REST_API_BASE_URL}/delete/${rentTruckNumber}`);
export const updateRentTruck = (rentId, rentTruck) => axios.put(`${REST_API_BASE_URL}/update/${rentId}`, rentTruck);

export const getRentalsList = async (customerID) => {
    try {
        const response = await axios.get(`${REST_API_BASE_URL}/history/${customerID}`);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error("Error fetching rental history:", error);
        throw error;
    }
};
export const markTruckAsReturned = (rentId) =>
    axios.patch(`${REST_API_BASE_URL}/markAsReturned/${rentId}`);

export const getAvailableTrucks = () => axios.get(`${REST_API_BASE_URL}/not returned`);
