import { Outlet } from 'react-router-dom'
import PublicTopbar from './PublicTopbar'
import Footer from './Footer'

const PublicLayout = () => (
  <div className="flex min-h-screen flex-col bg-brand-900">
    <PublicTopbar />
    <main id="main" className="flex-1">
      <Outlet />
    </main>
    <Footer />
  </div>
)

export default PublicLayout
