import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Button from '../atoms/Button'
import { ADMIN_NAV } from '../../constants/navigation'
import { PUBLIC_PATHS } from '../../constants/paths'
import { classNames } from '../../utils/classNames'
import { authService } from '../../services/authService'

const itemBase =
  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors'

const buildItemClass = ({ isActive }) =>
  classNames(
    itemBase,
    isActive
      ? 'bg-accent/25 text-white'
      : 'text-brand-100 hover:bg-accent/15 hover:text-white',
  )

const AdminSidebar = ({ open, onNavigate }) => {
  const navigate = useNavigate()

  const handleLogout = () => {
    authService.logout(false)
    navigate(PUBLIC_PATHS.AUTH)
  }

  return (
    <aside
      aria-label="Navegación de administración"
      className={classNames(
        'fixed inset-y-0 left-0 z-30 flex w-72 shrink-0 flex-col border-r border-accent/30 bg-accent-deep px-6 py-4 transition-transform duration-200 lg:static lg:h-full lg:translate-x-0',
        open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
      )}
    >
      <nav className="flex flex-1 flex-col gap-1">
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

      <div className="border-t border-accent/30 pt-4">
        <Button variant="secondary" size="sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Cerrar sesión
        </Button>
      </div>
    </aside>
  )
}

export default AdminSidebar