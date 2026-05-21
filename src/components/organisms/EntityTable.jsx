import { useState, useEffect, useCallback } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import usePagination from '../../hooks/usePagination'
import { formatDate } from '../../utils/formatters'
import { validatePasswordStrength } from '../../utils/passwordValidation'

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

// Formularios (solo los que mantienen layout custom)
import BaseForm from './BaseForm'
import BookingForm from './BookingForm'

const GENDER_OPTIONS = [
  { value: 'MALE', label: 'Masculino' },
  { value: 'FEMALE', label: 'Femenino' },
  { value: 'NON_BINARY', label: 'No binario' },
]

const STAR_OPTIONS = [
  { value: 1, label: '1 ⭐' },
  { value: 2, label: '2 ⭐⭐' },
  { value: 3, label: '3 ⭐⭐⭐' },
  { value: 4, label: '4 ⭐⭐⭐⭐' },
  { value: 5, label: '5 ⭐⭐⭐⭐⭐' },
]

// ─────────────────────────────────────────────
// Configuracion de las 9 entidades
// ─────────────────────────────────────────────

const ENTITY_CONFIG = {
  travels: {
    title: 'Viajes',
    service: travelService,
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'destiny', label: 'Destino' },
      { key: 'startDate', label: 'Inicio', render: (v) => formatDate(v) },
      { key: 'endDate', label: 'Fin', render: (v) => formatDate(v) },
      { key: 'hotelName', label: 'Hotel' },
      { key: 'hotelCity', label: 'Ciudad hotel' },
      { key: 'hotelStars', label: 'Estrellas', render: (v) => '⭐'.repeat(v || 0) },
      { key: 'availablePlaces', label: 'Plazas' },
      { key: 'halfBoardPrice', label: 'Media pens.', render: (v) => v ? `${v}€` : '—' },
      { key: 'fullBoardPrice', label: 'Pension comp.', render: (v) => v ? `${v}€` : '—' },
      { key: 'discountPercentage', label: 'Dto. %', render: (v) => v ? `${v}%` : '—' },
      { key: 'sale', label: 'Oferta', render: (v) => v ? 'Si' : 'No' },
      { key: 'active', label: 'Activo', render: (v) => v !== false ? 'Si' : 'No' },
    ],
    FormComponent: null,
    emptyForm: { destiny: '', startDate: '', endDate: '', availablePlaces: 0, sale: false, hotelId: '' },
    rowToForm: (row) => ({
      destiny: row.destiny ?? '',
      startDate: row.startDate ?? '',
      endDate: row.endDate ?? '',
      availablePlaces: row.availablePlaces ?? 0,
      sale: row.sale ?? false,
      hotelId: row.hotelId ?? '',
    }),
    formToPayload: (form) => ({
      ...form,
      availablePlaces: Number(form.availablePlaces),
      hotelId: Number(form.hotelId),
    }),
    deleteLabel: (row) => `el viaje a "${row.destiny}"`,
    relatedKeys: ['hotels'],
    formProps: (related) => ({ hotels: related.hotels || [] }),
    formFields: [
      { name: 'destiny', label: 'Destino', type: 'text', required: true, placeholder: 'Ej: París, Francia' },
      { name: 'startDate', label: 'Fecha inicio', type: 'date', required: true, fullWidth: false },
      { name: 'endDate', label: 'Fecha fin', type: 'date', required: true, fullWidth: false },
      { name: 'availablePlaces', label: 'Plazas disponibles', type: 'number', required: true },
      { name: 'hotelId', label: 'Hotel', type: 'select', required: true, mapOptions: (r) => (r.hotels || []).map((h) => ({ value: h.id, label: `${h.name} — ${h.city}` })) },
      { name: 'sale', label: 'En oferta', type: 'checkbox' },
    ],
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
    FormComponent: null,
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
    formFields: [
      { name: 'name', label: 'Nombre', type: 'text', required: true, fullWidth: false },
      { name: 'stars', label: 'Estrellas', type: 'select', options: STAR_OPTIONS, fullWidth: false },
      { name: 'address', label: 'Dirección', type: 'text' },
      { name: 'city', label: 'Ciudad', type: 'text', required: true, fullWidth: false, breakRow: true },
      { name: 'country', label: 'País', type: 'text', required: true, fullWidth: false },
      { name: 'capacity', label: 'Capacidad total', type: 'number', fullWidth: false, breakRow: true },
      { name: 'availablePlaces', label: 'Plazas disponibles', type: 'number', fullWidth: false },
      { name: 'halfBoardPrice', label: 'Precio media pensión (€)', type: 'number', step: '0.01', fullWidth: false, breakRow: true },
      { name: 'fullBoardPrice', label: 'Precio pensión completa (€)', type: 'number', step: '0.01', fullWidth: false },
      { name: 'imageUrl', label: 'Imagen del hotel', type: 'image' },
      { name: 'active', label: 'Activo', type: 'checkbox' },
    ],
  },

  buses: {
    title: 'Autobuses',
    service: busService,
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'licensePlate', label: 'Matricula' },
      { key: 'capacity', label: 'Capacidad' },
      { key: 'location', label: 'Ubicacion' },
      { key: 'availablePlaces', label: 'Plazas disp.' },
      { key: 'bath', label: 'Bano', render: (v) => v ? 'Si' : 'No' },
      { key: 'wifi', label: 'Wifi', render: (v) => v ? 'Si' : 'No' },
      { key: 'ac', label: 'Aire', render: (v) => v ? 'Si' : 'No' },
      { key: 'usb', label: 'USB', render: (v) => v ? 'Si' : 'No' },
      { key: 'active', label: 'Activo', render: (v) => v !== false ? 'Si' : 'No' },
    ],
    FormComponent: null,
    emptyForm: { licensePlate: '', capacity: 0, location: '', availablePlaces: 0, bath: false, wifi: false, ac: false, usb: false, active: true },
    rowToForm: (row) => ({
      licensePlate: row.licensePlate ?? '',
      capacity: row.capacity ?? 0,
      location: row.location ?? '',
      availablePlaces: row.availablePlaces ?? 0,
      bath: row.bath ?? false,
      wifi: row.wifi ?? false,
      ac: row.ac ?? false,
      usb: row.usb ?? false,
      active: row.active ?? true,
    }),
    formToPayload: (form) => ({
      licensePlate: form.licensePlate,
      capacity: Number(form.capacity),
      location: form.location,
      availablePlaces: Number(form.availablePlaces),
      bath: form.bath,
      wifi: form.wifi,
      ac: form.ac,
      usb: form.usb,
      active: form.active,
    }),
    deleteLabel: (row) => `el autobus "${row.licensePlate}"`,
    formFields: [
      { name: 'licensePlate', label: 'Matricula', type: 'text', required: true, fullWidth: false },
      { name: 'capacity', label: 'Capacidad', type: 'number', required: true, fullWidth: false },
      { name: 'location', label: 'Ubicacion', type: 'text', fullWidth: false, breakRow: true },
      { name: 'availablePlaces', label: 'Plazas disponibles', type: 'number', fullWidth: false },
      {
        type: 'checkbox-group',
        label: 'Equipamiento',
        className: 'bg-brand-100/60',
        checkboxes: [
          { name: 'bath', label: 'Bano' },
          { name: 'wifi', label: 'Wifi' },
          { name: 'ac', label: 'Aire acondicionado' },
          { name: 'usb', label: 'USB' },
        ],
      },
      { name: 'active', label: 'Activo', type: 'checkbox' },
    ],
  },

  drivers: {
    title: 'Conductores',
    service: driverService,
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Nombre' },
      { key: 'phone', label: 'Telefono' },
      { key: 'licenceActive', label: 'Licencia activa', render: (v) => v ? 'Si' : 'No' },
      { key: 'imageUrl', label: 'Imagen', render: (v) => v ? 'Si' : 'No' },
      { key: 'busId', label: 'ID Bus' },
      { key: 'busLicensePlate', label: 'Matricula bus' },
      { key: 'active', label: 'Activo', render: (v) => v !== false ? 'Si' : 'No' },
    ],
    FormComponent: null,
    emptyForm: { name: '', phone: '', licenceActive: true, imageUrl: '', busId: '', active: true },
    rowToForm: (row) => ({
      name: row.name ?? '',
      phone: row.phone ?? '',
      licenceActive: row.licenceActive ?? true,
      imageUrl: row.imageUrl ?? '',
      busId: row.busId ?? '',
      active: row.active ?? true,
    }),
    formToPayload: (form) => ({
      name: form.name,
      phone: form.phone,
      licenceActive: form.licenceActive,
      imageUrl: form.imageUrl,
      busId: form.busId ? Number(form.busId) : null,
      active: form.active,
    }),
    deleteLabel: (row) => `el conductor "${row.name}"`,
    relatedKeys: ['buses'],
    formProps: (related) => ({ buses: related.buses || [] }),
    formFields: [
      { name: 'name', label: 'Nombre', type: 'text', required: true, fullWidth: false },
      { name: 'phone', label: 'Telefono', type: 'text', fullWidth: false, breakRow: true },
      { name: 'licenceActive', label: 'Licencia activa', type: 'checkbox' },
      { name: 'imageUrl', label: 'URL Imagen', type: 'text', fullWidth: false },
      { name: 'busId', label: 'Autobus', type: 'select', mapOptions: (r) => [{ value: '', label: 'Sin asignar' }, ...(r.buses || []).map((b) => ({ value: b.id, label: `${b.licensePlate} (${b.capacity} plazas)` }))] },
    ],
  },

  bookings: {
    title: 'Reservas',
    service: bookingService,
    columns: [
      { key: 'bookingId', label: 'N Reserva' },
      { key: 'boughtDate', label: 'Fecha compra', render: (v) => v ? formatDate(v) : '—' },
      { key: 'travelDestiny', label: 'Destino' },
      { key: 'typeBoard', label: 'Pension', render: (v) => v === 'HALF' ? 'Media' : v === 'FULL' ? 'Completa' : v },
      { key: 'isGroup', label: 'Grupo', render: (v) => v ? 'Si' : 'No' },
      { key: 'totalPrice', label: 'Total', render: (v) => v ? `${v}€` : '—' },
      { key: 'customerIds', label: 'Clientes', render: (v) => v ? v.length : 0 },
      { key: 'employeeId', label: 'Emp. ID' },
    ],
    FormComponent: BookingForm,
    emptyForm: { travelId: '', customerIds: [], typeBoard: 'HALF', isGroup: false, employeeId: '' },
    rowToForm: (row) => ({
      travelId: row.travelId ?? '',
      customerIds: row.customerIds ?? [],
      typeBoard: row.typeBoard ?? 'HALF',
      isGroup: row.isGroup ?? false,
      employeeId: row.employeeId ?? '',
    }),
    formToPayload: (form) => ({
      travelId: Number(form.travelId),
      typeBoard: form.typeBoard,
      isGroup: form.isGroup === 'true' || form.isGroup === true,
      customerIds: Array.isArray(form.customerIds) ? form.customerIds.map(Number) : [],
      employeeId: form.employeeId ? Number(form.employeeId) : null,
      boughtDate: new Date().toISOString(),
    }),
    deleteLabel: (row) => `la reserva "${row.bookingId}"`,
    relatedKeys: ['travels', 'users'],
    formFields: [
      { name: 'travelId', label: 'Viaje', type: 'select', required: true, mapOptions: (r) => (r.travels || []).map((t) => ({ value: t.id, label: `${t.destiny} (${t.startDate ?? ''})` })) },
      { name: 'customerIds', label: 'Clientes', type: 'select-multiple', mapOptions: (r) => (r.users || []).map((u) => ({ value: u.id, label: `${u.name} ${u.surname}` })) },
      { name: 'employeeId', label: 'Empleado', type: 'select', mapOptions: () => [{ value: '', label: 'Sin asignar' }] },
      { name: 'typeBoard', label: 'Tipo de pension', type: 'select', options: [{ value: 'HALF', label: 'Media pension' }, { value: 'FULL', label: 'Pension completa' }], required: true },
      { name: 'isGroup', label: '¿Reserva de grupo?', type: 'select', options: [{ value: 'false', label: 'No' }, { value: 'true', label: 'Si' }] },
    ],
  },

  users: {
    title: 'Usuarios',
    service: userService,
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'name', label: 'Nombre' },
      { key: 'surname', label: 'Apellido' },
      { key: 'email', label: 'Email' },
      { key: 'dni', label: 'DNI' },
      { key: 'phone', label: 'Telefono' },
      { key: 'age', label: 'Edad' },
      { key: 'tutorId', label: 'ID Tutor' },
      { key: 'active', label: 'Activo', render: (v) => v !== false ? 'Si' : 'No' },
    ],
    FormComponent: null,
    emptyForm: { name: '', surname: '', email: '', password: '', dni: '', phone: '', age: 0, tutorId: '', active: true },
    rowToForm: (row) => ({
      name: row.name ?? '',
      surname: row.surname ?? '',
      email: row.email ?? '',
      password: '',
      dni: row.dni ?? '',
      phone: row.phone ?? '',
      age: row.age ?? 0,
      tutorId: row.tutorId ?? '',
      active: row.active ?? true,
    }),
    formToPayload: (form) => {
      const payload = {
        name: form.name,
        surname: form.surname,
        email: form.email,
        dni: form.dni,
        phone: form.phone,
        age: Number(form.age),
        tutorId: form.tutorId ? Number(form.tutorId) : null,
        active: form.active,
      }
      if (form.password) payload.password = form.password
      return payload
    },
    deleteLabel: (row) => `el usuario "${row.name} ${row.surname}"`,
    formFields: [
      { name: 'name', label: 'Nombre', type: 'text', required: true, fullWidth: false },
      { name: 'surname', label: 'Apellido', type: 'text', required: true, fullWidth: false },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Contrasena', type: 'password', required: (init) => !init, hint: (init) => init ? 'Dejar vacio para mantener la actual' : undefined },
      { name: 'dni', label: 'DNI', type: 'text', fullWidth: false, breakRow: true },
      { name: 'phone', label: 'Telefono', type: 'text', fullWidth: false },
      { name: 'age', label: 'Edad', type: 'number', fullWidth: false, breakRow: true },
      { name: 'tutorId', label: 'ID Tutor (menores)', type: 'number', fullWidth: false },
      { name: 'active', label: 'Activo', type: 'checkbox' },
    ],
  },

  employees: {
    title: 'Empleados',
    service: employeesService,
    columns: [
      { key: 'employeeId', label: 'ID' },
      { key: 'name', label: 'Nombre' },
      { key: 'surname', label: 'Apellido' },
      { key: 'email', label: 'Email' },
      { key: 'gender', label: 'Genero', render: (v) => v === 'MALE' ? 'Masculino' : v === 'FEMALE' ? 'Femenino' : v === 'NON_BINARY' ? 'No binario' : v },
      { key: 'workHour', label: 'Horas trab.', render: (v) => v ?? '—' },
      { key: 'role', label: 'Rol', render: (v) => v === 'ADMIN' ? 'Admin' : v === 'MANAGER' ? 'Gerente' : v === 'SALES' ? 'Ventas' : v === 'EMPLOYEE' ? 'Empleado' : v },
      { key: 'hired', label: 'Contratado', render: (v) => v ? 'Si' : 'No' },
      { key: 'active', label: 'Activo', render: (v) => v !== false ? 'Si' : 'No' },
    ],
    FormComponent: null,
    emptyForm: { name: '', surname: '', email: '', gender: 'MALE', workHour: 0, hired: true, role: 'EMPLOYEE', password: '' },
    rowToForm: (row) => ({
      name: row.name ?? '',
      surname: row.surname ?? '',
      email: row.email ?? '',
      gender: row.gender ?? 'MALE',
      workHour: row.workHour ?? 0,
      hired: row.hired ?? true,
      role: row.role ?? 'EMPLOYEE',
      password: '',
    }),
    formToPayload: (form) => {
      const payload = {
        name: form.name,
        surname: form.surname,
        email: form.email,
        gender: form.gender,
        workHour: Number(form.workHour),
        hired: form.hired,
        role: form.role,
      }
      if (form.password) payload.password = form.password
      return payload
    },
    deleteLabel: (row) => `el empleado "${row.name} ${row.surname}"`,
    formFields: [
      { name: 'name', label: 'Nombre', type: 'text', required: true, fullWidth: false },
      { name: 'surname', label: 'Apellido', type: 'text', required: true, fullWidth: false },
      { name: 'email', label: 'Email', type: 'email', required: true },
      { name: 'password', label: 'Contrasena', type: 'password', hint: (init) => init ? 'Dejar vacio para mantener la actual' : undefined },
      { name: 'gender', label: 'Genero', type: 'select', options: GENDER_OPTIONS, fullWidth: false, breakRow: true },
      { name: 'workHour', label: 'Horas trabajo', type: 'number', fullWidth: false },
      { name: 'role', label: 'Rol', type: 'select', options: [{ value: 'ADMIN', label: 'Administrador' }, { value: 'MANAGER', label: 'Gerente' }, { value: 'SALES', label: 'Ventas' }, { value: 'EMPLOYEE', label: 'Empleado' }], fullWidth: false, breakRow: true },
      { name: 'hired', label: 'Contratado', type: 'checkbox' },
    ],
  },

  offers: {
    title: 'Ofertas',
    service: offersService,
    columns: [
      { key: 'offerId', label: 'ID' },
      { key: 'discountPercentage', label: 'Descuento %', render: (v) => v ? `${v}%` : '0%' },
      { key: 'startDate', label: 'Inicio', render: (v) => v ? formatDate(v) : '—' },
      { key: 'endDate', label: 'Fin', render: (v) => v ? formatDate(v) : '—' },
    ],
    FormComponent: null,
    emptyForm: { discountPercentage: 0, startDate: '', endDate: '' },
    rowToForm: (row) => ({
      discountPercentage: row.discountPercentage ?? 0,
      startDate: row.startDate ?? '',
      endDate: row.endDate ?? '',
    }),
    formToPayload: (form) => ({
      discountPercentage: Number(form.discountPercentage),
      startDate: form.startDate,
      endDate: form.endDate,
    }),
    deleteLabel: (row) => `la oferta con ${row.discountPercentage}% de descuento`,
    formFields: [
      { name: 'discountPercentage', label: 'Porcentaje de descuento (%)', type: 'number', step: '0.01', required: true },
      { name: 'startDate', label: 'Fecha de inicio', type: 'date', required: true, fullWidth: false },
      { name: 'endDate', label: 'Fecha de fin', type: 'date', required: true, fullWidth: false },
    ],
  },

  'trip-segments': {
    title: 'Tramos',
    service: tripSegmentsService,
    columns: [
      { key: 'id', label: 'ID' },
      { key: 'travelId', label: 'ID Viaje' },
      { key: 'origin', label: 'Origen' },
      { key: 'destination', label: 'Destino' },
      { key: 'startTime', label: 'Salida', render: (v) => v ? formatDate(v) : '—' },
      { key: 'endTime', label: 'Llegada', render: (v) => v ? formatDate(v) : '—' },
      { key: 'busId', label: 'ID Bus' },
      { key: 'busLicensePlate', label: 'Matricula bus' },
      { key: 'driverId', label: 'ID Conductor' },
      { key: 'driverName', label: 'Conductor' },
      { key: 'activityName', label: 'Actividad' },
    ],
    FormComponent: null,
    emptyForm: { travelId: '', origin: '', destination: '', startTime: '', endTime: '', busId: '', driverId: '', activityName: '' },
    rowToForm: (row) => ({
      travelId: row.travelId ?? '',
      origin: row.origin ?? '',
      destination: row.destination ?? '',
      startTime: row.startTime ?? '',
      endTime: row.endTime ?? '',
      busId: row.busId ?? '',
      driverId: row.driverId ?? '',
      activityName: row.activityName ?? '',
    }),
    formToPayload: (form) => ({
      travelId: Number(form.travelId),
      origin: form.origin,
      destination: form.destination,
      startTime: form.startTime,
      endTime: form.endTime,
      busId: form.busId ? Number(form.busId) : null,
      driverId: form.driverId ? Number(form.driverId) : null,
      activityName: form.activityName,
    }),
    deleteLabel: (row) => `el tramo "${row.origin} → ${row.destination}"`,
    formFields: [
      { name: 'travelId', label: 'ID Viaje', type: 'number', required: true, fullWidth: false },
      { name: 'origin', label: 'Origen', type: 'text', required: true, placeholder: 'Ciudad de origen', fullWidth: false },
      { name: 'destination', label: 'Destino', type: 'text', required: true, placeholder: 'Ciudad de destino', fullWidth: false, breakRow: true },
      { name: 'startTime', label: 'Salida (Fecha y Hora)', type: 'datetime-local', required: true, fullWidth: false },
      { name: 'endTime', label: 'Llegada (Fecha y Hora)', type: 'datetime-local', required: true, fullWidth: false, breakRow: true },
      { name: 'busId', label: 'ID Autobus', type: 'number', fullWidth: false },
      { name: 'driverId', label: 'ID Conductor', type: 'number', fullWidth: false, breakRow: true },
      { name: 'activityName', label: 'Nombre actividad', type: 'text', fullWidth: false },
    ],
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
  travels: async () => {
    const data = await travelService.getPage(0, 100)
    return Array.isArray(data) ? data : (data.content || [])
  },
  users: async () => {
    const data = await userService.getAll()
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
      <div className="flex flex-wrap items-center justify-between gap-2">
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
        {config.formFields ? (
          <BaseForm
            fields={config.formFields}
            form={form}
            onChange={change}
            initialData={editing}
            relatedData={related}
          />
        ) : config.FormComponent ? (
          <FormComponent
            form={form}
            onChange={change}
            initialData={editing}
            {...extraFormProps}
          />
        ) : null}
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
