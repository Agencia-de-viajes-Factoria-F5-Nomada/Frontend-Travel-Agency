import {
  Bus,
  Compass,
  Hotel,
  LayoutDashboard,
  LogIn,
  MapPinned,
  Search,
  Tag,
  Ticket,
  UserCircle,
  Users,
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
  { label: 'Hoteles', to: ADMIN_PATHS.HOTELS, icon: Hotel },
  { label: 'Autobuses', to: ADMIN_PATHS.BUSES, icon: Bus },
  { label: 'Conductores', to: ADMIN_PATHS.DRIVERS, icon: Users },
  { label: 'Viajes', to: ADMIN_PATHS.TRAVELS, icon: MapPinned },
  { label: 'Usuarios', to: ADMIN_PATHS.USERS, icon: Users },
]
