import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import Input from '../components/atoms/Input'
import { authService } from '../services/authService'
import { apiClient } from '../services/api'

const AuthPage = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '', password: ''
  })

  const change = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      if (isSignIn) {
        await authService.login(form.email, form.password)
      } else {
        if (form.password.length < 8) {
          setError('La contraseña debe tener al menos 8 caracteres')
          setLoading(false)
          return
        }
        if (!/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password)) {
          setError('La contraseña debe contener al menos una mayúscula y un número')
          setLoading(false)
          return
        }
        await apiClient.post('/auth/register', {
          name:     form.name,
          email:    form.email,
          password: form.password,
        })
        await authService.login(form.email, form.password)
      }

      const user = authService.getUser()
      navigate(user?.role === 'ADMIN' || user?.rol === 'ADMIN' ? '/admin' : '/profile')
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page grid place-items-center py-16">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-white">
          Iniciar sesión
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          Accede a tu cuenta para gestionar tus reservas.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <Input
            label="Correo electrónico"
            name="email"
            type="email"
            placeholder="tu@ejemplo.com"
            value={form.email}
            onChange={change}
            required
          />
          <Input
            label="Contraseña"
            name="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={change}
            required
          />

          <Button type="submit" fullWidth size="lg" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default AuthPage