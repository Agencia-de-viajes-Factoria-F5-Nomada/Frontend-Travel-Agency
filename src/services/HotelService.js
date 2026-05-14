
import { API } from '../constants/api';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const hotelService = {
  getAll:       async ()     => { const r = await fetch(`${API}/hotels`, { headers: h() }); if (!r.ok) throw new Error('Error hoteles'); return r.json(); },
  getById:      async (id)   => { const r = await fetch(`${API}/hotels/${id}`, { headers: h() }); if (!r.ok) throw new Error('Hotel no encontrado'); return r.json(); },
  getActive:    async ()     => { const r = await fetch(`${API}/hotels/activos`, { headers: h() }); if (!r.ok) throw new Error('Error'); return r.json(); },
  getAvailable: async ()     => { const r = await fetch(`${API}/hotels/disponibles`, { headers: h() }); if (!r.ok) throw new Error('Error'); return r.json(); },
  create:       async (data) => { const r = await fetch(`${API}/hotels`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error crear hotel'); return r.json(); },
  update:       async (id, data) => { const r = await fetch(`${API}/hotels/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error actualizar'); return r.json(); },
  delete:       async (id)   => { const r = await fetch(`${API}/hotels/${id}`, { method: 'DELETE', headers: h() }); if (!r.ok) throw new Error('Error eliminar'); },
};