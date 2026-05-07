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
        title={<span style={serifStyle} className="text-3xl">Listado de Reservas</span>}
        description="Gestión integral de clientes, seguros y pagos de la flota."
        actions={
          <>
            <Button variant="secondary" className="border-slate-200 text-slate-600 hover:bg-slate-50">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button className="bg-[#001f3f] hover:bg-slate-900 transition-colors">
              <Plus className="h-4 w-4" />
              Nueva reserva
            </Button>
          </>
        }
      />

      <Card className="mt-8 p-4 md:p-6 bg-white border-none shadow-xl rounded-2xl">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex flex-1 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 focus-within:border-[#001f3f] focus-within:bg-white transition-all">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="search"
              placeholder="Buscar por DNI, cliente o referencia..."
              className="h-12 w-full bg-transparent text-sm text-slate-700 focus:outline-none"
            />
          </label>
          <Button variant="secondary" className="border-slate-100 bg-slate-50 text-slate-600 hover:bg-white">
            <Filter className="h-4 w-4" />
            Filtros Avanzados
          </Button>
        </div>

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[950px] text-left text-sm">
            <thead className="border-b border-slate-50 text-[10px] uppercase tracking-[0.15em] text-slate-400 font-bold">
              <tr>
                <th className="py-5 px-2">Cliente / DNI</th>
                <th className="py-5 px-2">Contacto</th>
                <th className="py-5 px-2">Destino</th>
                <th className="py-5 px-2 text-center">Seguro</th>
                <th className="py-5 px-2">Precio (Desglose)</th>
                <th className="py-5 px-2 text-center">Estado</th>
                <th className="py-5 px-2 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {BOOKINGS.map((booking) => (
                <tr key={booking.id} className="hover:bg-slate-50/80 transition-all group">
                  <td className="py-5 px-2">
                    <div className="font-bold text-slate-800 text-base" style={serifStyle}>
                      {booking.customerName}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono">{booking.dni || '12345678X'}</div>
                  </td>
                  <td className="py-5 px-2 text-slate-600">
                    <div className="text-xs font-medium">{booking.email || 'cliente@mail.com'}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{booking.phone || '+34 600 000 000'}</div>
                  </td>
                  <td className="py-5 px-2">
                    <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded-md text-[11px] font-medium">
                      {booking.destination}
                    </span>
                  </td>
                  <td className="py-5 px-2 text-center">
                    {booking.hasInsurance ? (
                      <div className="flex justify-center">
                        <ShieldCheck className="h-5 w-5 text-green-500 bg-green-50 rounded-full p-0.5" />
                      </div>
                    ) : (
                      <div className="flex justify-center opacity-30">
                        <ShieldX className="h-5 w-5 text-slate-400" />
                      </div>
                    )}
                  </td>
                  <td className="py-5 px-2">
                    <div className="font-bold text-[#001f3f] text-sm">{formatCurrency(booking.total)}</div>
                    <div className="text-[9px] text-slate-400 uppercase tracking-tighter mt-0.5">
                      {Math.round(booking.total / (booking.travelers || 1))}€ por pers. ({booking.travelers})
                    </div>
                    {booking.prepaid > 0 && (
                      <div className="text-[9px] text-emerald-600 font-bold mt-1 bg-emerald-50 inline-block px-1 rounded">
                        PAGADO: {formatCurrency(booking.prepaid)}
                      </div>
                    )}
                  </td>
                  <td className="py-5 px-2 text-center">
                    <StatusPill status={booking.status} />
                  </td>
                  <td className="py-5 px-2 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-[#001f3f] hover:bg-[#001f3f] hover:text-white transition-all rounded-lg font-bold" 
                      style={serifStyle}
                    >
                      Gestionar
                    </Button>
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