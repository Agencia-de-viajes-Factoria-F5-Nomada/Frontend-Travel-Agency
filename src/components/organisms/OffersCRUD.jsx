import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'
import OfferForm from './OfferForm'
import { offersService } from '../../services/offersService'
import usePagination from '../../hooks/usePagination'

const EMPTY_FORM = {
  discount_percentage: 0,
  start_date: '',
  end_date: ''
}

export default function OffersCRUD() {
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const { data: offers, page, totalPages, loading, load } = usePagination(
    (pageNum, size) => offersService.getPage(pageNum, size),
    0,
    10
  )

  useEffect(() => { load() }, [load])

  const isActive = (offer) => {
    const now = new Date()
    const start = new Date(offer.start_date)
    const end = new Date(offer.end_date)
    return now >= start && now <= end
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
  }

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (offer) => {
    setEditing(offer)
    setForm({
      discount_percentage: offer.discount_percentage || 0,
      start_date: offer.start_date || '',
      end_date: offer.end_date || ''
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        discount_percentage: Number(form.discount_percentage),
        id: editing ? editing.id : Date.now()
      }

      if (editing) {
        setOffers(prev => prev.map(o => o.id === editing.id ? payload : o))
      } else {
        setOffers(prev => [...prev, { ...payload, id: Date.now() }])
      }
      setShowForm(false)
      setEditing(null)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = () => {
    setOffers(prev => prev.filter(o => o.id !== deleting.id))
    setDeleting(null)
  }

  const columns = [
    { key: 'discount_percentage', label: 'Descuento (%)', render: (val) => `${val}%` },
    { key: 'start_date', label: 'Inicio' },
    { key: 'end_date', label: 'Fin' },
    {
      key: 'status',
      label: 'Estado',
      render: (_, row) => (
        <Badge tone={isActive(row) ? 'success' : 'neutral'}>
          {isActive(row) ? 'Activa' : 'Inactiva'}
        </Badge>
      )
    },
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
        <h1 className="text-2xl font-bold text-ink">Ofertas</h1>
        <Button onClick={openCreate}>+ Nueva oferta</Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Table columns={columns} data={offers} loading={loading} emptyMessage="No hay ofertas" />

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
        title={editing ? 'Editar oferta' : 'Nueva oferta'}
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditing(null) }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear oferta'}
            </Button>
          </>
        }
      >
        <OfferForm form={form} onChange={handleChange} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Eliminar oferta"
        message={`¿Estás seguro de que deseas eliminar esta oferta de ${deleting?.discount_percentage}%?`}
        confirmLabel="Eliminar"
      />
    </div>
  )
}