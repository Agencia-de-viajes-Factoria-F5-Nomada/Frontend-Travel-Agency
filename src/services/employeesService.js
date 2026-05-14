import { API } from '../constants/api';
const h = () => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` });

export const employeesService = {
  getAll:  async ()          => { const r = await fetch(`${API}/employees`, { headers: h() }); if (!r.ok) throw new Error('Error empleados'); return r.json(); },
  getById: async (id)        => { const r = await fetch(`${API}/employees/${id}`, { headers: h() }); if (!r.ok) throw new Error('Empleado no encontrado'); return r.json(); },
  create:  async (data)      => { const r = await fetch(`${API}/employees`, { method: 'POST', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error crear empleado'); return r.json(); },
  update:  async (id, data)  => { const r = await fetch(`${API}/employees/${id}`, { method: 'PUT', headers: h(), body: JSON.stringify(data) }); if (!r.ok) throw new Error('Error actualizar'); return r.json(); },
  delete:  async (id)        => { const r = await fetch(`${API}/employees/${id}`, { method: 'DELETE', headers: h() }); if (!r.ok) throw new Error('Error eliminar'); },
};