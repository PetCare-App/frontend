import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://petcaredeploy-api.onrender.com',
    timeout: 60000,
    headers: {
      mode: 'cors'
    }
  });

export const api = instance