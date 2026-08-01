import axios from 'axios';
import * as mockApi from './mockApi';
import { getSavedAuthToken } from './store';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || (typeof window !== 'undefined' ? `${window.location.origin}/api` : 'http://localhost:8080/api');
const USE_MOCK_API = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getSavedAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function isNetworkError(error: any) {
  return !error.response || error.message?.includes('Network Error') || error.code === 'ERR_NETWORK';
}

async function maybeMock<T>(axiosCall: () => Promise<any>, mockCall: () => Promise<T>): Promise<any> {
  if (USE_MOCK_API) {
    return { data: await mockCall() };
  }

  try {
    return await axiosCall();
  } catch (error: any) {
    if (isNetworkError(error)) {
      return { data: await mockCall() };
    }
    throw error;
  }
}

export const authApi = {
  register: async (payload: { email: string; password: string }) => {
    const response = await maybeMock(
      () => api.post('/auth/register', payload),
      () => mockApi.registerMock(payload)
    );
    return response.data;
  },
  login: async (payload: { email: string; password: string }) => {
    const response = await maybeMock(
      () => api.post('/auth/login', payload),
      () => mockApi.loginMock(payload)
    );
    return response.data;
  },
};

export const searchApi = {
  search: async (query: string) => {
    const response = await maybeMock(
      () => api.get('/search', { params: { query, type: 'album', limit: 20 } }),
      () => mockApi.searchMock(query)
    );
    return response.data.data;
  },
  searchSongs: async (query: string) => {
    const response = await maybeMock(
      () => api.get('/search', { params: { query, type: 'song', limit: 50 } }),
      () => mockApi.searchSongsMock(query)
    );
    return response.data.data;
  },
};

export const libraryApi = {
  getLibrary: async () => {
    const response = await maybeMock(
      () => api.get('/library'),
      () => mockApi.getLibraryMock(getSavedAuthToken())
    );
    return response.data.data;
  },
  addItem: async (payload: any) => {
    const response = await maybeMock(
      () => api.post('/library', payload),
      () => mockApi.addItemMock(getSavedAuthToken(), payload)
    );
    return response.data;
  },
  updateItem: async (id: string, payload: any) => {
    const response = await maybeMock(
      () => api.put(`/library/${id}`, payload),
      () => mockApi.updateItemMock(getSavedAuthToken(), id, payload)
    );
    return response.data;
  },
  deleteItem: async (id: string) => {
    const response = await maybeMock(
      () => api.delete(`/library/${id}`),
      () => mockApi.deleteItemMock(getSavedAuthToken(), id)
    );
    return response.data;
  },
  getAnalytics: async () => {
    const response = await maybeMock(
      () => api.get('/library/analytics'),
      () => mockApi.analyticsMock(getSavedAuthToken())
    );
    return response.data.data;
  },
  getInsights: async () => {
    const response = await maybeMock(
      () => api.get('/library/insights'),
      () => mockApi.insightsMock(getSavedAuthToken())
    );
    return response.data.data;
  },
};
