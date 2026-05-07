import { ShieldCheck } from 'lucide-react'
import logoNomada from '../assets/logoNomada.a1b2c3.png-removebg-preview.png'

const AuthPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#001f3f] px-4 py-8"> 
      
      <div className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl transition-all duration-500 ease-in-out hover:-translate-y-3 hover:shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-t-8 border-[#001f3f]">
        
        <div className="flex justify-center mb-6">
          <img 
            src={logoNomada} 
            alt="Nómada" 
            className="h-28 w-auto object-contain"
          />
        </div>

        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-slate-800"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            Acceso de Personal
          </h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-[0.2em] mt-1">
             Gestión de Flota
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Correo Corporativo</label>
            <input 
              type="email" 
              className="p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#001f3f] outline-none transition-all text-sm"
              placeholder="empleado@nomada.com"
            />
          </div>
          
          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Contraseña</label>
            <input 
              type="password" 
              className="p-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-[#001f3f] outline-none transition-all text-sm"
              placeholder="••••••••" 
            />
          </div>
          
          <button 
            type="submit"
            className="bg-[#001f3f] text-white font-bold py-3.5 rounded-xl hover:bg-slate-900 transition-all shadow-lg mt-4 active:scale-95 text-sm tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            ENTRAR
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-50 flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full border border-green-100">
            <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
            <span className="text-[9px] text-green-700 font-bold uppercase"> 
              Conexión Encriptada 
            </span>
          </div>
          
          <p className="text-xs italic text-slate-400 tracking-wide"
             style={{ fontFamily: "'Cormorant Garamond', serif" }}>
            "Siempre en el lugar exacto"
          </p>
        </div>

      </div>
    </div>
  )
}

export default AuthPage