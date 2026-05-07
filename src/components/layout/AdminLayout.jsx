import { useState } from 'react'
import { Outlet } from 'react-router-dom' // <-- Asegúrate de que esta línea esté
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'

const AdminLayout = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#001f3f]">
      <AdminSidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col overflow-hidden bg-white lg:rounded-tl-[2rem] my-0 lg:my-2 lg:mr-2">
        <AdminTopbar onMenuClick={() => setOpen(true)} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {/* ESTA LÍNEA ES LA QUE "DIBUJA" LA TABLA DE RESERVAS */}
          <Outlet /> 
        </main>
      </div>
    </div>
  )
}

export default AdminLayout