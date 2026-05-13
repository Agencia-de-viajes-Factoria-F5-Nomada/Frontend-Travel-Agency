import React, { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { DriverService } from '../services/DriverService';
import { UserCog, Phone, Mail, IdCard } from 'lucide-react';

const DriversPage = () => {
  const { data: drivers, loading, request: fetchDrivers } = useApi(DriverService.fetchDrivers);

  useEffect(() => {
    fetchDrivers();
  }, []);

  if (loading) return <div className="p-10 text-center text-brand-400">Cargando personal...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Conductores</h1>
          <p className="text-ink-soft">Gestiona el equipo de conductores certificados.</p>
        </div>
        <button className="rounded-xl bg-brand-500 px-5 py-2.5 font-semibold text-white hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/20">
          + Nuevo Conductor
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {drivers?.map((driver) => (
          <div key={driver.id} className="group relative overflow-hidden rounded-2xl border border-surface-700 bg-surface-900 p-6 transition-all hover:border-brand-500/50">
            <div className="flex items-start justify-between">
              <div className="rounded-full bg-brand-500/10 p-3 text-brand-400">
                <UserCog size={24} />
              </div>
              <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-400">
                Activo
              </span>
            </div>
            
            <div className="mt-4">
              <h3 className="text-lg font-bold text-white">{driver.name} {driver.lastName}</h3>
              <div className="mt-4 space-y-2 text-sm text-ink-soft">
                <p className="flex items-center gap-2"><IdCard size={14} /> Licencia: {driver.licenseNumber}</p>
                <p className="flex items-center gap-2"><Phone size={14} /> {driver.phone}</p>
                <p className="flex items-center gap-2"><Mail size={14} /> {driver.email}</p>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <button className="flex-1 rounded-lg bg-surface-800 py-2 text-xs font-medium text-white hover:bg-surface-700">Editar</button>
              <button className="rounded-lg bg-red-500/10 px-4 py-2 text-xs font-medium text-red-400 hover:bg-red-500/20">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {drivers?.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-surface-700 p-12 text-center text-ink-muted">
          No hay conductores registrados actualmente.
        </div>
      )}
    </div>
  );
};

export default DriversPage;