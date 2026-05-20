import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import BrandMark from './BrandMark'
import { PUBLIC_PATHS } from '../../constants/paths'

const IconInstagram = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)

const IconYoutube = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none"/>
  </svg>
)

const SOCIAL_LINKS = [
  { Icon: IconInstagram, href: 'https://instagram.com/nomadaviajes', label: 'Instagram' },
  { Icon: IconYoutube,   href: 'https://youtube.com/@nomadaviajes',  label: 'YouTube'   },
]

const LEGAL_LINKS = [
  { label: 'Política de privacidad', href: PUBLIC_PATHS.PRIVACY },
  { label: 'Términos y condiciones', href: PUBLIC_PATHS.TERMS },
  { label: 'Cookies',                href: PUBLIC_PATHS.COOKIES },
]

const Footer = () => (
  <footer className="mt-8 border-t border-surface-700/40 bg-accent-dark shadow-[0_10px_30px_-22px_rgba(255,255,255,0.35)]">
    <div className="container-page py-4">

      {/* Single compact row */}
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3">

        {/* Brand */}
        <BrandMark />

        {/* Contact + socials */}
        <div className="flex items-center gap-4">
          <a
            href="mailto:hola@nomadaviajes.com"
            className="inline-flex items-center gap-1.5 text-xs text-ink-muted hover:text-brand-400 transition-colors"
          >
            <Mail size={13} className="shrink-0" />
            hola@nomadaviajes.com
          </a>
          <div className="flex gap-2">
            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center w-7 h-7 rounded-full border border-surface-700/60 text-ink-muted hover:border-brand-400 hover:text-brand-400 transition-colors"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Legal + copyright */}
        <div className="flex items-center gap-4 flex-wrap">
          {LEGAL_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className="text-xs text-ink-muted hover:text-brand-400 transition-colors"
            >
              {label}
            </Link>
          ))}
          <Link
            to={PUBLIC_PATHS.COPYRIGHT}
            className="text-xs text-ink-muted hover:text-brand-400 transition-colors"
          >
            &copy; {new Date().getFullYear()} Nomada
          </Link>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
