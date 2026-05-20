import { useState, useEffect } from 'react'
import Table from '../molecules/Table'
import Modal from '../molecules/Modal'
import Alert from '../molecules/Alert'
import ConfirmDialog from '../molecules/ConfirmDialog'
import Pagination from '../molecules/Pagination'
import Button from '../atoms/Button'
import Badge from '../atoms/Badge'
import UserForm from './UserForm'
import { userService } from '../../services/usersService'
import { validatePasswordStrength } from '../../utils/passwordValidation'
import usePagination from '../../hooks/usePagination'

const EMPTY_FORM = {
  name: '',
  surname: '',
  email: '',
  password: '',
  passport: '',
  birthDate: '',
  tutorId: '',
  rol: 'USER',
  active: true,
}

export default function UsersCRUD() {
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deleting, setDeleting] = useState(null)
  const [form, setForm] = useState(EMPTY_FORM)

  const { data: users, page, totalPages, loading, load } = usePagination(
    (pageNum, size) => userService.getPage(pageNum, size),
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

  const openEdit = (user) => {
    setEditing(user)
    setForm({
      name:      user.name      ?? '',
      surname:   user.surname   ?? '',
      email:     user.email     ?? '',
      password:  '',
      passport:  user.passport  ?? '',
      birthDate: user.birthDate ?? '',
      tutorId:   user.tutorId   ?? '',
      rol:       user.rol       ?? 'USER',
      active:    user.active    ?? true,
    })
    setShowForm(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = { ...form }
      const passwordError = validatePasswordStrength(payload.password || '')
      if ((!editing && passwordError) || (editing && payload.password && passwordError)) {
        setError(passwordError)
        return
      }
      if (!payload.password) delete payload.password
      if (!payload.tutorId)  delete payload.tutorId
      if (editing) {
        await userService.update(editing.id, payload)
      } else {
        await userService.create(payload)
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
      await userService.delete(deleting.id)
      setDeleting(null)
      load()
    } catch (e) {
      setError(e.message)
    }
  }

  const columns = [
    { key: 'name',    label: 'Nombre' },
    { key: 'surname', label: 'Apellido' },
    { key: 'email',   label: 'Email' },
    {
      key: 'rol',
      label: 'Rol',
      render: (val) => (
        <Badge tone={val === 'ADMIN' ? 'brand' : 'neutral'}>{val}</Badge>
      )
    },
    {
      key: 'active',
      label: 'Estado',
      render: (val) => val ? 'Activo' : 'Inactivo'
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
        <h1 className="text-2xl font-bold text-ink">Usuarios</h1>
        <Button onClick={openCreate}>+ Nuevo usuario</Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}

      <Table columns={columns} data={users} loading={loading} emptyMessage="No hay usuarios" />

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
        title={editing ? 'Editar usuario' : 'Nuevo usuario'}
        footer={
          <>
            <Button variant="secondary" onClick={() => { setShowForm(false); setEditing(null) }}>
              Cancelar
            </Button>
            <Button onClick={handleSubmit}>
              {editing ? 'Guardar cambios' : 'Crear usuario'}
            </Button>
          </>
        }
      >
        <UserForm form={form} onChange={change} initialData={editing} />
      </Modal>

      <ConfirmDialog
        isOpen={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Eliminar usuario"
        message={`¿Estás seguro de que deseas eliminar el usuario "${deleting?.name}"? Esta acción no se puede deshacer.`}
        confirmLabel="Eliminar"
      />
    </div>
  )
}
