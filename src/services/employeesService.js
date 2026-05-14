import axios from 'axios';

const API_URL = 'http://localhost:8080/employees';

export const getAllEmployees = () => axios.get(API_URL);
export const createEmployee = (employee) => axios.post(API_URL, employee);
export const updateEmployee = (id, employee) => axios.put(`${API_URL}/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${API_URL}/${id}`);
export const EmployeeService = {
    fetchEmployees: async () => {
        const response = await fetch('http://localhost:8080/api/employees');
        return await response.json();
    }
};