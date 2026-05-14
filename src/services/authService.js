import api from './api'

// El backend espera: { id: Long, password: String }
// Devuelve: { token, employeeId, name, surname }
export const login = async (id, password) => {
  const { data } = await api.post('/authentication/login', {
    id: Number(id),
    password,
  })
  return data
}
