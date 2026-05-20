import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import TravelForm from './TravelForm'
import { travelService } from '../../services/TravelsService'
import { hotelService } from '../../services/HotelService'
import { busService } from '../../services/BusService'
import usePagination from '../../hooks/usePagination'
import { formatDate } from '../../utils/formatters'

const EMPTY_FORM = {
  destiny: '',
  startDate: '',
  endDate: '',
  availablePlaces: 0,
  sale: false,
  hotelId: '',
  busId: '',
}

export default function TravelsCRUD() {
  const [hotels, setHotels] = useState([])
  const [buses, setBuses] = useState([])
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const loadWithOptions = async (pageNum, size) => {
    const [travelsData, hotelsData, busesData] = await Promise.all([
      travelService.getPage(pageNum, size),
      hotelService.getAll(),
      busService.getAll(),
    ])
    setHotels(hotelsData.content || hotelsData)
    setBuses(busesData.content || busesData)
    return travelsData
  }

  const { data: travels, page, totalPages, loading, load } = usePagination(
    loadWithOptions,
    0,
    10
  )

  useEffect(() => { load() }, [])

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (travel) => {
    setEditing(travel)
    setForm({
      destiny: travel.destiny ?? '',
      startDate: travel.startDate ?? '',
      endDate: travel.endDate ?? '',
      availablePlaces: travel.availablePlaces ?? 0,
      sale: travel.sale ?? false,
      hotelId: travel.hotelId ?? '',
      busId: travel.busId ?? '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        availablePlaces: Number(form.availablePlaces),
        hotelId: Number(form.hotelId),
        busId: form.busId ? Number(form.busId) : null,
      }
      if (!payload.busId) delete payload.busId

      if (editing) {
        await travelService.update(editing.id, payload)
      } else {
        await travelService.create(payload)
      }
      setShowForm(false)
      setEditing(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = async () => {
    try {
      await travelService.delete(deleting.id)
      setDeleting(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const getHotelName = (id) => hotels.find(h => h.id === id)?.name ?? id
  const getBusPlate = (id) => buses.find(b => b.id === id)?.licensePlate ?? id

  const columns = [
    { key: 'destiny', label: 'Destino' },
    { key: 'startDate', label: 'Fecha inicio', render: (v) => formatDate(v) },
    { key: 'endDate', label: 'Fecha fin', render: (v) => formatDate(v) },
    { key: 'availablePlaces', label: 'Plazas' },
    { key: 'hotelId', label: 'Hotel', render: (val) => getHotelName(val) },
    { key: 'busId', label: 'Bus', render: (val) => val ? getBusPlate(val) : '—' },
    { key: 'sale', label: 'Oferta', render: (val) => val ? '🏷 Sí' : 'No' },
    {
      key: 'actions',
      label: '',
      align: 'right',
      render: (_, row) => (
        <div className="flex gap-2 justify-end">
          <Button size="sm" onClick={() => openEdit(row)}>Editar</Button>
          <Button size="sm" variant="danger" onClick={() => setDeleting(row)}>Eliminar</Button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-ink">Viajes</h1>
        <Button onClick={openCreate}>+ Nuevo viaje</Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Table columns={columns} data={travels} loading={loading} emptyMessage="No hay viajes" />

      <div className="flex justify-center pt-4">
        <Pagination
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={(p) => load(p - 1)}
        />
      </div>

      <Modal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null) }}
        title={editing ? 'Editar viaje' : 'Nuevo viaje'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditing(null) }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear viaje'}
            </Button>
          </>
        }
      >
        <TravelForm form={form} onChange={change} hotels={hotels} buses={buses} initialData={editing} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Eliminar viaje"
        message={`¿Estás seguro de que deseas eliminar el viaje a "${deleting?.destiny}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  )
}