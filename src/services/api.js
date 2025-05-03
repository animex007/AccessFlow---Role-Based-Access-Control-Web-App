import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // same as your backend URL
});

// Add token automatically (if logged in)
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const loginUser = (formData) => API.post('/auth/login', formData);
export const signupUser = (formData) => API.post('/auth/register', formData);

// Add more as needed
