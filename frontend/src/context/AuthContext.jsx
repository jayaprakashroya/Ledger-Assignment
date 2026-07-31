import { createContext, useContext, useMemo, useState } from 'react';
import { authApi } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || 'null'));
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    const response = await authApi.login(credentials);
    const payload = response.data;
    localStorage.setItem('token', payload.access_token);
    localStorage.setItem('refreshToken', payload.refresh_token);
    localStorage.setItem('user', JSON.stringify(payload.user));
    setToken(payload.access_token);
    setUser(payload.user);
    setLoading(false);
    return payload;
  };

  const register = async (values) => {
    setLoading(true);
    const response = await authApi.register(values);
    const payload = response.data;
    localStorage.setItem('token', payload.access_token);
    localStorage.setItem('refreshToken', payload.refresh_token);
    localStorage.setItem('user', JSON.stringify(payload.user));
    setToken(payload.access_token);
    setUser(payload.user);
    setLoading(false);
    return payload;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({ user, token, loading, login, register, logout }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
