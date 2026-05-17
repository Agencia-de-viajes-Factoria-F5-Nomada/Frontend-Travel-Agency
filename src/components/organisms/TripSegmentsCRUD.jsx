import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Button from '../atoms/Button'
import TripSegmentForm from './TripSegmentForm'

const EMPTY_FORM = {
  origin: '',
  destination: '',
  start_time: '',
  end_time: '',
  bus_id: '',
  driver_id: '',
  travel_id: ''
}

export default function TripSegmentsCRUD() {
  const [segments, setSegments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (segment) => {
    setEditing(segment)
    setForm({
      origin: segment.origin || '',
      destination: segment.destination || '',
      start_time: segment.start_time || '',
      end_time: segment.end_time || '',
      bus_id: segment.bus_id || '',
      driver_id: segment.driver_id || '',
      travel_id: segment.travel_id || ''
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        bus_id: Number(form.bus_id),
        driver_id: Number(form.driver_id),
        travel_id: Number(form.travel_id),
        id: editing ? editing.id : Date.now()
      }

      if (editing) {
        setSegments(prev => prev.map(s => s.id === editing.id ? payload : s))
      } else {
        setSegments(prev => [...prev, { ...payload, id: Date.now() }])
      }
      setShowForm(false)
      setEditing(null)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = () => {
    setSegments(prev => prev.filter(s => s.id !== deleting.id))
    setDeleting(null)
  }

  const columns = [
    { key: 'origin', label: 'Origen' },
    { key: 'destination', label: 'Destino' },
    { key: 'start_time', label: 'Salida' },
    { key: 'end_time', label: 'Llegada' },
    { key: 'bus_id', label: 'Bus ID' },
    { key: 'driver_id', label: 'Conductor ID' },
    { key: 'travel_id', label: 'Viaje ID' },
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
        <h1 className="text-2xl font-bold text-ink">Segmentos de Viaje</h1>
        <Button onClick={openCreate}>+ Nuevo segmento</Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Table columns={columns} data={segments} loading={loading} emptyMessage="No hay segmentos" />

      <Modal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null) }}
        title={editing ? 'Editar segmento' : 'Nuevo segmento'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditing(null) }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear segmento'}
            </Button>
          </>
        }
      >
        <TripSegmentForm form={form} onChange={handleChange} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Eliminar segmento"
        message={`¿Estás seguro de que deseas eliminar el segmento de "${deleting?.origin}" a "${deleting?.destination}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  )
}