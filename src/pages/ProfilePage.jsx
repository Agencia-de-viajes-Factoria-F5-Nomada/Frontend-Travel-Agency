import { useState } from 'react'
import { Mail, MapPin, Plane, User } from 'lucide-react'
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

  // --- LÓGICA DE REGISTRO (CREATE) ---
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

  // --- LÓGICA DE ELIMINAR (DELETE) ---
  const handleDeleteBooking = (id) => {
    if (window.confirm("¿Estás segura de que deseas cancelar esta reserva?")) {
      setBookings((prev) => prev.filter((booking) => booking.id !== id))
    }
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

      <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card as="aside" aria-label="Resumen del perfil" className="p-6">
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-brand-500 text-lg font-semibold text-surface-950">
              MS
            </span>
            <div>
              <p className="font-semibold text-white">Marta Sánchez</p>
              <p className="text-sm text-ink-muted">Viajera Premium</p>
            </div>
          </div>
          <ul className="mt-6 grid gap-3 text-sm text-ink-soft">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-400" aria-hidden="true" />
              marta@travel.io
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-400" aria-hidden="true" />
              Madrid, España
            </li>
            <li className="flex items-center gap-2">
              <User className="h-4 w-4 text-brand-400" aria-hidden="true" />
              Miembro desde 2022
            </li>
          </ul>
          <Button variant="secondary" fullWidth className="mt-6">
            Editar perfil
          </Button>
        </Card>

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
                    <th scope="col" className="py-3 text-right">Acciones</th>
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
                      <td className="py-4 text-right flex gap-2 justify-end">
                        <Button variant="ghost" size="sm">
                          Ver
                        </Button>
                        {/* BOTÓN ELIMINAR AGREGADO AQUÍ */}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-500 hover:bg-red-500/10"
                          onClick={() => handleDeleteBooking(booking.id)}
                        >
                          Eliminar
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