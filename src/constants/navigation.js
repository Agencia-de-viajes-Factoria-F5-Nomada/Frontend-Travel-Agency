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
} from 'lucide-react'
import { ADMIN_PATHS, PUBLIC_PATHS } from './paths'

export const PUBLIC_NAV = [
  { label: 'Inicio',  to: PUBLIC_PATHS.HOME,      icon: Compass },
  { label: 'Buscar',  to: PUBLIC_PATHS.SEARCH,    icon: Search },
  { label: 'Panel',   to: PUBLIC_PATHS.DASHBOARD, icon: LayoutDashboard },
]

export const ADMIN_NAV = [
  { label: 'Panel',       to: ADMIN_PATHS.DASHBOARD,    icon: LayoutDashboard, end: true },
  { label: 'Reservas',    to: ADMIN_PATHS.BOOKINGS,     icon: Ticket },
  { label: 'Usuarios',    to: ADMIN_PATHS.USERS,        icon: Users },
  { label: 'Hoteles',     to: ADMIN_PATHS.HOTELS,       icon: Building2 },
  { label: 'Autobuses',   to: ADMIN_PATHS.BUSES,        icon: Bus },
  { label: 'Conductores', to: ADMIN_PATHS.DRIVERS,      icon: UserCog },
  { label: 'Viajes',      to: ADMIN_PATHS.TRAVELS,      icon: Plane },
]