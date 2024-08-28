import axios from "axios";

const AUTH_API_BASE_URL = "http://localhost:8080/truckrentalsystem/auth";

export const authenticateUser = (email, password) =>
    axios.post(`${AUTH_API_BASE_URL}/authenticate`, {email, password});

