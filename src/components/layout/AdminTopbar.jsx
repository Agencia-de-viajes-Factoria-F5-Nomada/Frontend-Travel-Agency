import { Bell, Menu, UserCircle } from 'lucide-react'
import Button from '../ui/Button'
import logoNomada from '../../assets/logoNomada.a1b2c3.png-removebg-preview.png'

const AdminTopbar = ({ onMenuClick }) => {
  const serifStyle = { fontFamily: "'Cormorant Garamond', serif" };

  return (
    <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b border-slate-100 bg-white/95 px-4 backdrop-blur-md lg:px-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-slate-500 hover:bg-slate-50"
          onClick={onMenuClick}
        >
          <Menu className="h-6 w-6" />
        </Button>

        <img 
          src={logoNomada} 
          alt="Nómada" 
          className="h-10 md:h-12 w-auto object-contain"
        />
        
        <div className="hidden md:block h-6 w-[1px] bg-slate-100 mx-2"></div>
        
        <span 
          className="hidden lg:block text-[#001f3f] font-medium text-[10px] tracking-[0.3em] uppercase opacity-60"
          style={serifStyle}
        >
          Panel Operativo
        </span>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-[#001f3f] relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white"></span>
        </Button>

        <div className="h-8 w-[1px] bg-slate-100 mx-1 hidden sm:block"></div>

        <div className="flex items-center gap-3 pl-2">
          <div className="hidden text-right sm:block">
            <p className="text-[11px] font-bold text-slate-800 leading-none uppercase tracking-tighter">Admin Nómada</p>
            <p className="text-[9px] text-slate-400 mt-1 uppercase">Operaciones</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
            <UserCircle className="h-7 w-7 text-[#001f3f]" />
          </div>
        </div>
      </div>
    </header>
  )
}

export default AdminTopbar