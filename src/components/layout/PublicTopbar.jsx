import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import BrandMark from './BrandMark'
import Button from '../atoms/Button'
import { PUBLIC_NAV } from '../../constants/navigation'
import { PUBLIC_PATHS, ADMIN_PATHS } from '../../constants/paths'
import { authService } from '../../services/authService'
import { classNames } from '../../utils/classNames'

const linkBase =
  'group relative inline-flex h-12 items-center gap-2 px-1 text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-ink-soft/85 transition-colors duration-300 hover:text-white'

const buildLinkClass = ({ isActive }) =>
  classNames(
    linkBase,
    isActive
      ? 'text-white after:absolute after:inset-x-2 after:bottom-1 after:h-0.5 after:rounded-full after:bg-brand-300'
      : 'after:absolute after:inset-x-2 after:bottom-1 after:h-px after:scale-x-0 after:rounded-full after:bg-white/50 after:transition-transform after:duration-300 hover:after:scale-x-100',
  )

const PublicTopbar = () => {
  const [open, setOpen] = useState(false)

  const primaryNav = PUBLIC_NAV.filter(item => {
    if (item.to === PUBLIC_PATHS.AUTH) return false
    if (item.adminOnly) return authService.isAdmin()
    return true
  })

  return (
    <header className="sticky top-0 z-30 border-b border-surface-700/40 bg-gradient-to-b from-brand-100/60 to-surface-950/40 shadow-[0_10px_30px_-22px_rgba(255,255,255,0.35)] backdrop-blur-sm">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <BrandMark />

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          <div className="flex items-center gap-6">
            {primaryNav.map((item) => (
              <NavLink key={item.to} to={item.to} end className={buildLinkClass}>
                <item.icon
                  className="h-4 w-4 opacity-70 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="border border-white/15 bg-white/[0.03] text-white hover:bg-white/10 md:hidden"
          aria-label={open ? 'Cerrar menu' : 'Abrir menu'}
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
          className="border-t border-surface-700/40 bg-gradient-to-b from-brand-100/70 to-surface-950/95 shadow-xl backdrop-blur-sm md:hidden"
        >
          <nav aria-label="Principal movil" className="container-page grid gap-1 py-4">
            {primaryNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end
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