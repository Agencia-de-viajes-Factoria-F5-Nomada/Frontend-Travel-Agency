import { useState } from 'react'
import { LogIn, UserPlus } from 'lucide-react'
import Button from '../../components/ui/Button'
import Card from '../../components/ui/Card'
import Input from '../../components/ui/Input'
import { classNames } from '../../utils/classNames'

const TABS = [
  { id: 'signin', label: 'Iniciar sesión', icon: LogIn },
  { id: 'signup', label: 'Crear cuenta', icon: UserPlus },
]

const AuthPage = () => {
  const [active, setActive] = useState('signin')
  const isSignIn = active === 'signin'

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
                onClick={() => setActive(tab.id)}
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

        <form className="mt-6 grid gap-4">
          {!isSignIn ? <Input label="Nombre completo" placeholder="Juan Pérez" /> : null}
          <Input label="Correo electrónico" type="email" placeholder="tu@ejemplo.com" />
          <Input label="Contraseña" type="password" placeholder="••••••••" />
          {isSignIn ? (
            <a href="#forgot" className="text-right text-xs text-brand-300 hover:text-brand-200">
              ¿Olvidaste tu contraseña?
            </a>
          ) : null}
          <Button fullWidth size="lg">
            {isSignIn ? 'Iniciar sesión' : 'Crear cuenta'}
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
