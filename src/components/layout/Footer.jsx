import BrandMark from './BrandMark'

const Footer = () => (
  <footer className="mt-20 border-t border-surface-700 bg-surface-900/60">
    <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
      <BrandMark />
      <p className="text-xs text-ink-muted">
        &copy; {new Date().getFullYear()} Nomada. Todos los derechos reservados.
      </p>
    </div>
  </footer>
)

export default Footer
