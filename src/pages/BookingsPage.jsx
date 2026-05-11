import { Download, Filter, Plus, Search, ShieldCheck, ShieldX } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import StatusPill from '../components/common/StatusPill'
import { BOOKINGS } from '../constants/mockData'
import { formatCurrency } from '../utils/formatters'

const BookingsPage = () => {
  const serifStyle = { fontFamily: "'Cormorant Garamond', serif" };

  return (
    <>
      <PageHeader
        eyebrow="Operaciones"
        title={<span style={serifStyle}>Listado de Reservas</span>}
        description="Gestión integral de clientes, seguros y pagos."
        actions={
          <>
            <Button variant="secondary">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            {/* Movido al lado de cerrar sesión (simulado aquí en acciones) */}
            <Button className="bg-[#2c4a5a]">
              <Plus className="h-4 w-4" />
              Nueva reserva
            </Button>
          </>
        }
      />

      <Card className="mt-8 p-4 md:p-6 bg-white border-none shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex flex-1 items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 focus-within:border-[#2c4a5a] transition-colors">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Buscar por DNI, cliente o referencia..."
              className="h-10 w-full bg-transparent text-sm text-slate-700 focus:outline-none"
            />
          </label>
          <Button variant="secondary" className="border-slate-200 text-slate-600">
            <Filter className="h-4 w-4" />
            Filtros
          </Button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="border-b border-slate-100 text-xs uppercase tracking-widest text-slate-400">
              <tr>
                <th className="py-4">Cliente / DNI</th>
                <th className="py-4">Contacto</th>
                <th className="py-4">Destino</th>
                <th className="py-4 text-center">Seguro</th>
                <th className="py-4">Precio (Desglose)</th>
                <th className="py-4">Estado</th>
                <th className="py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {BOOKINGS.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4">
                    <div className="font-semibold text-slate-800" style={serifStyle}>
                      {booking.customerName}
                    </div>
                    <div className="text-[10px] text-slate-400">{booking.dni || '12345678X'}</div>
                  </td>
                  <td className="py-4 text-slate-600">
                    <div className="text-xs">{booking.email || 'cliente@mail.com'}</div>
                    <div className="text-[10px]">{booking.phone || '+34 600 000 000'}</div>
                  </td>
                  <td className="py-4 text-slate-600">{booking.destination}</td>
                  <td className="py-4 text-center">
                    {booking.hasInsurance ? (
                      <ShieldCheck className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      <ShieldX className="h-5 w-5 text-slate-300 mx-auto" />
                    )}
                  </td>
                  <td className="py-4">
                    <div className="font-medium text-[#2c4a5a]">{formatCurrency(booking.total)}</div>
                    <div className="text-[9px] text-slate-400 uppercase">
                      {booking.total / booking.travelers}€ por pers. ({booking.travelers})
                    </div>
                    {booking.prepaid > 0 && (
                      <div className="text-[9px] text-orange-500 italic">Pagado: {formatCurrency(booking.prepaid)}</div>
                    )}
                  </td>
                  <td className="py-4">
                    <StatusPill status={booking.status} />
                  </td>
                  <td className="py-4 text-right">
                    <Button variant="ghost" size="sm" className="text-[#2c4a5a] font-semibold" style={serifStyle}>Gestionar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}

export default BookingsPage