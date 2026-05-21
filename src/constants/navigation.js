import {
  Compass,
  LayoutDashboard,
  Ticket,
  Users,
  Bus,
  Building2,
  UserCog,
  Plane,
  UserCircle,
  LogIn,
  MapPinned,
} from 'lucide-react'
import { ADMIN_PATHS, PUBLIC_PATHS } from './paths'

export const PUBLIC_NAV = [
  { label: 'Inicio',    to: PUBLIC_PATHS.HOME,     icon: Compass },
  { label: 'Destinos',  to: '/destinations',        icon: MapPinned },
  { label: 'Mi Perfil', to: PUBLIC_PATHS.PROFILE,   icon: UserCircle, authOnly: true },
  { label: 'Panel',     to: ADMIN_PATHS.DASHBOARD,  icon: LayoutDashboard, adminOnly: true },
]

export const ADMIN_NAV = [
  { label: 'Panel',       to: ADMIN_PATHS.DASHBOARD,  icon: LayoutDashboard, end: true },
  { label: 'Reservas',    to: ADMIN_PATHS.BOOKINGS,   icon: Ticket },
  { label: 'Clientes',    to: ADMIN_PATHS.USERS,      icon: Users },
  { label: 'Hoteles',     to: ADMIN_PATHS.HOTELS,     icon: Building2 },
  { label: 'Autobuses',   to: ADMIN_PATHS.BUSES,      icon: Bus },
  { label: 'Conductores', to: ADMIN_PATHS.DRIVERS,    icon: UserCog },
  { label: 'Destinos',    to: ADMIN_PATHS.TRAVELS,    icon: Plane },
]