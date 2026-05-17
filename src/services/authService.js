import { API } from '../constants/api';

const headers = { 'Content-Type': 'application/json' };

const decodeJWT = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64).split('').map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

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

  logout: (redirect = true) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (redirect && typeof window !== 'undefined') {
      window.location.href = '/auth';
    }
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const decoded = decodeJWT(token);
    if (!decoded) return false;
    if (decoded.exp * 1000 < Date.now()) {
      authService.logout(false);
      return false;
    }
    return true;
  },

  isTokenExpired: () => {
    const token = localStorage.getItem('token');
    if (!token) return true;
    const decoded = decodeJWT(token);
    if (!decoded) return true;
    return decoded.exp * 1000 < Date.now();
  },

  getTokenExpiration: () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decoded = decodeJWT(token);
    return decoded?.exp ? decoded.exp * 1000 : null;
  },

  getUser: () => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  },

  isAdmin: () => {
    const u = authService.getUser();
    return u?.rol === 'ADMIN' || u?.role === 'ADMIN';
  },
};
