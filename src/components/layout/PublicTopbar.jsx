import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import BrandMark from './BrandMark'
import Button from '../ui/Button'
import { PUBLIC_NAV, PUBLIC_USER_NAV } from '../../constants/navigation'
import { PUBLIC_PATHS } from '../../constants/paths'
import { classNames } from '../../utils/classNames'

const linkBase =
  'inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition-colors'

const buildLinkClass = ({ isActive }) =>
  classNames(
    linkBase,
    isActive
      ? 'bg-brand-500/15 text-brand-300'
      : 'text-ink-soft hover:text-white hover:bg-surface-700',
  )

const PublicTopbar = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-surface-700/70 bg-surface-950/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <BrandMark />

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {PUBLIC_NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end className={buildLinkClass}>
              <item.icon className="h-4 w-4" aria-hidden="true" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm" to={PUBLIC_PATHS.PROFILE}>
            Mi perfil
          </Button>
          <Button size="sm" to={PUBLIC_PATHS.AUTH}>
            Iniciar sesión
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="public-mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {open ? (
        <div
          id="public-mobile-nav"
          className="border-t border-surface-700 bg-surface-950 md:hidden"
        >
          <nav aria-label="Principal móvil" className="container-page flex flex-col gap-1 py-4">
            {[...PUBLIC_NAV, ...PUBLIC_USER_NAV].map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={buildLinkClass}
                onClick={() => setOpen(false)}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export default PublicTopbar
