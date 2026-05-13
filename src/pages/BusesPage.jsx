import React, { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { BusService } from '../services/BusService';

const BusesPage = () => {
  const { data: buses, loading, error, request: fetchBuses } = useApi(BusService.fetchBuses);

  useEffect(() => {
    fetchBuses();
  }, []);

  const busesDeRespaldo = [
    { id: 1, license_plate: 'ABC-1234', model: 'Volvo Grand Luxe', capacity: 50 },
    { id: 2, license_plate: 'VIP-777', model: 'Scania Comfort', capacity: 45 }
  ];

  const listaAMostrar = (buses && buses.length > 0) ? buses : busesDeRespaldo;

  if (loading) return <p className="p-8 text-white text-center">Cargando flota...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Autobuses</h1>
          <p className="text-ink-soft">Control de unidades y capacidad de transporte.</p>
        </div>
        <button className="rounded-xl bg-brand-500 px-5 py-2.5 font-semibold text-white hover:bg-brand-600 transition-colors">
          + Registrar Autobús
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-surface-700 bg-surface-900">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-800 text-xs uppercase tracking-wider text-ink-muted">
            <tr>
              <th className="px-6 py-4">Matrícula / Placa</th>
              <th className="px-6 py-4">Modelo</th>
              <th className="px-6 py-4">Capacidad</th>
              <th className="px-6 py-4">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700">
            {listaAMostrar.map((bus) => (
              <tr key={bus.id} className="hover:bg-surface-800/50 transition-colors">
                <td className="px-6 py-4 font-mono text-brand-400">
                  {bus.license_plate || bus.plate || 'S/N'}
                </td>
                <td className="px-6 py-4 text-white">{bus.model}</td>
                <td className="px-6 py-4 text-ink-soft">{bus.capacity} Asientos</td>
                <td className="px-6 py-4 flex gap-4">
                  <button className="text-blue-400 hover:underline">Editar</button>
                  <button className="text-red-400 hover:underline">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {error && (
        <p className="text-xs text-orange-500 text-center italic">
          Servidor no disponible. Mostrando datos de respaldo.
        </p>
      )}
    </div>
  );
};

export default BusesPage;