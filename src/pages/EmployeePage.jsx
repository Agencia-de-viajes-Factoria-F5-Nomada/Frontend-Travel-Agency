import { useEffect, useState } from 'react';
import { UserCheck, Plus, X, Trash2 } from 'lucide-react';
import { EmployeeService } from '../services/employeesService';

const EmployeePage = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => { 
        loadEmployees(); 
    }, []);

    const loadEmployees = async () => {
        try {
            const data = await EmployeeService.fetchEmployees();
            setEmployees(data || []);
        } catch (error) {
            console.error("Error cargando empleados:", error);
        }
    };

    const handleCreate = async (data) => {
        try {
            await EmployeeService.createEmployee(data);
            setShowForm(false);
            loadEmployees();
        } catch (error) {
            console.error("Error creando empleado:", error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2 text-white">
                    <UserCheck className="text-brand-500" /> Gestión de Personal
                </h1>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all"
                >
                    {showForm ? <X size={18} /> : <Plus size={18} />}
                    {showForm ? 'Cerrar' : 'Nuevo Empleado'}
                </button>
            </div>

            {showForm && (
                <div className="mb-8 bg-surface-900 p-6 rounded-xl border border-brand-500/30 shadow-xl">
                    <h2 className="text-lg font-semibold mb-4 text-brand-400">Registrar Empleado</h2>
                    <p className="text-white">El formulario se cargará aquí próximamente.</p>
                </div>
            )}

            <div className="bg-surface-800 rounded-xl overflow-hidden border border-surface-700">
                <table className="w-full text-left">
                    <thead className="bg-surface-900 text-ink-soft uppercase text-xs">
                        <tr>
                            <th className="p-4">Nombre</th>
                            <th className="p-4">Género</th>
                            <th className="p-4">Horas</th>
                            <th className="p-4">Estado</th>
                            <th className="p-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-700 text-white">
                        {employees?.map((emp) => (
                            <tr key={emp.id} className="hover:bg-surface-700/50">
                                <td className="p-4 font-medium">{emp.name} {emp.surname}</td>
                                <td className="p-4">{emp.gender}</td>
                                <td className="p-4">{emp.work_hour}h</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${emp.hired ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                        {emp.hired ? 'ACTIVO' : 'INACTIVO'}
                                    </span>
                                </td>
                                <td className="p-4 text-right">
                                    <button className="text-red-400 hover:text-red-300 transition-colors">
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {(!employees || employees.length === 0) && (
                    <div className="p-10 text-center text-ink-soft text-white">No hay empleados registrados.</div>
                )}
            </div>
        </div>
    );
};

export default EmployeePage;