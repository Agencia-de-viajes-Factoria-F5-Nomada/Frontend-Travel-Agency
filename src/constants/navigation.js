import {
  Compass,
  Heart,
  LayoutDashboard,
  LogIn,
  MapPinned,
  Phone,
  Search,
  ShieldCheck,
  Ticket,
  UserCircle,
  Users,
} from 'lucide-react'
import { ADMIN_PATHS, PUBLIC_PATHS } from './paths'

export const PUBLIC_NAV = [
  { label: 'Inicio', to: PUBLIC_PATHS.HOME, icon: Compass },
  { label: 'Buscar', to: PUBLIC_PATHS.SEARCH, icon: Search },
  { label: 'Favoritos', to: PUBLIC_PATHS.FAVORITES, icon: Heart },
  { label: 'Contacto', to: PUBLIC_PATHS.CONTACT, icon: Phone },
]

export const PUBLIC_USER_NAV = [
  { label: 'Mi perfil', to: PUBLIC_PATHS.PROFILE, icon: UserCircle },
  { label: 'Iniciar sesión', to: PUBLIC_PATHS.AUTH, icon: LogIn },
  { label: 'Admin', to: ADMIN_PATHS.DASHBOARD, icon: ShieldCheck },
]

export const ADMIN_NAV = [
  { label: 'Panel', to: ADMIN_PATHS.DASHBOARD, icon: LayoutDashboard, end: true },
  { label: 'Reservas', to: ADMIN_PATHS.BOOKINGS, icon: Ticket },
  { label: 'Destinos', to: ADMIN_PATHS.DESTINATIONS, icon: MapPinned },
  { label: 'Usuarios', to: ADMIN_PATHS.USERS, icon: Users },
]
