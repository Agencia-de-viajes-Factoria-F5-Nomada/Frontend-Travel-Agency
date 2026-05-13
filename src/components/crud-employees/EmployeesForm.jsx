import { useEffect, useState } from 'react';
import { EmployeeService } from '../../services/EmployeeService';
import { UserCheck, Plus, X, Trash2 } from 'lucide-react';
import EmployeesForm from './EmployeesForm'; // Asegúrate de que el nombre coincida

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => { loadEmployees(); }, []);

    const loadEmployees = async () => {
        const data = await EmployeeService.fetchEmployees();
        setEmployees(data);
    };

    const handleCreate = async (data) => {
        await EmployeeService.createEmployee(data);
        setShowForm(false);
        loadEmployees();
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
                    <UserCheck className="text-brand-500" /> Gestión de Personal
                </h1>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? 'Cerrar' : 'Nuevo Empleado'}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-surface-800 p-4 rounded-xl border border-brand-500/30">
                    <h2 className="text-lg font-semibold mb-4 text-brand-400 font-mono">Registrar Empleado</h2>
                    <EmployeesForm onSubmit={handleCreate} />
                </div>
            )}

            <div className="bg-surface-800 rounded-xl overflow-hidden border border-surface-700">
                <table className="w-full text-left">
                    <thead className="bg-surface-900 text-ink-soft uppercase text-xs">
                        <tr>
                            <th className="p-4">Nombre Completo</th>
                            <th className="p-4">Género</th>
                            <th className="p-4">Horas Semanales</th>
                            <th className="p-4">Estado</th>
                            <th className="p-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-700 text-white">
                        {employees.map((emp) => (
                            <tr key={emp.id} className="hover:bg-surface-700/50">
                                <td className="p-4 font-medium">{emp.name} {emp.surname}</td>
                                <td className="p-4">{emp.gender}</td>
                                <td className="p-4 font-mono">{emp.work_hour}h</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs ${emp.hired ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {emp.hired ? 'Contratado' : 'Baja'}
                                    </span>
                                </td>
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