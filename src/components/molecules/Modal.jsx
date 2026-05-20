import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import Button from '../atoms/Button'
import { classNames } from '../../utils/classNames'

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
  footer,
  closeOnBackdrop = true,
}) => {
  const modalRef = useRef(null)

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && onClose()
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      return () => window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  // Focus trap
  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const focusableSelectors = [
      'a[href]', 'button:not([disabled])', 'textarea', 'input', 'select',
      '[tabindex]:not([tabindex="-1"])'
    ].join(', ')

    const focusableElements = modalRef.current.querySelectorAll(focusableSelectors)
    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]

    first?.focus()

    const handleTab = (e) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last?.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first?.focus()
        }
      }
    }

    window.addEventListener('keydown', handleTab)
    return () => window.removeEventListener('keydown', handleTab)
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closeOnBackdrop ? onClose : undefined}
      />
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div
            ref={modalRef}
            className={classNames('relative w-full rounded-2xl bg-white shadow-xl', sizes[size])}
          >
            <div className="flex items-center justify-between border-b border-surface-700/40 px-6 py-4">
              <h2 id="modal-title" className="text-lg font-semibold text-ink">{title}</h2>
              {showClose && (
                <Button variant="ghost" size="icon" onClick={onClose} aria-label="Cerrar modal">
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
            <div className="px-6 py-4">
              {children}
            </div>
            {footer && (
              <div className="flex justify-end gap-3 border-t border-surface-700/40 px-6 py-4">
                {footer}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal