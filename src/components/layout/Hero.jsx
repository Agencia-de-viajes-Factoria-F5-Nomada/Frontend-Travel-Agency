import { lazy, Suspense, useState } from 'react'
import useInView from '../../hooks/useInView'
const HeroIllustration = lazy(() => import('../graphics/HeroIllustration'))
import ThumbUrl from '../../assets/hero-illustration-thumb.svg?url'

// Hero compuesto: ocupa la primera pantalla bajo la barra superior y renderiza contenido left
export default function Hero({ left, className = '', illustrationProps = {} }) {
  const [ref, inView] = useInView({ root: null, rootMargin: '200px', threshold: 0.01 })
  const [fullLoaded, setFullLoaded] = useState(false)

  return (
    <section ref={ref} className={`relative w-full min-h-[calc(100svh-4rem)] overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,31,63,0.4),_transparent_65%)]"
      />

      {/* Decorative illustration background (md+ only) */}
      <div className="hidden md:block absolute inset-0">
        <img
          src={ThumbUrl}
          alt=""
          aria-hidden="true"
          className={`hero-illustration hero-thumb z-0 ${fullLoaded ? 'blur-0 opacity-0' : ''}`}
          loading="lazy"
          decoding="async"
          fetchpriority="low"
        />
        {inView ? (
          <Suspense fallback={null}>
            <HeroIllustration
              className={`hero-illustration hero-full z-0 ${fullLoaded ? 'hero-full-loaded' : ''}`}
              onLoad={() => setFullLoaded(true)}
              {...illustrationProps}
            />
          </Suspense>
        ) : null}
      </div>

      {/* Main content: left slot takes full height */}
      <div className="relative z-10 w-full min-h-[calc(100svh-4rem)]">
        {left}
      </div>
    </section>
  )
}
