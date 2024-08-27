import axios from 'axios'

const REST_API_BASE_URL = "http://localhost:8080/truckrentalsystem/contactUs";
export const getContactUs=() =>{
    console.info(`Fetching contactUs`);
    console.info(`Attempting to fetch the contactUs info usign the link: ${REST_API_BASE_URL}/getAll`);

    let results = axios.get(`${REST_API_BASE_URL}/getAll`);
    console.info("Contact results fromt the api");
    console.log(results);
    return results;
}
export const getContactUsById = (contactUsId) => axios.get(`${REST_API_BASE_URL}/read/${contactUsId}`);
export const createContactUs = (contactUs) => axios.post(`${REST_API_BASE_URL}/create`, contactUs);
export const deleteContactUsById = (contactUsId) => axios.delete(`${REST_API_BASE_URL}/delete/${contactUsId}`);
export const updateContactUs = (contactUsId, contactUs) => axios.put(`${REST_API_BASE_URL}/update/${contactUsId}`, contactUs);