import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn } from 'lucide-react'
import { login } from '../services/authService'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'
import { ADMIN_PATHS } from '../constants/paths'

const AuthPage = () => {
  const [employeeId, setEmployeeId] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const data = await login(employeeId, password)
      sessionStorage.setItem('token', data.token)
      sessionStorage.setItem('employee', JSON.stringify({
        id: data.employeeId,
        name: data.name,
        surname: data.surname,
      }))
      navigate(ADMIN_PATHS.DASHBOARD)
    } catch (err) {
      const status = err.response?.status
      if (status === 401) {
        setError('ID o contraseña incorrectos.')
      } else {
        setError('Error al conectar con el servidor. Inténtalo de nuevo.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page grid place-items-center py-16">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-white">Acceso para empleados</h1>
        <p className="mt-2 text-sm text-ink-muted">
          Inicia sesión con tu ID de empleado y contraseña.
        </p>

        {error && (
          <p className="mt-4 rounded-lg border border-status-pending/30 bg-status-pending/10 px-4 py-3 text-sm text-status-pending">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
          <Input
            label="ID de empleado"
            type="number"
            placeholder="Ej: 1"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button fullWidth size="lg" type="submit" disabled={loading}>
            <LogIn className="h-4 w-4" aria-hidden="true" />
            {loading ? 'Iniciando sesión…' : 'Iniciar sesión'}
          </Button>
        </form>
      </Card>
    </div>
  )
}

export default AuthPage
