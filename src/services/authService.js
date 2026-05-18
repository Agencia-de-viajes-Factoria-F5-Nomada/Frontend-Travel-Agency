import { API } from '../constants/api';

const headers = { 'Content-Type': 'application/json' };
// Antes

export const authService = {
  login: async (email, password) => {
    console.log(`[AUTH] Intentando login con email: ${email}`);

   const res = await fetch(`${API}/authentication/login`, {
      method: 'POST', headers,
      body: JSON.stringify({ email, password }),
    });
    console.log(`[AUTH] Respuesta del servidor:`, res.status);
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      console.error(`[AUTH] ❌ Error de login:`, errorData);
      throw new Error(errorData.error || 'Credenciales incorrectas');
    }
    
    const data = await res.json();
    console.log(`[AUTH] ✅ Login exitoso para ${email}`);
    console.log(`[AUTH] Token recibido:`, data.token ? `${data.token.substring(0, 30)}...` : 'SIN TOKEN');
    
    localStorage.setItem('token', data.token);
    console.log(`[AUTH] ✅ Token guardado en localStorage`);
    
    localStorage.setItem('user', JSON.stringify(data.user ?? data));
    console.log(`[AUTH] ✅ Usuario guardado:`, (data.user ?? data).email);
    
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
    const isAdmin = u?.role === 'ADMIN' || u?.rol === 'ADMIN';
    console.log(`[AUTH] isAdmin() check:`, { user: u?.email, role: u?.role, rol: u?.rol, result: isAdmin });
    return isAdmin;
  },
};
