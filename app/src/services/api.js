import axios from 'axios';

const API_BASE_URL = 'http://localhost:9000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Foods
export const getFoods = () => api.get('/foods');
export const getFood = (id) => api.get(`/foods/${id}`);

// Auth
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);

// Cart
export const getCart = () => api.get('/cart');
export const addToCart = (item) => api.post('/cart', item);
export const removeFromCart = (id) => api.delete(`/cart/${id}`);

// Orders
export const createOrder = (orderData) => api.post('/orders', orderData);

// Export BASE_URL for images
export const BASE_URL = 'http://localhost:9000';

export default api;