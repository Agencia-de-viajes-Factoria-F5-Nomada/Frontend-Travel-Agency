import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'
import EmployeeForm from './EmployeeForm'
import { employeesService } from '../../services/EmployeesService'

const EMPTY_FORM = {
  name: '',
  surname: '',
  gender: 'Male',
  work_hour: 40,
  hired: true
}

export default function EmployeesCRUD() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [showForm, setShowForm]   = useState(false)
  const [editing, setEditing]     = useState(null)
  const [deleting, setDeleting]   = useState(null)
  const [form, setForm]           = useState(EMPTY_FORM)

  const load = async () => {
    try {
      setLoading(true)
      const data = await employeesService.getAll()
      setEmployees(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

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
      name:      employee.name      || '',
      surname:   employee.surname   || '',
      gender:    employee.gender    || 'Male',
      work_hour: employee.work_hour || 40,
      hired:     employee.hired     ?? true
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...form, work_hour: Number(form.work_hour) }
      if (editing) {
        await employeesService.update(editing.id, payload)
      } else {
        await employeesService.create(payload)
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
      await employeesService.delete(deleting.id)
      setDeleting(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const columns = [
    { key: 'name',      label: 'Nombre' },
    { key: 'surname',   label: 'Apellido' },
    { key: 'gender',    label: 'Género' },
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