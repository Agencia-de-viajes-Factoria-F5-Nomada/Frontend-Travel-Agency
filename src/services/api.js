import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
export const API = `${BASE_URL}/api`;

export const COLORS = {
  principal:  '#1A3A5C',
  acento:     '#4A8FA8',
  fondo:      '#DAEEF7',
  secundario: '#7AAFC0',
  blanco:     '#FFFFFF',
  texto:      '#1A3A5C',
  textoMuted: '#5A7A8C',
  error:      '#DC2626',
  exito:      '#16A34A',
};

export const apiClient = axios.create({
  baseURL: API,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth?expired=true';
    }
    return Promise.reject(error);
  }
);
