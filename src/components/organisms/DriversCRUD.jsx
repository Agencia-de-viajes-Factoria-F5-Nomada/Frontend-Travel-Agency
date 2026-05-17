import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import DriverForm from './DriverForm'
import { driverService } from '../../services/DriverService'
import usePagination from '../../hooks/usePagination'

const EMPTY_FORM = {
  name: '',
  surname: '',
  enrollment: '',
  licenceActive: true,
  imageUrl: '',
}

export default function DriversCRUD() {
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const { data: drivers, page, totalPages, loading, load } = usePagination(
    (pageNum, size) => driverService.getPage(pageNum, size),
    0,
    10
  )

  useEffect(() => { load() }, [load])

  const change = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (driver) => {
    setEditing(driver)
    setForm({
      name: driver.name ?? '',
      surname: driver.surname ?? '',
      enrollment: driver.enrollment ?? '',
      licenceActive: driver.licenceActive ?? true,
      imageUrl: driver.imageUrl ?? '',
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editing) {
        await driverService.update(editing.id, form)
      } else {
        await driverService.create(form)
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
      await driverService.delete(deleting.id)
      setDeleting(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'surname', label: 'Apellido' },
    { key: 'enrollment', label: 'Matriculación' },
    { key: 'licenceActive', label: 'Licencia activa', render: (val) => val ? '✅' : '❌' },
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
        <h1 className="text-2xl font-bold text-ink">Conductores</h1>
        <Button onClick={openCreate}>+ Nuevo conductor</Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Table columns={columns} data={drivers} loading={loading} emptyMessage="No hay conductores" />

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
        title={editing ? 'Editar conductor' : 'Nuevo conductor'}
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditing(null) }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear conductor'}
            </Button>
          </>
        }
      >
        <DriverForm form={form} onChange={change} initialData={editing} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Eliminar conductor"
        message={`¿Estás seguro de que deseas eliminar al conductor "${deleting?.name} ${deleting?.surname}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  )
}