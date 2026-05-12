import React, { useState } from 'react';

const EmployeesForm = ({ onSubmit, initialData = {} }) => {
  const [employee, setEmployee] = useState({
    name: initialData.name || '',
    surname: initialData.surname || '',
    gender: initialData.gender || 'Male',
    work_hour: initialData.work_hour || 40,
    hired: initialData.hired ?? true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employee);
  };

  return (
    <form onSubmit={handleSubmit} className="p-3 border rounded">
      <input name="name" placeholder="Name" value={employee.name} onChange={(e) => setEmployee({...employee, name: e.target.value})} className="form-control mb-2" required />
      <input name="surname" placeholder="Surname" value={employee.surname} onChange={(e) => setEmployee({...employee, surname: e.target.value})} className="form-control mb-2" required />
      <select name="gender" value={employee.gender} onChange={(e) => setEmployee({...employee, gender: e.target.value})} className="form-control mb-2">
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input type="number" name="work_hour" value={employee.work_hour} onChange={(e) => setEmployee({...employee, work_hour: e.target.value})} className="form-control mb-2" />
      <div className="form-check mb-2">
        <input type="checkbox" checked={employee.hired} onChange={(e) => setEmployee({...employee, hired: e.target.checked})} className="form-check-input" id="hiredCheck" />
        <label className="form-check-label" htmlFor="hiredCheck">Hired</label>
      </div>
      <button type="submit" className="btn btn-primary w-100">Save Employee</button>
    </form>
  );
};
export default EmployeesForm;