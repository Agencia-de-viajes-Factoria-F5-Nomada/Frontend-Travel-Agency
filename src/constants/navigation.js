import {
  Compass,
  LayoutDashboard,
  LogIn,
  MapPinned,
  Search,
  Tag,
  Ticket,
  UserCircle,
  Users,
  Hotel,
  Bus,
  UserCog,
  Briefcase,
  Map
} from 'lucide-react'
import { ADMIN_PATHS, PUBLIC_PATHS } from './paths'

export const PUBLIC_NAV = [
  { label: 'Inicio', to: PUBLIC_PATHS.HOME, icon: Compass },
  { label: 'Buscar', to: PUBLIC_PATHS.SEARCH, icon: Search },
  { label: 'Ofertas', to: PUBLIC_PATHS.OFFERS, icon: Tag },
  { label: 'Mi perfil', to: PUBLIC_PATHS.PROFILE, icon: UserCircle },
  { label: 'Iniciar sesión', to: PUBLIC_PATHS.AUTH, icon: LogIn },
  { label: 'Dashboard', to: PUBLIC_PATHS.DASHBOARD, icon: LayoutDashboard },
]

export const ADMIN_NAV = [
  { label: 'Panel', to: ADMIN_PATHS.DASHBOARD, icon: LayoutDashboard, end: true },
  { label: 'Reservas', to: ADMIN_PATHS.BOOKINGS, icon: Ticket },
  { label: 'Destinos', to: ADMIN_PATHS.DESTINATIONS, icon: MapPinned },
  { label: 'Usuarios', to: ADMIN_PATHS.USERS, icon: Users },
  { label: 'Empleados', to: ADMIN_PATHS.EMPLOYEES, icon: Briefcase },
  { label: 'Conductores', to: ADMIN_PATHS.DRIVERS, icon: UserCog },
  { label: 'Segmentos', to: ADMIN_PATHS.TRIP_SEGMENTS, icon: Map },
  { label: 'Hoteles', to: ADMIN_PATHS.HOTELS, icon: Hotel },
  { label: 'Autobuses', to: ADMIN_PATHS.BUSES, icon: Bus },
]