import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://petcaredeploy-api.onrender.com',
	timeout: 5000,
});

export const api = instance;
