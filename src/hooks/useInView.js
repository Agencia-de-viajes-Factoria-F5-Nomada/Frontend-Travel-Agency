import { useEffect, useRef, useState } from 'react'

export default function useInView({ root = null, rootMargin = '0px', threshold = 0 } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (!ref.current) return undefined
    if (inView) return undefined // already in view, no need to observe

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.disconnect()
          }
        })
      },
      { root, rootMargin, threshold }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [ref, root, rootMargin, threshold, inView])

  return [ref, inView]
}
