import { useEffect, useState } from 'react';
import { EmployeeService } from '../../services/EmployeeService';
import { UserCheck, Plus, Trash2 } from 'lucide-react';

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        const data = await EmployeeService.fetchEmployees();
        setEmployees(data);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <UserCheck className="text-brand-500" /> Gestión de Empleados
                </h1>
                <button className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Plus size={18} /> Registrar Empleado
                </button>
            </div>

            <div className="bg-surface-800 rounded-xl overflow-hidden border border-surface-700">
                <table className="w-full text-left">
                    <thead className="bg-surface-900 text-ink-soft uppercase text-xs">
                        <tr>
                            <th className="p-4">Nombre</th>
                            <th className="p-4">Cargo</th>
                            <th className="p-4">Email</th>
                            <th className="p-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-700">
                        {employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-surface-700/50">
                                <td className="p-4 font-medium">{emp.firstName} {emp.lastName}</td>
                                <td className="p-4">{emp.role || 'Staff'}</td>
                                <td className="p-4 text-ink-soft">{emp.email}</td>
                                <td className="p-4 text-right">
                                    <button className="text-red-400 hover:text-red-300"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeePage;