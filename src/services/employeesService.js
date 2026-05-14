import api from './api'

export const getAllEmployees = () => api.get('/employees')
export const createEmployee  = (employee) => api.post('/employees', employee)
export const updateEmployee  = (id, employee) => api.put(`/employees/${id}`, employee)
export const deleteEmployee  = (id) => api.delete(`/employees/${id}`)
