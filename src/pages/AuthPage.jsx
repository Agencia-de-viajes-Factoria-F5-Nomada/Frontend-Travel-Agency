import { useState } from 'react'
import { LogIn, ShieldCheck } from 'lucide-react'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import Input from '../components/ui/Input'

const AuthPage = () => {
  // Eliminamos los TABS de "Crear cuenta" porque la cliente pide que el login 
  // sea para empleados y funcione solo en dispositivos de la empresa.
  
  return (
    <div className="container-page grid place-items-center py-16 bg-[#2c4a5a]"> 
      {/* Usamos el azul oscuro de la paleta (image_cbe65c.jpg) para el fondo */}
      
      <Card className="w-full max-w-md p-8 bg-white shadow-2xl">
        {/* Usamos fondo blanco para la Card para máxima legibilidad, como sugirió ella */}
        
        <div className="flex flex-col items-center mb-6">
          {/* El nombre Nómada con la tipografía Cormorant Garamond (Serif) */}
          <h1 
            className="text-4xl text-[#2c4a5a] font-bold" 
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            NÓMADA
          </h1>
          <div className="h-[1px] w-12 bg-[#2c4a5a] my-2"></div>
        </div>

        <h2 
          className="text-xl font-semibold text-[#2c4a5a] text-center"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Acceso de Personal
        </h2>
        
        <p className="mt-2 text-sm text-slate-500 text-center">
          Inicia sesión para gestionar la flota y las reservas.
        </p>

        {/* Indicador de Seguridad Local (Exigencia de la cliente) */}
        <div className="mt-6 flex items-center justify-center gap-2 p-2 rounded bg-slate-100 border border-slate-200">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <span className="text-[10px] text-slate-600 uppercase tracking-widest">
            Dispositivo Autorizado
          </span>
        </div>

        <form className="mt-8 grid gap-4">
          <Input 
            label="Correo Corporativo" 
            type="email" 
            placeholder="ejemplo@nomada.com"
            className="border-slate-300 focus:border-[#2c4a5a]" 
          />
          <Input 
            label="Contraseña" 
            type="password" 
            placeholder="••••••••" 
          />
          
          <Button 
            fullWidth 
            size="lg"
            className="bg-[#2c4a5a] hover:bg-[#1e333e] text-white py-3 transition-colors shadow-lg"
            style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.2rem' }}
          >
            Iniciar Sesión
          </Button>
        </form>

        <div className="mt-10 text-center">
          {/* Eslogan movido de lugar como ella pidió en su e-mail */}
          <p 
            className="text-xs italic text-slate-400"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            "Siempre en el lugar exacto"
          </p>
        </div>
      </Card>
    </div>
  )
}

export default AuthPage