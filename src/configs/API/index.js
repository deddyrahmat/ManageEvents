import axios from 'axios';

export const API = axios.create({
    baseURL : "http://localhost:5000/api/v1"
});


export const PICTURE = "http://localhost:5000/picture/";