import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/swiftwheelzdb";
export const getAllTrucks = () => axios.get(`${REST_API_BASE_URL}/truck/getAll`);

export const getTruckByVin = (vin) => axios.get(`${REST_API_BASE_URL}/truck/${vin}`);

export const createTruck = (truckData) => {
    const formData = new FormData();
    Object.keys(truckData).forEach(key => {
        formData.append(key, truckData[key]);
    });
    return axios.post(`${REST_API_BASE_URL}/truck/create`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
};

export const updateTruck = (truckData) => {
    const formData = new FormData();
    Object.keys(truckData).forEach(key => {
        formData.append(key, truckData[key]);
    });
    return axios.put(`${REST_API_BASE_URL}/truck/update`, formData, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
};

export const deleteTruck = (vin) => axios.delete(`${REST_API_BASE_URL}/truck/${vin}`);

// export const getAllTruckTypes = () => axios.get(`${REST_API_BASE_URL}/truckType/getAll`);
//
// export const getAllInsurances = () => axios.get(`${REST_API_BASE_URL}/insurance/getAll`);
// // Fetch truck image by VIN
export const getTruckImageUrl = (vin) => `${REST_API_BASE_URL}/truck/image/${vin}`;