import { useEffect } from 'react'
import Table from '../molecules/Table'
import Pagination from '../molecules/Pagination'
import usePagination from '../../hooks/usePagination'
import { travelService } from '../../services/TravelsService'
import { hotelService } from '../../services/HotelService'
import { busService } from '../../services/BusService'
import { driverService } from '../../services/DriverService'
import { bookingService } from '../../services/BookingService'
import { formatDate } from '../../utils/formatters'

const ENTITY_CONFIG = {
  travels: {
    title: 'Viajes',
    service: travelService,
    columns: [
      { key: 'destiny', label: 'Destino' },
      { key: 'startDate', label: 'Inicio', render: (v) => formatDate(v) },
      { key: 'endDate', label: 'Fin', render: (v) => formatDate(v) },
      { key: 'availablePlaces', label: 'Plazas' },
      { key: 'sale', label: 'Oferta', render: (v) => v ? '✅' : '—' },
      { key: 'active', label: 'Activo', render: (v) => v ? '✅' : '❌' },
    ],
  },
  hotels: {
    title: 'Hoteles',
    service: hotelService,
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'city', label: 'Ciudad' },
      { key: 'country', label: 'País' },
      { key: 'stars', label: 'Estrellas', render: (v) => '⭐'.repeat(v) },
      { key: 'halfBoardPrice', label: 'Precio', render: (v) => `${v}€` },
      { key: 'active', label: 'Activo', render: (v) => v ? '✅' : '❌' },
    ],
  },
  buses: {
    title: 'Autobuses',
    service: busService,
    columns: [
      { key: 'busNumber', label: 'Matrícula' },
      { key: 'model', label: 'Modelo' },
      { key: 'capacity', label: 'Capacidad' },
      { key: 'available', label: 'Disponible', render: (v) => v ? '✅' : '❌' },
    ],
  },
  drivers: {
    title: 'Conductores',
    service: driverService,
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'license', label: 'Licencia' },
      { key: 'experience', label: 'Años exp.' },
      { key: 'active', label: 'Activo', render: (v) => v ? '✅' : '❌' },
    ],
  },
  bookings: {
    title: 'Reservas',
    service: bookingService,
    columns: [
      { key: 'id', label: 'Nº Reserva' },
      { key: 'travelDestiny', label: 'Destino' },
      { key: 'startDate', label: 'Inicio', render: (v) => formatDate(v) },
      { key: 'total', label: 'Total', render: (v) => `${v}€` },
      { key: 'status', label: 'Estado' },
    ],
  },
}

const EntityTable = ({ entityType }) => {
  const config = ENTITY_CONFIG[entityType]
  if (!config) return <p>Entidad no encontrada</p>

  const { data, page, totalPages, loading, load, setPage } = usePagination(
    config.service.getPage,
    0,
    10
  )

  useEffect(() => { load() }, [load, entityType])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white">{config.title}</h2>
      <Table columns={config.columns} data={data} loading={loading} emptyMessage={`No hay ${config.title.toLowerCase()}`} />
      <Pagination currentPage={page + 1} totalPages={totalPages} onPageChange={(p) => setPage(p - 1)} />
    </div>
  )
}

export default EntityTable
