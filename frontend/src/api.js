import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem('refresh');
      if (refresh) {
        try {
          const res = await axios.post(`${BASE_URL}auth/refresh/`, { refresh });
          localStorage.setItem('access', res.data.access);
          originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
          return api(originalRequest);
        } catch {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          window.location.href = '/';
        }
      }
    }
    return Promise.reject(error);
  }
);

export const login = (username, password) =>
  axios.post(`${BASE_URL}auth/login/`, { username, password });

export const register = (username, password, email) =>
  axios.post(`${BASE_URL}auth/register/`, { username, password, email });

export const getExpenses = () => api.get('expenses/');
export const createExpense = (expense) => api.post('expenses/', expense);
export const deleteExpense = (id) => api.delete(`expenses/${id}/`);
export const getCategories = () => api.get('categories/');
export const getSummary = () => api.get('summary/');

export default api;