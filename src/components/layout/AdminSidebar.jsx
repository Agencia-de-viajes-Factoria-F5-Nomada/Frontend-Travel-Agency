import { NavLink } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import BrandMark from './BrandMark'
import Button from '../atoms/Button'
import { ADMIN_NAV } from '../../constants/navigation'
import { PUBLIC_PATHS } from '../../constants/paths'
import { classNames } from '../../utils/classNames'

const itemBase =
  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors'

const buildItemClass = ({ isActive }) =>
  classNames(
    itemBase,
    isActive
      ? 'bg-brand-400/25 text-white'
      : 'text-brand-100 hover:bg-brand-400/15 hover:text-white',
  )

const AdminSidebar = ({ open, onNavigate }) => (
  <aside
    aria-label="Navegación de administración"
    className={classNames(
      'fixed inset-y-0 left-0 z-30 flex w-72 flex-col border-r border-brand-500/30 bg-surface-900 px-4 py-6 transition-transform duration-200 lg:static lg:translate-x-0',
      open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    )}
  >
    <div className="px-2">
      <BrandMark to="/admin" />
      <p className="mt-1 px-1 text-xs uppercase tracking-[0.2em] text-ink-muted">
        Consola de Admin
      </p>
    </div>

    <nav className="mt-8 flex flex-1 flex-col gap-1">
      {ADMIN_NAV.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          className={buildItemClass}
          onClick={onNavigate}
        >
          <item.icon className="h-4 w-4" aria-hidden="true" />
          {item.label}
        </NavLink>
      ))}
    </nav>

    <div className="flex flex-col gap-3 border-t border-brand-500/30 pt-4">
      <Button variant="ghost" size="sm" to={PUBLIC_PATHS.HOME}>
        Volver al sitio
      </Button>
      <Button variant="secondary" size="sm" to={PUBLIC_PATHS.AUTH}>
        <LogOut className="h-4 w-4" aria-hidden="true" />
        Cerrar sesión
      </Button>
    </div>
  </aside>
)

export default AdminSidebar
