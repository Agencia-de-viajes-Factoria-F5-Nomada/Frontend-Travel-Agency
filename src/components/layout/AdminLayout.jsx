import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'
import AdminTopbar from './AdminTopbar'
import PublicTopbar from './PublicTopbar'
import Footer from './Footer'

const AdminLayout = () => {
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)

  return (
    <div className="flex min-h-screen flex-col bg-surface-950">
      <PublicTopbar />
      <div className="bg-accent-dark">
        <div className="container-page">
          <AdminTopbar onMenuClick={() => setOpen(true)} />
        </div>
      </div>
      <div className="bg-accent-dark flex flex-1">
        <div className="container-page flex flex-1">
          <AdminSidebar open={open} onNavigate={handleClose} />

          {open ? (
            <button
              type="button"
              aria-label="Cerrar superposición del menú lateral"
              className="fixed inset-0 z-20 bg-surface-950/70 backdrop-blur-sm lg:hidden"
              onClick={handleClose}
            />
          ) : null}

          <main id="main" className="flex-1 px-4 py-8 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default AdminLayout