import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'
import PublicTopbar from './PublicTopbar'

const AdminLayout = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  return (
    <div className="flex min-h-screen flex-col bg-surface-950">
      <PublicTopbar />
      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar open={open} onNavigate={handleClose} />

        {open ? (
          <button
            type="button"
            aria-label="Cerrar superposición del menú lateral"
            className="fixed inset-0 z-20 bg-surface-950/70 backdrop-blur-sm lg:hidden"
            onClick={handleClose}
          />
        ) : null}
{/* lg:ml-0  o el overflow-auto*/}
        <div className="flex min-w-0 flex-1 flex-col lg:ml-0 overflow-auto">  
          <AdminTopbar onMenuClick={() => setOpen(true)} />
          <main id="main" className="flex-1 px-4 py-8 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout