import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import HotelForm from './HotelForm'
import { hotelService } from '../../services/HotelService'
import usePagination from '../../hooks/usePagination'

const EMPTY_FORM = {
  name: '',
  address: '',
  city: '',
  country: '',
  stars: 3,
  capacity: 0,
  availablePlaces: 0,
  halfBoardPrice: 0,
  fullBoardPrice: 0,
  imageUrl: '',
  active: true,
}

export default function HotelsCRUD() {
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const { data: hotels, page, totalPages, loading, load } = usePagination(
    (pageNum, size) => hotelService.getPage(pageNum, size),
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

  const openEdit = (hotel) => {
    setEditing(hotel)
    setForm({
      name: hotel.name ?? '',
      address: hotel.address ?? '',
      city: hotel.city ?? '',
      country: hotel.country ?? '',
      stars: hotel.stars ?? 3,
      capacity: hotel.capacity ?? 0,
      availablePlaces: hotel.availablePlaces ?? 0,
      halfBoardPrice: hotel.halfBoardPrice ?? 0,
      fullBoardPrice: hotel.fullBoardPrice ?? 0,
      imageUrl: hotel.imageUrl ?? '',
      active: hotel.active ?? true,
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        stars: Number(form.stars),
        capacity: Number(form.capacity),
        availablePlaces: Number(form.availablePlaces),
        halfBoardPrice: Number(form.halfBoardPrice),
        fullBoardPrice: Number(form.fullBoardPrice),
      }
      if (editing) {
        await hotelService.update(editing.id, payload)
      } else {
        await hotelService.create(payload)
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
      await hotelService.delete(deleting.id)
      setDeleting(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const columns = [
    {
      key: 'imageUrl',
      label: 'Imagen',
      render: (val) => val
        ? <img src={val} alt="hotel" className="h-10 w-14 rounded object-cover" />
        : <div className="h-10 w-14 rounded bg-surface-700 flex items-center justify-center text-xs text-ink-muted">Sin img</div>
    },
    { key: 'name', label: 'Nombre' },
    { key: 'city', label: 'Ciudad' },
    { key: 'country', label: 'País' },
    { key: 'stars', label: 'Estrellas', render: (val) => '⭐'.repeat(val) },
    { key: 'capacity', label: 'Plazas', render: (_, row) => `${row.availablePlaces}/${row.capacity}` },
    { key: 'halfBoardPrice', label: 'MP', render: (val) => `${val}€` },
    { key: 'fullBoardPrice', label: 'PC', render: (val) => `${val}€` },
    { key: 'active', label: 'Activo', render: (val) => val ? '✅' : '❌' },
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
        <h1 className="text-2xl font-bold text-ink">Hoteles</h1>
        <Button onClick={openCreate}>+ Nuevo hotel</Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Table columns={columns} data={hotels} loading={loading} emptyMessage="No hay hoteles" />

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
        title={editing ? 'Editar hotel' : 'Nuevo hotel'}
        size="lg"
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditing(null) }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear hotel'}
            </Button>
          </>
        }
      >
        <HotelForm form={form} onChange={change} initialData={editing} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Eliminar hotel"
        message={`¿Estás seguro de que deseas eliminar el hotel "${deleting?.name}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  )
}