import {
  Compass,
  LayoutDashboard,
  Search,
  Ticket,
  Users,
  Bus,
  Building2,
  UserCog,
  Plane,
  UserCircle,
  LogIn,
  MapPinned,
  Tag,
} from 'lucide-react'
import { ADMIN_PATHS, PUBLIC_PATHS } from './paths'

export const PUBLIC_NAV = [
  { label: 'Inicio',          to: PUBLIC_PATHS.HOME,         icon: Compass },
  { label: 'Destinos',        to: '/destinations',           icon: MapPinned },
  { label: 'Ofertas',         to: PUBLIC_PATHS.OFFERS,       icon: Tag },
  { label: 'Mi Perfil',       to: PUBLIC_PATHS.PROFILE,      icon: UserCircle },
  { label: 'Iniciar sesión',  to: PUBLIC_PATHS.AUTH,         icon: LogIn },
]

export const ADMIN_NAV = [
  { label: 'Panel',       to: ADMIN_PATHS.DASHBOARD,    icon: LayoutDashboard, end: true },
  { label: 'Reservas',    to: ADMIN_PATHS.BOOKINGS,     icon: Ticket },
  { label: 'Clientes',    to: ADMIN_PATHS.USERS,        icon: Users },
  { label: 'Hoteles',     to: ADMIN_PATHS.HOTELS,       icon: Building2 },
  { label: 'Autobuses',   to: ADMIN_PATHS.BUSES,        icon: Bus },
  { label: 'Conductores', to: ADMIN_PATHS.DRIVERS,      icon: UserCog },
  { label: 'Destinos',    to: ADMIN_PATHS.TRAVELS,      icon: Plane },
]