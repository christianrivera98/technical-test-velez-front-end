import axios from 'axios';

const API_BASE_URL = 'https://api-frontend-production.up.railway.app/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});