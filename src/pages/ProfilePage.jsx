import { useState } from 'react'
import { Plane } from 'lucide-react'
import BookingFormModal from '../components/common/BookingFormModal'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import PageHeader from '../components/ui/PageHeader'
import { BOOKINGS } from '../constants/mockData'
import { PUBLIC_PATHS } from '../constants/paths'
import { formatCurrency } from '../utils/formatters'

const ProfilePage = () => {
  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false)
  const [bookings, setBookings] = useState(BOOKINGS)

  const handleBookingSubmit = (data) => {
    const newBooking = {
      id: `TR-${Date.now().toString().slice(-4)}`,
      destination: data.destination,
      dates: `${data.startDate} - ${data.endDate}`,
      travelers: Number(data.travelers),
      total: 0,
      status: 'pending',
      name: data.name,
      dni: data.dni,
      email: data.email,
      phone: data.phone,
      signalPaid: 0,
    }
    setBookings((prev) => [newBooking, ...prev])
  }

  return (
    <div className="container-page py-12">
      <PageHeader
        eyebrow="Mi cuenta"
        title="Bienvenida de nuevo, Marta"
        description="Gestiona tus viajes, datos personales y preferencias."
        actions={
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsBookingFormOpen(true)}
            >
              <Plane className="h-4 w-4" aria-hidden="true" />
              Planificar un nuevo viaje
            </Button>
            <Button variant="secondary" to={PUBLIC_PATHS.AUTH}>
              Cerrar sesión
            </Button>
          </div>
        }
      />

    <div className="mt-8 grid gap-6">
      <div className="flex flex-col gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Mis reservas</h2>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-ink-muted">
                <tr>
                  <th scope="col" className="py-3">Nombre</th>
                  <th scope="col" className="py-3">DNI</th>
                  <th scope="col" className="py-3">Datos de Contacto</th>
                  <th scope="col" className="py-3">Señal Pagada</th>
                  <th scope="col" className="py-3"></th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="border-t border-surface-700 text-ink-soft">
                    <td className="py-4 font-medium text-white">{booking.name}</td>
                    <td className="py-4">{booking.dni}</td>
                    <td className="py-4">
                      <div className="text-sm">
                        <div>{booking.email}</div>
                        <div>{booking.phone}</div>
                      </div>
                    </td>
                    <td className="py-4">{formatCurrency(booking.signalPaid)}</td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>

      <BookingFormModal
        open={isBookingFormOpen}
        onClose={() => setIsBookingFormOpen(false)}
        onSubmit={handleBookingSubmit}
      />
    </div>
  )
}

export default ProfilePage
