import { useState, useEffect, useCallback } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import usePagination from '../../hooks/usePagination'
import { formatDate, formatCurrency } from '../../utils/formatters'

// Servicios
import { travelService } from '../../services/travelsService'
import { hotelService } from '../../services/hotelService'
import { busService } from '../../services/busService'
import { driverService } from '../../services/driverService'
import { bookingService } from '../../services/bookingService'
import { userService } from '../../services/usersService'
import { employeesService } from '../../services/employeesService'
import { offersService } from '../../services/offersService'
import { tripSegmentsService } from '../../services/tripSegmentsService'

// Formularios
import TravelForm from './TravelForm'
import HotelForm from './HotelForm'
import BusForm from './BusForm'
import DriverForm from './DriverForm'
import BookingForm from './BookingForm'
import UserForm from './UserForm'
import EmployeeForm from './EmployeeForm'
import OfferForm from './OfferForm'
import TripSegmentForm from './TripSegmentForm'
import { validatePasswordStrength } from '../../utils/passwordValidation'

// ─────────────────────────────────────────────
// Configuracion de las 9 entidades
// ─────────────────────────────────────────────

const ENTITY_CONFIG = {
  travels: {
    title: 'Viajes',
    service: travelService,
    columns: [
      { key: 'destiny', label: 'Destino' },
      { key: 'startDate', label: 'Inicio', render: (v) => formatDate(v) },
      { key: 'endDate', label: 'Fin', render: (v) => formatDate(v) },
      { key: 'availablePlaces', label: 'Plazas' },
      { key: 'hotelId', label: 'Hotel', render: (val, _row, related) => related?.hotels?.find(h => h.id === val)?.name ?? val },
      { key: 'busId', label: 'Bus', render: (val, _row, related) => val ? (related?.buses?.find(b => b.id === val)?.busNumber ?? val) : '—' },
      { key: 'sale', label: 'Oferta', render: (v) => v ? 'Si' : 'No' },
      { key: 'discountPercentage', label: 'Dto. %', render: (v) => v ? `${v}%` : '—' },
      { key: 'active', label: 'Activo', render: (v) => v !== false ? 'Si' : 'No' },
    ],
    FormComponent: TravelForm,
    emptyForm: { destiny: '', startDate: '', endDate: '', availablePlaces: 0, sale: false, hotelId: '', busId: '' },
    rowToForm: (row) => ({
      destiny: row.destiny ?? '',
      startDate: row.startDate ?? '',
      endDate: row.endDate ?? '',
      availablePlaces: row.availablePlaces ?? 0,
      sale: row.sale ?? false,
      hotelId: row.hotelId ?? '',
      busId: row.busId ?? '',
    }),
    formToPayload: (form) => ({
      ...form,
      availablePlaces: Number(form.availablePlaces),
      hotelId: Number(form.hotelId),
      busId: form.busId ? Number(form.busId) : null,
    }),
    deleteLabel: (row) => `el viaje a "${row.destiny}"`,
    relatedKeys: ['hotels', 'buses'],
    formProps: (related) => ({ hotels: related.hotels || [], buses: related.buses || [] }),
  },

  hotels: {
    title: 'Hoteles',
    service: hotelService,
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'address', label: 'Direccion' },
      { key: 'city', label: 'Ciudad' },
      { key: 'country', label: 'Pais' },
      { key: 'stars', label: 'Estrellas', render: (v) => '⭐'.repeat(v || 0) },
      { key: 'capacity', label: 'Capacidad' },
      { key: 'availablePlaces', label: 'Plazas disp.' },
      { key: 'halfBoardPrice', label: 'Media pension', render: (v) => v ? `${v}€` : '—' },
      { key: 'fullBoardPrice', label: 'P. completa', render: (v) => v ? `${v}€` : '—' },
      { key: 'active', label: 'Activo', render: (v) => v !== false ? 'Si' : 'No' },
    ],
    FormComponent: HotelForm,
    emptyForm: { name: '', address: '', city: '', country: '', stars: 3, capacity: 0, availablePlaces: 0, halfBoardPrice: 0, fullBoardPrice: 0, imageUrl: '', active: true },
    rowToForm: (row) => ({
      name: row.name ?? '',
      address: row.address ?? '',
      city: row.city ?? '',
      country: row.country ?? '',
      stars: row.stars ?? 3,
      capacity: row.capacity ?? 0,
      availablePlaces: row.availablePlaces ?? 0,
      halfBoardPrice: row.halfBoardPrice ?? row.half_board_price ?? 0,
      fullBoardPrice: row.fullBoardPrice ?? row.full_board_price ?? 0,
      imageUrl: row.imageUrl ?? row.image_url ?? '',
      active: row.active ?? true,
    }),
    formToPayload: (form) => ({
      ...form,
      stars: Number(form.stars),
      capacity: Number(form.capacity),
      availablePlaces: Number(form.availablePlaces),
      halfBoardPrice: Number(form.halfBoardPrice),
      fullBoardPrice: Number(form.fullBoardPrice),
    }),
    deleteLabel: (row) => `el hotel "${row.name}"`,
  },

  buses: {
    title: 'Autobuses',
    service: busService,
    columns: [
      { key: 'busNumber', label: 'Numero', render: (v, row) => v || row.licensePlate || '—' },
      { key: 'model', label: 'Modelo' },
      { key: 'capacity', label: 'Capacidad' },
      { key: 'available', label: 'Disponible', render: (v) => v ? 'Si' : 'No' },
    ],
    FormComponent: BusForm,
    emptyForm: { licensePlate: '', capacity: 0, driverId: '', bath: false, wifi: false, ac: false, usb: false, available: true },
    rowToForm: (row) => ({
      licensePlate: row.licensePlate ?? row.busNumber ?? '',
      capacity: row.capacity ?? 0,
      driverId: row.driverId ?? '',
      bath: row.bath ?? false,
      wifi: row.wifi ?? false,
      ac: row.ac ?? false,
      usb: row.usb ?? false,
      available: row.available ?? true,
    }),
    formToPayload: (form) => ({
      ...form,
      capacity: Number(form.capacity),
      driverId: form.driverId ? Number(form.driverId) : null,
    }),
    deleteLabel: (row) => `el autobus "${row.busNumber || row.licensePlate}"`,
  },

  drivers: {
    title: 'Conductores',
    service: driverService,
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'surname', label: 'Apellido' },
      { key: 'enrollment', label: 'Matriculacion', render: (v, row) => v || row.license || '—' },
      { key: 'experience', label: 'Anos exp.' },
      { key: 'licenceActive', label: 'Licencia activa', render: (v, row) => (v ?? row.active) ? 'Si' : 'No' },
    ],
    FormComponent: DriverForm,
    emptyForm: { name: '', surname: '', enrollment: '', imageUrl: '', licenceActive: true },
    rowToForm: (row) => ({
      name: row.name ?? '',
      surname: row.surname ?? '',
      enrollment: row.enrollment ?? row.license ?? '',
      imageUrl: row.imageUrl ?? '',
      licenceActive: row.licenceActive ?? row.active ?? true,
    }),
    formToPayload: (form) => ({ ...form }),
    deleteLabel: (row) => `el conductor "${row.name}"`,
  },

  bookings: {
    title: 'Reservas',
    service: bookingService,
    columns: [
      { key: 'id', label: 'N Reserva' },
      { key: 'customerName', label: 'Cliente', render: (v, row) => v || row.destination || '—' },
      { key: 'travelDestiny', label: 'Destino', render: (v, row) => v || row.destination || '—' },
      { key: 'startDate', label: 'Inicio', render: (v) => v ? formatDate(v) : '—' },
      { key: 'endDate', label: 'Fin', render: (v) => v ? formatDate(v) : '—' },
      { key: 'travelers', label: 'Viajeros' },
      { key: 'total', label: 'Total', render: (v) => v ? `${v}€` : '—' },
      { key: 'status', label: 'Estado' },
    ],
    FormComponent: BookingForm,
    emptyForm: { customerName: '', destination: '', bookingDate: '' },
    rowToForm: (row) => ({
      customerName: row.customerName ?? '',
      destination: row.destination ?? row.travelDestiny ?? '',
      bookingDate: row.bookingDate ?? row.startDate ?? '',
    }),
    formToPayload: (form) => ({ ...form }),
    deleteLabel: (row) => `la reserva "${row.id}"`,
  },

  users: {
    title: 'Usuarios',
    service: userService,
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'surname', label: 'Apellido' },
      { key: 'email', label: 'Email' },
      { key: 'passport', label: 'Pasaporte' },
      { key: 'birthDate', label: 'Nacimiento', render: (v) => v ? formatDate(v) : '—' },
      { key: 'rol', label: 'Rol', render: (v, row) => v || row.role || '—' },
      { key: 'active', label: 'Activo', render: (v) => v !== false ? 'Si' : 'No' },
    ],
    FormComponent: UserForm,
    emptyForm: { name: '', surname: '', email: '', password: '', passport: '', birthDate: '', rol: 'USER', tutorId: '', active: true },
    rowToForm: (row) => ({
      name: row.name ?? '',
      surname: row.surname ?? '',
      email: row.email ?? '',
      password: '',
      passport: row.passport ?? '',
      birthDate: row.birthDate ?? '',
      rol: row.rol ?? row.role ?? 'USER',
      tutorId: row.tutorId ?? '',
      active: row.active ?? true,
    }),
    formToPayload: (form) => {
      const payload = { ...form, tutorId: form.tutorId ? Number(form.tutorId) : null }
      if (!payload.password) delete payload.password
      return payload
    },
    deleteLabel: (row) => `el usuario "${row.name} ${row.surname}"`,
  },

  employees: {
    title: 'Empleados',
    service: employeesService,
    columns: [
      { key: 'name', label: 'Nombre' },
      { key: 'surname', label: 'Apellido' },
      { key: 'gender', label: 'Genero' },
      { key: 'work_hour', label: 'Horas trabajo', render: (v, row) => v ?? row.workHour ?? '—' },
      { key: 'hired', label: 'Contratado', render: (v) => v ? 'Si' : 'No' },
    ],
    FormComponent: EmployeeForm,
    emptyForm: { name: '', surname: '', gender: 'Male', work_hour: 0, hired: true },
    rowToForm: (row) => ({
      name: row.name ?? '',
      surname: row.surname ?? '',
      gender: row.gender ?? 'Male',
      work_hour: row.work_hour ?? row.workHour ?? 0,
      hired: row.hired ?? true,
    }),
    formToPayload: (form) => ({ ...form, work_hour: Number(form.work_hour) }),
    deleteLabel: (row) => `el empleado "${row.name} ${row.surname}"`,
  },

  offers: {
    title: 'Ofertas',
    service: offersService,
    columns: [
      { key: 'discount_percentage', label: 'Descuento %', render: (v, row) => `${v ?? row.discountPercentage ?? row.discount ?? 0}%` },
      { key: 'start_date', label: 'Inicio', render: (v, row) => formatDate(v || row.startDate || row.validUntil) },
      { key: 'end_date', label: 'Fin', render: (v, row) => formatDate(v || row.endDate || '') },
    ],
    FormComponent: OfferForm,
    emptyForm: { discount_percentage: 0, start_date: '', end_date: '' },
    rowToForm: (row) => ({
      discount_percentage: row.discount_percentage ?? row.discountPercentage ?? row.discount ?? 0,
      start_date: row.start_date ?? row.startDate ?? '',
      end_date: row.end_date ?? row.endDate ?? '',
    }),
    formToPayload: (form) => ({ ...form, discount_percentage: Number(form.discount_percentage) }),
    deleteLabel: (row) => `la oferta con ${row.discount_percentage ?? row.discount}% de descuento`,
  },

  'trip-segments': {
    title: 'Tramos',
    service: tripSegmentsService,
    columns: [
      { key: 'origin', label: 'Origen' },
      { key: 'destination', label: 'Destino' },
      { key: 'start_time', label: 'Salida', render: (v, row) => v || row.startTime || '—' },
      { key: 'end_time', label: 'Llegada', render: (v, row) => v || row.endTime || '—' },
      { key: 'bus_id', label: 'ID Bus', render: (v, row) => v ?? row.busId ?? '—' },
      { key: 'driver_id', label: 'ID Conductor', render: (v, row) => v ?? row.driverId ?? '—' },
      { key: 'travel_id', label: 'ID Viaje', render: (v, row) => v ?? row.travelId ?? '—' },
    ],
    FormComponent: TripSegmentForm,
    emptyForm: { origin: '', destination: '', start_time: '', end_time: '', bus_id: '', driver_id: '', travel_id: '' },
    rowToForm: (row) => ({
      origin: row.origin ?? '',
      destination: row.destination ?? '',
      start_time: row.start_time ?? row.startTime ?? '',
      end_time: row.end_time ?? row.endTime ?? '',
      bus_id: row.bus_id ?? row.busId ?? '',
      driver_id: row.driver_id ?? row.driverId ?? '',
      travel_id: row.travel_id ?? row.travelId ?? '',
    }),
    formToPayload: (form) => ({
      ...form,
      bus_id: form.bus_id ? Number(form.bus_id) : null,
      driver_id: form.driver_id ? Number(form.driver_id) : null,
      travel_id: form.travel_id ? Number(form.travel_id) : null,
    }),
    deleteLabel: (row) => `el tramo "${row.origin} → ${row.destination}"`,
  },
}

