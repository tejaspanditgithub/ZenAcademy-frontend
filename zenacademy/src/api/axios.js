import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:5001'
});

export const axiosUserPrivate = axios.create({
    baseURL: 'http://localhost:5001',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosCoursePrivate = axios.create({
    baseURL: 'http://localhost:5002',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});



