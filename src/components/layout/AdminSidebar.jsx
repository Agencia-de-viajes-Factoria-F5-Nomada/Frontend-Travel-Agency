import { LayoutDashboard, Calendar, Users, Settings, LogOut, Car } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logoNomada from '../../assets/logoNomada.a1b2c3.png-removebg-preview.png'

const AdminSidebar = ({ open, setOpen }) => {
  const location = useLocation();
  const serifStyle = { fontFamily: "'Cormorant Garamond', serif" };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Panel', path: '/admin/dashboard' },
    { icon: Calendar, label: 'Reservas', path: '/admin/bookings' },
    { icon: Car, label: 'Flota', path: '/admin/fleet' },
    { icon: Users, label: 'Usuarios', path: '/admin/users' },
  ];

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-[#001f3f] text-white transition-transform duration-300 lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      
      {/* SECCIÓN LOGO SIDEBAR */}
      <div className="p-8 mb-6 flex flex-col items-center border-b border-white/5">
        <img 
          src={logoNomada} 
          alt="Nómada" 
          className="h-14 w-auto brightness-0 invert opacity-90" 
        />
        <span className="mt-3 text-[10px] tracking-[0.4em] uppercase opacity-40 font-light text-center">
          Consola Global
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              location.pathname === item.path 
              ? 'bg-white/10 text-white shadow-lg' 
              : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-red-400 hover:bg-red-500/10 rounded-xl transition-colors">
          <LogOut className="h-5 w-5" />
          <span className="text-sm font-bold uppercase tracking-widest">Salir</span>
        </button>
      </div>
    </aside>
  )
}

export default AdminSidebar