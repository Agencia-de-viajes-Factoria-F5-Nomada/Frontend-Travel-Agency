import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import BusForm from './BusForm'
import { busService } from '../../services/BusService'
import usePagination from '../../hooks/usePagination'

const EMPTY_FORM = {
  licensePlate: '',
  capacity: 0,
  available: true,
  bath: false,
  wifi: false,
  ac: false,
  usb: false,
  driverId: '',
}

export default function BusesCRUD() {
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const { data: buses, page, totalPages, loading, load } = usePagination(
    (pageNum, size) => busService.getPage(pageNum, size),
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

  const openEdit = (bus) => {
    setEditing(bus)
    setForm({
      licensePlate: bus.licensePlate ?? '',
      capacity: bus.capacity ?? 0,
      available: bus.available ?? true,
      bath: bus.bath ?? false,
      wifi: bus.wifi ?? false,
      ac: bus.ac ?? false,
      usb: bus.usb ?? false,
      driverId: bus.driverId ?? '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        capacity: Number(form.capacity),
        driverId: form.driverId ? Number(form.driverId) : null,
      }
      if (!payload.driverId) delete payload.driverId

      if (editing) {
        await busService.update(editing.id, payload)
      } else {
        await busService.create(payload)
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
      await busService.delete(deleting.id)
      setDeleting(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const columns = [
    { key: 'licensePlate', label: 'Matrícula' },
    { key: 'capacity', label: 'Capacidad' },
    { key: 'available', label: 'Disponible', render: (val) => val ? '✅' : '❌' },
    { key: 'bath', label: 'Baño', render: (val) => val ? '✅' : '❌' },
    { key: 'wifi', label: 'Wifi', render: (val) => val ? '✅' : '❌' },
    { key: 'ac', label: 'AC', render: (val) => val ? '✅' : '❌' },
    { key: 'usb', label: 'USB', render: (val) => val ? '✅' : '❌' },
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
        <h1 className="text-2xl font-bold text-ink">Autobuses</h1>
        <Button onClick={openCreate}>+ Nuevo autobús</Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Table columns={columns} data={buses} loading={loading} emptyMessage="No hay autobuses" />

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
        title={editing ? 'Editar autobús' : 'Nuevo autobús'}
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditing(null) }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear autobús'}
            </Button>
          </>
        }
      >
        <BusForm form={form} onChange={change} initialData={editing} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Eliminar autobús"
        message={`¿Estás seguro de que deseas eliminar el autobús "${deleting?.licensePlate}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  )
}
