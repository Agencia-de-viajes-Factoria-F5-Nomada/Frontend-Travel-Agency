import { API } from '../constants/api';

const headers = { 'Content-Type': 'application/json' };

export const authService = {
  login: async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error('Credenciales incorrectas');
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user ?? data));
    return data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isAuthenticated: () => !!localStorage.getItem('token'),
  getUser: () => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },
  isAdmin: () => {
    const u = authService.getUser();
    return u?.rol === 'ADMIN' || u?.role === 'ADMIN';
  },
};
