import { Menu, Search } from 'lucide-react'
import Button from '../atoms/Button'

const AdminTopbar = ({ onMenuClick }) => (
  <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-accent/30 bg-accent-dark px-4 backdrop-blur-sm lg:px-8">
    <Button
      variant="ghost"
      size="icon"
      className="lg:hidden"
      aria-label="Abrir menú de administración"
      onClick={onMenuClick}
    >
      <Menu className="h-5 w-5" aria-hidden="true" />
    </Button>

    <div className="hidden flex-1 items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-2 md:flex">
      <Search className="h-4 w-4 text-ink-muted" aria-hidden="true" />
      <input
        type="search"
        placeholder="Buscar reservas, usuarios o destinos"
        className="w-full bg-transparent text-sm text-ink placeholder:text-ink-muted focus:outline-none"
        aria-label="Búsqueda de administración"
      />
    </div>

    <div className="ml-auto flex items-center gap-2">
      <div className="flex items-center gap-3 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-sm font-semibold text-surface-950">
          CA
        </span>
        <div className="hidden text-left sm:block">
          <p className="text-sm font-medium text-white">Carlos Admin</p>
          <p className="text-xs text-ink-muted">Operaciones</p>
        </div>
      </div>
    </div>
  </header>
)

export default AdminTopbar