// ─────────────────────────────────────────────
// Funciones para cargar datos relacionados
// ─────────────────────────────────────────────

const RELATED_LOADERS = {
  hotels: async () => {
    const data = await hotelService.getAll()
    return Array.isArray(data) ? data : (data.content || [])
  },
  buses: async () => {
    const data = await busService.getAll()
    return Array.isArray(data) ? data : (data.content || [])
  },
}

// ─────────────────────────────────────────────
// Componente EntityTable
// ─────────────────────────────────────────────

const EntityTable = ({ entityType }) => {
  const config = ENTITY_CONFIG[entityType]
  if (!config) return <p className="text-ink-muted">Entidad no encontrada</p>

  const { service, FormComponent } = config

  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(config.emptyForm)
  const [error, setError] = useState(null)
  const [related, setRelated] = useState({})

  const { data, page, totalPages, loading, load } = usePagination(
    service.getPage,
    0,
    10
  )

  // Cargar datos relacionados si la entidad los necesita
  const loadRelated = useCallback(async () => {
    if (!config.relatedKeys?.length) return
    const result = {}
    for (const key of config.relatedKeys) {
      if (RELATED_LOADERS[key]) {
        try {
          result[key] = await RELATED_LOADERS[key]()
        } catch {
          result[key] = []
        }
      }
    }
    setRelated(result)
  }, [entityType])

  useEffect(() => {
    load()
    loadRelated()
  }, [load, entityType, loadRelated])

  // Reset estado cuando cambia la entidad
  useEffect(() => {
    setShowForm(false)
    setEditing(null)
    setDeleting(null)
    setForm(config.emptyForm)
    setError(null)
  }, [entityType])

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const openCreate = () => {
    setEditing(null)
    setForm({ ...config.emptyForm })
    setShowForm(true)
  }

  const openEdit = (row) => {
    setEditing(row)
    setForm(config.rowToForm(row))
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    if (e?.preventDefault) e.preventDefault()
    try {
      if (entityType === 'users') {
        const passwordError = validatePasswordStrength(form.password || '')
        if ((!editing && passwordError) || (editing && form.password && passwordError)) {
          setError(passwordError)
          return
        }
      }
      const payload = config.formToPayload(form)
      if (editing) {
        await service.update(editing.id, payload)
      } else {
        await service.create(payload)
      }
      setShowForm(false)
      setEditing(null)
      setError(null)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async () => {
    try {
      await service.delete(deleting.id)
      setDeleting(null)
      setError(null)
      load()
    } catch (err) {
      setError(err.message)
    }
  }

  // Construir columnas con la columna de acciones
  const columnsWithActions = [
    ...config.columns.map(col => {
      // Si el render del config usa 3 args (val, row, related), envolver para inyectar related
      const originalRender = col.render
      if (!originalRender) return col
      return {
        ...col,
        render: (val, row) => originalRender(val, row, related),
      }
    }),
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (_, row) => (
        <div className="flex gap-2 justify-end">
          <Button size="sm" onClick={(e) => { e.stopPropagation(); openEdit(row) }}>Editar</Button>
          <Button size="sm" variant="danger" onClick={(e) => { e.stopPropagation(); setDeleting(row) }}>Eliminar</Button>
        </div>
      ),
    },
  ]

  // Props extra para el formulario (datos relacionados)
  const extraFormProps = config.formProps ? config.formProps(related) : {}

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">{config.title}</h2>
        <Button onClick={openCreate}>+ Nuevo</Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Table
        columns={columnsWithActions}
        data={data}
        loading={loading}
        emptyMessage={`No hay ${config.title.toLowerCase()}`}
      />

      <Pagination
        currentPage={page + 1}
        totalPages={totalPages}
        onPageChange={(p) => load(p - 1)}
      />

      <Modal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null) }}
        title={editing ? `Editar ${config.title.slice(0, -1).toLowerCase()}` : `Nuevo ${config.title.slice(0, -1).toLowerCase()}`}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditing(null) }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear'}
            </Button>
          </>
        }
      >
        <FormComponent
          form={form}
          onChange={change}
          initialData={editing}
          {...extraFormProps}
        />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title={`Eliminar ${config.title.slice(0, -1).toLowerCase()}`}
        message={`¿Estas seguro de que deseas eliminar ${deleting ? config.deleteLabel(deleting) : ''}?`}
        confirmLabel="Eliminar"
      />
    </div>
  )
}

export default EntityTable
