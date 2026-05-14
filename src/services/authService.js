import { API } from '../constants/api';

const headers = { 'Content-Type': 'application/json' };

export const authService = {
  login: async (email, password) => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      let msg = 'Credenciales incorrectas';
      try { const body = await res.json(); msg = body.message ?? body.error ?? msg; } catch {}
      throw new Error(msg);
    }
    const data = await res.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user ?? data));
    return data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.exp && Date.now() / 1000 > payload.exp) {
        authService.logout();
        return false;
      }
    } catch {}
    return true;
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
