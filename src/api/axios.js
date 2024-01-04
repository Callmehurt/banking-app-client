import axios from "axios";

const BASE_URL = 'http://localhost:4000/'
// const BASE_URL = 'https://system.deliverysansar.com/api/v1/'
// const BASE_URL = 'https://backend-chiya-station.herokuapp.com/api/v1/'

export const axiosDefault = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})