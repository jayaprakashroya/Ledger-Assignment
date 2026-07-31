import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  register: async (payload) => (await api.post('/auth/register', payload)).data,
  login: async (payload) => (await api.post('/auth/login', payload)).data,
  getProfile: async () => (await api.get('/auth/me')).data,
  refresh: async (refreshToken) => (await api.post('/auth/refresh', { refresh_token: refreshToken })).data
};

export const libraryApi = {
  search: async (query, type = 'album', limit = 10) => {
    const response = await api.get('/search', { params: { query, type, limit } });
    return response.data;
  },
  getLibrary: async () => (await api.get('/library')).data,
  addAlbum: async (payload) => (await api.post('/library', payload)).data,
  updateAlbum: async (id, payload) => (await api.put(`/library/${id}`, payload)).data,
  deleteAlbum: async (id) => (await api.delete(`/library/${id}`)).data,
  getAnalytics: async () => (await api.get('/library/analytics')).data,
  getInsights: async () => (await api.get('/library/insights')).data
};
