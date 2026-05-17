import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'
import EmployeeForm from './EmployeeForm'

const EMPTY_FORM = {
  name: '',
  surname: '',
  gender: 'Male',
  work_hour: 40,
  hired: true
}

export default function EmployeesCRUD() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const openCreate = () => {
    setEditing(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
  }

  const openEdit = (employee) => {
    setEditing(employee)
    setForm({
      name: employee.name || '',
      surname: employee.surname || '',
      gender: employee.gender || 'Male',
      work_hour: employee.work_hour || 40,
      hired: employee.hired ?? true
    })
    setShowForm(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        work_hour: Number(form.work_hour),
        id: editing ? editing.id : Date.now()
      }

      if (editing) {
        setEmployees(prev => prev.map(e => e.id === editing.id ? payload : e))
      } else {
        setEmployees(prev => [...prev, { ...payload, id: Date.now() }])
      }
      setShowForm(false)
      setEditing(null)
    } catch (e) {
      setError(e.message)
    }
  }

  const handleDelete = () => {
    setEmployees(prev => prev.filter(e => e.id !== deleting.id))
    setDeleting(null)
  }

  const columns = [
    { key: 'name', label: 'Nombre' },
    { key: 'surname', label: 'Apellido' },
    { key: 'gender', label: 'Género' },
    { key: 'work_hour', label: 'Horas' },
    {
      key: 'hired',
      label: 'Estado',
      render: (val) => (
        <Badge tone={val ? 'success' : 'neutral'}>
          {val ? 'Contratado' : 'No contratado'}
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
        <h1 className="text-2xl font-bold text-ink">Empleados</h1>
        <Button onClick={openCreate}>+ Nuevo empleado</Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Table columns={columns} data={employees} loading={loading} emptyMessage="No hay empleados" />

      <Modal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setEditing(null) }}
        title={editing ? 'Editar empleado' : 'Nuevo empleado'}
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditing(null) }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear empleado'}
            </Button>
          </>
        }
      >
        <EmployeeForm form={form} onChange={handleChange} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Eliminar empleado"
        message={`¿Estás seguro de que deseas eliminar al empleado "${deleting?.name} ${deleting?.surname}"?`}
        confirmLabel="Eliminar"
      />
    </div>
  )
}