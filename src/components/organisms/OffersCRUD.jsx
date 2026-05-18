import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'
import OfferForm from './OfferForm'
import { offersService } from '../../services/OffersService'

const EMPTY_FORM = {
  discount_percentage: 0,
  start_date: '',
  end_date: ''
}

export default function OffersCRUD() {
  const [offers, setOffers]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [showForm, setShowForm]   = useState(false)
  const [editing, setEditing]     = useState(null)
  const [deleting, setDeleting]   = useState(null)
  const [form, setForm]           = useState(EMPTY_FORM)

  const isActive = (offer) => {
    const now   = new Date()
    const start = new Date(offer.start_date)
    const end   = new Date(offer.end_date)
    return now >= start && now <= end
  }

  const load = async () => {
    try {
      setLoading(true)
      const data = await offersService.getAll()
      setOffers(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

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
      start_date:          offer.start_date          || '',
      end_date:            offer.end_date            || ''
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...form, discount_percentage: Number(form.discount_percentage) }
      if (editing) {
        await offersService.update(editing.id, payload)
      } else {
        await offersService.create(payload)
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
      await offersService.delete(deleting.id)
      setDeleting(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const columns = [
    { key: 'discount_percentage', label: 'Descuento (%)', render: (val) => `${val}%` },
    { key: 'start_date',          label: 'Inicio' },
    { key: 'end_date',            label: 'Fin' },
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