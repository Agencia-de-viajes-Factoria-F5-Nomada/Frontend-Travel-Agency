import BrandMark from './BrandMark'

const Footer = () => (
  <footer className="mt-20 border-t border-surface-700/40 bg-gradient-to-b from-brand-100/60 to-surface-950/40 backdrop-blur">
    <div className="container-page flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
      <BrandMark />
      <p className="text-xs text-ink-muted">
        &copy; {new Date().getFullYear()} Nomada. Todos los derechos reservados.
      </p>
    </div>
  </footer>
)

export default Footer
