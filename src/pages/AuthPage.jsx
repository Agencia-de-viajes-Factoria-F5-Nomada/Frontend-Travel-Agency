import { useState } from 'react'
import { LogIn, UserPlus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/atoms/Button'
import Card from '../components/atoms/Card'
import Input from '../components/atoms/Input'
import { classNames } from '../utils/classNames'
import { authService } from '../services/authService'

const TABS = [
  { id: 'signin', label: 'Iniciar sesión', icon: LogIn },
  { id: 'signup', label: 'Crear cuenta',   icon: UserPlus },
]

const AuthPage = () => {
  const [active, setActive]   = useState('signin')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)
  const navigate              = useNavigate()
  const isSignIn              = active === 'signin'

  const [form, setForm] = useState({
    name: '', email: '', password: ''
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
        // Registro — ajusta el endpoint según tu backend
        const res = await fetch(`${import.meta.env.VITE_API_URL ?? 'http://localhost:8080'}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:     form.name,
            email:    form.email,
            password: form.password,
          }),
        })
        if (!res.ok) throw new Error('Error al crear la cuenta')
        await authService.login(form.email, form.password)
      }

      // Redirigir según rol
      // Redirigir según rol
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
          {isSignIn ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </h1>
        <p className="mt-2 text-sm text-ink-muted">
          {isSignIn
            ? 'Inicia sesión para gestionar tus reservas y favoritos.'
            : 'Únete y comienza a planificar tu próxima aventura.'}
        </p>

        {/* Tabs */}
        <div
          role="tablist"
          aria-label="Modo de autenticación"
          className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-surface-900 p-1"
        >
          {TABS.map((tab) => {
            const isActive = tab.id === active
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => { setActive(tab.id); setError(null) }}
                className={classNames(
                  'inline-flex items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-brand-500 text-surface-950'
                    : 'text-ink-soft hover:text-white',
                )}
              >
                <tab.icon className="h-4 w-4" aria-hidden="true" />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          {!isSignIn && (
            <Input
              label="Nombre completo"
              name="name"
              placeholder="Juan Pérez"
              value={form.name}
              onChange={change}
              required
            />
          )}
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
            {loading
              ? 'Cargando...'
              : isSignIn ? 'Iniciar sesión' : 'Crear cuenta'}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-ink-muted">
          Al continuar aceptas nuestros términos y la política de privacidad.
        </p>
      </Card>
    </div>
  )
}

export default AuthPage
