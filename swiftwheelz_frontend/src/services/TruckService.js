import axios from 'axios';


const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb";

// Function to set up axios with an authorization token
const createAxiosInstance = (token) => {
    return axios.create({
        baseURL: REST_API_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

// Fetch all trucks
export const getAllTrucks = () => axios.get(`${REST_API_BASE_URL}/truck/getAll`);

// Fetch a truck by VIN
export const getTruckByVin = (vin) => axios.get(`${REST_API_BASE_URL}/truck/${vin}`);

// Create a new truck
export const createTruck = async (truckData, token) => {
    const axiosInstance = createAxiosInstance(token);
    const formData = new FormData();
    Object.keys(truckData).forEach(key => {
        formData.append(key, truckData[key]);
    });
       return  axiosInstance.post(`/truck/create`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',

            },
        });


};

// Update an existing truck
export const updateTruck = async (truckData, token) => {
    const axiosInstance = createAxiosInstance(token);
    const formData = new FormData();
    Object.keys(truckData).forEach(key => {
        formData.append(key, truckData[key]);
    });

    return axiosInstance.put(`/truck/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

};

// Delete a truck by VIN
export const deleteTruck = async (vin, token) => {
    const axiosInstance = createAxiosInstance(token);
    return axiosInstance.delete(`truck/${vin}`);

};

// Fetch truck image URL by VIN
export const getTruckImageUrl = (vin) => `${REST_API_BASE_URL}/truck/image/${vin}`;

// Fetch available trucks
export const getAvailableTrucks = () => axios.get(`${REST_API_BASE_URL}/truck/available`);
