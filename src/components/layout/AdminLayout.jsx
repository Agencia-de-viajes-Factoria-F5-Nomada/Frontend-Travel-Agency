import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './AdminSidebar'

const AdminLayout = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-[#00162b]">
      <AdminSidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col overflow-hidden bg-[#00162b]">
        <main className="flex-1 overflow-y-auto p-4 md:p-12">
          <Outlet /> 
        </main>
      </div>
    </div>
  )
}

export default AdminLayout